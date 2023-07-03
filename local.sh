docker-compose up -d

password="mextmysql"
while true; do
    mysql -h "localhost" -u "mext" -p"$password" -e "quit" >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "MySQL connection successful!"
        break
    else
        echo "MySQL connection failed. Retrying in 5 seconds..."
        sleep 5
    fi
done
node ace migration:run
echo done