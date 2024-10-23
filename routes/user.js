//Everything related to log in and register 
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../model/Users');

//register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
});

//login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const isPassswordValid = await bcrypt.compare(password, user.password)

    // if (!isPassswordValid) {
    //     return res.status(403).json({ message: 'Invalid username and password' });
    // }
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ token, userID: user._id });

})

module.exports = router;