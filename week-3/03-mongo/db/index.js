const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ayushi:Raavi%403012@cluster0.mhvy5jc.mongodb.net/course_Selling_app');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String

});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String,
    purchasedCourse : [{
        type: mongoose.Schema.Types.ObjectId,

        ref : 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title  : String,
    description : String,
    price : Number,
    image : String

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}