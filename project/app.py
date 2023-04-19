from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

DATABASE = './resources/Project3.db'

def query_database(query, args=()):
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute(query, args)
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows

@app.route('/', methods=['GET', 'POST'])
def dashboard():
    selected_pet_type = ''
    selected_primary_breed = ''
    
    # Initialize the pet_types and primary_breeds variables
    pet_types = [row[0] for row in query_database("SELECT DISTINCT Type FROM project3")]
    primary_breeds = [row[0] for row in query_database("SELECT DISTINCT PrimaryBreed FROM project3")]
    
    if request.method == 'POST':
        # Process the selected options from the dropdown menus
        pet_type = request.form['pet_type']
        primary_breed = request.form['primary_breed']
        
        # Retrieve the matching data from the database
        data = query_database("SELECT * FROM project3 WHERE Type = ? AND PrimaryBreed = ?", (pet_type, primary_breed))
        
        # Set the selected options for the dropdown menus
        selected_pet_type = pet_type
        selected_primary_breed = primary_breed
        
        # Render the template with the matching data
        return render_template('dashboard.html', pet_types=pet_types, primary_breeds=primary_breeds, selected_pet_type=selected_pet_type, selected_primary_breed=selected_primary_breed, data=data)
    else:
        # Render the form with the dropdown menus
        return render_template('dashboard.html', pet_types=pet_types, primary_breeds=primary_breeds, selected_pet_type=selected_pet_type, selected_primary_breed=selected_primary_breed, data=None)

if __name__ == '__main__':
    app.run(debug=True)
