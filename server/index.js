const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const ratings = require('@mtucourses/rate-my-professors').default;
const { v4: uuidv4 } = require('uuid');

const app = express();

app.get('/get/:course/:number', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    let course = req.params.course
    let number = req.params.number
    let url = 'https://apps.ualberta.ca/catalogue/course/' + course + "/" + number;
    request(url, async function(error, response, html) {
        if (!error) {

            let result = []
            var $ = cheerio.load(html)
            var heading = $('.card')         
            
            // Card element represents the container for the semester
            heading.each(async (_, e) => {
                let instructors = []  
                
                // I don't know how to use cheerio this is probably bad i'm SORRY
                const semester = $(e).children("h2").text().replace(/(\s+)/g, ' ')            
                // console.log(semester)
                
                // This should return every instructor for the semester
                const instructorOutput =  $(e).children(".card-body")
                                .children("table.table.table-striped.table-card")
                                .children("tbody.table-group-divider")
                                .children("tr")
                                .children("td")
                                .children(".table-card-content")
                                .children("div")
                                .children("a")
                
                // Iterate through instructor list                                
                instructorOutput.each((_, e) => {
                    let instructor  = $(e).text().replace(/(\s+)/g, ' ');
                    
                    // Check if have that instructor in the list yet
                    if(!(instructors.indexOf(instructor) !== -1)){      
                        instructors.push(instructor)
                    }
                });

                // Get the proferssor via rate-my-prof api
                const instructorInfo = await Promise.all (instructors.map(async (name) => {        
                    return getProfessorRatings(name)}))            
                data = {
                    semester: semester,
                    instructors: instructorInfo
                }
                result.push(data)  
                console.log(result)

                // I'm not sure how to res send after the loop is done so I did this instead
                // This banks on the fact that we have at most two semester per page
                // This is really dumb. So refactor this code when you can.
                // I don't know why it starts with winter instead of fall so i'm just gonna reverse it
                if (result.length >= heading.length) res.send(result.reverse())
            })
            
        }})
})

/*
* Grabs the professor's information on rate-my-prof using an npm package.
*/
async function getProfessorRatings(name) {
    const teachers = await ratings.searchTeacher(name, "U2Nob29sLTE0MDc=");

    // if the teacher is null in rate my prof just give it null values as place holder.
    if (!teachers[0]) {
        const profName = name.split(" ")
        const profObj = {
            id: uuidv4(),
            firstName: profName[0],
            lastName: profName[1],
            avgRating: null,
            wouldTakeAgainPercent: null,
            avgDifficulty: null
        }    
        return profObj   
    }
    
    const teacherIDs = teachers.map(teacher => teacher.id)
    const info = await ratings.getTeacher(teacherIDs[0])

    const profObj = {
            id: uuidv4(),
            firstName: info.firstName,
            lastName: info.lastName,
            avgRating: info.avgRating,
            wouldTakeAgainPercent: info.wouldTakeAgainPercent.toFixed(1),
            avgDifficulty: info.avgDifficulty
        }

    return profObj   

}

app.listen('3002');
console.log('API is running on http://localhost:3002');
module.exports = app;