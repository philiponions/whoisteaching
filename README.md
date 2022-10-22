# Who is Teaching?

This is a website that allows you to view all the professors who are currently teaching a given course this year at the University of Alberta.

## How it works

Given a valid course, the program obtains all instructors that are teaching that course for the current school year. It will then find all those instructors in Rate My Professor and get their ratings.

## Tech Stack

The front-end is built in React JS with the Material UI library. The back-end is built with Node JS and Express and consists of a web-scraper using Cheerio that gets data from the ualberta catalogue
along with a Rate My Professor API npm library that acts as a wrapper for the website's GraphQL API

Rate my prof API: https://www.npmjs.com/package/@mtucourses/rate-my-professors

<img width="1275" alt="Screen Shot 2022-10-22 at 2 14 38 PM" src="https://user-images.githubusercontent.com/78581216/197360724-f7391845-a5c9-4fc1-908f-7b9ab2d66465.png">


## Notes
The application is accurate 99% of the time. I haven't delve deep in into special cases that much. One case I've found is that a professor can have multiple profiles in rate my prof despite being in the same school which will provide an inaccurate data. I'm still working on solving this issue.
