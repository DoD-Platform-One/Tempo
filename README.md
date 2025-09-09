<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# tempo

![Version: 1.21.1-bb.3](https://img.shields.io/badge/Version-1.21.1--bb.3-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 2.7.2](https://img.shields.io/badge/AppVersion-2.7.2-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

Grafana Tempo Single Binary Mode

## Upstream References

- <https://grafana.net>
- <https://github.com/grafana/helm-charts/tree/main/charts/tempo>

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
| upstream.fullnameOverride | string | `"tempo"` | Overrides the chart's computed fullname |
| upstream.tempo.repository | string | `"registry1.dso.mil/ironbank/opensource/grafana/tempo"` | Docker image repository |
| upstream.tempo.tag | string | `"2.7.2"` | Docker image tag |
| upstream.tempo.pullPolicy | string | `"IfNotPresent"` | Docker image pull policy |
| upstream.tempo.resources.limits.cpu | string | `"500m"` |  |
| upstream.tempo.resources.limits.memory | string | `"4Gi"` |  |
| upstream.tempo.resources.requests.cpu | string | `"500m"` |  |
| upstream.tempo.resources.requests.memory | string | `"4Gi"` |  |
| upstream.tempo.reportingEnabled | bool | `false` |  |
| upstream.tempo.ingester.trace_idle_period | string | `"10s"` |  |
| upstream.tempo.ingester.max_block_bytes | int | `1000000` |  |
| upstream.tempo.ingester.max_block_duration | string | `"5m"` |  |
| upstream.tempo.retention | string | `"336h"` |  |
| upstream.tempo.server.http_listen_port | int | `3100` | HTTP server listen port |
| upstream.tempo.livenessProbe.httpGet.path | string | `"/ready"` |  |
| upstream.tempo.livenessProbe.httpGet.port | int | `3100` |  |
| upstream.tempo.readinessProbe.httpGet.path | string | `"/ready"` |  |
| upstream.tempo.readinessProbe.httpGet.port | int | `3100` |  |
| upstream.tempo.receivers.zipkin.endpoint | string | `"0.0.0.0:9411"` |  |
| upstream.tempo.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.tempoQuery.repository | string | `"registry1.dso.mil/ironbank/opensource/grafana/tempo-query"` | Docker image repository |
| upstream.tempoQuery.tag | string | `"2.7.2"` | Docker image tag |
| upstream.tempoQuery.pullPolicy | string | `"IfNotPresent"` | Docker image pull policy |
| upstream.tempoQuery.resources.limits.cpu | string | `"300m"` |  |
| upstream.tempoQuery.resources.limits.memory | string | `"256Mi"` |  |
| upstream.tempoQuery.resources.requests.cpu | string | `"300m"` |  |
| upstream.tempoQuery.resources.requests.memory | string | `"256Mi"` |  |
| upstream.tempoQuery.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.securityContext | object | `{"automountServiceAccountToken":false,"fsGroup":1001,"imagePullSecrets":[{"name":"private-registry"}],"runAsGroup":1001,"runAsNonRoot":true,"runAsUser":1001}` | securityContext for container |
| upstream.securityContext.imagePullSecrets | list | `[{"name":"private-registry"}]` | Image pull secrets for the service account |
| upstream.serviceMonitor.scheme | string | `""` |  |
| upstream.serviceMonitor.tlsConfig | object | `{}` |  |
| upstream.persistence.enabled | bool | `true` |  |
| upstream.persistence.enableStatefulSetAutoDeletePVC | bool | `true` | Enable StatefulSetAutoDeletePVC feature |
| upstream.persistence.size | string | `"15Gi"` |  |
| upstream.podAnnotations | object | `{"traffic.sidecar.istio.io/includeInboundPorts":"3100,4317,4318"}` | Pod Annotations |
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

