# Tempo

## Overview

This package contains an extensible and configurable installation of Grafana Tempo based on the upstream chart provided by grafana.

## Grafana Tempo

[Tempo](https://grafana.com/docs/tempo/latest/) is an open source, easy-to-use, and high-scale distributed tracing backend. With Tempo, the only dependencyis object storage (e.g., S3, Azure Blob, etc.). Tempo can ingest common open source tracing protocols, including Jaeger, Zipkin, and OpenTelemetry.

## How it works

Tempo can be used to collect traces from your cluster service-mesh. Grafana has a built-in data source that can be used to query Tempo and visualize traces.
