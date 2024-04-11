//validation

const zod = require('zod')

const createCard = zod.object({
     name : zod.string(),
     description : zod.string(),
     interest : zod.string(),
     linkedin : zod.string(),
     twitter : zod.string()

})

const updateCard = zod.object({
     _id: zod.string()
})

const deleteCard = zod.object({
     _id: zod.string()
})


module.exports = { createCard, updateCard,deleteCard}