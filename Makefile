INDEX_FILE = src/index.ts
INDEX_FILE_JS = dist/index.js

all: $(INDEX_FILE)
	tsc

version:
	ts-node $(INDEX_FILE) --version

server:
	ts-node $(INDEX_FILE) server start | pino-pretty

new:
	ts-node $(INDEX_FILE) new key value

js-new:
	node $(INDEX_FILE_JS) new key value

config:
	ts-node $(INDEX_FILE) config

config-convention:
	ts-node $(INDEX_FILE) config --level convention

config-user:
	ts-node $(INDEX_FILE) config --level user
