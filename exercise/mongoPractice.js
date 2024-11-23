const mongoose = require('mongoose');
const {mongo} = require("mongoose");
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log('Error:', err));

mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${mongoose.connection.name}`);
});

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean,
    tags: [String],
    date: Date,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
    return await Course
        .find({isPublished: true, tags:'backend'})
        .sort('name')
        // .select({name: 1, author: 1}) or
        .select('name author');
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();