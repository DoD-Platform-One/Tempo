#!/bin/bash

echo "Checking for tempo readiness"
if [ $(curl -sw '%{http_code}' "${TEMPO_METRICS_URL}/ready" -o /dev/null) -ne 200 ]; then
  echo "Failed readiness endpoint check"
  exit 1
else
  echo "Test 1 Success: Tempo is ready and healthy"
fi

echo "Checking echo endpoint"
echo_response=$(curl "${TEMPO_METRICS_URL}/api/echo" 2>/dev/null)
if [ ${echo_response} != "echo" ]; then
    echo "${TEMPO_METRICS_URL}/api/echo returned ${echo_response} - instead of the expected 'echo' response"
    exit 1
fi
echo "Test 2 Success: echo endpoint responded as expected"

echo "Checking for the status of all services to be running"
# Tempo returns a text/plain response via API's, will have to parse. Start by trimming table headers and footer
status_response=$(curl "${TEMPO_METRICS_URL}/status/services" 2>/dev/null | tail -n +5 | head -n -1)
while read line; do
    echo "$line" | grep Running
    status=$?
    if [ ${status} -eq 1 ]; then
        echo "Service did not report 'Running'"
        exit 1
    fi
done < $status_response
echo "Test 3 Success: All services are in a 'Running' state"