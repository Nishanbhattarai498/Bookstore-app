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

//pagination 
router.get('/',protectRoute,async (req, res) => {
    try{
        const page =req.query.page || 1;
        const limit =req.query.limit || 10;
        const skip =(page - 1) * limit;
        const books = await Book.find().sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user","username profileImage");
        const totalBooks = await Book.countDocuments();

      
        res.send({
            books,
            curretnPage:page,
            totalBooks,
            totalPages:Math.ceil(totalBooks/limit), 

        }
        );
    }
    catch (error) {
        console.log("Error fetching books:", error);
        res.status(500).send("Error fetching books");
    }
});

router.get("/user",protectRoute,async (req, res) => {
    try{
        const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        console.log("Error fetching user's books:", error);
        res.status(500).json("Error fetching user's books");
    }
});

router.delete('/:id',protectRoute,async (req, res) => {
    try{
        const book =await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json("Book not found");
        }
        //check if the user is the owner of the book
        if(book.user.toString() !== req.user._id.toString()){
            return res.status(401).json("Not authorized to delete this book");
        }
        //delete image from cloudinary
        if(book.image && book.image.includes("cloudinary")){
            try{
                const publicId=book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            
            }catch(error){
                console.log("Error deleting image from cloudinary:", error);
            }


        }

        await book.deleteOne();
        res.status(200).json("Book deleted successfully");
    }
    catch (error) {
        console.log("Error deleting book:", error);
        res.status(500).json("Error deleting book");
    }
})
export default router;