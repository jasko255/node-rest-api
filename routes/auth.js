
import express from 'express'
import UserModel from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {

    const newUser = new UserModel({
        username: req.body.username,
        email:req.body.email,
        password:req.body.password
    })

    try {
        const user = await newUser.save()
        
        res.status(200).send(user).json(user)
    } catch (error) {
        console.log(error);
    }
})

export default router