# Backend
## Setup Postgres
Requires Postgres 15 [install link](https://www.postgresql.org/download/macosx/). Installed here using docker  [link](https://labs.thisdot.co/blog/connecting-to-postgresql-with-node-js): 
```
docker run -itd -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 --name postgres postgres 

```
Init db:
```
docker cp ./scripts/dbinit.sql postgres:/dbinit.sql
docker exec -ti -u postgres postgres psql -f dbinit.sql
```

## Start Postgres
```
docker start postgres
```

## Start server
```
yarn dev
```

# Web FrontEnd
## Seed project
You don't need to run this but the project was created using VITE.
```
cd client
yarn create vite task-web-app --template react-ts
```

## Run Project
```
cd client/task-web-app
yarn install
yarn dev
```
Stars here [http://localhost:5173/](http://localhost:5173/)
