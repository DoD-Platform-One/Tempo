# How to upgrade the Tempo Package chart

# Modifications made to upstream chart

## chart/charts/*.tgz

- run helm dependency update ./chart and commit the downloaded archives
- commit the tar archives that were downloaded from the helm dependency update command. And also commit the requirements.lock that was generated.

## chart/Chart.yaml

- Add gluon dependency for testing
- Add Big Bang version suffix to chart version

## chart/values.yaml

- Add Big Bang addditional values at bottom of values.yaml
- Add IronBank hardened images
- Add pullSecrets for each IronBank image
- Add default bigbang.dev hostname
- Add resources requests/limits for all services
- Add opentelemetry collector values

## chart/templates/bigbang/*

- Add Big Bang network Policies as applicable
- Add `VirtualService` for tempo-query UI access
- Add openTelemetry collector deployment/configurations

## chart/tests/*

- Add cypress testing configuration and tests
- Add scripts for testing

## chart/templates/service.yaml

- Added protocols to each port name (i.e. tcp, http, etc)

## chart/templates/servicemonitor.yaml

- Modified ports to match naming convention with `http-` prefix

## chart/templates/statefulset.yaml

- Add in envFrom section to the tempo container
    ```
            {{- if and .Values.objectStorage.access_key_id .Values.objectStorage.secret_access_key }}
            envFrom:
            - secretRef:
                name: tempo-object-storage
            {{- end }}
    ```

# Testing new Tempo Version

- Deploy tempo as a part of BigBang with istio and monitoring enabled, but with jaeger DISabled
- Visit `https://tracing.bigbang.dev` and ensure Services are listed and traces are being rendered
- Check the logs for the tempo pod and container and ensure traceIDs are getting sent over from the istio mesh
- Visit `https://grafana.bigbang.dev` > Login > Gear icon > Data Sources > Tempo > click `Test` datasource at the bottom
