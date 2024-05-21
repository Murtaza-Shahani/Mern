const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const UserModel = require('./models/Users');

mongoose.connect("mongodb+srv://murtazashahani2023:MERN1@mern1.qgjxcqd.mongodb.net/mern1?retryWrites=true&w=majority&appName=mern1");

// Get all users
app.get('/getUser', (req, res) => {
    UserModel.find({})
        .then(function(users){
            res.json(users);
        })
        .catch(function(error){
            res.json(error);
        });
});

// Create a new user
app.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(newUser);
});

// Update a user by name
app.put('/updateUser/:name', async (req, res) => {
    const name = req.params.name;
    const updates = req.body;
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ name }, updates, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user." });
    }
});

// Delete a user by name
app.delete('/deleteUser/:name', async (req, res) => {
    const name = req.params.name;
    try {
        await UserModel.findOneAndDelete({ name });
        res.json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user." });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`app is listening at ${port}`);
});
