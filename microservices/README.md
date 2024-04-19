# Micro-Services

Steps to run the micro-service setup.

## Pre-requisites

1. Node.js
2. MongoDB Atlas Account

Login to your MongoDB Atlas Account and create a cluster. After creating a cluster, navigate to the Database section and click 'Connect'.

### Database Connection Steps:

1. Enter the database username and password.
2. Choose a connection method and select the driver as Node.js.
3. You will see a connection string below; copy it and replace `<password>` with the password for the database user.

> [!NOTE]
> Store this connection string in a notepad as we will use it to set up the database connection in our application.

THe Connection String will look like this "mongodb+srv://'username':'password'@'clusterName'.i30sge8.mongodb.net"

# Configuration Instructions for all the microservices

1. Create a .env file for all three services which includes the following variables:

    - PORT
    - MONGO_URI
    - IP_ADDRESS

> [!NOTE]
>   - The PORT variable is used to set the port number for the service.
>   - The MONGO_URI variable is used to set the mongodb connection string. Define it with the connection string you copied earlier.
>   - The IP_ADDRESS variable is used to set the IP address of the machine where the services are running.


To get the ip address of your system run the following command:

```bash
ipconfig
```

For simplicity follow the PORT numbers I have used and they are :
- 4545 : For mobiles service
- 4550 : For customers service
- 4555 : For orders service


> [!IMPORTANT]
> If you decide to change the PORT numbers then please make sure to change them in:
> 1. docker-compose file in the root directory
> 2. config.alloy under /configs folder in root directory


## You are all set with the microservices


