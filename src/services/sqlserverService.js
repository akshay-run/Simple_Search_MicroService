// src/services/sqlserverService.js
// Service layer: builds parameterized queries and returns recordsets.

const db = require('../config/db');
const { cleanRTF } = require('../utils/validators');

// Base query (no parameters)
const BASE_QUERY = `
SELECT CONCAT(p.firstName, ' ', p.lastName) AS patient_name,
       FORMAT(v.visitDate, 'dd-MM-yyyy') AS visit_date,
       e.finalImpression AS impression,
       p.externalID AS patient_id
FROM event AS e
JOIN visit AS v ON e.visitID = v.visitID
JOIN patient AS p ON v.patientID = p.patientID
WHERE e.finalImpression IS NOT NULL
`;

const NAME_QUERY = BASE_QUERY + ' AND p.firstName LIKE @name';
const ANOMALY_QUERY = BASE_QUERY + ' AND e.finalImpression LIKE @anomaly';
const VISIT_DATE_QUERY = BASE_QUERY + " AND FORMAT(v.visitDate, 'dd-MM-yyyy') = @visitDate";

async function getPatientByName(name) {
  // Add wildcard server-side to keep API simple for callers
  const nameParam = `%${name}%`;
  const pool = await db.getPool();
  const request = pool.request();
  request.input('name', db.sql.VarChar(200), nameParam);
  const result = await request.query(NAME_QUERY);

  //return result.recordset; This will returns directly raw string in impression(\\)
  const rows = result.recordset || [];
  const cleaned = rows.map(row => ({
    ...row,
    impression: cleanRTF(row.impression),
  }));
  return cleaned;
}

async function getPatientByImpression(anomaly) {
  const anomalyParam = `%${anomaly}%`;
  const pool = await db.getPool();
  const request = pool.request();
  request.input('anomaly', db.sql.VarChar(500), anomalyParam);
  const result = await request.query(ANOMALY_QUERY);
  
  //return result.recordset;

    const rows = result.recordset || [];
  const cleaned = rows.map(row => ({
    ...row,
    impression: cleanRTF(row.impression),
  }));
  return cleaned;

}

async function getPatientByVisitDate(dateStr) {
  // dateStr expected in dd-MM-yyyy
  const pool = await db.getPool();
  const request = pool.request();
  request.input('visitDate', db.sql.VarChar(12), dateStr);
  const result = await request.query(VISIT_DATE_QUERY);
  
  //return result.recordset;

  const rows = result.recordset || [];
  const cleaned = rows.map(row => ({
    ...row,
    impression: cleanRTF(row.impression),
  }));
  return cleaned;
}


module.exports = {
  getPatientByName,
  getPatientByImpression,
  getPatientByVisitDate,
};
