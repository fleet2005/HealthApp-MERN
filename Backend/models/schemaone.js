const mongoose = require("mongoose");

const schemaone = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter Name"],
        },

        email:{
            type: String,
            required: [true, "Please enter Email"],
        },

        password:{
            type: String,
            required: [true, "Please enter Password"],
        },

    
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("signupmodel",schemaone);