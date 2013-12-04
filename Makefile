all:
	$(MAKE) install
	cat ./shared/*.js ./client/*.js | uglifyjs > ./public/game.js

dev:
	cat ./shared/*.js ./client/*.js > ./public/game.js

install:
	npm install

clean:
	rm ./public/game.js

