# ugram-h2020-team-08

**Abstract**\
This project is split between two main targets, the Ract Frontend and the Backend API

# Frontend directory
`cd app`

# Backend directory
`cd api`

## Project setup
There are two ways to run this project:
- With Docker: you need Docker and Docker-compose installed.
- With NodeJS: you need NodeJS, Npm and MongoDB installed.

## Run Project
- ### The docker-compose way :
__WARNING : if you run the project with docker-compose, you might not be able to run it the NodeJS way with the same Database because the owner of some DB files can change.__\
If you have docker and docker-compose installed, and have a running docker-daemon, you can run the project the easy way by opening a terminal at the root of the project and running :
```bash
docker-compose up --build
```

- ### The standard way :
Open a terminal at the root of the project, install all the dependencies:
```
cd ./api && npm install && cd ../ app && npm install && cd ..
```
Then, open a terminal in /app , one in /api and one where you want your database to be.\
In this last one run the mongo daemon pointing it to the project's database :
```bash
mongod --dbpath ./data
```
In the the api terminal, run the the following commands :
```bash
export DB_HOST=127.0.0.1
npm run start
```
And in the app terminal, start the app :
```bash
npm run start
```
