# TASKS LIST APP

## Installation guide

- Clone the repository
- Run from both directories `npm install` or `yarn` to install both app dependencies
- Run from both directories `npm start` or `yarn start` to start both apps

## Database setup

- Change the database URL from `.env` file.
- Now you are ready to go.

##### Open `http://localhost:5000` in your browser to see the backend app running.

## Packages used

- express (Express used as a web framework)
- mongodb (MongoDB used as a nosql database)
- Mongoose (Mongoose used as an ODM)
- connect-flash (Connect-flash used to flash messages)
- express-session (Express-session used to manage sessions)
- express-validator (Express-validator used to validate form data)
- method-override (Method-override used to override HTTP methods)
- EJS (EJS used as a templating engine)
- nodemon (Nodemon used to restart the server on file changes)

# Features

- MVC architecture
- ODM by using Mongoose
- MongoDB NoSQL database
- Models
- Views
- Controllers
- Request validation / Requests
- Routes
- Session Flash Messages
- Method Override
- View Engine / Templating Engine
- Error Handling
- 404 Error Handling
- 500 Error Handling
- etc & more

## Backend endpoints

- GET `/tasks` - Get all tasks
- POST `/tasks` - Create a new task
- GET `/tasks/:id` - Get a task by id
- GET `/tasks/:id/edit` - Get a task by id to edit
- PUT `/tasks/:id` - Update a task by id
- DELETE `/tasks/:id` - Delete a task by id

**Note:** The backend app is configured to use PORT 5000. Make sure that this port is not used by any other apps on your
machine.

<h1 style="text-align: center;">
    Thanks for reading and happy coding!
</h1>
