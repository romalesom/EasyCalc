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

# 7. TypeORM-Migrationen ausführen (das ist der neue, entscheidende Schritt)
RUN npm run migration:run

# 8. Port freigeben
EXPOSE 3001

# 9. Start Command
CMD ["npm", "run", "start:prod"]
