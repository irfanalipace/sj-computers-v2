# # Stage 1: Build image
FROM  public.ecr.aws/docker/library/node:20-slim AS base
ENV VITE_APP_URL=/ 
ENV VITE_APP_API_BASE_URL=/api 
COPY . /app
WORKDIR /app
# COPY ./etc/.env /app/.env

RUN npm install -g pnpm 
RUN pnpm i --prod
RUN pnpm run build

FROM public.ecr.aws/docker/library/nginx:1.21.6-alpine as prod 
# COPY ./dev/config/nginx-site.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=base /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# CMD ["/bin/sh" , "-c" , "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]