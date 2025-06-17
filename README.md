backend:
cd integrador-perfeito
cd integrador-back
py -m venv env
env\scripts\activate 
pip install -r requirements.txt
py manage.py runserver 

frontend: 
cd integrador-perfeito
cd front
npm i -g pnpm
pnpm i
npm start
