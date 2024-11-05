from flask import Flask, jsonify, request, render_template
import sqlite3
from database import init_db

app = Flask(__name__)
init_db()


def get_db_connection():
    conn = sqlite3.connect('chocolate_house.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
def index():
    
    conn = get_db_connection()
    conn.execute('DELETE FROM flavors')
    conn.execute('DELETE FROM ingredients')
    conn.commit()
    conn.close()
    return render_template('index.html')


@app.route('/flavors', methods=['GET'])
def get_flavors():
    conn = get_db_connection()
    flavors = conn.execute('SELECT * FROM flavors').fetchall()
    conn.close()
    return jsonify([dict(row) for row in flavors])


@app.route('/flavors', methods=['POST'])
def add_flavor():
    new_flavor = request.json
    name = new_flavor.get('name')
    season = new_flavor.get('season')

    if not name or not season:
        return jsonify({"error": "Name and season are required!"}), 400

    conn = get_db_connection()

    
    existing_flavor = conn.execute('SELECT * FROM flavors WHERE name = ? AND season = ?', (name, season)).fetchone()
    
    if existing_flavor:
        conn.close()
        return jsonify({"message": "Flavor already exists!"}), 409  

    
    conn.execute('INSERT INTO flavors (name, season) VALUES (?, ?)', (name, season))
    conn.commit()
    conn.close()

    return jsonify({"message": "Flavor added successfully!"}), 201


@app.route('/ingredients', methods=['GET'])
def get_ingredients():
    conn = get_db_connection()
    ingredients = conn.execute('SELECT * FROM ingredients').fetchall()
    conn.close()
    return jsonify([dict(row) for row in ingredients])


@app.route('/ingredients', methods=['POST'])
def add_ingredient():
    new_ingredient = request.json
    name = new_ingredient.get('name')
    quantity = new_ingredient.get('quantity')

    if not name or quantity is None:
        return jsonify({"error": "Name and quantity are required!"}), 400

    conn = get_db_connection()

    
    existing_ingredient = conn.execute('SELECT * FROM ingredients WHERE name = ?', (name,)).fetchone()

    if existing_ingredient:
        conn.close()
        return jsonify({"message": "Ingredient already exists!"}), 409 

    
    conn.execute('INSERT INTO ingredients (name, quantity) VALUES (?, ?)', (name, quantity))
    conn.commit()
    conn.close()

    return jsonify({"message": "Ingredient added successfully!"}), 201

@app.route('/suggestions', methods=['POST'])
def add_suggestion():
    suggestion = request.json
    flavor_name = suggestion.get('flavor_name')
    allergy_concerns = suggestion.get('allergy_concerns')

    if not flavor_name:
        return jsonify({"error": "Flavor name is required!"}), 400

    conn = get_db_connection()
    conn.execute('INSERT INTO customer_suggestions (flavor_name, allergy_concerns) VALUES (?, ?)', 
                 (flavor_name, allergy_concerns))
    conn.commit()
    conn.close()

    return jsonify({"message": "Suggestion added successfully!"}), 201

if __name__ == '__main__':
    app.run(debug=True)
