# Start from the official n8n image
FROM n8nio/n8n:latest

# Switch to root user to install packages
USER root

# Set the working directory for the custom node installation
WORKDIR /home/node/.n8n/custom/Startpoint_node

# Copy package files first to leverage Docker build cache
COPY Startpoint_node/package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm install --include=dev --silent

# Copy source files for building
COPY Startpoint_node/. .

# Build the project (compile TypeScript)
RUN npm run build

# Remove dev dependencies for a leaner runtime image
RUN npm prune --omit=dev --silent

# Set proper ownership of the custom node files
RUN chown -R node:node /home/node/.n8n/custom

# Switch back to the node user for security
USER node

# Set the working directory back to n8n default
WORKDIR /home/node

# The n8n container will automatically discover and load the custom node
# from /home/node/.n8n/custom when it starts
