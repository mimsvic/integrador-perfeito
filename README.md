backend:
py -m venv env
env\scripts\activate 
pip install -r requirements 

frontend: 
npm i -g pnpm
pnpm i
npm start
