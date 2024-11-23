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
        isPublished: true,
    });

    const result = await course.save()
    console.log(result);
}

async function getCourses(){
    const courses = await Course
        .findOneAndUpdate(
            {name: /.*Java.*/i},
            {$set: {tags: ['Mobile Development', 'Backend Development']}},
            {new: true}
        );
        // .find({author: 'Karthik', isPublished: true})
        // .limit(10)
        // .sort({name: 1})
        // .countDocuments();
    console.log(courses);
}

// createCourse();
console.log('EOP');
getCourses();