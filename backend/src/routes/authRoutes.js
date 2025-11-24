import express from 'express';


const router = express.Router();

router.post('/register',  async (req, res) => {
    // Handle registration
    res.send("Register");
});
router.post('/login', async (req, res) => {
    // Handle login
    res.send("Login");
});



export default router;