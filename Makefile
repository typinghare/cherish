INDEX_FILE = src/index.ts
INDEX_FILE_JS = dist/index.js

all: $(INDEX_FILE)
	tsc

version:
	ts-node $(INDEX_FILE) --version

server:
	ts-node $(INDEX_FILE) server

new:
	ts-node $(INDEX_FILE) new key value

js-new:
	node $(INDEX_FILE_JS) new key value
