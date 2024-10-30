const express = require('express');
const UserModel = require('../model/Users');
const RecipeModel = require('../model/Recipes');
const router = express.Router();
const mongoose = require('mongoose');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
})

//create a recipe 
router.post('/', async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//save a recipe 
router.put('/', async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

//save a recipe of login user
router.get('/savedRecipes/ids', async(req,res)=>{
  try {
    const user = await UserModel.findById(req.body.userID);
    res.status(200).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
  }
})

//get the saved recipes not the ids
router.get('/savedRecipes', async(req,res)=>{
  try {
    const user = await UserModel.findById(req.body.userID);
    const savedRecipes = await RecipeModel.find({_id: {$in: user.savedRecipes}})
    res.status(200).json({ savedRecipes });
  } catch (err) {
    console.log(err)
  }
})
 
module.exports = router;