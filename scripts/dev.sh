#!/bin/sh

pip install Pillow
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0:8000
