# petstore

The Petstore API Spec offered by SwaggerHub

## Model Creation

npx sequelize-cli model:generate --name Pet --attributes name:string,status:string

npx sequelize-cli model:generate --name User --attributes username:string,firstName:string,lastName:string,password:string,phone:string,userStatus:integer

## Building the docker image

```bash
docker build -t <username>/petstore .
```

## Running the image

```bash
docker run --name PetstoreApp -dp 3000:8000 <username>/petstore
```
