#!/bin/bash
start_time=$(date +%s)
password="mextmysql"
while true; do
    mysql -h "localhost" -u "mext" -p"$password" -e "quit" >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "MySQL connection successful!"
        break
    else
        end_time=$(date +%s)
        time_diff=$((end_time - start_time))
        if [ $time_diff -gt 50 ]; then
            break
        fi
        echo "MySQL connection failed. Retrying in 5 seconds..."
        sleep 5
    fi
done