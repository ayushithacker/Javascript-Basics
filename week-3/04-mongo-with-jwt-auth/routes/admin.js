const { Router } = require("express");
const jwt  = require ("jsonwebtoken")
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin , Course} = require('../db')
const {JWT_SECRET } = require('../config')


// Admin Routes
router.post('/signup', async (req, res) => {

await Admin.create({
    username : req.body.username,
    password : req.body.password
})

res.json({
    msg: "Admin created..!!"
})

});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    const user = Admin.find({
        username,
        password
    })

    if(user){
        const token = jwt.sign({username}, JWT_SECRET)
        res.json({
            token
        })
    }
    else{
        res.json({
            msg : " Incorrect email & password"
        })
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const newCourse = await Course.create({
        title : req.body.title,
        descriptio : req.body.description,
        price: req.body.price,
        image: req.body.image

    })
    res.json({
        msg:"course created.!",
        courseID : newCourse._id
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic

    const response = await Course.find({})
    res.json({
        course : response
    })

});

module.exports = router;