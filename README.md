## Getting Started


### First, up the DB docker image and config env variables:

```
docker-compose up -d
```
rename __.env.template__ file to __.env__

* Set Local MongoDB URL
```
MONGO_URL=mongodb://localhost:27017/tesloDB
```

### Then, you need to install dependencies and run the app
```bash
yarn install
yarn dev
```

### Finally, you can fill the DB with test data
```bash
http://localhost:3000/api/seed
```
