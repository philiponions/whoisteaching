// const ratings = require('@mtucourses/rate-my-professors').default;

// (async () => {

// const teachers = await ratings.searchTeacher("Marianne Morris", "");

// console.log(teachers);

// })();

const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const ratings = require('@mtucourses/rate-my-professors').default;

let url = 'https://apps.ualberta.ca/catalogue/course/cmput/101';
    request(url, function(error, response, html) {
    if (!error) {
        
        var $ = cheerio.load(html)
        var heading = $('.table-card-content')
        // console.log(heading.text())
        let instructors = []
        const output = heading
                .children('div')
                .children('a')
        output.each((_, e) => {
            let instructor  = $(e).text().replace(/(\s+)/g, ' ');
            if(!(instructors.indexOf(instructor) !== -1)){      
                // instructors.push(instructor)

                // Check if instructor is already in the list
                (async () => {

                    const teachers = await ratings.searchTeacher(instructor, "");
                    const teacherIDs = teachers.map(teacher => teacher.id)
                    // console.log(teacherIDs)
                    const info = await ratings.getTeacher(teacherIDs[0])
                    instructors.push({
                        firstName: info.firstName,
                        lastName: info.lastName,
                        avgRating: info.avgRating,
                        wouldTakeAgainPercent: info.wouldTakeAgainPercent
                    })
                    console.log(instructors)
                    })();
                
            }
        })
        
            //console.log(instructors)
    }
})