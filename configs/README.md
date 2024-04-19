# Configuration for Grafana Tempo

**The tempo-config.yaml file is used to configure the Grafana Tempo.**

As we know that the only dependency of grafana tempo is an object storage as a backend storage, currently tempo is configured to use local storage as the backend storage for Tempo. As this might not be suitable for production purposes, please change the tempo-config.yaml to use your preferred choice of backend storage (GCS,S3,Azure Blob storage are supported). 

**To configure Tempo to use other backend storage please refer to [Grafana Tempo Storage Block configuration Example](https://grafana.com/docs/tempo/latest/configuration/#storage-block-configuration-example).**
