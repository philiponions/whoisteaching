### Jan. 2023 UPDATE
The backend currently is down at the moment and that's because Heroku has altered their pricing on dynos. They are no longer free which requires me to deploy the web server somewhere else.

# Who is Teaching?

This is a website that allows you to view all the professors who are currently teaching a given course this year at the University of Alberta.

Link: https://who-is-teaching.netlify.app/
## How it works

Given a valid course, the program obtains all instructors that are teaching that course for the school year by grabbing their names in the University of Alberta catalogue. It will then find all those instructors in Rate My Professor and get their ratings.

## Tech Stack

The front-end is built in React JS with the Material UI library. The back-end is built with Node JS and Express and consists of a web-scraper using Cheerio that gets data from the ualberta catalogue
along with a Rate My Professor API npm library that acts as a wrapper for the website's GraphQL API. Client is deployed in Netlify and the server is deployed in Heroku.
Rate my prof API: https://www.npmjs.com/package/@mtucourses/rate-my-professors

<img width="1213" alt="Screen Shot 2022-10-23 at 3 03 21 PM" src="https://user-images.githubusercontent.com/78581216/197418213-2bf5809c-9ecd-41d0-af5b-8a40a174b8fd.png">


## Notes
The application is accurate 99% of the time. I haven't delve deep in into special cases that much. One case I've found is that a professor can have multiple profiles in rate my prof despite being in the same school which will provide an inaccurate data. I'm still working on solving this issue.
