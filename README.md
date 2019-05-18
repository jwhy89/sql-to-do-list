# Jay's To-Do-List

This was one of my first full stack web applications that I was able to get online and onto the Internet. I used jQuery to manage my app and Bootstrap to style it. It was an amazing feeling to get something like this up and running.

## Built With

- JavaScript
- Node
- Express
- Bootstrap
- HTML
- CSS
- jQuery
- Ajax
- PostgreSQL

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required before you attempt to start the app (e.g. node, mongo).

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Heroku](https://devcenter.heroku.com/articles/heroku-cli)

### Create Database and Table

Create a new database called `weekend-to-do-app` and run the SQL query from the database.sql file. 

### Installing

Steps to get the development environment running.

1. Download this project.
2. Start postgres if not running already by using `brew services start postgresql`
3. `npm install`
4. `npm start`
5. Navigate to `localhost:5000` on your preferred web browser.

### Completed Features

- [x] Add a task to the database.
- [x] Delete a task.
- [x] Mark a task as complete.
- [x] Set up app to scale with different screen sizes.

### Next Steps

- [ ] Convert to a React application.

## Deployment

1. In terminal, navigate to your project folder and type heroku create.
2. Login in if prompted.
3. Type `git remote -v` to ensure it was added successfully.
4. In terminal, type `git push heroku master`.
6. Make sure you have already set up the designated local database and have postgres running.
7. In terminal, type `heroku addons:create heroku-postgresql:hobby-dev` to set up Postgresql on your Heroku project.
8. Next, type `heroku pg:push your_database DATABASE_URL` to copy your database contents up to Heroku. **your_database** is the actual name of your database (e.g. weekend-to-do-app). DATABASE_URL is a heroku config variable created by the Add On. Do not replace it with something else, just type: DATABASE_URL. For example, if you were deploying the **weekend-to-do-app** database, you should type `heroku pg:push weekend-to-do-app DATABASE_URL`.

## Authors

* Jarvis Yang
