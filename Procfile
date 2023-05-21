web: node build/server.js
release: node build/ace migration:run --force
postbuild: node ace swagger:generate && cp -a docs/ build/docs