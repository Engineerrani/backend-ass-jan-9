const express = require('express');
const router = express.Router();

let data = [
    {id: 1, title: 'Create a project', order: 1, completed: true, createdOn: new Date() },
    {id: 2, title: 'Take a coffee', order: 2, completed: true, createdOn: new Date() },
    {id: 3, title: 'Write new article', order: 3, completed: true, createdOn: new Date() },
    {id: 4, title: 'Walk towards home', order: 4, completed: false, createdOn: new Date() },
    {id: 5, title: 'Have some dinner', order: 5, completed: false, createdOn: new Date() },
]

//Read(data array)
router.get('/', function (req, res){
    res.status(200).json(data);
});

//Read(returns an object from a data array find by id)
router.get('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    //if object found return an object else return 404 not-found
    if( found) {
        res.status(200).json(found);
    }else{
        res.sendStatus(404);
    }
});

//Create
router.post('/', function(req, res) {
    let itemIds = data.map(item => item.id);
    let orderNums = data.map(item => item.order);
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

    let newItem = {
        id: newId, 
        title: req.body.title, 
        order: newOrderNum, 
        completed: false, 
        createdOn: new Date()
    };

    data.push(newItem);
    res.status(201).json(newItem);
});

//Update
router.put('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    //check if item found
    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title, 
            order: req.body.order, 
            completed: req.body.completed 
        };


        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1, updated);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// Delete
router.delete('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
         let targetIndex = data.indexOf(found);
         data.splice(targetIndex, 1);
    }
      res.sendStatus(204);
});


module.exports = router;


//localhost:3000
//localhost:3000/items
//localhost:3000/items/1