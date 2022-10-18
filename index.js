const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const ratings = require('@mtucourses/rate-my-professors').default;

const app = express();

app.get('/get/:course/:number', function(req, res){
    let course = req.params.course
    let number = req.params.number
    let url = 'https://apps.ualberta.ca/catalogue/course/cmput/101';
    let instructors = []
    request(url, async function(error, response, html) {
        if (!error) {
            
            
        var $ = cheerio.load(html)
        var heading = $('.table-card-content')
        // console.log(heading.text())
        const output = heading
        .children('div')
        .children('a')
        
        data = []
        output.each((_, e) => {
            let instructor  = $(e).text().replace(/(\s+)/g, ' ');
            if(!(instructors.indexOf(instructor) !== -1)){      
                instructors.push(instructor)
                // console.log(instructor)
            }
        })
        

        // const data = await Promise.all(
        //     instructors.data.map(getProfessorRatings)
        // )
        // console.log(data)
        let sendData = []
        instructors.forEach((name) => {
         
            getProfessorRatings(name).then((res) => {
                console.log("Grabbed prof")
                sendData.push(res)
                // console.log(sendData)
            })
        })
        // console.log(data)
    }
})

});

async function getProfessorRatings(name) {
    // console.log("test")
    // name.forEach((name) => {
    
    const teachers = await ratings.searchTeacher(name, "");
    const teacherIDs = teachers.map(teacher => teacher.id)
    // console.log(teacherIDs)
    const info = await ratings.getTeacher(teacherIDs[0])
    const profObj = {
            firstName: info.firstName,
            lastName: info.lastName,
            avgRating: info.avgRating,
            wouldTakeAgainPercent: info.wouldTakeAgainPercent
        }
    console.log(profObj)
    return profObj   
    // })    
}
// getProfessorRatings("Marianne Morris")

app.listen('3001');
console.log('API is running on http://localhost:3001');
module.exports = app;