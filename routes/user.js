const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const authenticateJWT = require('../middlewares/auth')

//Middleware pour récupérer un utilisateur par son ID
const getUser = async (req, res, next) => {
    const id = req.params.id;
    try{
        const user = await User.findByPk(id);
        if (!user){
            res.status(404).json({ message: "User not found" })
        }
        res.user = user;
        next();
    } catch(err){
        res.status(500).json({ message: err.message })
    }
}

//Route pour voir tous les utilisateurs
router.get('/users', authenticateJWT, async (req, res) => {
    try{
        const users = await User.findAll();
        res.json(users);
    } catch (err){
        res.status(500).json({ message: err.message});
    }
})

//Route pour récupérer un utilisateur précis par son ID
router.get('/users/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;

    try{
        const user = await User.findByPk(id);

        if (!user){
            return res.status(404).json({ message: "User not found"})
        }

        res.json(user)
    } catch (err){
        console.error(err);
        res.status(500).json({ message: err.message })
    }
})

//Route pour créer un user
router.post('/users', authenticateJWT, async (req, res) => {
    const user = new User({
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })

    try{
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Route pour modifier un user
router.patch('/users/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;
    const {firstName, surname, password} = req.body;

    if (firstName != undefined){
        req.body.firstName = firstName;
    }
    if (surname != undefined){
        req.body.surname = surname;
    }
    if (password != undefined){
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
    }

    try{
        const updatedUser = await res.user.save();
        res.json({updatedUser});
    } catch (err){
        res.status(500).json({ message: message.err});
    }
})

//Route pour supprimer un user
router.delete('/user/:id', authenticateJWT, getUser, async (req, res) => {
    try{
        await res.user.detroy();
        res.json({ message : "Destoyed user"})
    } catch(err){
        res.status(500).json({ message: message.err})
    }
})

module.exports = router;