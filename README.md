# Zomato-Restaurant-Analysis-Dashboard
A full-stack restaurant analytics dashboard built using Java Spring Boot, PostgreSQL, Python (EDA), and JavaScript to analyze Bangalore Zomato restaurant data.
🍽️ Zomato Restaurant Analysis Dashboard
📌 Overview

The Zomato Restaurant Analysis Dashboard is a full-stack data analytics project that analyzes more than 7,000 Bangalore restaurant records from the Zomato dataset. The project demonstrates an end-to-end workflow, including data cleaning, database management, backend API development, and interactive dashboard visualization.

The application uses Python for data preprocessing and Exploratory Data Analysis (EDA), PostgreSQL for data storage, Spring Boot for REST API development, and HTML, CSS, and JavaScript for the frontend dashboard.

🚀 Features
Restaurant search by area
View top-rated restaurants
Dashboard statistics
Interactive restaurant explorer
Data visualization using charts
REST API integration
Responsive user interface
PostgreSQL database connectivity
🛠️ Tech Stack
Backend
Java
Spring Boot
Spring Data JDBC
REST API
Database
PostgreSQL
Data Analysis
Python
Pandas
NumPy
Matplotlib
Frontend
HTML
CSS
JavaScript
📊 Dashboard Features
Total Restaurants
Average Rating
Average Cost for Two
Total Areas Covered
Restaurant Search
Top Rated Restaurants
Data Analysis Charts
📈 Exploratory Data Analysis

The project includes three business-focused analyses:

Most Affordable Areas
Online Ordering vs Customer Rating
Restaurant Rating Comparison
🗄️ Database

The cleaned dataset is stored in a PostgreSQL database named:

zomato

The backend retrieves restaurant information using custom SQL queries through Spring Data JDBC.

📡 REST API Endpoints
Method	Endpoint	Description
GET	/api/top-restaurants	Returns Top Rated Restaurants
GET	/api/restaurants	Returns Restaurant Explorer Data
GET	/api/restaurants/area/{area}	Search Restaurants by Area
GET	/api/stats	Returns Dashboard Statistics
📂 Project Structure
Zomato-Restaurant-Analysis-Dashboard
│
├── Backend (Spring Boot)
│
├── PostgreSQL Database
│
├── Python EDA
│
├── Frontend
│
├── Charts
│
└── README.md
🎯 Learning Outcomes

Through this project, I learned:

Data Cleaning using Pandas
Exploratory Data Analysis (EDA)
PostgreSQL Database Management
Spring Boot REST API Development
JDBC Database Connectivity
JSON Data Handling
Frontend Integration using JavaScript Fetch API
👩‍💻 Author

Namami Khantwal

B.Tech Artificial Intelligence & Data Science
