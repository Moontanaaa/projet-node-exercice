import mongoose, {Schema} from 'mongoose'



const UserSchema = new Schema({
    first_name : String,
    last_name : String,
    email : {
        unique : true,
        required : true,
        type : String
    },
    password : {
        required : true,
        type : String
    }
})

export default mongoose.model('Users', UserSchema)
