# Configuration for Grafana Tempo

**The tempo-config.yaml file is used to configure the Grafana Tempo.**

As we know that the only dependency of grafana tempo is an object storage as a backend storage, currently tempo is configured to use local storage as the backend storage for Tempo. As this might not be suitable for production purposes, please change the tempo-config.yaml to use your preferred choice of backend storage (GCS,S3,Azure Blob storage are supported). 

**To configure Tempo to use other backend storage please refer to [Grafana Tempo Storage Block configuration Example](https://grafana.com/docs/tempo/latest/configuration/#storage-block-configuration-example).**

# Configuration for Grafana Alloy

**The config.alloy file is used to configure grafana alloy.**

1. Currently Alloy is configured to scrape metrics from the endpoints where the microservices have exposed the metrics.
    - The microservices in this demonstration are exposing metrics on /metrics using the metrics.js file to generate and expose the metrics.
    - Grafana Alloy then scrapes these metrics from the endpoints using prometheus.scrape and then remote write these metrics to prometheus using prometheus.remote_write. 

2. Alloy is also configured to collect traces from the microservices using otelcol.receiver.otlp. These traces are processed and exported to tempo using otelcol.exporter.otlp. 
    - The microservices in this demonstration are instrumented with the OpenTelemetry 
    -  For more information about how you can instrument your JS application using OpenTelemetry please refer to [OpenTelemetry Instrumentation](https://opentelemetry.io/docs/languages/js/instrumentation/).
    - You can change the __address__ under targets of the prometheus.scarpe to specify Alloy to scrape metrics from the exposed endpoints.

# Configuration for Prometheus 

**The prometheus.yaml file is used to configure prometheus.**

1. Currently prometheus is configured to scarpe metrics from cadvisors /metrics endpoint.
    - You can change the targets under scrape_configs to specify prometheus to scrape metrics from the exposed endpoints.
2. Prometheus can also be used to scrape metrics from any endpoint that exposes metrics.

