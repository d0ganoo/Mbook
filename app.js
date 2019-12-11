const express = require('express');
const app = express();
const morgan = require('morgan')

// morgan : outils de debug pour chaque resquest http
app.use(morgan('dev'));

const members = [
    {
        id: 1,
        name: 'John'
    },
    {
        id: 2,
        name: 'Julie'
    },
    {
        id: 3,
        name: 'Jean-pierre'
    }
];

app.get('/api', (req, res) =>{
    console.log("test");
    res.send('Root API');
});

app.get('/api/v1', (req, res) =>{
    console.log("V1");
    res.send('API version 1');
});

app.get('/api/v1/cards/:id', (req, res) =>{
    res.send(req.params);
});

app.get('/api/v1/members/:id', (req, res) =>{
    res.send(members[(req.params.id) - 1].name);
});

app.get('/api/v1/members', (req, res) =>{
    if (req.query.max != undefined && req.query.max > 0){
        res.send(members.slice(0,req.query.max));
    }else{
        res.send(members);
    }
});

app.listen(8080, () => console.log("Started on port 8080"));