# ugram-h2020-team-08

# Run the app

Before running the app, make sure that you're docker container are down : `docker-compose down`.

You should have an issue `Error: Cannot find module './DirectoryWatcher'`, in this case, shut down docker and restart it, it should fix it.

`docker-compose build && docker-compose up`

# API Documentation

You can see the API documentation [here](https://github.com/GLO3112-classrooms/ugram-h2020-team-08/wiki/API-Documentation)

## Project setup
There are two ways to run this project:
- With Docker: you need Docker and Docker-compose installed.
- With NodeJS: you need NodeJS, Npm and MongoDB installed.

# Features list

* First, you need to register an account to access the app. Or login yourself if you already have an account.
* In the Home page, you can see the list of users (disabled if there is no other users than you). When you click on a user, you can see his profil.
* In the Home page, you can see the list of publications, ordered by time.
* Click "Profil" button to access to your profil and see your publications.
* Click on a publication to see its details (description, hashtags, etc...).
* To mention a user, the username must be registered to the app.
