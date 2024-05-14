In your CLI, execute the following:

1. Go to project directory `cd /path/to/your/capstone`  
2. Create virtual environment `python -m venv venv`  
3. Activate virtual environtment: 
    - for windows: `venv/Scripts/activate` ; 
    - for Unix/MacOS: `source venv/bin/activate`  
4. Download all requirements `pip install -r requirements.txt`  

6. Django directory `cd capstone`
7. Makemigrations `python manage.py makemigrations backend`
8. Miigrate `python manage.py migrate`
9. Load initial language data to Language model `python manage.py loaddata languages`

10. Run Django server `python manage.py runserver`  

11. React directory `cd frontend`  
12. Download all modules `npm install`  
13. Run React server `npm run dev`  
