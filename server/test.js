const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const ratings = require('@mtucourses/rate-my-professors').default;
const { v4: uuidv4 } = require('uuid');

const app = express();

// app.get('/get/:course/:number', function(req, res){
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     let course = req.params.course
//     let number = req.params.number
//     let url = 'https://apps.ualberta.ca/catalogue/course/' + course + "/" + number;
//     let instructors = []
//     request(url, async function(error, response, html) {
//         if (!error) {
            
            
//         var $ = cheerio.load(html)
//         var heading = $('.table-card-content')        
//         const output = heading
//         .children('div')
//         .children('a')
        
//         data = []
//         output.each((_, e) => {
//             let instructor  = $(e).text().replace(/(\s+)/g, ' ');
//             if(!(instructors.indexOf(instructor) !== -1)){      
//                 instructors.push(instructor)
//             }
//         })

//         const sendData = await Promise.all (instructors.map(async (name) => {        
//             return getProfessorRatings(name)
//         }))

//         res.send(sendData)
//     }
// })

// });

// async function getProfessorRatings(name) {

//     const teachers = await ratings.searchTeacher(name, "U2Nob29sLTE0MDc=");

//     if (!teachers[0]) {
//         const profName = name.split(" ")
//         const profObj = {
//             id: uuidv4(),
//             firstName: profName[0],
//             lastName: profName[1],
//             avgRating: null,
//             wouldTakeAgainPercent: null,
//             avgDifficulty: null
//         }    
//         return profObj   
//     }
    
//     const teacherIDs = teachers.map(teacher => teacher.id)
//     const info = await ratings.getTeacher(teacherIDs[0])

//     const profObj = {
//             id: uuidv4(),
//             firstName: info.firstName,
//             lastName: info.lastName,
//             avgRating: info.avgRating,
//             wouldTakeAgainPercent: info.wouldTakeAgainPercent.toFixed(1),
//             avgDifficulty: info.avgDifficulty
//         }
    
//     return profObj   

// }

// let course = req.params.course
//     let number = req.params.number
    let url = 'https://apps.ualberta.ca/catalogue/course/cmput/174';
    let result = []
    request(url, async function(error, response, html) {
        if (!error) {
            
            
        var $ = cheerio.load(html)
        var heading = $('.card')                
        heading.each((_, e) => {
            let instructors = []   
            // I don't know how to use cheerio this is probably bad i'm SORRY
            const semester = $(e).children("h2").text().replace(/(\s+)/g, ' ')            
            // console.log(semesterOutput)
            const instructorOutput =  $(e).children(".card-body")
                            .children("table.table.table-striped.table-card")
                            .children("tbody.table-group-divider")
                            .children("tr")
                            .children("td")
                            .children(".table-card-content")
                            .children("div")
                            .children("a")
            
            instructorOutput.each((_, e) => {
                let instructor  = $(e).text().replace(/(\s+)/g, ' ');
                if(!(instructors.indexOf(instructor) !== -1)){      
                    instructors.push(instructor)
                }
            })
            // console.log(instructors)
            data = {
                semester: semester,
                instructors: instructors
            }
            result.push(data)            
        })
        console.log(result)

        // .children('h2')

        // console.log(output.text())
        
        // let semesters = []
        // output.each((_, e) => {
        //     let semester  = $(e).text().replace(/(\s+)/g, ' ');
        //     if(!(semesters.indexOf(semester) !== -1)){      
        //         semesters.push(semester)
        //     }
        // })
        // console.log(semesters)

        // const sendData = await Promise.all (instructors.map(async (name) => {        
        //     return getProfessorRatings(name)
        // }))
    }})
    


    