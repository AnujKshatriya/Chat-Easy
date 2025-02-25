# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire frontend code
COPY . .

# Build frontend (Vite or React)
RUN npm run build

# Expose frontend port
EXPOSE 5173

# Serve frontend using Vite
CMD ["npm", "run", "dev"]
