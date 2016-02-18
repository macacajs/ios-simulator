git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= $$(npm bin)
REQUIRED = --require should
TESTS = test

BIN = iojs

ifeq ($(findstring io.js, $(shell which node)),)
	BIN = node
endif

all: test
install:
	@npm install
test: install
	@NODE_ENV=test $(BIN) $(FLAGS) \
		${npm_bin}/istanbul cover ${npm_bin}/_mocha
travis: install
	@NODE_ENV=test $(BIN) $(FLAGS) \
		${npm_bin}/istanbul cover	${npm_bin}/_mocha --report lcovonly
jshint:
	@${npm_bin}/jshint .
.PHONY: test
