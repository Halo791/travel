# Run on Server

This project is ready to run on a server at `https://travel.ingenio.id` with Docker Compose and Traefik.

## 1. DNS

Point `travel.ingenio.id` to the public IP address of the server.

If the domain is behind Cloudflare, use one of these options:

- Set SSL/TLS mode to `Full` or `Full (strict)`.
- Keep ports `80` and `443` open on the server firewall.
- Temporarily disable the orange-cloud proxy while issuing the first Let's Encrypt certificate if HTTP challenge fails.

## 2. Environment

Copy the example environment file:

```sh
cp .env.server.example .env
```

Generate an app key:

```sh
echo "base64:$(openssl rand -base64 32)"
```

Paste the generated value into `APP_KEY` in `.env`.

## 3. Start

```sh
docker compose -f docker-compose.server.yml up -d --build
```

For older Compose installations:

```sh
docker-compose -f docker-compose.server.yml up -d --build
```

## 4. Check

```sh
docker compose -f docker-compose.server.yml ps
curl -I https://travel.ingenio.id
curl https://travel.ingenio.id/api/home
```

The Laravel backend uses SQLite stored in the `backend-storage` Docker volume. Migrations run automatically on container start, and seed data runs once.
