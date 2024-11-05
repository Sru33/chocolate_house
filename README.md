# Chocolate House Application

## Overview
This is a simple Python application for a fictional chocolate house that manages seasonal flavor offerings, ingredient inventory, and customer flavor suggestions and allergy concerns using SQLite.

## Features
- Manage seasonal flavors
- Manage ingredient inventory
- Submit customer suggestions and allergy concerns

## Requirements
- Python 3.x
- Flask
- SQLite

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Sru33/chocolate_house.git
   cd chocolate_house
   ```

2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Initialize the database:
   ```bash
   python -c "from database import init_db; init_db()"
   ```

4. Run the application:
   ```bash
   python app.py
   ```

5. Open your browser and navigate to `http://127.0.0.1:5000`.

## Docker Instructions
1. Build the Docker image:
   ```bash
   docker build -t chocolate_app .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 5000:5000 chocolate_app
   ```
