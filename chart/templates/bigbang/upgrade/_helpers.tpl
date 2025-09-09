{{/*
Prints "true" if:
- .Values.upgradeJob.enabled is true
- and existing StatefulSet's chart version is < 1.21.1-bb.3

Otherwise prints "false".
*/}}
{{- define "tempo.shouldDeployUpgradeResources" -}}

  {{- $upgradeVersion := "1.21.1-bb.3" -}}

  {{- $enabled := false -}}
  {{- if hasKey .Values "upgradeJob" -}}
    {{- if hasKey .Values.upgradeJob "enabled" -}}
      {{- $enabled = .Values.upgradeJob.enabled -}}
    {{- end -}}
  {{- end -}}

  {{- if not $enabled -}}
    false
  {{- else -}}
    {{- $defaultName := printf "%s-upstream" .Release.Name -}}
    {{- $name := .Values.upstream.fullnameOverride | default $defaultName -}}
    {{- $st := lookup "apps/v1" "StatefulSet" .Release.Namespace $name -}}
    {{- if $st -}}
      {{- $label := dig "metadata" "labels" "helm.sh/chart" "" $st -}}
      {{- $current := regexFind "[0-9]+\\.[0-9]+\\.[0-9A-Za-z.+-]+$" $label -}}
      {{- if and $current (semverCompare (printf "< %s" $upgradeVersion) $current) -}}
true
      {{- else -}}
false
      {{- end -}}
    {{- else -}}
false
    {{- end -}}
  {{- end -}}

{{- end -}}
