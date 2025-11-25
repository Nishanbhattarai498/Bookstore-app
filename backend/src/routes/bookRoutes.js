import express from 'express';
import cloudinary from '../lib/cloudinary.js';
import Book from '../models/Book.js';


const router = express.Router();

router.post('/',protectRoute,async (req, res) => {
    try{
        const {title,caption,rating,image}=req.body;
        // Validate input
        if (!title || !caption || !image || !rating) {
            return  res.status(400).json("All fields are required");
        }
        //upload the image to cloudinary
        //save to mongoDB
        const uploadResponse=await cloudinary.uploader.upload(image);
        const imageUrl=uploadResponse.secure_url;

        const newBook=new Book({
            title,
            caption,
            rating,
            image:imageUrl,
            user:req.user._id,
            
        })
        await newBook.save();
        res.status(201).json(newBook);

    }
    catch (error) {
        console.log("Error creating book:", error);
        res.status(500).send("Error creating book");

    }
});

export default router;