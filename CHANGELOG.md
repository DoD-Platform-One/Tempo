# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.10.3-bb.0] - 2024-08-23

### Updated

- Synchronized with upstream chart version 1.10.3
- Update gluon: 0.5.1 > 0.5.3
## [1.10.1-bb.1] - 2024-08-23

### Changed

- Updated templating in `chart/templates/statefulset.yaml` to add `tpl` for label interpretation

## [1.10.1-bb.0] - 2024-07-26

### Updated

- Synchronized with upstream chart version 1.10.1
- Update gluon: 0.5.0 > 0.5.1

## [1.9.0-bb.2] - 2024-07-03

### Updated

- Set new default labels according to best practices

## [1.9.0-bb.1] - 2024-06-10

### Changed

- Synchronized with upstream chart version 1.9.0

## [1.9.0-bb.0] - 2024-06-06

### Changed

- Updated Tempo: 2.4.2 -> 2.5.0
- Updated Tempo Query: 2.4.2 -> 2.5.0

## [1.8.0-bb.0] - 2024-05-29

### Changed

- Updated Tempo: 2.3.0 -> 2.4.2
- Updated Tempo Query: 2.3.1 -> 2.4.2
- Updated gluon: 0.4.7 -> 0.5.0

## [1.7.1-bb.8] - 2024-05-07

### Changed

- Disable anonymous reporting to Grafana Labs

## [1.7.1-bb.7] - 2024-04-24

### Added

- Added custom network policies

## [1.7.1-bb.6] - 2024-04-11

### Changed

- Changing type of Openshift SCC in clusterrolebinding

## [1.7.1-bb.5] - 2024-03-13

### Changed

- Updating IstioHardened.md to include exportTo
- Moving sidecar and serviceEntry to match other package implementations
- Updating sidecar to template label.

## [1.7.1-bb.4] - 2024-03-04

### Changed

- Openshift update for deploying Tempo into Openshift cluster

## [1.7.1-bb.3] - 2024-02-23

### Changed

- Added istio sidecar to set outboundTrafficPolicy to REGISTRY_ONLY
- Added customServiceEntries to explicitly allow egress for external hosts
- Updated kiali and monitoring authorizationPolicies to access Tempo

## [1.7.1-bb.2] - 2024-01-11

### Changed

- Updated gluon to 0.4.7
- Updated Cypress tests to use

## [1.7.1-bb.1] - 2023-12-20

### Added

- Added istio `allow-nothing` policy
- Added istio `allow-ingress` polic(y|ies)
- Added istio `allow-tempo` policy
- Added istio custom policy template

## [1.7.1-bb.0] - 2023-12-07

### Changed

- Upgrading tempo-query (2.3.0 -> 2.3.1)

## [1.7.0-bb.3] - 2023-11-29

### Changed

- registry1.dso.mil/ironbank/big-bang/base 2.0.0 -> 2.1.0

## [1.7.0-bb.2] - 2023-11-28

### Changed

- Updating OSCAL Component file.

## [1.7.0-bb.1] - 2023-11-02

### Changed

- Updating tempo-query to 2.3.0
- Updating tempo to 2.3.0-ubi9
- Updating gluon to 0.4.4

## [1.6.3-bb.1] - 2023-10-27

### Changed

- Add additional constant output to cypress test for save/test tempo data source

## [1.6.3-bb.0] - 2023-10-19

### Changed

- Bumped chart version to 1.6.3
- Bumped images tag to 2.2.3
- Updated Cypress test to hit the API for testing

## [1.6.1-bb.3] - 2023-10-12

### Changed

- Harden API token automounting behavior of ServiceAccount/Pod

## [1.6.1-bb.2] - 2023-10-11

### Changed

- OSCAL Version update from 1.0.0 to 1.1.1

## [1.6.1-bb.1] - 2022-09-20

### Changed

- Updated Gluon to 0.4.1
- Updated the Cypress test and renamed the Cypress files

## [1.6.1-bb.0] - 2022-09-13

### Changed

- Bumped chart version to 1.6.1
- Bumped images tag to 2.2.2

## [1.2.0-bb.7] - 2022-08-29

### Changed

- Fixed Cypress test in the BigBang pipeline

## [1.2.0-bb.6] - 2022-08-28

### Changed

- Cypress modernization updates
- Updated gluon to 0.4.0
- Added npm package files, updated cypress file sturcture and file names to meet cypress 12.x requirements

## [1.2.0-bb.5] - 2022-08-24

### Changed

- Changed grafana cypress test to match new grafana update

## [1.2.0-bb.4] - 2022-08-24

### Added

- Added sso cypress testing for integration pipeline

## [1.2.0-bb.3] - 2022-08-24

### Changed

- Cypress test locations for datasources in Grafana 10.X

## [1.2.0-bb.2] - 2022-06-02

### Changed

- updated cypress test for monitoring package update part deux

## [1.2.0-bb.1] - 2022-05-15

### Added

- updated cypress test for monitoring package update

## [1.2.0-bb.0] - 2022-05-02

### Changed

- Bumped chart version to 1.2.0
- Bumped images tag to 2.1.1

## [1.0.2-bb.0] - 2022-03-23

### Changed

- Bumped chart version to 1.0.2
- Bumped images tag to 2.0.1

## [1.0.0-bb.3] - 2022-02-28

### Added

- NetworkPolicy template for prometheus Egress

## [1.0.0-bb.2] - 2022-02-20

### Changed

- Fixing Statefulset Conditional Secret ENV mount

## [1.0.0-bb.1] - 2022-02-15

### Changed

- Fixing tempoQuery VS conditionals

## [1.0.0-bb.0] - 2022-02-08

### Changed

- Bumped chart version to 1.0.0
- Bumped images tag to 2.0.0

## [0.16.1-bb.3] - 2022-01-17

### Changed

- Update gluon to new registry1 location + latest version (0.3.2)

## [0.16.1-bb.2]

### Added

- Added support for scheme and tlsConfig in serviceMonitor

### Changed

- Removed mTLS "exception" for metrics
- Added injection on metrics port 16687
- Adjust auth policies to allow Prometheus access to 16687
- Updated gluon to 0.3.0

## [0.16.1-bb.1]

### Changed

- Added drop ALL capabilites to the securityContexts for containers.

## [0.16.1-bb.0]

### Changed

- Updated to latest IB images (1.5.0)
- Updated to latest upstream chart (0.16.1)
- Updated docs to include all necessary changes from upstream

## [0.15.1-bb.7]

### Added

- Network policy to support Authservice egress
- Authorization policy to support Kiali/Prometheus/Tempo communications when SSO is enabled
- mTLS exception for metrics

### Fixed

- Fixed service monitor mismatch in port naming

## [0.15.1-bb.6]

### Added

- NetworkPolicy Template to allow egress to external services like AWS S3
- `objectStorage` values to feed in to enable external storage for Tempo

## [0.15.1-bb.5]

### Changed

- Updated bb base image to 2.0.0
- Updated gluon to 0.2.10

## [0.15.1-bb.4]

### Removed

- Removed Open Telemetry since it is no longer used

### Changed

- Updated BB base image to 1.18.0
- Fixed OSCAL validation issues

## [0.15.1-bb.3]

### Added

- Added `bbtests.scripts.enabled` value to conditionally enable script helm tests

## [0.15.1-bb.2]

### Added

- Added Istio MTLS Strict

## [0.15.1-bb.1]

### Added

- Added oscal-component.yaml

## [0.15.1-bb.0]

### Changed

- Bumped chart version to 0.15.1
- Bumped tempo tag to 1.4.1
- Bumped tempo-query tag to 1.4.1

## [0.15.0-bb.1]

### Changed

- Updated Cypress tests for new Grafana version

## [0.15.0-bb.0]

### Changed

- Bumped chart version to 0.15.0
- Bumped tempo tag to 1.4.0

## [0.14.2-bb.3]

### Changed

- Test script syntax improvements

## [0.14.2-bb.2]

### Added

- Added cypress testing for tempo

## [0.14.2-bb.1]

### Changed

- Increased default resources for tempo container to prevent OOMKilled

### Added

- Added networkpolicy for ingress traffic from kiali

## [0.14.2-bb.0]

### Changed

- Bumped chart version to 0.14.2
- Bumped tempo tag to 1.3.2
- Bumped tempo-query tag to 1.3.2

## [0.14.1-bb.1]

### Changed

- Enabling search for built in tempo query tool
- retention setting upped to 2 weeks (336 hours)

### Added

- Ingester config values from their prod recommendations on github
  - configuring blocks to flush every 5 minutes
  - configuring to drop traces not correctly processed in 10 seconds
  - configuring max block size of 1MB

## [0.14.1-bb.0]

### Changed

- Bumped chart version to 0.14.1
- Bumped tempo tag to 1.3.1
- Bumped tempo-query tag to 1.3.1

## [0.12.2-bb.4]

### Added

- Added Tempo Query and Open Telemetry versions to bigbang.dev/applicationVersions

## [0.12.2-bb.3]

### Added

- Added Istio Annotations

## [0.12.2-bb.2]

### Bug Fix

- Removed duplicate tag in chart/values.yaml

## [0.12.2-bb.1]

### Added

- Update Chart.yaml to follow new standardization for release automation

## [0.12.2-bb.0]

### Added

- Pointing upstream helm chart to v0.12.2
