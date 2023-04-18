from flask import Flask, jsonify
from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)

# create the engine to connect to the database
engine = create_engine('postgresql://postgres:postgres@localhost/Project3')

# create a session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()

# create a declarative base class
Base = declarative_base()

# define the class for the "pets" table
class Pet(Base):
    __tablename__ = 'pets'
    name = Column('Name', String)
    animal_type = Column('Type', String)
    color = Column('Color', String)
    sex = Column('Sex', String)
    size = Column('Size', String)
    dob = Column('Date Of Birth', Date)
    impound_number = Column('Impound Number', String)
    kennel_number = Column('Kennel Number', String)
    animal_id = Column('Animal ID', String, primary_key=True)
    intake_date = Column('Intake Date', Date)
    outcome_date = Column('Outcome Date', Date)
    days_in_shelter = Column('Days in Shelter', Integer)
    intake_type = Column('Intake Type', String)
    intake_subtype = Column('Intake Subtype', String)
    outcome_type = Column('Outcome Type', String)
    outcome_subtype = Column('Outcome Subtype', String)
    intake_condition = Column('Intake Condition', String)
    outcome_condition = Column('Outcome Condition', String)
    intake_jurisdiction = Column('Intake Jurisdiction', String)
    outcome_jurisdiction = Column('Outcome Jurisdiction', String)
    outcome_zip_code = Column('Outcome Zip Code', String)
    count = Column('Count', Integer)
    latitude = Column('latitude', String)
    longitude = Column('longitude', String)
    age = Column('age', Integer)
    primary_breed = Column('Primary Breed', String)
    secondary_breed = Column('Secondary Breed', String)

@app.route('/pets')
def get_pets():
    # query the "pets" table to retrieve all rows
    pets = session.query(Pet).all()
    # convert the query results to a list of dictionaries
    pets_dict = [pet.__dict__ for pet in pets]
    # remove the "_sa_instance_state" key from each dictionary
    for pet_dict in pets_dict:
        pet_dict.pop('_sa_instance_state', None)
    # return the list of dictionaries in JSON format
    return jsonify(pets_dict)

if __name__ == '__main__':
    app.run(debug=True)
