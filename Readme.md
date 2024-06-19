# Ageman Server

### Instalation and Usage Steps

1. Prepare the environment, clone this repo

```sh
git clone https://github.com/Ageman-Capstone/server-api.git
```

2. Install project dependencies

```sh
npm install
```

3. Setup docker

```sh
docker compose up -d
```

4. Check docker is running

```sh
docker ps
```

5. Run this. Whenever you make changes to your database that are reflected in the Prisma schema, you need to manually re-generate Prisma Client to update the generated code in the `node_modules/.prisma/client` directory and update the `migration`:

```sh
npx prisma generate
```

```sh
npx prisma migrate dev
```

6. Run the project

```sh
npm run dev
```
