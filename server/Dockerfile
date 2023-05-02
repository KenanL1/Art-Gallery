# Use a Node base image
FROM node

# Set working directory
WORKDIR /server

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source 
COPY . .

# Specify the port the node app will be running on
EXPOSE 5000

# Run app
CMD ["npm", "start"]