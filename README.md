# To Do list

Simple To Do list created with Vite + React, using Node-persist for storage for the tasks. Enter a task in the input field and press Enter or click the "Add task" button to add it to the list.

# Installation

- Clone the repository.
- Navigate to the backend directory.
- Run `npm install` to install dependencies.
- Run `node index.js` to start the backend server.
- Navigate to the frontend directory.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start the backend server.

Access the application at `http://localhost:5173` in your browser.

# Endpoints

`GET /todos`
Get an array of all stored Todo tasks along with their IDs

`POST /todos`
Store a task along with it's ID in the storage
