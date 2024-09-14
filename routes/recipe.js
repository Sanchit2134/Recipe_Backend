const express = require('express');
const RecipeModel = require('../model/Recipes');
const UserModel = require('../model/Users');
const verifyToken  = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        // console.log(response)
        res.json(response);
    }
    catch (err) {
        res.json(err);
    }
})

router.post('/', verifyToken , async (req, res) => {
    console.log(req.body)
    try {
        req.body.imageUrls= [req.body.imageUrl];
        const recipe = new RecipeModel(req.body);
        await recipe.save();
        res.json(recipe);
        console.log(req.body) 
    }
    catch (err) {
        console.log(err)
        res.json(err);
    }
})

router.put('/' , async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const user = await UserModel.findById(req.body.userId);
        console.log(recipe,"==")
        user.savedRecipes.push(recipe);
        user.save();
        res.json({ savedRecipes: user.savedRecipes });

    }
    catch (err) {
        res.json(err)
    }
})

// Get a single recipe by its id
router.get('/savedRecipes/:id', async (req, res) => {
    const { id } = req.params
    try {
        const recipe = await RecipeModel.findById(id)   ;
         return res.json(recipe);
    }
    catch (err) {
        res.json(err);
    }
})

// Get all saved recipes for a user
router.get('/all_recipies_of_a_user/:userID', async (req, res) => {
    const {userID} = req.params
    try {
        const user = await UserModel.findById(userID)
        if (!user) {
            return res.json({ message: 'User not found' });
        }
        const recipes = await RecipeModel.find({userOwner: userID});
        console.log('recipes: ', recipes);
        // const savedRecipes = await RecipeModel.find({ _id: { $in: user.savedRecipes } });
        res.json(recipes);
    }
    catch (err) {
        res.json(err);
    }
})


module.exports = router;