# Use Node.js 14 LTS as base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN npm run build

# Expose the port that your app runs on (for example, 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "serve"]
