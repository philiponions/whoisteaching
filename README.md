# Who is Teaching?

This is a website that allows you to view all the professors who are currently teaching a given course this year at the University of Alberta.

## Tech Stack

The front-end is built in React JS with the Material UI library. The back-end is built with Node JS and Express and consists of a web-scraper using Cheerio that gets data from the ualberta catalogue
along with a Rate My Professor API npm library that acts as a wrapper for the website's GraphQL API

Rate my prof API: https://www.npmjs.com/package/@mtucourses/rate-my-professors

<img width="1249" alt="Screen Shot 2022-10-22 at 1 03 40 PM" src="https://user-images.githubusercontent.com/78581216/197358188-54f3d867-906b-4982-bc5b-5d03fd206a77.png">

## Notes
The application is accurate 99% of the time. I haven't delve deep in into special cases that much. One case I've found is that a professor can have multiple profiles in rate my prof despite being in the same school which will provide an inaccurate data. I'm still working on solving this issue.
