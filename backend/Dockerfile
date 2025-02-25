# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire backend code
COPY . .

# Expose backend port
EXPOSE 3000

# Define environment variable file
ENV NODE_ENV=production

# Start the backend server
CMD ["node", "index.js"]
