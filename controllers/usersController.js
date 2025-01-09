import Users from '../models/Users.js'



 export const getAllUsers = async (req, res) => {
    try{
        const users = await Users.find()
        if(users.length < 1){
            return res.status(400).json({message : 'Users not found'})
        }   
        return res.status(200).json(users)
    }
    catch(err){
        return res.status(500).json({message : 'Internal server error'})
    }
}


export const getUserByID = async (req, res) => {
    const {id} = req.params
    try{
        const userByID = await Users.findById(id)
        return res.status(200).json(userByID)
    }
    catch(err){
        return res.status(500).json({message : 'Internal server error'})
    }

}

export const createUser = async (req, res) => {
    const {first_name, last_name, passion} = req.body
    try{
        if(!first_name || !last_name || !passion){
            return res.json({message : 'All fileds are required'})
        }
        const newUser = await Users.create(req.body)
        return res.status(201).json(newUser)
    }   
    catch(err){
        return res.status(500).json({message : 'Internal server error'})
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params
    try{
        const deletedUser = await Users.findByIdAndDelete(id)
        if(deletedUser){
            return res.status(203).json({message : 'User has been deleted'})
        }
        return res.json({message : 'User not found'})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : 'Internal server error'})
    }
}

