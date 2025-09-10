# Start from the official n8n image
FROM n8nio/n8n:latest

# Switch to root user to install packages
USER root

# Set the working directory for the custom node installation
WORKDIR /home/node/.n8n/custom

# --- Startpoint node ---
WORKDIR /home/node/.n8n/custom/Startpoint_node
COPY Stratpoint_N8N/Startpoint_node/package*.json ./
RUN npm install --include=dev --silent
COPY Stratpoint_N8N/Startpoint_node/. .
RUN npm run build
RUN npm prune --omit=dev --silent

# --- UI Spike node ---
WORKDIR /home/node/.n8n/custom/ui-spike-n8n
COPY ui-spike-n8n/package*.json ./
RUN npm install --include=dev --silent
COPY ui-spike-n8n/. .
RUN npm run build
RUN npm prune --omit=dev --silent

# Set proper ownership of the custom node files
RUN chown -R node:node /home/node/.n8n/custom

# Switch back to the node user for security
USER node

# Set the working directory back to n8n default
WORKDIR /home/node

# n8n will auto-discover and load both custom nodes from /home/node/.n8n/custom
