# Distributed Operating System Course Project 
## Microservices Architecture 
![How-to-Design-Loosely-Coupled-Microservices](https://github.com/AbdullahSholi/DOS_Project_Part1/assets/149682145/fc211c5b-814f-4eb9-bd75-58709c1ccba6)


## Prerequisites:
* Git & Github
* SQLite3 Database
* NPM
* Docker
* Node
* Nginx
* Redis Database
* Docker Hub
* Swarm

## Steps
### Backend

1- Cloning project from github to your local machine
```
git clone https://github.com/AbdullahSholi/DOS_Project_Part1
```
2- Go inside project folder
```
cd DOS_Project_Part1
```

3- Docker Login
```
docker login
```

4- Build order-service Image
```
docker build -t abdullahsholi/order-service:latest .
```
5- Create Tag for order-service Image
```
docker tag order-service:latest abdullah-sholi/order-service:latest
```
6- Push Image to Docker Hub
```
docker push abdullahsholi/order-service:latest
```
7- Build catalog-service Image
```
docker build -t abdullahsholi/catalog-service:latest .
```
8- Create Tag for catalog-service Image
```
docker tag catalog-service:latest abdullah-sholi/catalog-service:latest
```
9- Push Image to Docker Hub
```
docker push abdullahsholi/catalog-service:latest
```
10- Build client-service Image
```
docker build -t abdullahsholi/client-service:latest .
```
11- Create Tag for client-service Image
```
docker tag client-service:latest abdullah-sholi/client-service:latest
```
12- Push Image to Docker Hub
```
docker push abdullahsholi/client-service:latest
```
13- Docker Swarm Initialization
```
docker swarm init 
```
14- Deploys a Stack to the Docker Swarm
```
docker stack deploy -c docker-compose.yml DOS_Project_Stack 
```
15- Display all our Services 
```
docker stack services DOS_Project_Stack
```
16- To Scale our services( Create number of replicas of specific service )
```
docker service DOS_Project_Stack_order-server=3 
```
17- To remove our Stack
```
docker stack rm DOS_Project_Stack 
```
---
* Explanation about Stack
  ![image](https://github.com/AbdullahSholi/DOS_Project_Part1/assets/149682145/3f339fa2-da37-4d90-94c4-13f32b3a511d)
---
## CLI Frontend
1- Navigate to Frontend Directory
```
cd src/client-service
```
2- Search via book title
```
node index.mjs s
```
3- Display book info
```
node index.mjs s
```
4- Purchase Book
```
node index.mjs s
```

---

## Wiki Pages

- [Home](https://github.com/AbdullahSholi/DOS_Project_Part1): Home page
- [API Documentation](https://github.com/AbdullahSholi/DOS_Project_Part1/wiki/API-Documentation): Explore the API endpoints and usage documentation.
- [Installation](https://github.com/AbdullahSholi/DOS_Project_Part1/wiki/Installation-Guide): Get started with setting up Bazar.com: A Multi-tier Online Book Store API on your local machine.
- [Developer Guide](https://github.com/AbdullahSholi/DOS_Project_Part1/wiki/Developer-Guide): Learn about the Repo and how to contribute to the Bazar.com: A Multi-tier Online Book Store API project.
- [Tools and Technologies Used](https://github.com/AbdullahSholi/DOS_Project_Part1/wiki/Tools-and-Technologies): Explore the tools and technologies used in the development of the Bazar.com: A Multi-tier Online Book Store API.


# Authors

- [Abdullah Sholi](https://github.com/AbdullahSholi)



Copyright © 2024 Bazar.com: A Multi-tier Online Book Store. All rights reserved.
