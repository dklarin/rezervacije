## Instalacija i pokretanje

### Server

1. Uđi u `server` direktorij
2. Kreiraj virtualno okruženje: 
    `py -m venv venv`
3. Aktiviraj virtualno okruženje: 
    - **Windows (PowerShell):** `venv/scripts/activate.ps1`
    - **Windows (CMD):** `venv/Scripts/activate.bat`
    - **Linux/Mac:** `source venv/bin/activate`
4. Instaliraj zavisnosti: 
    `pip install -r requirements.txt`
5. Pokreni server: 
    `py app.py`

### Klijent

1. Uđi u `klijent` direktorij
2. Instaliraj zavisnosti: 
    `yarn install`
3. Pokreni klijent:
    `yarn start`
    