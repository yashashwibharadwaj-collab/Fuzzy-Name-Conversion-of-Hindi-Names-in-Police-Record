from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
import pandas as pd
from rapidfuzz import process, fuzz
import os

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS

# Load datasets
def load_data():
    df_transaction = pd.read_excel('excel.xlsx', sheet_name='Transaction Dataset')
    df_master = pd.read_excel('excel.xlsx', sheet_name='Master Dataset')
    return df_transaction.iloc[:, 0].tolist(), df_master.iloc[:, 0].tolist()

transaction_names, master_names = load_data()

@app.route('/match_names', methods=['POST'])
def match_names():
    data = request.json
    customer_name = data.get('name', '')
    search_type = data.get('type', 'fuzzy')
    
    # Choose scorer based on search type
    if search_type == 'phonetic':
        scorer = fuzz.token_sort_ratio
    elif search_type == 'transliteration':
        scorer = fuzz.token_set_ratio
    else:  # default to fuzzy
        scorer = fuzz.ratio
    
    matches = process.extract(customer_name, master_names, scorer=scorer, limit=5)
    matches_percentage = [{'name': match[0], 'score': f"{match[1]}%"} for match in matches]
    
    return jsonify({
        'query': customer_name,
        'matches': matches_percentage,
        'search_type': search_type
    })

if __name__ == '__main__':
    app.run(debug=True)