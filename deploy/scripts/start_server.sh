#!/bin/bash
echo 'starting server'
cd /home/ec2-user
bash upgrade.sh
bash set-permissions.sh

