// src/controllers/patientsController.js
// Controllers: validate inputs, call service, return responses.

const service = require('../services/sqlserverService');
const validators = require('../utils/validators');

async function searchByName(req, res, next) {
  try {
    const name = (req.query.first_name || '').trim();
    if (!validators.isNonEmptyString(name)) {
      return res.status(400).json({ error: 'first_name query param is required' });
    }
    const rows = await service.getPatientByName(name);
    return res.status(200).json({ data: rows });
  } catch (err) {
    next(err);
  }
}

async function searchByAnomaly(req, res, next) {
  try {
    const anomaly = (req.query.anomaly || '').trim();
    if (!validators.isNonEmptyString(anomaly)) {
      return res.status(400).json({ error: 'anomaly query param is required' });
    }
    const rows = await service.getPatientByImpression(anomaly);
    return res.status(200).json({ data: rows });
  } catch (err) {
    next(err);
  }
}

async function searchByVisitDate(req, res, next) {
  try {
    const date = (req.query.date || '').trim();
    if (!validators.isDDMMYYYY(date)) {
      return res.status(400).json({ error: 'date query param is required in dd-MM-yyyy format' });
    }
    const rows = await service.getPatientByVisitDate(date);
    return res.status(200).json({ data: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  searchByName,
  searchByAnomaly,
  searchByVisitDate,
};
