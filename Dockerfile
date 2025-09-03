# Start from the official n8n image
FROM n8nio/n8n:latest

# Switch to root user to install packages
USER root

# Set the working directory for the custom node installation
WORKDIR /home/node/.n8n/custom

# Copy package files first to leverage Docker build cache
COPY package*.json ./

# Install production dependencies only
RUN npm install --production --silent

# Copy the compiled distribution files
COPY dist/ ./dist/

# Copy additional files needed for the node
COPY index.js ./

# Set proper ownership of the custom node files
RUN chown -R node:node /home/node/.n8n/custom

# Switch back to the node user for security
USER node

# Set the working directory back to n8n default
WORKDIR /home/node

# The n8n container will automatically discover and load the custom node
# from /home/node/.n8n/custom when it starts