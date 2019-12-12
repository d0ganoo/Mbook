const express = require('express');
const app = express();
const morgan = require('morgan');
const {success, error} = require('./src/tools');
const bodyParser = require('body-parser');

// morgan : outils de debug pour chaque resquest http
app.use(morgan('dev'));

// middleware pour utiliser le body en post
app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({extended:true})); // encodage du body

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
    res.json('Root API');
});

app.get('/api/v1', (req, res) =>{
    console.log("V1");
    res.json('API version 1');
});

app.get('/api/v1/cards/:id', (req, res) =>{
    res.json(success(req.params));
});

app.get('/api/v1/members/:id', (req, res) =>{
    let index = getIndex(req.params.id);

    if (typeof(index) == 'string'){
        res.json(error(index))
    }else{
        res.json(success(members[index]));
    }
});

app.get('/api/v1/members', (req, res) =>{
    if (req.query.max != undefined && req.query.max > 0){
        res.json(success(members.slice(0,req.query.max)));
    }
    else if(req.query.max != undefined){
        res.json(error("Wrong max value"));
    }
    else{
        res.json(success(members));
    }
});

app.post('/api/v1/members', (req, res) => {
    if (req.body.name){
        let sameName = false;

        members.forEach(member => {
            if (member.name == req.body.name){
                sameName = true;
            }
        })

        if (sameName){
            res.json(error("name already taken"));
        }else{
            let member = {
                id: members.length + 1,
                name: req.body.name
            };
    
            members.push(member);
            res.json(success(member));
        }        
    }else{
        res.json(error('no name value'));
    }
});

app.listen(8080, () => console.log("Started on port 8080"));

const getIndex = id => {
    for (let i = 0; i < members.length; i++){
        if (members[i].id == id)
            return i;
    }
    return 'Wrong id';
}