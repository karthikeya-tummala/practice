const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then('Connected to MongoDB')
.catch(err => console.log("Error:", err));

mongoose.connection.on('connected', () => {
   console.log(`Connected to database ${mongoose.connection.name}`);
});

const courseSchema = {
    name: String,
    tags: [String],
    author: String,
    date: Date,
    price: Number,
    isPublished: Boolean
};

const Course = new mongoose.model('course', courseSchema);

async function getCourses() {
    return Course
        .find({isPublished: true})
        .or([
            {price: {$gte: 15}},
            {name: /.*by.*/i}
        ]);
}

async function run(){
    const result = await getCourses();
    console.log(result);
    await mongoose.disconnect();
}

run();