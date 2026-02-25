lint-frontend:
	make -C frontend lint

install:
	npm ci && npm --prefix ./frontend ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist -p 5050

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/dist
	npm run build