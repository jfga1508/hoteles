const express = require('express');
const router = express.Router();

const hotelsService = require('../services/hotels-service');
const reservationsService = require('../services/reservations-service');

// Hotels
router.get(['/hotels', '/hotels/:city'], (req, res) => {
    hotelsService.get(req, res);
});

router.get('/hotel/:id', (req, res) => {
    hotelsService.get(req, res);
});

router.put('/hotel', (req, res) => {
    hotelsService.create(req, res);
});

router.post('/hotel', (req, res) => {
    hotelsService.update(req, res);
});

router.delete('/hotel/:id', (req, res) => {
    hotelsService.destroy(req, res);
});

// Reservations
router.get(['/reservations', '/reservations/:from/:to'], (req, res) => {
    reservationsService.get(req, res);
});

router.get('/reservation/:id', (req, res) => {
    reservationsService.get(req, res);
});

router.put('/reservation', (req, res) => {
    reservationsService.create(req, res);
});

router.post('/reservation', (req, res) => {
    reservationsService.update(req, res);
});

router.delete('/reservation/:id', (req, res) => {
    reservationsService.destroy(req, res);
});

module.exports = router;
