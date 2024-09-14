// const mongoose = require('mongoose');
// const RecipeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     ingredients: [{type: String , required: true}],
//     instruction: {type: String , required: true},
//     imageUrls: {type: String , required: true},
//     cookingTime: {type: Number , required: true},
//     userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'Users',required: true}
// });
// const RecipeModel = mongoose.model('recipes', RecipeSchema); 
// module.exports = RecipeModel;

const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{ type: String, required: true }],
    instruction: { type: String, required: true },
    imageUrls: [{ type: String, required: true }], // Corrected to be an array of strings
    cookingTime: { type: Number, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
});

const RecipeModel = mongoose.model('recipes', RecipeSchema);

module.exports = RecipeModel;
