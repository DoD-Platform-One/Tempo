# tempo

![Version: 0.12.2-bb.2](https://img.shields.io/badge/Version-0.12.2--bb.2-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 1.2.1](https://img.shields.io/badge/AppVersion-1.2.1-informational?style=flat-square)

Grafana Tempo Single Binary Mode

## Upstream References
* <https://grafana.net>

* <https://github.com/grafana/tempo>

## Learn More
* [Application Overview](docs/overview.md)
* [Other Documentation](docs/)

## Pre-Requisites

* Kubernetes Cluster deployed
* Kubernetes config installed in `~/.kube/config`
* Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

* Clone down the repository
* cd into directory
```bash
helm install tempo chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| nameOverride | string | `""` | Overrides the chart's name |
| fullnameOverride | string | `""` | Overrides the chart's computed fullname |
| replicas | int | `1` |  |
| tempo.repository | string | `"registry1.dso.mil/ironbank/opensource/grafana/tempo"` | The Docker registry registry: registry1.dso.mil -- Docker image repository |
| tempo.tag | string | `"1.2.1"` | Overrides the image tag whose default is the chart's appVersion |
| tempo.pullPolicy | string | `"IfNotPresent"` | Docker image pull policy |
| tempo.imagePullSecrets | list | `[{"name":"private-registry"}]` | Image pull secrets for Docker images |
| tempo.podSecurityContext.fsGroup | int | `1001` |  |
| tempo.podSecurityContext.runAsGroup | int | `1001` |  |
| tempo.podSecurityContext.runAsNonRoot | bool | `true` |  |
| tempo.podSecurityContext.runAsUser | int | `1001` |  |
| tempo.updateStrategy | string | `"RollingUpdate"` |  |
| tempo.resources.limits.cpu | string | `"200m"` |  |
| tempo.resources.limits.memory | string | `"128Mi"` |  |
| tempo.resources.requests.cpu | string | `"200m"` |  |
| tempo.resources.requests.memory | string | `"128Mi"` |  |
| tempo.readinessProbe.httpGet.path | string | `"/ready"` |  |
| tempo.readinessProbe.httpGet.port | string | `"http-metrics"` |  |
| tempo.readinessProbe.initialDelaySeconds | int | `45` |  |
| tempo.livenessProbe | object | `{"httpGet":{"path":"/ready","port":"http-metrics"},"initialDelaySeconds":45}` | Liveness probe |
| tempo.memBallastSizeMbs | int | `1024` |  |
| tempo.authEnabled | bool | `false` |  |
| tempo.searchEnabled | bool | `false` | If true, enables Tempo's native search |
| tempo.ingester | object | `{}` |  |
| tempo.retention | string | `"24h"` |  |
| tempo.overrides | object | `{}` |  |
| tempo.server.http_listen_port | int | `3100` | HTTP server listen port |
| tempo.storage.trace.backend | string | `"local"` |  |
| tempo.storage.trace.local.path | string | `"/var/tempo/traces"` |  |
| tempo.storage.trace.wal.path | string | `"/var/tempo/wal"` |  |
| tempo.receivers.jaeger.protocols.grpc.endpoint | string | `"0.0.0.0:14250"` |  |
| tempo.receivers.jaeger.protocols.thrift_binary.endpoint | string | `"0.0.0.0:6832"` |  |
| tempo.receivers.jaeger.protocols.thrift_compact.endpoint | string | `"0.0.0.0:6831"` |  |
| tempo.receivers.jaeger.protocols.thrift_http.endpoint | string | `"0.0.0.0:14268"` |  |
| tempo.receivers.zipkin | string | `nil` |  |
| tempo.receivers.otlp.protocols.http | string | `nil` |  |
| tempo.receivers.otlp.protocols.grpc | string | `nil` |  |
| tempo.receivers.opencensus | string | `nil` |  |
| tempo.receivers.otlp.protocols.grpc.endpoint | string | `"0.0.0.0:4317"` |  |
| tempo.receivers.otlp.protocols.http.endpoint | string | `"0.0.0.0:4318"` |  |
| tempo.extraArgs."distributor.log-received-traces" | bool | `true` |  |
| tempo.extraEnv | list | `[]` | Environment variables to add |
| tempo.extraVolumeMounts | list | `[]` | Volume mounts to add |
| tempoQuery.repository | string | `"registry1.dso.mil/ironbank/opensource/grafana/tempo-query"` | The Docker registry registry: registry1.dso.mil -- Docker image repository |
| tempoQuery.tag | string | `"1.2.1"` | Overrides the image tag whose default is the chart's appVersion |
| tempoQuery.pullPolicy | string | `"IfNotPresent"` | Docker image pull policy |
| tempoQuery.resources.limits.cpu | string | `"200m"` |  |
| tempoQuery.resources.limits.memory | string | `"128Mi"` |  |
| tempoQuery.resources.requests.cpu | string | `"200m"` |  |
| tempoQuery.resources.requests.memory | string | `"128Mi"` |  |
| tempoQuery.readinessProbe | object | `{"httpGet":{"path":"/ready","port":"http-metrics"},"initialDelaySeconds":45}` | Readiness probe |
| tempoQuery.livenessProbe | object | `{"httpGet":{"path":"/ready","port":"http-metrics"},"initialDelaySeconds":45}` | Liveness probe |
| tempoQuery.extraArgs | object | `{}` |  |
| tempoQuery.extraEnv | list | `[]` | Environment variables to add |
| tempoQuery.extraVolumeMounts | list | `[]` | Volume mounts to add |
| serviceAccount.create | bool | `true` | Specifies whether a ServiceAccount should be created |
| serviceAccount.name | string | `nil` | The name of the ServiceAccount to use. If not set and create is true, a name is generated using the fullname template |
| serviceAccount.imagePullSecrets | list | `[]` | Image pull secrets for the service account |
| serviceAccount.annotations | object | `{}` | Annotations for the service account |
| service.type | string | `"ClusterIP"` |  |
| service.annotations | object | `{}` |  |
| service.labels | object | `{}` |  |
| serviceMonitor.enabled | bool | `false` |  |
| serviceMonitor.interval | string | `""` |  |
| serviceMonitor.additionalLabels | object | `{}` |  |
| serviceMonitor.annotations | object | `{}` |  |
| persistence.enabled | bool | `true` |  |
| persistence.accessModes[0] | string | `"ReadWriteOnce"` |  |
| persistence.size | string | `"10Gi"` |  |
| podAnnotations | object | `{}` |  |
| podLabels | object | `{}` |  |
| extraVolumes | list | `[]` | Volumes to add |
| nodeSelector | object | `{}` |  |
| tolerations | list | `[]` |  |
| affinity | object | `{}` |  |
| overrides.ingestion_rate_limit_bytes | int | `30000000` |  |
| opentelemetryCollector.enabled | bool | `false` |  |
| opentelemetryCollector.podSecurityContext.fsGroup | int | `1001` |  |
| opentelemetryCollector.podSecurityContext.runAsGroup | int | `1001` |  |
| opentelemetryCollector.podSecurityContext.runAsNonRoot | bool | `true` |  |
| opentelemetryCollector.podSecurityContext.runAsUser | int | `1001` |  |
| opentelemetryCollector.imagePullSecrets[0].name | string | `"private-registry"` |  |
| opentelemetryCollector.repository | string | `"registry1.dso.mil/ironbank/opensource/opentelemetry/opentelemetry-collector"` | Docker image repository |
| opentelemetryCollector.tag | string | `"v0.38.0"` | Overrides the image tag whose default is the chart's appVersion |
| opentelemetryCollector.pullPolicy | string | `"IfNotPresent"` | Docker image pull policy |
| opentelemetryCollector.memBallastSizeMbs | int | `683` |  |
| opentelemetryCollector.resources.limits.cpu | string | `"200m"` |  |
| opentelemetryCollector.resources.limits.memory | string | `"128Mi"` |  |
| opentelemetryCollector.resources.requests.cpu | string | `"200m"` |  |
| opentelemetryCollector.resources.requests.memory | string | `"128Mi"` |  |
| opentelemetryCollector.extraArgs | object | `{}` |  |
| networkPolicy.enabled | bool | `false` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| istio.enabled | bool | `false` |  |
| monitoring.enabled | bool | `false` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
