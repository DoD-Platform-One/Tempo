# tempo

![Version: 0.15.1-bb.0](https://img.shields.io/badge/Version-0.15.1--bb.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 1.4.1](https://img.shields.io/badge/AppVersion-1.4.1-informational?style=flat-square)

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
| tempo.tag | string | `"1.4.1"` | Overrides the image tag whose default is the chart's appVersion |
| tempo.pullPolicy | string | `"IfNotPresent"` | Docker image pull policy |
| tempo.imagePullSecrets | list | `[{"name":"private-registry"}]` | Image pull secrets for Docker images |
| tempo.podSecurityContext.fsGroup | int | `1001` |  |
| tempo.podSecurityContext.runAsGroup | int | `1001` |  |
| tempo.podSecurityContext.runAsNonRoot | bool | `true` |  |
| tempo.podSecurityContext.runAsUser | int | `1001` |  |
| tempo.updateStrategy | string | `"RollingUpdate"` |  |
| tempo.resources.limits.cpu | string | `"500m"` |  |
| tempo.resources.limits.memory | string | `"4Gi"` |  |
| tempo.resources.requests.cpu | string | `"500m"` |  |
| tempo.resources.requests.memory | string | `"4Gi"` |  |
| tempo.readinessProbe.httpGet.path | string | `"/ready"` |  |
| tempo.readinessProbe.httpGet.port | string | `"http-metrics"` |  |
| tempo.readinessProbe.initialDelaySeconds | int | `45` |  |
| tempo.livenessProbe | object | `{"httpGet":{"path":"/ready","port":"http-metrics"},"initialDelaySeconds":45}` | Liveness probe |
| tempo.memBallastSizeMbs | int | `1024` |  |
| tempo.multitenancyEnabled | bool | `false` |  |
| tempo.searchEnabled | bool | `true` | If true, enables Tempo's native search |
| tempo.ingester.trace_idle_period | string | `"10s"` |  |
| tempo.ingester.max_block_bytes | int | `1000000` |  |
| tempo.ingester.max_block_duration | string | `"5m"` |  |
| tempo.retention | string | `"336h"` |  |
| tempo.overrides | object | `{}` |  |
| tempo.server.http_listen_port | int | `3100` | HTTP server listen port |
| tempo.storage.trace.backend | string | `"local"` |  |
| tempo.storage.trace.local.path | string | `"/var/tempo/traces"` |  |
| tempo.storage.trace.wal.path | string | `"/var/tempo/wal"` |  |
| tempo.receivers.jaeger.protocols.grpc.endpoint | string | `"0.0.0.0:14250"` |  |
| tempo.receivers.jaeger.protocols.thrift_binary.endpoint | string | `"0.0.0.0:6832"` |  |
| tempo.receivers.jaeger.protocols.thrift_compact.endpoint | string | `"0.0.0.0:6831"` |  |
| tempo.receivers.jaeger.protocols.thrift_http.endpoint | string | `"0.0.0.0:14268"` |  |
| tempo.receivers.zipkin.endpoint | string | `"0.0.0.0:9411"` |  |
| tempo.receivers.opencensus | string | `nil` |  |
| tempo.receivers.otlp.protocols.grpc.endpoint | string | `"0.0.0.0:4317"` |  |
| tempo.receivers.otlp.protocols.http.endpoint | string | `"0.0.0.0:4318"` |  |
| tempo.extraArgs."distributor.log-received-traces" | bool | `true` |  |
| tempo.extraEnv | list | `[]` | Environment variables to add |
| tempo.extraVolumeMounts | list | `[]` | Volume mounts to add |
| tempoQuery.repository | string | `"registry1.dso.mil/ironbank/opensource/grafana/tempo-query"` | The Docker registry registry: registry1.dso.mil -- Docker image repository |
| tempoQuery.tag | string | `"1.4.1"` | Overrides the image tag whose default is the chart's appVersion |
| tempoQuery.pullPolicy | string | `"IfNotPresent"` | Docker image pull policy |
| tempoQuery.resources.limits.cpu | string | `"300m"` |  |
| tempoQuery.resources.limits.memory | string | `"256Mi"` |  |
| tempoQuery.resources.requests.cpu | string | `"300m"` |  |
| tempoQuery.resources.requests.memory | string | `"256Mi"` |  |
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
| persistence.size | string | `"15Gi"` |  |
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
| opentelemetryCollector.resources.limits.cpu | string | `"300m"` |  |
| opentelemetryCollector.resources.limits.memory | string | `"256Mi"` |  |
| opentelemetryCollector.resources.requests.cpu | string | `"300m"` |  |
| opentelemetryCollector.resources.requests.memory | string | `"256Mi"` |  |
| opentelemetryCollector.extraArgs | object | `{}` |  |
| domain | string | `"bigbang.dev"` | Domain used for BigBang created exposed services |
| istio | object | `{"enabled":false,"tempoQuery":{"annotations":{},"enabled":true,"gateways":["istio-system/main"],"hosts":["tracing.{{ .Values.domain }}"],"labels":{}}}` | Toggle istio integration. Intended to be controlled via BigBang passthrough of istio package status |
| istio.tempoQuery | object | `{"annotations":{},"enabled":true,"gateways":["istio-system/main"],"hosts":["tracing.{{ .Values.domain }}"],"labels":{}}` | Tempo-Query specific VirtualService values |
| istio.tempoQuery.enabled | bool | `true` | Toggle VirtualService creation |
| networkPolicies | object | `{"controlPlaneCidr":"0.0.0.0/0","enabled":false,"ingressLabels":{"app":"istio-ingressgateway","istio":"ingressgateway"}}` | Toggle for BigBang specific NetworkPolicies. If disabled no NetworkPolicies will be installed with package ref: https://kubernetes.io/docs/concepts/services-networking/network-policies/ |
| networkPolicies.ingressLabels | object | `{"app":"istio-ingressgateway","istio":"ingressgateway"}` | Istio IngressGateway labels for VirtualService external routing to app UI |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` | Use `kubectl cluster-info` and then resolve to IP for kube-api. Review value description in BigBang README.md |
| monitoring | object | `{"enabled":false}` | Toggle monitoring integration. Intended to be controlled via BigBang passthrough of monitoring package status |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://{{ template \"tempo.fullname\" . }}.{{ .Release.Namespace }}.svc.cluster.local:16686"` |  |
| bbtests.cypress.envs.cypress_tempo_datasource | string | `"http://{{ template \"tempo.fullname\" . }}.{{ .Release.Namespace }}.svc:3100"` |  |
| bbtests.cypress.envs.cypress_check_datasource | string | `"false"` |  |
| bbtests.cypress.envs.cypress_grafana_url | string | `"http://monitoring-grafana.monitoring.svc.cluster.local"` |  |
| bbtests.scripts.image | string | `"registry1.dso.mil/ironbank/big-bang/base:1.16.0"` |  |
| bbtests.scripts.envs.TEMPO_METRICS_URL | string | `"http://{{ template \"tempo.fullname\" . }}.{{ .Release.Namespace }}.svc:3100"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
