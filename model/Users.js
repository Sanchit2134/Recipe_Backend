const mongoose = require('mongoose');
const UserSechma = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    savedRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipes'   ///reference to the recipes database
        }
    ]
});

module.exports = mongoose.model('User', UserSechma);
