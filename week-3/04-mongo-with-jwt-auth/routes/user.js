const { Router } = require("express");
const jwt  = require('jsonwebtoken')
const router = Router();
const {JWT_SECRET } = require('../config')
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    console.log(req.body);
    await User.create({
        username : req.body.username,
        password : req.body.password
    })
    res.json ({
        msg : "User created..!!"
    })

    // Implement user signup logic
});

router.post('/signin', async (req, res) => {

    const username = req.body.username
    const password = req.body.password

   const user = await User.findOne({
        username,password
    })
    if(user){
        const token = jwt.sign({username},JWT_SECRET)
    console.log(username);
    console.log(JWT_SECRET)
        console.log(token)

    res.json({
        token
    })
    }
    else{
        res.json({
            msg:"you have incorrect email or password"
        })
    }
    // Implement admin signup logic
});

router.get('/courses', async(req, res) => {
    const courses = await Course.find({})
    res.json({
        courses : courses
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {

    const username = req.username
    const courseId = req.params.courseId
console.log(username)
    await User.updateOne({username},
    {
        "$push":{
            purchasedCourse : courseId
        }
    })
    res.json({
        msg : "Purchase Complete..!"
    })
 

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
   // Implement fetching purchased courses logic

   const user = await User.findOne({
    username : req.username
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