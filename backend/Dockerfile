# 1. Base Image
FROM node:20-alpine

# 2. Arbeitsverzeichnis erstellen
WORKDIR /usr/src/app

# 3. Package.json & Package-lock kopieren
COPY package*.json ./

# 4. Abhängigkeiten installieren
RUN npm install

# 5. App Code kopieren
COPY . .

# 6. TypeScript kompilieren
RUN npm run build

# 7. Port freigeben
EXPOSE 3001

# 8. Start Command
CMD ["npm", "run", "start:prod"]
