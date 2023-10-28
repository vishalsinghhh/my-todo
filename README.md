# My Todo - A Task Board Application
#### Description
My Todo is a task board application that allows users to manage their tasks using a user-friendly interface. It is designed with HTML draggable properties and built with Node.js, Express.js, React, and uses PostgreSQL with Sequelize for the database. The application provides the following features:

## Project Status
Success. Demo link is given below...
<br/>
<a href="https://my-pro-todolist.netlify.app/" target="_blank">Link</a>
<br/>

## Key Features
- **User Authentication:**
- Users can create an account by providing a unique username and a password.
- User credentials are stored securely in the database.
- **Task Lists:**
- Users can create and manage multiple task lists.
- Each task list is stored in the database, associated with the user who created it.
- **Task Management:**
- Tasks are draggable, allowing users to move them from one list to another.
- When a task is moved to another list, the application updates the list ID in the database.
- **Horizontal Scrolling:**
- Users can scroll through multiple task lists horizontally, making it easy to organize and view tasks across different lists.
- **Task Completion:**
- Users can mark tasks as completed, which removes them from the active task list.
- Completed tasks are still stored in the database for reference.
## Technologies Used
- **Node.js:** The application's backend is built using Node.js to handle server-side operations.
- **Express.js:** Express.js is used to create a robust and efficient API for the application.
- **React:** The frontend is developed using React to provide a dynamic and interactive user interface.
- **PostgreSQL:** The application uses PostgreSQL as the relational database to store user data, task lists, and tasks.
- **Sequelize:** Sequelize, a Node.js ORM, is used to interact with the PostgreSQL database, providing an easy way to manage database operations.

