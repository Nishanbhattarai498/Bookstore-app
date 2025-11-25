import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';


const router = express.Router();
const generateToken = (userId) => {
   return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15d'});
}

router.post('/register',  async (req, res) => {
    // Handle registration
    try {
        const {email,username,password}=req.body;
        if(!email || !username || !password){
            return res.status(400).send("All fields are required"); 
        }
        if (password.length < 6){
            return res.status(400).send("Password must be at least 6 characters long");
        }
        if (username.length < 3){
            return res.status(400).send("Username must be at least 3 characters long");
        }
       
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json("User with given email already exists");
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json("User with given username already exists");
        }

        const profileImage =`https://ui-avatars.com/api/?name=${username}&background=random&length=1`;

        const user = new User({
            email,
            username,
            password,
            profileImage,
        });

        await user.save();

        const token=generateToken(user._id);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,

        }
    }

        );
        

    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).send("Error during registration");
    }
});
router.post('/login', async (req, res) => {
    // Handle login
    res.send("Login");
});

export default router;