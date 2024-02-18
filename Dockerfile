# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY package*.json ./
# COPY .npmrc /app/.npmrc

RUN npm install
COPY . .
COPY nginx.conf ./
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

ENV BACKEND_API_URL backend
RUN sed -i "s|backend_host|$BACKEND_API_URL|g" -i /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
