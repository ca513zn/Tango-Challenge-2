### Rose Parade web application using django rest framework

The default admin username and password is:
```
carlos123
```

In the root folder of the project ( folder containing requirements.txt and manage.py)
run:
```
pip install -r requirements.txt
```

### For a fresh install run:
```
python manage.py makemigrations
```
### Then run
```
python manage.py migrate
```
### This will create the necessary tables in the database

### To create a superuser
python manage.py createsuperuser

### Then run:
```
python manage.py runserver
```