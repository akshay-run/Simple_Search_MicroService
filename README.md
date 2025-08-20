🏥 Patient Search Microservice

📌 Overview
 A Node.js microservice for searching patient records by name, visit date, or anomaly from a SQL Server database.  
 Part of the Intelligent Data Retrieval (IDR) system.

---

## 📦 Tech Stack

- **Node.js + Express** – Backend framework
- **MSSQL (SQL Server)** – Database
- **Jest + Supertest** – Automated testing
- **Swagger (OpenAPI)** – API documentation

---

## 📂 Project Structure

```
src/
	config/           # Database configuration
		db.js
	controllers/      # Business logic
		patientsController.js
	docs/             # API Documentation
		openapi.yaml
	middleware/       # Error handling
		errorHandler.js
	routes/           # API routes
		patients.js
	services/         # Database queries
		sqlserverService.js
	tests/            # Unit tests
		patient_api.test.js
	utils/            # Helpers & validators
		validators.js
	index.js          # Entry point
```

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```cmd
npm install
```

### 2️⃣ Configure environment

- Copy `.env.example` to `.env` and fill in your database details:
	```
	DB_USER=your_db_user
	DB_PASSWORD=your_db_password
	DB_SERVER=localhost
	DB_DATABASE=Sonocare
	PORT=3000
	```

### 3️⃣ Run the service

```cmd
npm start
```

### 4️⃣ Run with Docker

Build the Docker image:
```cmd
docker build -t simple_search_microservice .
```

Run the Docker container:
```cmd
docker run -p 3000:3000 simple_search_microservice
```

Access the service at:
```
http://localhost:3000/health
http://localhost:3000/docs (Swagger UI)
```

### 5️⃣ Run tests

```cmd
npm test
```

---

## 📖 API Endpoints

- **Health Check:**  
	`GET /health`

- **Search Patients:**  
	- By Name: `GET /patients/search?first_name=ANITA`  
	- By Visit Date: `GET /patients/search?visit_date=2023-09-15`  
	- By Anomaly: `GET /patients/search?anomaly=Stroke`

---

## 🧪 Testing

- **Manual:**  
	Use Swagger UI at [`/docs`](http://localhost:3000/docs) to explore and test endpoints.

- **Automated:**  
	Run unit tests with Jest and Supertest:
	```cmd
	npm test
	```

---

## 💡 Tips

- Make sure SQL Server is running and accessible.
- Use `.env.example` as a template for your `.env` file.
- For development, enable Swagger UI by setting `SWAGGER_ENABLED=true` in `.env`.

---
