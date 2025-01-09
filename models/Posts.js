import mongoose, {Schema} from 'mongoose'


const PostSchema = new Schema({
    title:  {type : String, required : true}, // String is shorthand for {type: String}
    body:   String,
    date: { type: Date, default: Date.now },
    userId : {
        type : Schema.Types.ObjectId, ref : 'User' // create the association with the other collection through the userId
    }
   
})

export default mongoose.model('Post', PostSchema)