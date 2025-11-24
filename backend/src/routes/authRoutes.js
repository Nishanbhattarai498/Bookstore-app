import express from 'express';


const router = express.Router();

router.get('/register',  async (req, res) => {
    // Handle registration
    res.send("Register");
});
router.get('/login', async (req, res) => {
    // Handle login
    res.send("Login");
});



export default router;