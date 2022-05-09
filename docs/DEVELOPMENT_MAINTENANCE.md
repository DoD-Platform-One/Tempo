# How to upgrade the Tempo Package chart


# Testing new Tempo Version

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