# Start from the official n8n image
FROM n8nio/n8n:latest

# Switch to root user to install packages
USER root

# Set the working directory for the custom node installation
WORKDIR /home/node/.n8n/custom

# --- SMB Suite (merged Startpoint + UI Events nodes) ---
COPY package*.json ./
RUN npm install --include=dev --silent
COPY . .
RUN npm run build
RUN npm prune --omit=dev --silent

# Set proper ownership of the custom node files
RUN chown -R node:node /home/node/.n8n/custom

# Switch back to the node user for security
USER node

# Set the working directory back to n8n default
WORKDIR /home/node

# n8n will auto-discover and load both custom nodes from /home/node/.n8n/custom
