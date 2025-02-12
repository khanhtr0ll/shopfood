const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    itemName:{
        type: String,

    },
    Money:{
        type:Number,
    },
    Time:{
        type:Number,
    },
    Type:{
        type: String,
    },
    addressbuyer:{
        type: String,
    },
    addressseller:{
        type: String,
    },
    idItem:{
        type: Number,
    },
    statusItem:{
        type: Number,
    },
},
{timestamps:true}
)
module.exports = mongoose.model("Item",itemSchema)