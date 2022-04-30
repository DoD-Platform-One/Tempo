#!/bin/bash

set -e

tempo_timeout=$((6*60))
echo "Hitting tempo /ready endpoint..."
time curl --retry-delay 2 --retry-max-time ${tempo_timeout} --retry $((tempo_timeout/2)) --retry-connrefused -sIS "${TEMPO_METRICS_URL}/ready" 1>/dev/null || tempo_ec=$?
# time output shows up a bit after the next two echoes, sleep for formatting
sleep .1
if [ -n "${tempo_ec}" ]; then
  echo "curl returned exit code ${tempo_ec}, see above for error message and curl's elapsed wait time (timeout is ${tempo_timeout}s)"
  exit 1
fi
echo "Test 1 Success: tempo is up, see above for curl's elapsed wait time."

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