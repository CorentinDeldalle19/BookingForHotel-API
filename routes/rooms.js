const express = require('express');
const router = express.Router();
const { Room } = require('../models')
const authenticateJWT = require('../middlewares/auth')

// Middleware pour récupérer une chambre par son ID
const getRoom = async (req, res, next) => {
    const id = req.params.id;
    try {
        const room = await Room.findByPk(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.room = room;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Route pour obtenir toutes les chambres
router.get('/rooms', authenticateJWT, async (req, res) => {
    try{
        const rooms = await Room.findAll();
        res.json(rooms)
    } catch(err){
        res.status(500).json({ message: err.message })
    }
})

// Route pour récupérer une chambre par son ID
router.get('/rooms/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;
  
    try {
      const room = await Room.findByPk(id);
  
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      res.json(room);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  });  

// Route pour créer une nouvelle chambre
router.post('/rooms', authenticateJWT, async (req, res) => {
    const room = new Room({
      number: req.body.number,
      type: req.body.type,
      price: req.body.price,
      description: req.body.description
    });
  
    try {
      const newRoom = await room.save();
      res.status(201).json(newRoom);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Route PATCH pour mettre à jour une chambre par son ID
router.patch('/rooms/:id', authenticateJWT, getRoom, async (req, res) => {
    const id = req.params.id;
    const { number, type, price, description, availability } = req.body;

    if (number !== undefined) {
        res.room.number = number;
    }
    if (type !== undefined) {
        res.room.type = type;
    }
    if (price !== undefined) {
        res.room.price = price;
    }
    if (description !== undefined) {
        res.room.description = description;
    }
    if (availability !== undefined) {
        res.room.availability = availability;
    }

    try {
        const updatedRoom = await res.room.save();
        res.json(updatedRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer une chambre
router.delete('/rooms/:id', authenticateJWT, getRoom, async (req, res) => {
    try{
        await res.room.destroy();
        res.json({ message: 'Deleted room'})
    } catch (err){
        res.status(400).json({ message: err.message})
    }
})

module.exports = router;