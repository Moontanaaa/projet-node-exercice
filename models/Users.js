import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    first_name : String,
    last_name : String,
    passion : {
        type : string,
    }
})

export default mongoose.model('users' , UserSchema)