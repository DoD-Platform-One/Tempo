# How to upgrade the Tempo Package chart

1. Navigate to the upstream [chart repo and folder](https://github.com/grafana/helm-charts/tree/main/charts/tempo) and find the tag that corresponds with the new chart version for this update
    - Check the [upstream release notes](https://grafana.com/docs/tempo/next/release-notes/) for upgrade notices.

2. Checkout the `renovate/ironbank` branch

3. Modify the version in `Chart.yaml` and append `-bb.0` to the chart version from upstream. See `Update main chart` section of this document.

4. Update dependencies and binaries using `helm dependency update ./chart`

    - If needed, log into registry1
      ```shell
      helm registry login https://registry1.dso.mil -u ${registry1.username}
      helm registry logout https://registry1.dso.mil
      ```

      Pull assets and commit the binaries as well as the Chart.lock file that was generated.
      ```shell
      export HELM_EXPERIMENTAL_OCI=1
      helm dependency update ./chart
      ```
      Then log out.
      ```shell
      helm registry logout https://registry1.dso.mil
      ```

5. Update the dashboards in the `files/dashboards` directory manually by replacing them with the upstream dashboards [here](https://github.com/grafana/tempo/tree/main/operations/tempo-mixin-compiled/dashboards)

6. Update `CHANGELOG.md` adding an entry for the new version and noting all changes in a list (at minimum should include `- Updated <chart or dependency> to x.x.x`).

7. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md).

8. Push up your changes, add upgrade notices if applicable, validate that CI passes.

    - If there are any failures, follow the information in the pipeline to make the necessary updates.

    - Add the `debug` label to the MR for more detailed information.

    - Reach out to the CODEOWNERS if needed.

9. (_Optional, only required if package changes are expected to have cascading effects on bigbang umbrella chart_) As part of your MR that modifies bigbang packages, you should modify the bigbang  [bigbang/tests/test-values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml?ref_type=heads) against your branch for the CI/CD MR testing by enabling your packages.

    - To do this, at a minimum, you will need to follow the instructions at [bigbang/docs/developer/test-package-against-bb.md](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/developer/test-package-against-bb.md?ref_type=heads) with changes for Tempo enabled (the below is a reference, actual changes could be more depending on what changes where made to Tempo in the package MR).

### [test-values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml?ref_type=heads)

Refer to [docs/dev-overrides.yaml](https://repo1.dso.mil/big-bang/product/packages/tempo/-/blob/main/docs/dev-overrides.yaml) for YAML values to deploy against Big Bang.

10. Follow the `Testing new Tempo Version` section of this document for manual testing.

## Update main chart

### `chart/Chart.yaml`

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

## Modifications made to upstream 

- EOF, add default dev.bigbang.mil hostname and additional Big Bang values

```yaml
# -- Domain used for BigBang created exposed services
domain: dev.bigbang.mil
# -- Toggle istio integration. Intended to be controlled via BigBang passthrough of istio package status
istio:
  enabled: false
  # -- Default peer authentication values
  hardened:
    enabled: false
    outboundTrafficPolicyMode: "REGISTRY_ONLY"
    customServiceEntries: []
      # - name: "allow-google"
      #   enabled: true
      #   spec:
      #     hosts:
      #       - google.com
      #     location: MESH_EXTERNAL
      #     ports:
      #       - number: 443
      #         protocol: TLS
      #         name: https
      #     resolution: DNS
    customAuthorizationPolicies: []
    # - name: "allow-nothing"
    #   enabled: true
    #   spec: {}
  mtls:
    # -- STRICT = Allow only mutual TLS traffic,
    # PERMISSIVE = Allow both plain text and mutual TLS traffic
    mode: STRICT
  # -- Tempo-Query specific VirtualService values
  tempoQuery:
    # -- Toggle VirtualService creation
    enabled: true
    annotations: {}
    labels: {}
    gateways:
      - istio-system/main
    hosts:
      - tracing.{{ .Values.domain }}

objectStorage:
  # -- AWS access_key_id for External ObjectStorage configuration
  access_key_id: ""
  # -- AWS secret_access_key for External ObjectStorage configuration
  secret_access_key: ""

# -- Toggle for BigBang specific NetworkPolicies.
# If disabled no NetworkPolicies will be installed with package
# ref: https://kubernetes.io/docs/concepts/services-networking/network-policies/
networkPolicies:
  enabled: false
  # -- Istio IngressGateway labels for VirtualService external routing to app UI
  ingressLabels:
    app: istio-ingressgateway
    istio: ingressgateway
  # -- Use `kubectl cluster-info` and then resolve to IP for kube-api.
  # Review value description in BigBang README.md
  controlPlaneCidr: 0.0.0.0/0
  additionalPolicies: []

# -- Toggle monitoring integration. Intended to be controlled via BigBang passthrough of monitoring package status
monitoring:
  enabled: false

# -- SSO toggle. Intended to be controlled via BigBang passthrough, only affects network/auth policies.
sso:
  enabled: false

bbtests:
  enabled: false
  cypress:
    artifacts: true
    envs:
      cypress_url: 'http://{{ template "tempo.fullname" . }}.{{ .Release.Namespace }}.svc.cluster.local:16686'
      cypress_tempo_datasource: 'http://{{ template "tempo.fullname" . }}.{{ .Release.Namespace }}.svc:3100'
      cypress_check_datasource: "false"
      cypress_grafana_url: "http://monitoring-grafana.monitoring.svc.cluster.local"
    resources:
      requests:
        cpu: "1"
        memory: "1Gi"
      limits:
        cpu: "2"
        memory: "2Gi"
  scripts:
    enabled: true
    image: registry1.dso.mil/ironbank/big-bang/base:2.1.0
    envs:
      TEMPO_METRICS_URL: 'http://{{ template "tempo.fullname" . }}.{{ .Release.Namespace }}.svc:3100'

# -- Toggle or openshift specific config
openshift: false
```

## Testing new Tempo Version
> NOTE: For these testing steps it is good to do them on both a clean install and an upgrade. For clean install, point Tempo to your branch. For an upgrade do an install with Tempo pointing to the latest tag, then perform a helm upgrade with Tempo pointing to your branch.

You will want to install with:
- Tempo, monitoring and Istio packages enabled
- Jaeger disabled

`overrides/tempo.yaml`
```yaml
flux:
  interval: 1m
  rollback:
    cleanupOnFail: false

gatekeeper:
  enabled: false

monitoring:
  enabled: true

loki:
  enabled: true

alloy:
  enabled: true
  alloyLogs:
    enabled: true

grafana:
  enabled: true

tempo:
  enabled: true
  git:
    tag: null
    branch: <test-branch>
```
- Visit [Kiali](https://kiali.dev.bigbang.mil) and login with a [generated token](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/guides/using-bigbang/default-credentials.md)
  - Check the 'Applications', 'Workloads', and 'Services' views for Tempo resources (they should be healthy)
  - Note: if no resources are appearing, make sure the 'Tempo' namespace is selected in each view
- Visit [Grafana](https://grafana.dev.bigbang.mil) and login with [default credentials](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/guides/using-bigbang/default-credentials.md)
  - `Connections` -> `Data Sources` -> click Tempo -> click `Save & Test` datasource at the bottom
  - Navigate to `Explore` -> Select "Tempo" as the data source -> Enter a `TraceQL` query like `{resource.service.name="tempo-tempo.tempo"}` -> `Run query` 

> When in doubt with any testing or upgrade steps, reach out to the CODEOWNERS for assistance.
