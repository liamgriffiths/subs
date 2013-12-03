all:
	npm install
	cat ./shared/*.js ./client/*.js | uglifyjs > ./public/game.min.js

clean:
	rm ./public/game.min.js

