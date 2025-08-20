// tests/patient_api.test.js
const request = require('supertest');
const app = require('../index'); // Adjust path if needed

describe('Patient API Tests', () => {
  // ✅ Health check
  test('Health check should return 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  // ✅ Search by first_name
  test('GET /patients/search with valid first_name', async () => {
    const res = await request(app).get('/patients/search?first_name=ANITA');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    if (res.body.data.length > 0) {
      expect(res.body.data[0]).toHaveProperty('patient_name');
    }
  });

  test('GET /patients/search without first_name should return 400', async () => {
    const res = await request(app).get('/patients/search');
    expect(res.statusCode).toBe(400);
  });

  // ✅ Search by anomaly
  test('GET /patients/anomaly with valid anomaly keyword', async () => {
    const res = await request(app).get('/patients/anomaly?anomaly=fracture');
    expect(res.statusCode).toBe(200);
    if (res.body.data.length > 0) {
      expect(res.body.data[0]).toHaveProperty('impression');
    }
  });

  test('GET /patients/anomaly without keyword should return 400', async () => {
    const res = await request(app).get('/patients/anomaly');
    expect(res.statusCode).toBe(400);
  });

  // ✅ Search by visit date
  test('GET /patients/visit-date with valid dd-MM-yyyy date', async () => {
    const res = await request(app).get('/patients/visit-date?date=15-05-2021');
    expect(res.statusCode).toBe(200);
    if (res.body.data.length > 0) {
      expect(res.body.data[0]).toHaveProperty('visit_date');
    }
  });

  test('GET /patients/visit-date without date should return 400', async () => {
    const res = await request(app).get('/patients/visit-date');
    expect(res.statusCode).toBe(400);
  });
});
