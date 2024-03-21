#!/bin/bash
# Check if the app is running, e.g., by making a test request
curl -f http://localhost:8080/ || exit 1