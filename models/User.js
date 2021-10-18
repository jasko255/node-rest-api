import { Schema, model} from 'mongoose'

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min:3,
        max:15,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password : {
        type: String,
        required: true,
        min:6
    },
    profilePicture:{
        type: String,
        default: ''
    },
    coverPicture:{
        type: String,
        default: ''
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type: Boolean,
        default:false
    }
},{
    timestamps: true
})


export default userModel('User', UserSchema)