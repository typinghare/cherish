INDEX_FILE = src/index.ts

all: $(INDEX_FILE)
	tsc

version:
	ts-node $(INDEX_FILE) --version

server:
	ts-node $(INDEX_FILE) server

new:
	ts-node $(INDEX_FILE) new
