const express = require('express');
const router = express.Router();

const hotelsService = require('../services/hotels-service');
const reservationsService = require('../services/reservations-service');

// Hotels
router.get('/hotels', (req, res) => {
    hotelsService.get(req, res);
});

router.get('/hotel/:string', (req, res) => {
    hotelsService.get(req, res);
});

router.put('/hotel', (req, res) => {
    hotelsService.create(req, res);
});

router.post('/hotel', (req, res) => {
    hotelsService.update(req, res);
});

router.delete('/hotel/:string', (req, res) => {
    hotelsService.destroy(req, res);
});

// Reservations
router.get('/reservations', (req, res) => {
    hotelsService.get(req, res);
});

router.get('/reservation/:string', (req, res) => {
    hotelsService.get(req, res);
});

router.put('/reservation', (req, res) => {
    hotelsService.create(req, res);
});

router.post('/reservation', (req, res) => {
    hotelsService.update(req, res);
});

router.delete('/reservation/:string', (req, res) => {
    hotelsService.destroy(req, res);
});

module.exports = router;
