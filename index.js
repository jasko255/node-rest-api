import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import listEndpoints from "express-list-endpoints";

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true  } , ()=> {
    console.log('Connected to MongoDB');
});

// mongoose 
//  .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true })   
//  .then(() => console.log("Database connected!"))
//  .catch(err => console.log(err));

const app = express()


//********************************middlewares

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))




//*******************routes */


app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)


// mongoose
//   .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
//   .then(() => {
//     console.log("SUCCESS: connected to MONGODB");
//     app.listen(8800, () => {
//       console.table(listEndpoints(app));
//       console.log("SERVER listening on: " + 8800);
//     });
//   });


app.listen(8800, ()=> {
    console.table(listEndpoints(app));
    console.log('Backend server is running on ' );
})