# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
