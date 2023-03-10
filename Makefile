dev:
	cp environments/development .env
	yarn dev

start:
	cp environments/development .env
	yarn build
	yarn start
