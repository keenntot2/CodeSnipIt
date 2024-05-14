In your CLI, execute the following:

1. Go to project directory `cd /path/to/your/capstone`  
2. Create virtual environment `python -m venv venv`  
3. Activate virtual environtment: 
    - for windows: `venv/Scripts/activate` ; 
    - for Unix/MacOS: `source venv/bin/activate`  
4. Django directory `cd capstone`
5. Download all requirements `pip install -r requirements.txt` 
6. Makemigrations `python manage.py makemigrations backend`
7. Migrate `python manage.py migrate`
8. Load initial language data to Language model `python manage.py loaddata languages`
9. Run Django server `python manage.py runserver`  
10. React directory `cd frontend`  
11. Download all modules `npm install`  
12. Run React server `npm run dev`  
