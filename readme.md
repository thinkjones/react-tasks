# React-Tasks
A React Tasks app that uses Postgres and a REST API. Demonstrates how to setup a front end and backend.

# Setup

Setup using Node 18 via [Node Version Manager nvm](https://github.com/nvm-sh/nvm).

## Postgres
Requires Postgres 15 [install link](https://www.postgresql.org/download/macosx/). Installed here using docker  [link](https://labs.thisdot.co/blog/connecting-to-postgresql-with-node-js): 
```
docker run -itd -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 --name postgres postgres 
```
Init db:
```
docker cp ./scripts/dbinit.sql postgres:/dbinit.sql
docker exec -ti -u postgres postgres psql -f dbinit.sql
```

Seed db with data:
```
npx ts-node -r tsconfig-paths/register -r dotenv/config scripts/seed
```

## Backend
Run install from root dir:
```
yarn install
```

## Frontend
Exists in `client/tasks-web-app`. Run install from root dir:
```
cd client/tasks-web-app
yarn install
```

You don't need to run this but the project was created using VITE.
```
cd client
yarn create vite task-web-app --template react-ts
```

# Run Application

## Start Postgres
```
docker start postgres
```

## Start server
```
# From root dir
yarn dev
```

## Start Web App
```
cd client/task-web-app
yarn dev
```
Stars here [http://localhost:5173/](http://localhost:5173/)

# Tech Stack
| Item                 | Implementation      |
|----------------------|---------------------|
| Server Environment   | Node                |
| Database             | Postgres via Docker |
| Web Server           | Express             |
| API Type             | REST                |
| ORM Layer            | TypeOrm             |
| Frontend Tooling     | Vite                |
| Frontend Framework   | React               |
| Frontend REST Client | Axios               |
| Frontend UI Library  | AntD                |

# TODOs
* Productionize code - this is more a prototype I would tidy it up a lot more, add tests etc.
* Pagination - No pagination on tasks.
* Sorting - Client side - would move to server.
* Testing - There are no tests would add some front and back.
* Auth - There is no authentication would add and store data with userId - at present there is none.





