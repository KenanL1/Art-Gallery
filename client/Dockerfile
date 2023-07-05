# Use a Node base image
FROM node

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_HUGGINGFACE_KEY
ENV VITE_HUGGINGFACE_KEY=$VITE_HUGGINGFACE_KEY

# Set working directory
WORKDIR /client

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source 
COPY . .

# Specify the port the node app will be running on
EXPOSE 3000

# Run app
CMD ["npm", "run", "dev"]
