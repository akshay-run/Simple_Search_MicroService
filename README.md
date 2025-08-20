🏥 Patient Search Microservice

📌 Overview
This microservice provides APIs to search patient records from a SQL Server database by:

Name

Visit Date

Anomaly

It is part of the Intelligent Data Retrieval (IDR) system.

⚙️ Tech Stack

Node.js + Express → Backend framework

MSSQL (SQL Server) → Database

Jest + Supertest → Automated testing

Swagger (OpenAPI) → API documentation

📂 Project Structure
src/
 ├── config/              # Database configuration
 │    └── db.js
 ├── controllers/         # Business logic
 │    └── patientsController.js
 ├── docs/                # API Documentation
 │    └── openapi.yaml
 ├── middleware/          # Error handling
 │    └── errorHandler.js
 ├── routes/              # API routes
 │    └── patients.js
 ├── services/            # Database queries
 │    └── sqlserverService.js
 ├── tests/               # Unit tests
 │    └── patient_api.test.js
 ├── utils/               # Helpers & validators
 │    └── validators.js
 └── index.js             # Entry point

🚀 Getting Started
1️⃣ Install dependencies
npm install

2️⃣ Configure environment

Create a .env file (you can copy from .env.example):

DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SERVER=localhost
DB_DATABASE=Sonocare
PORT=3000

3️⃣ Run the service
npm start

4️⃣ Run tests
npm test

📖 API Endpoints
🔹 Health Check
GET /health

🔹 Search Patients

By Name → GET /patients/search?first_name=ANITA

By Visit Date → GET /patients/search?visit_date=2023-09-15

By Anomaly → GET /patients/search?anomaly=Stroke

🧪 Testing

Manual Testing → via Swagger UI (/api-docs)

Automated Testing → Jest + Supertest (unit tests)