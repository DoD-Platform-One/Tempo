# How to upgrade the Tempo Package chart

Check the [upstream release notes](https://grafana.com/docs/tempo/next/release-notes/)

# Upgrade

Find the tempo helm release version in the [grafana helm charts repo](https://github.com/grafana/helm-charts/tree/main/charts/tempo) that corresponds with the app version identified by Rennovate

Run a KPT package update

```shell
kpt pkg update chart@tempo-${chart.version} --strategy alpha-git-patch
```

Restore all BigBang added templates and tests:
```shell
git checkout chart/templates/bigbang/
git checkout chart/tests/
git checkout chart/templates/tests
```

## Update binaries
If needed, log into registry1
```
helm registry login https://registry1.dso.mil -u ${registry1.username}
helm registry logout https://registry1.dso.mil
```

Pull assets and commit the binaries as well as the Chart.lock file that was generated.
```
export HELM_EXPERIMENTAL_OCI=1
helm dependency update ./chart
```


## Update main chart

```chart/Chart.yaml```

- Update tempo `version` and `appVersion`
- Ensure Big Bang version suffix is appended to chart version
```yaml
version: $VERSION-bb.0
```
- Ensure gluon dependencies and annotations are present and up to date
```yaml
dependencies:
  - name: gluon
    version: $GLUON_VERSION
    repository: oci://registry1.dso.mil/bigbang
annotations:
  bigbang.dev/applicationVersions: |
    - Tempo: $TEMPO_VERSION
    - Tempo Query: $TEMPO_VERSION
  helm.sh/images: |
    - name: tempo
      image: registry1.dso.mil/ironbank/opensource/grafana/tempo:$TEMPO_VERSION
    - name: tempo-query
      image: registry1.dso.mil/ironbank/opensource/grafana/tempo-query:$TEMPO_VERSION
```

# Modifications made to upstream 

```chart/values.yaml```

- line 14, update `tempo.repository` to pull hardened images from registry1
```
  # -- Docker image repository
  repository: registry1.dso.mil/ironbank/opensource/grafana/tempo
```

- line 29, ensure `tempo.resources` requests and limits are set
```
  resources:
    limits:
      cpu: 500m
      memory: 4Gi
    requests:
      cpu: 500m
      memory: 4Gi
```

- line 46, ensure `tempo.ingester` values are set
```
  ingester:
    trace_idle_period: 10s
    max_block_bytes: 1_000_000
    max_block_duration: 5m
```

- line 54, ensure `tempo.retention` is set to `336h`
```
  retention: 336h # 2 weeks retention
```

- line 97, ensure `tempo.receivers` contains values for `zipkin`
```
    zipkin:
      endpoint: 0.0.0.0:9411
```

- line 106, ensure `tempo.securityContext` is set
```
  securityContext:
     capabilities:
       drop:
       - ALL
```

- line 165, update `tempoQuery.repository` to pull hardened images from registry1
```
  # -- Docker image repository
  repository: registry1.dso.mil/ironbank/opensource/grafana/tempo
```

- line 180, ensure `tempoQuery.resources` requests and limits are set
```
  # -- Resource for query container
  resources:
    limits:
      cpu: 300m
      memory: 256Mi
    requests:
      cpu: 300m
      memory: 256Mi
```

- line 181, ensure `tempoQuery.enabled` is true

Note: [this](https://github.com/grafana/helm-charts/commit/4c77fa7b3a54977d094071b446ff8b5b86982858) upstream commit disabled `tempo-query` by default in the chart. Evidently this is because `tempo-query` was always meant as a shim between Tempo and Grafana, but it hasn't been necessary [since 7.5.0](https://github.com/grafana/tempo/issues/456#issuecomment-815813684), as Grafana is capable of querying Tempo directly now.

Currently, Big Bang uses `tempo-query` for Cypress testing and users may expect a basic web interface for Tempo without Grafana (Tempo has non natively, only a HTTP API). This may be changed in an upcoming release, but we will keep utilizing `tempo-query` for the benefits of the interface.
```yaml
  enabled: true
```



- line 199, ensure `tempoQuery.securityContext` is set
```
  securityContext:
     capabilities:
       drop:
       - ALL
```

- line 209, ensure `securityContext` for containers is set
```
# -- securityContext for container
securityContext:
  fsGroup: 1001
  runAsGroup: 1001
  runAsNonRoot: true
  runAsUser: 1001
```

- line 223, ensure `serviceAccount.imagePullSecrets` contains `private-registry` pull secret for IronBank images
```
  # -- Image pull secrets for the service account
  imagePullSecrets:
    - name: private-registry
```

- line 245, ensure `persistence` is enabled and size is increased to `15Gi`
```
persistence:
  enabled: true
  # storageClassName: local-path
  accessModes:
    - ReadWriteOnce
  size: 15Gi
```

- line 253, ensure `podAnnotations` includes istio inbound ports
```
podAnnotations:
  traffic.sidecar.istio.io/includeInboundPorts: "16687,16686,3100"
```

- line 262, ensure `serviceAccount.automountServiceAccountToken` is set to `false`
This helps maintain our NSA hardening guide-compliance
```yaml
  automountServiceAccountToken: false
``` 

- EOF, add default bigbang.dev hostname and addditional Big Bang values


```chart/templates/service.yaml```

Added protocols to each port name (i.e. tcp, http, etc)

- line 35, ensure `name` is `http-tempo-prom-metrics`
- line 39, ensure `name` is `http-jaeger-metrics`
- line 42, ensure `name` is `http-tempo-query-jaeger-ui`
- line 46, ensure `name` is `udp-tempo-jaeger-thrift-compact`
- line 50, ensure `name` is `udp-tempo-jaeger-thrift-binary`
- line 54, ensure `name` is `http-tempo-jaeger-thrift-http`
- line 62, ensure `name` is `tcp-tempo-zipkin`
- line 66, ensure `name` is `tcp-tempo-otlp-legacy`
- line 70, ensure `name` is `http-tempo-otlp-http-legacy`
- line 78, ensure `name` is `http-tempo-otlp-http`
- line 82, ensure `name` is `tcp-tempo-opencensus`

```chart/templates/servicemonitor.yaml```

Modified ports to match naming convention with `http-` prefix

- line 26, ensure `port` is `http-tempo-prom-metrics`
- line 40, ensure `port` is `http-jaeger-metrics`

```chart/templates/statefulset.yaml```

- line 79-83, add in envFrom section to the tempo container
    ```
            {{- if and .Values.objectStorage.access_key_id .Values.objectStorage.secret_access_key }}
            envFrom:
            - secretRef:
                name: tempo-object-storage
            {{- end }}
    ```

## chart/templates/bigbang/*

- Add Big Bang network Policies as applicable
- Add `VirtualService` for tempo-query UI access
- Add openTelemetry collector deployment/configurations

## chart/tests/*

- Add cypress testing configuration and tests
- Add scripts for testing

# Testing new Tempo Version

- Deploy tempo as a part of BigBang with istio and monitoring enabled, but with jaeger DISabled
- Visit `https://tracing.bigbang.dev` and ensure Services are listed and traces are being rendered
- Check the logs for the tempo pod and container and ensure traceIDs are getting sent over from the istio mesh
- Visit `https://grafana.bigbang.dev` > Login > Gear icon > Data Sources > Tempo > click `Test` datasource at the bottom
