creating a volume

```docker volume create volume-name ```

creating a network

```docker network create network-name```

image run by local build

run on project root

```bash
  docker build -t image-name .
```
create a network
create a volume

run postgres container

```bash
  docker run \
  --name container-name \
  --network my-network \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -v volume-name:/var/lib/postgresql/data \
  postgres

```

run image

```bash
docker run \
--name container-name \
--network network-name \
-e DATABASE_URL=postgres://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_CONTAINER_NAME}:{POSTGRES_CONTAINER_PORT}/{POSTGRES_DB} \
-p 4000:4000 image-name

```

run by a deployed image on dockerhub
(same stetps, less then image-name)

run image

```bash
docker run \
--name container-name \
--network network-name \
-e DATABASE_URL=postgres://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_CONTAINER_NAME}:{POSTGRES_CONTAINER_PORT}/{POSTGRES_DB} \
-p 4000:4000 csjhonathan/footbet
```
