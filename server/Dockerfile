# Use a Node base image
FROM node

ARG CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME

ARG CLOUDINARY_API_KEY
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY

ARG CLOUDINARY_API_SECRET
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY

ARG MONGODB_URL
ENV MONGODB_URL=$MONGODB_URL

# Set working directory
WORKDIR /server

COPY id_rsa_pub.pem ./
COPY id_rsa_priv.pem ./

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source 
COPY . .

# Specify the port the node app will be running on
EXPOSE 5000

# Run app
CMD ["npm", "start"]
