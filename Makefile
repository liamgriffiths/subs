all:
	npm install
	cat ./shared/*.js ./client/*.js | uglifyjs > game.min.js

clean:
	rm ./game.min.js

