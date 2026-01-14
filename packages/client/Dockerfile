FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./
COPY packages/client/package.json ./packages/client/

RUN bun install

COPY packages/client ./packages/client

WORKDIR /app/packages/client
RUN bun run build


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/packages/client/dist /usr/share/nginx/html

COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
