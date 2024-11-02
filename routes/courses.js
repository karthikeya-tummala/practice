const express = require('express');
const Joi = require("joi");
const router = express.Router();

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'}
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given id is not found!!!');
    res.send(course);
});

router.post('/', (req, res) => {
    const { error } = validateSchema(req.body);

    if(error) {
        console.log(error);
        return res.status(400).send('Name can have 3 to 20 characters');
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given id is not found!!!');

    const { error } = validateSchema(req.body);
    if(error) return res.status(400).send('Name can 3 to 20 characters')

    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given id is not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateSchema(course){
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
    })

    return schema.validate(course);
}

module.exports = router;