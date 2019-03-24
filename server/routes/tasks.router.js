const express = require('express');
const tasksRouter = express.Router();
const pool = require('./pool.js');

// DB CONNECTION


// GET

tasksRouter.get('/', (req, res) => {
    // Get the tasks from the database
    pool.query('SELECT * FROM "tasks" ORDER BY "name";')
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error getting all tasks`, error);
            res.sendStatus(500);
        })
})

// POST
// Add a task to the database
// Expects a task object on the request body with
// properties for "name", "gender", "age", "transfer", "notes"
tasksRouter.post('/', (req, res) => {
    let task = req.body;
    console.log('Adding task', task);

    let sqlText = `INSERT INTO "tasks" ("name", "gender", "age", "transfer", "notes") 
    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(sqlText, [task.name, task.gender, task.age, task.transfer, task.notes])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Failed to insert new task', task);
            console.log(error);
            res.sendStatus(500);
        })
})


// PUT
// this will update task based on id
tasksRouter.put('/:id', (req, res) => {
    let taskId = req.params.id;
    let taskData = req.body;
    console.log(`Updating task id=${taskId} with data`, taskData);
    let sqlText = `UPDATE "tasks" SET "name"=$1 WHERE "id"=$2;`
    pool.query(sqlText, [taskData.name, taskId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Failed to update tasks with id=${taskId}, 
          setting name to ${taskData.name}.`, error);
            res.sendStatus(500);
        })
})

// DELETE
tasksRouter.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(`Deleting task with id=${id}`);
    let sqlText = `DELETE FROM "tasks" WHERE "id"=$1`;
    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Failed to delete task with id=${id}`, error);
            res.sendStatus(500);
        })
})

module.exports = tasksRouter;