FROM node:20-alpine 

# Set the working directory
WORKDIR /.

# Copy package.json and package-lock.json
COPY *.json  .

# installing dependencies
RUN npm install

# Copy the application files
COPY . .

#Building application
RUN npm run build 

# Set port for container listening
EXPOSE 5000
# Start the application
CMD [ "npm", "start" ]
