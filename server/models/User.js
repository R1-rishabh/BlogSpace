const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
    username :{
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password: {
        type : String,
        required : true
    
    },
    bio: {
        type:String,
        default:"",
        trim:true
    }
    },{timestamps : true}

    
);
userSchema.pre("save" , async function(){
    if(!this.isModified("password")){
        return ;
    }
    this.password = await bcrypt.hash(this.password , 10);   
});
const User = mongoose.model("User",userSchema);
module.exports = User;