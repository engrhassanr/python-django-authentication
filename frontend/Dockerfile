# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the entire frontend project
COPY . .

# Expose port
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
