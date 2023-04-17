from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)

engine = create_engine('postgresql://postgres:postgres@localhost/Project3')
Session = sessionmaker(bind=engine)
Base = declarative_base()

class YearlyIntake(Base):
    __tablename__ = 'yearly_intake_totals'
    year = Column(Integer, primary_key=True)
    intake_count = Column(Integer)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/line_chart')
def line_chart():
    return render_template('line_chart.html')


@app.route('/api/intake')
def monthly_intake():
    session = Session()
    yearly_intake = session.query(YearlyIntake.year, YearlyIntake.intake_count).all()
    session.close()
    result = []
    for year, count in yearly_intake:
        result.append({'year': year, 'intake_count': count})
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
