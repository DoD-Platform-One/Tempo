#!/bin/bash

if [ $(curl -sw '%{http_code}' "${TEMPO_METRICS_URL}/ready" -o /dev/null) -ne 200 ]; then
  echo "Failed readiness endpoint check"
else
  echo "/ready endpoint returned successfully"
fi
