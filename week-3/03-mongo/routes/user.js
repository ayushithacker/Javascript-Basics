const { Router } = require("express");
const {User, Course} = require("../db")
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async(req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await User.create({
        username,
        password
    })
    res.json({
        msg : "User created..!"
    })
    // Implement user signup logic
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
const response = await Course.find({})
res.json({courses: response})

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    const username = req.headers.username;
    const courseId = req.params.courseId;

    await User.updateOne({
        username: username
    },
    {
        "$push": {
            purchasedCourse: courseId
        }
    });

    res.json({
        msg: "Purchase Complete..!!"
    });
});


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

const user = await User.findOne({
    username : req.headers.username
})


const courses = await Course.find({
    _id :
    {
        "$in" : user.purchasedCourse
        
    }
    
})
res.json({
    courses : courses
    
})



});

module.exports = router