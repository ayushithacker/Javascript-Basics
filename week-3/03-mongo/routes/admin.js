const { Router } = require("express");
const  { Admin } = require("../db")
const {Course } = require("../db")
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    Admin.create({
        username : req.body.username,
        password : req.body.password
    })
    .then(function(value)
    {
        res.json({
            msg: "Admin created..!"
        })
    })
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const  title =  req.body.title;
    const description = req.body.description;
    const   price = req.body.price;
    const  image = req.body.image;

   const newCourse = await Course.create({
        title,
        description,
        price,
        image
    })

    
        res.json({
            msg:"Course Created.!!",
            courseId: newCourse._id
        })

   
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic

    const response = await Course.find({})

    res.json({
        course: response
    })
});

module.exports = router;