FROM node:14.15.0

WORKDIR /usr/src/app/

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm cache clean --force \
    && rm -rf node_modules \
    && npm update \
    && npm install
COPY ./ ./

EXPOSE 4200
CMD ["npm", "start"]
# FROM node:16.3.0-alpine AS build
# WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
# RUN rm -rf node_modules && npm install
# COPY . .
# RUN npm run

# FROM nginx:latest
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/src /usr/share/nginx/html
# EXPOSE 4200