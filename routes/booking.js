const express = require('express');
const router = express.Router();
const { Booking } = require('../models/booking');
const authenticateJWT = require('../middlewares/auth')

//Middleware pour récupérer une réservation par son ID
const getBooking = async (req, res, next) => {
    const id = req.params.id;
    try{
        const booking = await Booking.findByPk(id);
        if (!booking){
            res.status(404).json({ message: "Booking not found" })
        }
        res.booking = booking;
        next();
    } catch(err){
        res.status(500).json({ message: err.message })
    }
}

//Route pour voir toutes les réservations
router.get('/bookings', authenticateJWT, async (req, res) => {
    try{
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (err){
        res.status(500).json({ message: err.message});
    }
})

//Route pour récupérer une réservation précise par son ID
router.get('/bookings/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;

    try{
        const booking = await Booking.findByPk(id);

        if (!booking){
            return res.status(404).json({ message: "Booking not found"})
        }

        res.json(booking)
    } catch (err){
        console.error(err);
        res.status(500).json({ message: err.message })
    }
})

//Route pour créer une réservation
router.post('/booking', authenticateJWT, async (req, res) => {
    const booking = new Booking({
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })

    try{
        const newBooking = await booking.save();
        res.status(201).json(newBooking)
    } catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Route pour modifier une réservation
router.patch('/booking/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;
    const {startDate, endDate} = req.body;

    if (startDate != undefined){
        req.body.startDate = startDate;
    }
    if (endDate != undefined){
        req.body.endDate = endDate;
    }

    try{
        const updatedBooking = await res.booking.save();
        res.json({updatedBooking});
    } catch (err){
        res.status(500).json({ message: message.err});
    }
})

//Route pour supprimer une réservation
router.delete('/booking/:id', authenticateJWT, getBooking, async (req, res) => {
    try{
        await res.booking.detroy();
        res.json({ message : "Destoyed booking"})
    } catch(err){
        res.status(500).json({ message: message.err})
    }
})

module.exports = router;