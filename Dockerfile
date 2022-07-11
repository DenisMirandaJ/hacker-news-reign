FROM node:16.16
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
# COPY .env* ./
COPY . .    
RUN rm -r .env
RUN file="$(pwd)" && echo $file
RUN file="$(ls -1 ./)" && echo $file
RUN npm install
RUN npm install --save pm2
EXPOSE 3000
RUN npm run prebuild
RUN npm run build
RUN file="$(ls -1 ./)" && echo $file
RUN file="$(ls -1 ./dist)" && echo $file
RUN file="$(printenv)" && echo $file
# RUN node ./dist/main.js