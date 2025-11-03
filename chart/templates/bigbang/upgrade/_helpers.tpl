{{/*
This helper determines if upgrading to 1.23.0-bb.0 which updates immutable fields requiring statefulset resources to be manually recreated
*/}}
{{- define "tempo.shouldDeployUpgradeResources" -}}
{{- $upgradeVersion := "1.23.0-bb.0" -}}

{{- if and .Values.upgradeJob.enabled .Release.IsUpgrade -}}
  {{- $helmRelease := lookup "helm.toolkit.fluxcd.io/v2" "HelmRelease" "bigbang" "tempo" -}}
  {{- if and $helmRelease (hasKey $helmRelease "status") (hasKey $helmRelease.status "history") -}}
    {{- $history := $helmRelease.status.history -}}
    {{- if and $history (gt (len $history) 0) -}}
      {{- $currentVersion := index $history 0 "chartVersion" -}}
      {{- if semverCompare (print "<" $upgradeVersion) $currentVersion -}}
        true
      {{- end -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- end -}}
