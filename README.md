# Task Manager - Server-Side Application

The Task Manager server-side application is built using Node.js and Express to handle tasks such as user authentication, task management, and communication with a MongoDB database. It provides the backend functionality for the TaskFlow application, handling API requests, managing user sessions, and storing tasks.

## Features

- **User Authentication:** JWT-based authentication for secure login and session management.
- **Task Management:** Add, update, delete, and retrieve tasks.
- **Database Integration:** MongoDB is used to store user and task data.
- **Cross-Origin Resource Sharing (CORS):** Ensures secure cross-origin requests from the frontend.
- **Environment Variables:** Uses `dotenv` for managing environment configurations like database URIs and JWT secrets.

## Live Link

Currently, there is no live link for the server-side, as it's typically run locally or deployed via services like Heroku or AWS.

## Technologies Used

- **Node.js:** JavaScript runtime for building the server.
- **Express:** Web framework for Node.js to simplify route handling and middleware usage.
- **MongoDB & Mongoose:** MongoDB database for persistent storage and Mongoose for interacting with the database.
- **JWT (JSON Web Token):** For secure user authentication.
- **dotenv:** To manage environment variables.
- **cookie-parser:** To parse cookies in incoming requests.
- **CORS:** Middleware to allow secure cross-origin requests.

## Installation

Follow these steps to set up the server locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/Chanbadsha/TaskFlowServer.git
    ```

2. Navigate to the project directory:

    ```bash
    cd task-manager-server
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file at the root of the project and configure the following environment variables:

    ```bash
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

5. Start the server in development mode:

    ```bash
    npm run dev
    ```

6. The server will run at [http://localhost:5000](https://task-manager-orcin-rho-31.vercel.app).

## Dependencies

- `cookie-parser`: Middleware to parse cookies in incoming requests.
- `cors`: Middleware for enabling CORS (Cross-Origin Resource Sharing).
- `dotenv`: Loads environment variables from a `.env` file.
- `express`: Web framework for building the server.
- `jsonwebtoken`: To generate and verify JWT tokens for user authentication.
- `mongodb`: MongoDB Node.js driver for connecting to MongoDB.
- `mongoose`: Mongoose library for interacting with MongoDB.

## Scripts

- `start`: Starts the server using Node.js.
  
    ```bash
    npm start
    ```

- `dev`: Starts the server in development mode with `nodemon`, which automatically restarts the server on file changes.
  
    ```bash
    npm run dev
    ```

- `test`: Placeholder script for testing (currently not implemented).
  
    ```bash
    npm run test
    ```

## How to Contribute

Feel free to fork the repository, make changes, and create pull requests. We welcome contributions to enhance the server-side functionality and improve security, performance, and scalability.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
