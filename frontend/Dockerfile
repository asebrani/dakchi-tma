FROM node:lts-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all source files
COPY . .

EXPOSE 5173

# Run Vite dev server (host 0.0.0.0 is set in vite.config.ts)
CMD ["npm", "run", "dev"]