const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const ratings = require('@mtucourses/rate-my-professors').default;
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

const app = express();

app.get('/get/:course/:number', function(req, res){
    const allowedOrigins = ["https://who-is-teaching.netlify.app"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
   }
    let course = req.params.course
    let number = req.params.number
    let url = 'https://apps.ualberta.ca/catalogue/course/' + course + "/" + number;
    request(url, async function(error, response, html) {
        if (error) {
            res.send({error: error})
        }
        else {
            let result = []
            var $ = cheerio.load(html)
            var heading = $('.card')              
            if (!heading.html()) {
                res.send({error: "not found"})
            }
            
            // Card element represents the container for the semester
            heading.each(async (_, e) => {
                let instructors = []  
                
                // I don't know how to use cheerio this is probably bad i'm SORRY
                const output = $(e).children("h2")
                const id = output.attr().id               
                const semester = output.text().replace(/(\s+)/g, ' ')            
                
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
                    semester: {name: 
                        semester,
                        id: id
                    },
                    instructors: instructorInfo
                }
                result.push(data)                  

                // I'm not sure how to res send after the loop is done so I did this instead
                // This banks on the fact that we have at most two semester per page
                // This is really dumb. So refactor this code when you can.
                // I don't know why it starts with winter instead of fall so i'm just gonna reverse it
                if (result.length >= heading.length){                    
                    res.send(result.sort(compare))   
                }
            })            
        }
    })
})

/*
* Compares the id of semesters
*/
function compare(a,b) {
    if (a.semester.id < b.semester.id)
       return -1;
    if (a.semester.id > b.semester.id)
      return 1;
    return 0;
  }

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
            numRatings: 0,
            link: null,
            avgDifficulty: null
        }    
        return profObj   
    }
    
    const teacherIDs = teachers.map(teacher => teacher.id)
    
    let index = 0

    // Special case where the teacher has two profiles in Rate mr prof.
    // Get the best rating out of all of them.
    if (teacherIDs.length > 1) {        
        let bestRating = teacherIDs[0].avgRating
        let i = 0
        teacherIDs.forEach(async(e) => {            
            const info = await ratings.getTeacher(e)
            if (info.avgRating > bestRating) {                
                bestRating = info.avgRating
                index = i
            }
            i++;
        })
    }    

    const info = await ratings.getTeacher(teacherIDs[index])

    const profObj = {
            id: uuidv4(),
            firstName: info.firstName,
            lastName: info.lastName,
            avgRating: info.avgRating,
            wouldTakeAgainPercent: info.wouldTakeAgainPercent.toFixed(1),
            numRatings: info.numRatings,
            link: "https://www.ratemyprofessors.com/professor?tid=" + info.legacyId, 
            avgDifficulty: info.avgDifficulty
        }

    return profObj   

}

app.listen(process.env.PORT || 3001, () => {
    console.log("Connected.")
});
module.exports = app;