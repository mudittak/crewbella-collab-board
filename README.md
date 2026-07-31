# CrewBella CollabBoard

CrewBella CollabBoard is a real-time collaborative bulletin board application where users can create and delete notes, with changes synchronized instantly across connected users.

## Live Application

https://crewbella-api-mudit.azurewebsites.net/

## GitHub Repository

https://github.com/mudittak/crewbella-collab-board

## Features

- Create collaborative notes
- Delete notes
- Real-time updates using Socket.IO
- Persistent data storage using MongoDB
- REST API using Node.js and Express.js
- React frontend built with Vite
- Single production URL for the complete application
- Cloud deployment using Microsoft Azure
- Automated CI/CD deployment using GitHub Actions
- Secure Azure authentication using GitHub Actions OIDC

## Technology Stack

- Frontend: React, Vite, CSS
- Backend: Node.js, Express.js
- Real-time Communication: Socket.IO
- Database: MongoDB
- Cloud Platform: Microsoft Azure
- Hosting: Azure App Service
- CI/CD: GitHub Actions
- Authentication: Microsoft Entra ID Federated Identity Credentials (OIDC)

## Architecture Brief

The application follows a client-server architecture where the React frontend and Node.js backend are deployed together through a single Azure App Service.

The frontend is developed using React and Vite. During the deployment process, the React application is built into production files. The Express.js backend serves these production frontend files, allowing users to access the complete application through a single production URL.

The Node.js and Express.js backend provides REST API endpoints for creating, retrieving, and deleting collaborative notes. The backend also manages Socket.IO connections to provide real-time communication between connected users.

MongoDB is used as the persistent database for storing collaborative notes. The backend connects to MongoDB using the configured MongoDB connection string.

Socket.IO enables real-time synchronization between multiple users. When a note is created or deleted, the corresponding event is emitted to connected clients so that changes are reflected without requiring users to manually refresh the page.

The complete application is hosted on Microsoft Azure App Service. Using a single App Service for serving both the frontend and backend keeps the deployment simple and cost-efficient while providing one shareable production URL.

The backend is designed to remain stateless, while persistent application data is maintained in MongoDB. This separation allows the application to be scaled by increasing Azure App Service resources or using additional instances when required.

GitHub Actions is used for CI/CD automation. Changes pushed to the main branch trigger the deployment workflow. The workflow checks out the source code, installs dependencies, builds the frontend, authenticates securely with Azure using Microsoft Entra ID Federated Identity Credentials (OIDC), and deploys the full-stack application to Azure App Service.

GitHub Actions OIDC authentication avoids storing long-lived Azure credentials in GitHub and provides a secure mechanism for automated cloud deployment.

## API Endpoints

### Health Check

GET `/api/health`

Returns the current health status of the backend.

### Get Posts

GET `/api/posts`

Retrieves all collaborative notes.

### Create Post

POST `/api/posts`

Creates a new collaborative note.

### Delete Post

DELETE `/api/posts/:id`

Deletes a collaborative note.

## Deployment

The complete application is deployed to Microsoft Azure App Service using GitHub Actions.

Production URL:

https://crewbella-api-mudit.azurewebsites.net/

The same URL serves the React frontend and provides access to the backend API.

## CI/CD Workflow

The GitHub Actions deployment pipeline performs the following steps:

1. Checkout the source code from GitHub.
2. Set up the Node.js environment.
3. Install project dependencies.
4. Build the React frontend for production.
5. Authenticate securely with Microsoft Azure using GitHub OIDC.
6. Deploy the full-stack application to Azure App Service.

The workflow is triggered by changes pushed to the main branch and can also be manually triggered when required.

## Project Structure

```
crewbella-collab-board/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── socket.js
│   │   └── server.js
│   └── package.json
│
└── .github/
    └── workflows/
        └── deploy-backend.yml
```

## Conclusion

CrewBella CollabBoard demonstrates a real-time collaborative web application deployed to the cloud using Microsoft Azure. The application combines React, Node.js, Express.js, MongoDB, and Socket.IO with an automated GitHub Actions CI/CD pipeline.

The frontend and backend are served through a single Azure App Service, providing a simple and convenient production deployment with one shareable URL.