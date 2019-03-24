const express = require('express');
const koalaRouter = express.Router();
const pool = require('./pool.js');

// DB CONNECTION


// GET

koalaRouter.get('/', (req, res) => {
    // Get the koalas from the database
    pool.query('SELECT * FROM "koalas" ORDER BY "name";')
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error getting all koalas`, error);
            res.sendStatus(500);
        })
})

// POST
// Add a koala to the database
// Expects a koala object on the request body with
// properties for "name", "gender", "age", "transfer", "notes"
koalaRouter.post('/', (req, res) => {
    let koala = req.body;
    console.log('Adding koala', koala);

    let sqlText = `INSERT INTO "koalas" ("name", "gender", "age", "transfer", "notes") 
    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(sqlText, [koala.name, koala.gender, koala.age, koala.transfer, koala.notes])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Failed to insert new koala', koala);
            console.log(error);
            res.sendStatus(500);
        })
})


// PUT
// this will update koala based on id
koalaRouter.put('/:id', (req, res) => {
    let koalaId = req.params.id;
    let koalaData = req.body;
    console.log(`Updating koala id=${koalaId} with data`, koalaData);
    let sqlText = `UPDATE "koalas" SET "name"=$1 WHERE "id"=$2;`
    pool.query(sqlText, [koalaData.name, koalaId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Failed to update koalas with id=${koalaId}, 
          setting name to ${koalaData.name}.`, error);
            res.sendStatus(500);
        })
})

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(`Deleting koala with id=${id}`);
    let sqlText = `DELETE FROM "koalas" WHERE "id"=$1`;
    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Failed to delete koala with id=${id}`, error);
            res.sendStatus(500);
        })
})

module.exports = koalaRouter;