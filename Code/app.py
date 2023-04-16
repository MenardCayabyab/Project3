import requests
from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/data')
def show_data():
    url = 'https://data.sonomacounty.ca.gov/resource/924a-vesw.json'
    response = requests.get(url)
    data = response.json()

    # Render the data in an HTML table
    return render_template('table.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
