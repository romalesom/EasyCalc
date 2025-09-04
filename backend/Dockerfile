# --- Stage 1: Build-Umgebung ---
FROM node:20-alpine as builder

# 1. Arbeitsverzeichnis festlegen
WORKDIR /app

# 2. Package-Manifeste kopieren, um Caching zu nutzen
COPY package*.json ./

# 3. Abhängigkeiten für den Build-Prozess installieren
RUN npm ci

# 4. Quellcode kopieren
COPY . .

# 5. Anwendung kompilieren
RUN npm run build

# --- Stage 2: Produktions-Umgebung ---
FROM node:20-alpine

# 1. Arbeitsverzeichnis festlegen
WORKDIR /app

# 2. Package-Manifeste aus der Builder-Phase kopieren
COPY --from=builder /app/package*.json ./

# 3. Nur die Produktionsabhängigkeiten installieren
RUN npm install --omit=dev

# 4. Kompilierten Code aus der "builder"-Phase kopieren
COPY --from=builder /app/dist ./dist

# 5. Non-Root-Benutzer für verbesserte Sicherheit anlegen und verwenden
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# 6. Port freigeben
EXPOSE 3001

# 7. Startbefehl für die produktionsreife Anwendung
CMD ["node", "dist/main.js"]