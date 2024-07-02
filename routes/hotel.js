const express = require('express');
const router = express.Router();
const { Hotel } = require('../models/hotel');
const authenticateJWT = require('../middlewares/auth')

//Middleware pour récupérer un hotel par son ID
const getHotel = async (req, res, next) => {
    const id = req.params.id;
    try{
        const hotel = await Hotel.findByPk(id);
        if (!hotel){
            res.status(404).json({ message: "Booking not found" })
        }
        res.hotel = hotel;
        next();
    } catch(err){
        res.status(500).json({ message: err.message })
    }
}

//Route pour voir tous les hotels
router.get('/hotels', authenticateJWT, async (req, res) => {
    try{
        const hotels = await Hotel.findAll();
        res.json(hotels);
    } catch (err){
        res.status(500).json({ message: err.message});
    }
})

//Route pour récupérer un hotel précis par son ID
router.get('/hotel/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;

    try{
        const hotel = await Hotel.findByPk(id);

        if (!hotel){
            return res.status(404).json({ message: "Hotel not found"})
        }

        res.json(hotel)
    } catch (err){
        console.error(err);
        res.status(500).json({ message: err.message })
    }
})

//Route pour créer un hotel
router.post('/hotel', authenticateJWT, async (req, res) => {
    const hotel = new Hotel({
        name: req.body.name,
        adress: req.body.adress,
        description: req.body.description
    })

    try{
        const newHotel = await hotel.save();
        res.status(201).json(newHotel)
    } catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Route pour modifier un hotel
router.patch('/hotel/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;
    const {name, adress, description} = req.body;

    if (name != undefined){
        req.body.name = name;
    }
    if (adress != undefined){
        req.body.adress = adress;
    }
    if (description != undefined){
        req.body.description = description;
    }

    try{
        const updatedHotel = await res.hotel.save();
        res.json({updatedHotel});
    } catch (err){
        res.status(500).json({ message: message.err});
    }
})

//Route pour supprimer un hotel
router.delete('/hotel/:id', authenticateJWT, getHotel, async (req, res) => {
    try{
        await res.hotel.detroy();
        res.json({ message : "Destoyed hotel"})
    } catch(err){
        res.status(500).json({ message: message.err})
    }
})

module.exports = router;