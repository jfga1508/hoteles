const express = require('express');
const router = express.Router();

const hotelsService = require('../hotels-service');

router.get('/hotels', (req, res) => {
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

module.exports = router;
