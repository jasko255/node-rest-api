import express from "express";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
 

  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.send(error)
  }
});


router.post('/login' , async (req, res) =>{
    try {
        const user = await UserModel.findOne({email: req.body.email})
        !user && res.status(404).json('user not found')

        const isOk = await bcrypt.compare(req.body.password, user.password)
        !isOk && res.status(400).json('wrong password')
        res.status(200).json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

})

export default router;
