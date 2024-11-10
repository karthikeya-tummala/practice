const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/delete')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB....:', err));

mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${mongoose.connection.name}`);
});


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'C Course',
        author: 'Karthik',
        tags: ['General Programming'],
        isPublished: true
    });

    const result = await course.save()
    console.log(result);
}

createCourse();