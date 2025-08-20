// src/routes/patients.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/patientsController');

// GET /patients/search?first_name=...
router.get('/search', controller.searchByName);

// GET /patients/anomaly?anomaly=...
router.get('/anomaly', controller.searchByAnomaly);

// GET /patients/visit-date?date=dd-MM-yyyy
router.get('/visit-date', controller.searchByVisitDate);

module.exports = router;
