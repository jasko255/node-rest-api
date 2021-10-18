import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'

dotenv.config()

mongoose.connect(process.env.MONGODB_URL, ()=> {
    console.log('Connected to MongoDB');
});

const app = express()


//********************************middlewares

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))




//*******************routes */


app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)




app.listen(8800, ()=> {
    console.log('Backend server is running');
})