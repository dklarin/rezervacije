from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime



app = Flask(__name__)
CORS(app)

DATA_FILE = 'rezervacije.json'

@app.route('/api/rjecnik', methods=['GET'])
def get_rjecnik():
    with open('rjecnik.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/api/rezervacije', methods=['GET'])
def get_rezervacije():
    with open('rezervacije.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/api/rezervacije', methods=['POST'])
def add_rezervacija():
    nova_rezervacija = request.json
    print(nova_rezervacija)
    gost = nova_rezervacija.get("gost")
    boja = nova_rezervacija.get("boja")
    dolazak = nova_rezervacija.get("dolazak") 
    odlazak = nova_rezervacija.get("odlazak") 
    print(dolazak)
    print(odlazak)
    # Parsiraj hrvatski datum u datetime objekt
    dt = datetime.strptime(dolazak, "%d.%m.%Y")

    # Pretvori u engleski format (ISO: YYYY-MM-DD)
    dolazak = dt.strftime("%Y-%m-%d")
     # Parsiraj hrvatski datum u datetime objekt
    dt = datetime.strptime(odlazak, "%d.%m.%Y")

    # Pretvori u engleski format (ISO: YYYY-MM-DD)
    odlazak = dt.strftime("%Y-%m-%d")
    nova_rezervacija = {'gost': gost, 'boja': boja, 'dolazak': dolazak, 'odlazak': odlazak}

    # Učitaj postojeće podatke
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        data = []
    # Dodaj novi ID
    if data:
        nova_rezervacija['id'] = max([r['id'] for r in data]) + 1
    else:
        nova_rezervacija['id'] = 1
    data.append(nova_rezervacija)
    # Spremi natrag u JSON
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return jsonify(nova_rezervacija), 201

@app.route('/api/rezervacije/<int:id>', methods=['GET'])
def get_rezervacija(id):
    # Pronađi rezervaciju po ID-u
    print(type(id))
    print(id)
    rezervacije = []
    with open('rezervacije.json', 'r', encoding='utf-8') as f:
        rezervacije = json.load(f)
    rezervacija = next((r for r in rezervacije if r["id"] == id), None)
    if rezervacija:
        return jsonify(rezervacija)
    else:        
        return jsonify({"error": "Rezervacija nije pronađena"}), 404
    

@app.route('/api/rezervacije-brisi/<int:id>', methods=['DELETE'])
def obrisi_rezervaciju(id):
    # Učitaj sve rezervacije
    with open('rezervacije.json', 'r', encoding='utf-8') as f:
        rezervacije = json.load(f)

    # Pronađi rezervaciju po ID-u
    rezervacija = next((r for r in rezervacije if int(r["id"]) == id), None)
    if not rezervacija:
        return jsonify({"error": "Rezervacija nije pronađena"}), 404

    # Ukloni rezervaciju iz liste
    rezervacije = [r for r in rezervacije if int(r["id"]) != id]

    # Spremi natrag u datoteku
    with open('rezervacije.json', 'w', encoding='utf-8') as f:
        json.dump(rezervacije, f, ensure_ascii=False, indent=2)

    return jsonify({"status": "obrisano", "id": id})

if __name__ == '__main__':
    app.run(debug=True)
