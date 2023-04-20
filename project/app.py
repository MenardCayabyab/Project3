from flask import Flask, render_template, request, jsonify
import json
from datetime import datetime
from collections import Counter

import sqlite3

app = Flask(__name__)

DATABASE = 'Project3.db'

def query_database(query, args=()):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Add this line
    cur = conn.cursor()
    cur.execute(query, args)
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows


def count_outcome_types(data):
    outcome_types = [row[13] for row in data if row[13] is not None]
    return dict(Counter(outcome_types))

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

        # Count the occurrences of each outcome type
        outcome_types_distribution = count_outcome_types(data)
        
        # Set the selected options for the dropdown menus
        selected_pet_type = pet_type
        selected_primary_breed = primary_breed
        
        # Get the list of primary breeds for the selected pet type
        primary_breeds = [row[0] for row in query_database("SELECT DISTINCT PrimaryBreed FROM project3 WHERE Type = ?", (pet_type,))]

        # Calculate scatter_plot_data
        time_filter = 'month'
        date_format = "%Y-%m"
        
        query = '''
            SELECT strftime(?, IntakeDate) as time_period, COUNT(*) as count
            FROM project3
            GROUP BY time_period
            ORDER BY time_period
        '''
        result = query_database(query, (date_format,))

        scatter_plot_data = [{'time_period': row['time_period'], 'count': row['count']} for row in result]

        # Render the template with the matching data
        return render_template('dashboard.html', pet_types=pet_types, primary_breeds=primary_breeds, selected_pet_type=selected_pet_type, selected_primary_breed=selected_primary_breed, data=data, outcome_types_distribution=outcome_types_distribution, scatter_plot_data=scatter_plot_data)
    else:
        # Get the list of primary breeds for the default pet type
        primary_breeds = [row[0] for row in query_database("SELECT DISTINCT PrimaryBreed FROM project3 WHERE Type = ?", (pet_types[0],))]
        
        # Retrieve the matching data from the database for the default pet type and primary breed
        data = query_database("SELECT ID, Name, Color, Sex, Size, DateOfBirth, ImpoundNumber, KennelNumber, AnimalID, IntakeDate, DaysInShelter, IntakeType, IntakeSubtype, OutcomeType, OutcomeSubtype, IntakeCondition, OutcomeCondition, IntakeJurisdiction, OutcomeJurisdiction, OutcomeZipCode, SecondaryBreed FROM project3 WHERE Type = ? AND PrimaryBreed = ?", (pet_types[0], primary_breeds[0]))
        
        # Calculate outcome_types_distribution
        outcome_types_distribution = count_outcome_types(data)

        time_filter = 'month'
        date_format = "%Y-%m"
        
        query = '''
            SELECT strftime(?, IntakeDate) as time_period, COUNT(*) as count
            FROM project3
            GROUP BY time_period
            ORDER BY time_period
        '''
        result = query_database(query, (date_format,))

        scatter_plot_data = [{'time_period': row['time_period'], 'count': row['count']} for row in result]

        # Render the form with the dropdown menus
        return render_template('dashboard.html', data=data, pet_types=pet_types, primary_breeds=primary_breeds, selected_pet_type=selected_pet_type, selected_primary_breed=selected_primary_breed, outcome_types_distribution=outcome_types_distribution, scatter_plot_data=scatter_plot_data)
if __name__ == '__main__':
    app.run(debug=True)
