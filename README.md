<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# tempo

![Version: 1.16.0-bb.1](https://img.shields.io/badge/Version-1.16.0--bb.1-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 2.6.1](https://img.shields.io/badge/AppVersion-2.6.1-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

Grafana Tempo Single Binary Mode

## Upstream References
- <https://grafana.net>

- <https://github.com/grafana/tempo>

## Upstream Release Notes

- [Find upstream chart's release notes and CHANGELOG here](https://github.com/grafana/helm-charts/releases?q=tempo&expanded=true)
- [Find upstream applications's release notes and CHANGELOG here](https://grafana.com/docs/tempo/latest/release-notes/)

## Learn More

- [Application Overview](docs/overview.md)
- [Other Documentation](docs/)

## Pre-Requisites

- Kubernetes Cluster deployed
- Kubernetes config installed in `~/.kube/config`
- Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

- Clone down the repository
- cd into directory

```bash
helm install tempo chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| global.commonLabels | object | `{}` | Common labels for all object directly managed by this chart. |
| nameOverride | string | `""` | Overrides the chart's name |
| fullnameOverride | string | `""` | Overrides the chart's computed fullname |
| replicas | int | `1` | Define the amount of instances |
| labels | object | `{}` | labels for tempo |
| annotations | object | `{}` | Annotations for the StatefulSet |
| tempo.repository | string | `"registry1.dso.mil/ironbank/opensource/grafana/tempo"` | Docker image repository |
| tempo.tag | string | `"2.6.1"` | Docker image tag |
| tempo.pullPolicy | string | `"IfNotPresent"` | Docker image pull policy |
| tempo.updateStrategy | string | `"RollingUpdate"` |  |
| tempo.resources.limits.cpu | string | `"500m"` |  |
| tempo.resources.limits.memory | string | `"4Gi"` |  |
| tempo.resources.requests.cpu | string | `"500m"` |  |
| tempo.resources.requests.memory | string | `"4Gi"` |  |
| tempo.memBallastSizeMbs | int | `1024` |  |
| tempo.multitenancyEnabled | bool | `false` |  |
| tempo.reportingEnabled | bool | `false` | If true, Tempo will report anonymous usage data about the shape of a deployment to Grafana Labs |
| tempo.metricsGenerator.enabled | bool | `false` | If true, enables Tempo's metrics generator (https://grafana.com/docs/tempo/next/metrics-generator/) |
| tempo.metricsGenerator.remoteWriteUrl | string | `"http://prometheus.monitoring:9090/api/v1/write"` |  |
| tempo.ingester | object | `{"max_block_bytes":1000000,"max_block_duration":"5m","trace_idle_period":"10s"}` | Configuration options for the ingester |
| tempo.querier | object | `{}` | Configuration options for the querier |
| tempo.queryFrontend | object | `{}` | Configuration options for the query-fronted |
| tempo.retention | string | `"336h"` |  |
| tempo.global_overrides.per_tenant_override_config | string | `"/conf/overrides.yaml"` |  |
| tempo.overrides | object | `{}` |  |
| tempo.server.http_listen_port | int | `3100` | HTTP server listen port |
| tempo.livenessProbe.httpGet.path | string | `"/ready"` |  |
| tempo.livenessProbe.httpGet.port | int | `3100` |  |
| tempo.livenessProbe.initialDelaySeconds | int | `30` |  |
| tempo.livenessProbe.periodSeconds | int | `10` |  |
| tempo.livenessProbe.timeoutSeconds | int | `5` |  |
| tempo.livenessProbe.failureThreshold | int | `3` |  |
| tempo.livenessProbe.successThreshold | int | `1` |  |
| tempo.readinessProbe.httpGet.path | string | `"/ready"` |  |
| tempo.readinessProbe.httpGet.port | int | `3100` |  |
| tempo.readinessProbe.initialDelaySeconds | int | `20` |  |
| tempo.readinessProbe.periodSeconds | int | `10` |  |
| tempo.readinessProbe.timeoutSeconds | int | `5` |  |
| tempo.readinessProbe.failureThreshold | int | `3` |  |
| tempo.readinessProbe.successThreshold | int | `1` |  |
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
| tempo.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| tempo.extraArgs | object | `{}` |  |
| tempo.extraEnv | list | `[]` | Environment variables to add |
| tempo.extraEnvFrom | list | `[]` | Environment variables from secrets or configmaps to add to the ingester pods |
| tempo.extraVolumeMounts | list | `[]` | Volume mounts to add |
| config | string | Dynamically generated tempo configmap | Tempo configuration file contents |
| tempoQuery.repository | string | `"registry1.dso.mil/ironbank/opensource/grafana/tempo-query"` | Docker image repository |
| tempoQuery.tag | string | `"2.6.1"` | Docker image tag |
| tempoQuery.pullPolicy | string | `"IfNotPresent"` | Docker image pull policy |
| tempoQuery.enabled | bool | `false` | if False the tempo-query container is not deployed |
| tempoQuery.service.port | int | `16686` |  |
| tempoQuery.ingress.enabled | bool | `false` |  |
| tempoQuery.ingress.annotations | object | `{}` |  |
| tempoQuery.ingress.labels | object | `{}` |  |
| tempoQuery.ingress.path | string | `"/"` |  |
| tempoQuery.ingress.pathType | string | `"Prefix"` |  |
| tempoQuery.ingress.hosts[0] | string | `"query.tempo.example.com"` |  |
| tempoQuery.ingress.extraPaths | list | `[]` |  |
| tempoQuery.ingress.tls | list | `[]` |  |
| tempoQuery.resources | object | `{"limits":{"cpu":"300m","memory":"256Mi"},"requests":{"cpu":"300m","memory":"256Mi"}}` | Resource for query container |
| tempoQuery.extraArgs | object | `{}` |  |
| tempoQuery.extraEnv | list | `[]` | Environment variables to add |
| tempoQuery.extraVolumeMounts | list | `[]` | Volume mounts to add |
| tempoQuery.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| securityContext | object | `{"fsGroup":1001,"runAsGroup":1001,"runAsNonRoot":true,"runAsUser":1001}` | securityContext for container |
| serviceAccount.create | bool | `true` | Specifies whether a ServiceAccount should be created |
| serviceAccount.name | string | `nil` | The name of the ServiceAccount to use. If not set and create is true, a name is generated using the fullname template |
| serviceAccount.imagePullSecrets | list | `[{"name":"private-registry"}]` | Image pull secrets for the service account |
| serviceAccount.annotations | object | `{}` | Annotations for the service account |
| serviceAccount.labels | object | `{}` | Labels for the service account |
| serviceAccount.automountServiceAccountToken | bool | `false` |  |
| service.type | string | `"ClusterIP"` |  |
| service.clusterIP | string | `""` |  |
| service.loadBalancerIP | string | `nil` | IP address, in case of 'type: LoadBalancer' |
| service.protocol | string | `"TCP"` | If service type is LoadBalancer, the exposed protocol can either be "UDP", "TCP" or "UDP,TCP" |
| service.annotations | object | `{}` |  |
| service.labels | object | `{}` |  |
| service.targetPort | string | `""` |  |
| serviceMonitor.enabled | bool | `false` |  |
| serviceMonitor.interval | string | `""` |  |
| serviceMonitor.additionalLabels | object | `{}` |  |
| serviceMonitor.annotations | object | `{}` |  |
| serviceMonitor.scheme | string | `""` |  |
| serviceMonitor.tlsConfig | object | `{}` |  |
| persistence.enabled | bool | `true` |  |
| persistence.enableStatefulSetAutoDeletePVC | bool | `true` | Enable StatefulSetAutoDeletePVC feature |
| persistence.accessModes[0] | string | `"ReadWriteOnce"` |  |
| persistence.size | string | `"15Gi"` |  |
| podAnnotations | object | `{"traffic.sidecar.istio.io/includeInboundPorts":"3100,4317,4318"}` | Pod Annotations |
| podLabels | object | `{}` | Pod (extra) Labels |
| extraLabels | object | `{}` |  |
| extraVolumes | list | `[]` | Volumes to add |
| nodeSelector | object | `{}` | Node labels for pod assignment. See: https://kubernetes.io/docs/user-guide/node-selection/ |
| tolerations | list | `[]` | Tolerations for pod assignment. See: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/ |
| affinity | object | `{}` | Affinity for pod assignment. See: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity |
| priorityClassName | string | `nil` | The name of the PriorityClass |
| networkPolicy.enabled | bool | `false` |  |
| networkPolicy.ingress | bool | `true` |  |
| networkPolicy.allowExternal | bool | `true` |  |
| networkPolicy.explicitNamespacesSelector | object | `{}` |  |
| networkPolicy.egress.enabled | bool | `false` |  |
| networkPolicy.egress.blockDNSResolution | bool | `false` |  |
| networkPolicy.egress.ports | list | `[]` |  |
| networkPolicy.egress.to | list | `[]` |  |
| domain | string | `"dev.bigbang.mil"` | Domain used for BigBang created exposed services |
| istio | object | `{"enabled":false,"hardened":{"customAuthorizationPolicies":[],"customServiceEntries":[],"enabled":false,"outboundTrafficPolicyMode":"REGISTRY_ONLY"},"mtls":{"mode":"STRICT"}}` | Toggle istio integration. Intended to be controlled via BigBang passthrough of istio package status |
| istio.hardened | object | `{"customAuthorizationPolicies":[],"customServiceEntries":[],"enabled":false,"outboundTrafficPolicyMode":"REGISTRY_ONLY"}` | Default peer authentication values |
| istio.mtls.mode | string | `"STRICT"` | STRICT = Allow only mutual TLS traffic, PERMISSIVE = Allow both plain text and mutual TLS traffic |
| objectStorage.access_key_id | string | `""` | AWS access_key_id for External ObjectStorage configuration |
| objectStorage.secret_access_key | string | `""` | AWS secret_access_key for External ObjectStorage configuration |
| networkPolicies | object | `{"additionalPolicies":[],"controlPlaneCidr":"0.0.0.0/0","enabled":false,"ingressLabels":{"app":"istio-ingressgateway","istio":"ingressgateway"}}` | Toggle for BigBang specific NetworkPolicies. If disabled no NetworkPolicies will be installed with package ref: https://kubernetes.io/docs/concepts/services-networking/network-policies/ |
| networkPolicies.ingressLabels | object | `{"app":"istio-ingressgateway","istio":"ingressgateway"}` | Istio IngressGateway labels for VirtualService external routing to app UI |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` | Use `kubectl cluster-info` and then resolve to IP for kube-api. Review value description in BigBang README.md |
| monitoring | object | `{"enabled":false}` | Toggle monitoring integration. Intended to be controlled via BigBang passthrough of monitoring package status |
| sso | object | `{"enabled":false}` | SSO toggle. Intended to be controlled via BigBang passthrough, only affects network/auth policies. |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://{{ template \"tempo.fullname\" . }}.{{ .Release.Namespace }}.svc.cluster.local:16686"` |  |
| bbtests.cypress.envs.cypress_tempo_datasource | string | `"http://{{ template \"tempo.fullname\" . }}.{{ .Release.Namespace }}.svc:3100"` |  |
| bbtests.cypress.envs.cypress_check_datasource | string | `"false"` |  |
| bbtests.cypress.envs.cypress_grafana_url | string | `"http://monitoring-grafana.monitoring.svc.cluster.local"` |  |
| bbtests.cypress.resources.requests.cpu | string | `"1"` |  |
| bbtests.cypress.resources.requests.memory | string | `"1Gi"` |  |
| bbtests.cypress.resources.limits.cpu | string | `"2"` |  |
| bbtests.cypress.resources.limits.memory | string | `"2Gi"` |  |
| bbtests.scripts.enabled | bool | `true` |  |
| bbtests.scripts.image | string | `"registry1.dso.mil/ironbank/big-bang/base:2.1.0"` |  |
| bbtests.scripts.envs.TEMPO_METRICS_URL | string | `"http://{{ template \"tempo.fullname\" . }}.{{ .Release.Namespace }}.svc:3100"` |  |
| openshift | bool | `false` | Toggle or openshift specific config |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

