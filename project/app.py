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
    
    # Get the list of pet types
    pet_types = [row[0] for row in query_database("SELECT DISTINCT Type FROM project3")]
    
    if request.method == 'POST':
        # Process the selected options from the dropdown menus
        pet_type = request.form['pet_type']
        primary_breed = request.form['primary_breed']
        
        # Retrieve the matching data from the database
        data = query_database("SELECT ID, Name, Color, Sex, Size, DateOfBirth, ImpoundNumber, KennelNumber, AnimalID, IntakeDate, DaysInShelter, IntakeType, IntakeSubtype, OutcomeType, OutcomeSubtype, IntakeCondition, OutcomeCondition, IntakeJurisdiction, OutcomeJurisdiction, OutcomeZipCode, SecondaryBreed FROM project3 WHERE Type = ? AND PrimaryBreed = ?", (pet_type, primary_breed))
        
        # Set the selected options for the dropdown menus
        selected_pet_type = pet_type
        selected_primary_breed = primary_breed
        
        # Get the list of primary breeds for the selected pet type
        primary_breeds = [row[0] for row in query_database("SELECT DISTINCT PrimaryBreed FROM project3 WHERE Type = ?", (pet_type,))]
        
        # Render the template with the matching data
        return render_template('dashboard.html', pet_types=pet_types, primary_breeds=primary_breeds, selected_pet_type=selected_pet_type, selected_primary_breed=selected_primary_breed, data=data)
    else:
        # Get the list of primary breeds for the default pet type
        primary_breeds = [row[0] for row in query_database("SELECT DISTINCT PrimaryBreed FROM project3 WHERE Type = ?", (pet_types[0],))]
        
        # Retrieve the matching data from the database for the default pet type and primary breed
        data = query_database("SELECT ID, Name, Color, Sex, Size, DateOfBirth, ImpoundNumber, KennelNumber, AnimalID, IntakeDate, DaysInShelter, IntakeType, IntakeSubtype, OutcomeType, OutcomeSubtype, IntakeCondition, OutcomeCondition, IntakeJurisdiction, OutcomeJurisdiction, OutcomeZipCode, SecondaryBreed FROM project3 WHERE Type = ? AND PrimaryBreed = ?", (pet_types[0], primary_breeds[0]))
        
        # Render the form with the dropdown menus
        return render_template('dashboard.html', pet_types=pet_types, primary_breeds=primary_breeds, selected_pet_type=pet_types[0], selected_primary_breed=primary_breeds[0], data=data)

if __name__ == '__main__':
    app.run(debug=True)
