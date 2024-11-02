const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'}
]

app.get('/', (req, res) => {
    res.send('Go to /api/courses');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given id is not found!!!');
    res.send(course);
});

app.post('/api/courses/', (req, res) => {
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

app.put('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('Course with given id is not found!!!');

   const { error } = validateSchema(req.body);
   if(error) return res.status(400).send('Name can 3 to 20 characters')

   course.name = req.body.name;
   res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!!!`));
