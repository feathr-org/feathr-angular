FROM node:14.19 as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist /usr/share/nginx/html
EXPOSE 80
