#!/bin/bash

echo "remove database"
rm db.sqlite3

echo "create log folder"

mkdir log

echo "remove migrations"
rm -r authentication/migrations/
rm -r auto_course/migrations/
rm -r xkxt/migrations/
rm -r forum/migrations/
rm -r online_testing/migrations/
rm -r score_management/migrations/

python3 manage.py makemigrations --empty authentication
python3 manage.py makemigrations --empty auto_course
python3 manage.py makemigrations --empty xkxt
python3 manage.py makemigrations --empty forum
python3 manage.py makemigrations --empty online_testing
python3 manage.py makemigrations --empty score_management

echo "make migrations"

python3 manage.py makemigrations

echo "migrate"

python3 manage.py migrate authentication
python3 manage.py migrate

