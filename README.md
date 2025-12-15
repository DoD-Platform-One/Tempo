<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# tempo

![Version: 1.23.3-bb.2](https://img.shields.io/badge/Version-1.23.3--bb.2-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 2.8.2](https://img.shields.io/badge/AppVersion-2.8.2-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

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
| domain | string | `"dev.bigbang.mil"` | This value will be removed in a later release as Tempo no longer has a UI |
| istio | object | `{"authorizationPolicies":{"custom":[],"enabled":false},"enabled":false,"mtls":{"mode":"STRICT"},"serviceEntries":{"custom":[]},"sidecar":{"enabled":false,"outboundTrafficPolicyMode":"REGISTRY_ONLY"}}` | Toggle istio integration. Intended to be controlled via BigBang passthrough of istio package status |
| networkPolicies | object | `{"additionalPolicies":[],"controlPlaneCidr":"0.0.0.0/0","egress":{"from":{"tempo":{"to":{"k8s":{"monitoring/prometheus:9090":true}}}}},"enabled":false,"ingress":{"to":{"tempo:3200":{"from":{"k8s":{"kiali-service-account@kiali/kiali":true,"monitoring-grafana@monitoring/grafana":true,"monitoring-monitoring-kube-prometheus@monitoring/prometheus":true}}},"tempo:4317":{"from":{"k8s":{"alloy-alloy-logs@alloy/alloy-logs":true,"alloy-alloy-operator@alloy/alloy":true}}},"tempo:9411":{"from":{"k8s":{"*/*":true}}}}},"ingressLabels":{"app":"istio-ingressgateway","istio":"ingressgateway"}}` | Toggle for BigBang specific NetworkPolicies. If disabled no NetworkPolicies will be installed with package ref: https://kubernetes.io/docs/concepts/services-networking/network-policies/ |
| networkPolicies.ingressLabels | object | `{"app":"istio-ingressgateway","istio":"ingressgateway"}` | Istio IngressGateway labels for VirtualService external routing to app UI |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` | Use `kubectl cluster-info` and then resolve to IP for kube-api. Review value description in BigBang README.md |
| monitoring | object | `{"enabled":false}` | Toggle monitoring integration. Intended to be controlled via BigBang passthrough of monitoring package status |
| sso | object | `{"enabled":false}` | This value will be removed in a later release as Tempo no longer has a UI |
| upgradeJob.enabled | bool | `true` | Enable BigBang specific autoRollingUpgrade support |
| upgradeJob.name | string | `"tempo-upgrade-job"` |  |
| upgradeJob.image.repository | string | `"registry1.dso.mil/ironbank/opensource/kubernetes/kubectl"` |  |
| upgradeJob.image.tag | string | `"v1.32.7"` |  |
| upgradeJob.image.imagePullPolicy | string | `"Always"` |  |
| upgradeJob.image.pullSecrets | string | `"private-registry"` |  |
| upgradeJob.hook.phase | string | `"pre-upgrade"` |  |
| upgradeJob.hook.deletePolicy | string | `"hook-succeeded,before-hook-creation"` |  |
| upgradeJob.serviceAccount | string | `"upgrade-job-svc-account"` |  |
| upgradeJob.role | string | `"upgrade-role"` |  |
| upgradeJob.roleBinding | string | `"upgrade-rolebinding"` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_tempo_datasource | string | `"http://{{ .Release.Name }}.{{ .Release.Namespace }}.svc:3200"` |  |
| bbtests.cypress.envs.cypress_check_datasource | string | `"false"` |  |
| bbtests.cypress.envs.cypress_grafana_url | string | `"http://monitoring-grafana.monitoring.svc.cluster.local"` |  |
| bbtests.cypress.resources.requests.cpu | string | `"1"` |  |
| bbtests.cypress.resources.requests.memory | string | `"1Gi"` |  |
| bbtests.cypress.resources.limits.cpu | string | `"2"` |  |
| bbtests.cypress.resources.limits.memory | string | `"2Gi"` |  |
| bbtests.scripts.enabled | bool | `true` |  |
| bbtests.scripts.image | string | `"registry1.dso.mil/ironbank/big-bang/base:2.1.0"` |  |
| bbtests.scripts.envs.TEMPO_METRICS_URL | string | `"http://{{ .Release.Name }}.{{ .Release.Namespace }}.svc:3200"` |  |
| openshift | bool | `false` | Toggle or openshift specific config |
| upstream | object | Upstream chart values | Values to pass to [the upstream tempo chart](https://github.com/grafana/helm-charts/blob/main/charts/tempo/values.yaml) |
| upstream.fullnameOverride | string | `"tempo-tempo"` | Overrides the chart's computed fullname |
| upstream.nameOverride | string | `"tempo"` | Overrides the chart's computed name |
| upstream.tempo.repository | string | `"registry1.dso.mil/ironbank/opensource/grafana/tempo"` | Docker image repository |
| upstream.tempo.tag | string | `"2.8.2"` | Docker image tag |
| upstream.tempo.pullPolicy | string | `"Always"` | Docker image pull policy |
| upstream.tempo.server.http_listen_port | int | `3200` | HTTP server listen port |
| upstream.tempoQuery.repository | string | `"registry1.dso.mil/ironbank/opensource/grafana/tempo-query"` | Docker image repository |
| upstream.tempoQuery.tag | string | `"2.8.2"` | Docker image tag |
| upstream.tempoQuery.pullPolicy | string | `"Always"` | Docker image pull policy |
| upstream.securityContext | object | `{"fsGroup":1001,"runAsGroup":1001,"runAsNonRoot":true,"runAsUser":1001}` | securityContext for container |
| upstream.serviceAccount.imagePullSecrets | list | `[{"name":"private-registry"}]` | Image pull secrets for the service account |
| upstream.podAnnotations | object | `{"traffic.sidecar.istio.io/excludeInboundPorts":"9411"}` | Pod Annotations |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

