# chocolate_house
# 📄 Documentation of the Code :
## Overview
This project is a simple database management system for a fictional chocolate house. It uses SQLite to manage data about seasonal flavors, ingredients, customer suggestions, and allergy concerns. The system is divided into three main parts: database setup (`database.py`), user interactions (`app.py`), and management operations.

## Files

### database.py
This script sets up the initial database structure and populates it with some initial data.

#### Key Components:
- **Database Connection**:
  - Establishes a connection to the SQLite database named `chocolate_house.db`.
  - Creates a cursor object for executing SQL commands.

- **Table Creation**:
  - Creates the following tables if they do not already exist:
    - `flavors`: Stores flavors available seasonally.
    - `ingredients`: Stores ingredients and their quantities.
    - `customer_suggestions`: Stores customer suggestions for new flavors.
    - `allergens`: Stores allergens to be aware of.

- **Initial Data Insertion**:
  - Populates the `flavors` table with predefined flavors.
  - Populates the `ingredients` table with predefined ingredients and their quantities.

- **Commit and Close**:
  - Commits the changes to the database and closes the connection.

### app.py
This script defines the application interface for users to interact with the database, such as adding customer suggestions, searching for flavors, and managing ingredients.

#### Key Components:
- **Flask Routes**:
  - Routes to get all flavors, add new flavors, get all ingredients, add new ingredients, and add customer suggestions.
  - Includes error handling for required fields and duplicates.

- **User Interaction**:
  - Utilizes JSON for handling requests and responses.
  - Provides feedback messages for successful operations and error handling.

### Dockerfile
This file contains instructions for building the Docker image for the application.

#### Key Components:
- **Base Image**:
  - Uses `python:3.9-slim` as the base image.

- **Dependencies**:
  - Installs required Python packages, such as `Flask` and `sqlite3`.

- **Container Commands**:
  - Exposes the necessary port and sets the command to run the application.

## Usage
### Database Setup:
Run `database.py` to set up the database and populate it with initial data.
```sh
python database.py
```

### User Interaction:
Run `app.py` to allow users to interact with the system. They can suggest new flavors, add items to their inventory, view suggestions, and more.
```sh
python app.py
```

## 🚀 How to use ?

1. Clone the Repository to your system.
   ```sh
   git clone https://github.com/Sru33/chocolatehouse.git
   cd chocolatehouse
   ```
2. Open `database.py` and execute the file. This step will create necessary databases for further operations.
   ```sh
   python database.py
   ```
3. Open `app.py` to access the Chocolate House like a customer.
   ```sh
   python app.py
   ```
4. When executed, the application has a text-based menu where you get to choose actions from the given options, such as adding and removing items from the inventory, viewing offerings, and suggesting new flavors.

## Docker 
1. Build the Docker Image from the Dockerfile.
   ```sh 
   docker build -t chocolatehouse .
   ```
2. To Create the container.
   ```sh
   docker run -it -p 5000:5000 chocolatehouse
   ```
3. To get docker container info from which we will copy Container ID.
   ```sh
   docker ps
   ```
4. To open terminal in docker.
   ```sh
   docker exec -it [Container ID] bash
   ```
5. Now, to initiate the program, first we run `database.py`.
   ```sh
   python database.py
   ```
6. To open `app.py`.
   ```sh
   python app.py
   ```

# 💻 Test Steps 

### In app.py 
When you run the application, you will see a menu like:
```
Welcome to the Chocolate House
1. View Flavors
2. Add Flavor
3. View Ingredients
4. Add Ingredient
5. Add Customer Suggestion
6. Exit
```
1. Enter the desired choice, for example, you can press `1` to view flavors.
2. You will see a list of available flavors displayed.
3. You can add a new flavor by selecting option `2` and providing the necessary details when prompted.
4. To suggest a flavor, select option `5` and enter your suggested flavor name and any allergy concerns.

### Error Handling
- If required fields are missing, an error message will be returned, e.g., "Name and season are required!"
- If you attempt to add a duplicate flavor or ingredient, you will receive a "Flavor already exists!" or "Ingredient already exists!" message.

---

Feel free to customize any part of the README to better match your project's details, and let me know if you need any further modifications or additional sections!
