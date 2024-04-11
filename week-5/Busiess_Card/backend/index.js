const express = require('express')
const cors = require('cors')
const { createCard, updateCard,deleteCard } = require('./types');
const card = require('./db');

const app = express();
app.use(cors())
app.use(express.json())

app.post('/createCards',  async function(req,res){

    const createPayLoad = req.body
    const parsePayLoad = createCard.safeParse(createPayLoad)
   
    if(!parsePayLoad.success){
        res.status(411).json({
            msg: "You sent wrog inputs"
        })
    }
    await card.create({
        name: createPayLoad.name,
        description: createPayLoad.description,
        interest: createPayLoad.interest,
        linkedin: createPayLoad.linkedin,
        twitter: createPayLoad.twitter,

    })
    res.json({
        msg : "Card createCard..!!"
    })

})

app.get('/cards', async function (req,res){

    const cards = await card.find({})
    res.json({
        cards
    })

})
app.get('/cards/:cardId', async function (req,res){

    const cardId = req.params.cardId
    const cards = await card.find({
        _id:cardId
    })
    res.json({
        cards
    })

})

app.put('/updateCard/:cardId', async function (req,res){

    const cardId = req.params.cardId;

    const updatePayLoad = req.body
    const parsePayLoad = updateCard.safeParse({_id: cardId})
    console.log(parsePayLoad)

    if(!parsePayLoad.success){
        res.status(411).json({
            msg : "You sent Wrong inputs"
        })
    }
   

    await card.updateOne({
        _id : cardId
    },{
        name : updatePayLoad.name,
        description : updatePayLoad.description,
        interest : updatePayLoad.interest,
        linkedin : updatePayLoad.linkedin,
        twitter: updatePayLoad.twitter
    })
  
    res.json({
        msg : "Card is Updated..!!"
    })
   
})

app.delete('/deleteCard/:cardId',async function (req,res){

    const cardId =req.params.cardId;
    const parsePayLoad = deleteCard.safeParse({_id :cardId})

    // console.log(cardId)

    if(!parsePayLoad.success)
    {
        res.status(411).json({
            msg:"You sent wrong inputs"
        })
    }

    await card.deleteOne({
        _id : cardId
    })
    res.json({
        msg:"Card deleted..!!"
    })

    
})

app.listen(3000)