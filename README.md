# Art Gallery (Muse)

The platform is designed for users to create, upload, share, and discover AI-generated artwork using various models. With a user-friendly interface that includes a homepage displaying posts from all users, a profile page to view personal and liked posts, a creation page for generating unique AI art, and a login/register page, users can easily connect with other artists and share their creations.

OpenAI and Stable Diffusion text-to-image API to generate one-of-a-kind images based on textual prompts, and users can follow others, "like" posts, and even download images to save them.

Uses API from https://huggingface.co/runwayml/stable-diffusion-v1-5

This project is for my learning of React, Node, Tailwind, Redux, and Typescript
[Demo](https://art-gallery-client-esmz7zszta-uc.a.run.app)

### Setup

To run this project, you will need to have [Node.js](https://nodejs.org/) installed on your system or follow the steps with Docker below

#### Server Setup

Install the dependencies and start the **server**

```
cd server
npm install
npm start
```

#### Client Setup

Install the dependencies and start the **client**

```
cd client
npm install
npm run dev
```

You can access the website by going to http://localhost:3000/

### Tech Stack

- MERN (MongoDB/Mongoose, Express, React, Node)
- Javascript/Typescript
- Tailwind
- Redux
- Vite
- Passport (Authentication)
- Docker (Container)

To build our application, we chose to use the **MERN stack**, which consists of **MongoDB, Express.js, React, and Node.js**. This allowed us to use a unified set of technologies (JS/TS) for both the frontend and backend, streamlining development and reducing the complexity of the application architecture. By building a **Single Page Application (SPA)**, we were able to take advantage of reusable components, which increased efficiency and reduced development time. SPAs load only once and dynamically update content through **client-side rendering**, paired with React's virtual DOM results in a faster and more responsive applicatitons that is both engaging and seamless.

**TypeScript** provides static type-checking, which can help to catch errors early in the development process and make code more robust and reliable.

As a **NoSQL database, MongoDB** stores data in flexible, JSON-like documents rather than predefined tables. This allows for more adaptable data modeling, making it easier to manage complex data structures and accommodate changes in data requirements. Additionally, MongoDB is designed to handle high volumes of data and traffic, making it a scalable choice for applications with large user bases or data requirements.

**Tailwind CSS** provides a set of pre-designed classes that can be utilized to style an application. This approach maintains a consistent naming convention, reduces the amount of CSS code to write, and simplifies the maintenance of the codebase. Additionally, it facilitates the creation of intricate responsive layouts, and enhances the speed of the development process.

**Vite** uses an optimized build pipeline that leverages native ES modules, resulting in faster builds and smaller bundle sizes. Vite supports HMR Hot Module Replacement (HMR), which allows developers to update code changes in real-time without refreshing the page.

### State Management

**Redux** store provides a centralized way to manage global states across an application, which simplifies data sharing and updates.

### Authentication

By incorporating **JWT (JSON Web Token) authentication** using PassportJS, our web application benefits from a secure and flexible user authentication method that improves performance and scalability.

Stateless authentication: JWT authentication is stateless, which means that the server does not need to store session information for each user. This makes it easier to scale applications and improves performance.

Reduced server load: Because JWTs are self-contained, the server does not need to query a database or perform other expensive operations to authenticate each request. This reduces server load and improves performance.

Improved security: JWTs are encrypted and signed, which makes them difficult to tamper with or forge. This helps to prevent unauthorized access and protects sensitive data.

### Docker Container

Docker containers provide a powerful and flexible way to package, deploy, and manage applications. This repository includes Dockerfiles for both the client and server projects, allowing you to easily create a Docker image and run the application through a Docker container.

#### Prerequisites

Before getting started, make sure the following software is installed on your machine: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

#### Building and Running the Server Docker Image

To build and run the server Docker image from the command line, navigate to the `server` directory and run the following commands:

```
cd server
docker build -t server .
docker run --name server -d -p 5000:5000 server
```

This will create a Docker image named `server` and start a Docker container named `server`, which will run on port `5000`.

#### Building and Running the Client Docker Image

To build and run the client Docker image from the command line, navigate to the `client` directory and run the following commands:

```
cd client
docker build -t client .
docker run --name client -d -p 3000:3000 client
```

This will create a Docker image named `client` and start a Docker container named `client`, which will run on port `3000`.

#### Viewing Built Images and Active Containers

To view all built Docker images, run the following command:

```
docker image ls
```

To view all active Docker containers, run the following command:

```
 docker ps -a
```
