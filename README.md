# Tech-Blog
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This is my take on a Tech Blog site, using the node packages sequelize, express-session, and handlebars to allow users to post, view or comment on others' posts, edit their own posts, and delete them if desired. 

When I get back to this project I'd like to add the ability to edit comments, delete your own comments, and paginate the big feeds if there's too many posts. Also, creating a basic algorithm for which posts should be displayed first would be interesting. Right now it's in chronological order, but mixing in how often that user posts and how many comments are on the post could result in a better user experience, displaying topics that are being commented on more recently first.

Another possible future addition would be the ability to reply to another comment, similar to reddit.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Installation:

In order to run this locally, you'll need to clone the repo, install the packages using 'npm i', use the .env.EXAMPLE file provided to input your credentials, and rename it to .env.

Download and install MySQL, log into your mySQL shell, and source the db/schema.sql file; this will create your db.

Quit out of your MySQL shell, and from the node CLI run these scripts:
```
npm run seed
```
This will seed your database with sample data if desired.
Then run this from the node CLI:
```
npm start
```

This will start your server. Using your browser, visit http://localhost:3001 to get started!

## Usage

Link to the deployed app: https://random-techposting.herokuapp.com/

When the application is deployed, the user will be able to create an account, log in, view posts and create posts of their own, and comment on others' posts.

Screenshots of the app during function:
![Screenshot](images/ScreenshotHome.jpg?raw=true "Screenshot")
![Screenshot](images/ScreenshotDashboard.jpg?raw=true "Screenshot")

## Credits

The following node packages were used to create this app:

bcrypt - https://www.npmjs.com/package/bcrypt

connect-session-sequelize - https://www.npmjs.com/package/connect-session-sequelize

dotenv - https://www.npmjs.com/package/dotenv

express - https://expressjs.com/

express-handlebars - https://www.npmjs.com/package/express-handlebars

express-session - https://www.npmjs.com/package/express-session

sequelize - https://sequelize.org/
    
mysql2 - https://www.npmjs.com/package/mysql2

Bootstrap 5 was used to style its pages - https://getbootstrap.com/

As always, I have to thank Trey Eckels and the instructional team at the Georgia Tech full stack boot camp program
for teaching me the skills to design an app like this.

## License
      
Copyright 2022 Adam Brock
      
This software is licensed using the MIT license: https://opensource.org/licenses/MIT.

## Questions

Feel free to reach out to me with questions at a.paulbrock@gmail.com.

My GitHub profile is at https://github.com/abrock3.