# AI Art Generator

The platform is designed for users to create, share and post AI-generated artwork using various models. It includes a homepage that displays posts from all users, a creation page for generating personal AI art, and a login/register page.

Uses OpenAI and Stable Diffusion text-to-image API to generate unique images via text prompt

### Tech Stack

By leveraging the **MERN stack (MongoDB, Express.js, React, Node.js)** to create a **Single Page Application (SPA)**, developers can achieve a more engaging and seamless user experience. With dynamic content updates and reusable components, users can enjoy a faster and more responsive application that is easy to use and navigate.

**TypeScript** provides static type-checking, which can help to catch errors early in the development process and make code more robust and reliable.

### State Management

**Redux** store provides a centralized way to manage global states across an application, which simplifies data sharing and updates.

### Authentication

By incorporating **JWT (JSON Web Token) authentication** using PassportJS, our web application benefits from a secure and flexible user authentication method that improves performance and scalability.

Stateless authentication: JWT authentication is stateless, which means that the server does not need to store session information for each user. This makes it easier to scale applications and improves performance.

Reduced server load: Because JWTs are self-contained, the server does not need to query a database or perform other expensive operations to authenticate each request. This reduces server load and improves performance.

Improved security: JWTs are encrypted and signed, which makes them difficult to tamper with or forge. This helps to prevent unauthorized access and protects sensitive data.
