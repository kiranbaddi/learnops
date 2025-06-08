# MYSQL

Create a SQL DB

docker run -d \
  --name learnops \
  -p 3306:3306 \
  -v ~/lab/db-learnops:/var/lib/mysql \
  --env-file ~/lab/db-learnops/.env \
  -e MYSQL_ROOT_PASSWORD=$DATABASE_PASSWORD \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=$DATABASE_PASSWORD \
  -e MYSQL_DATABASE=learnops \
  mysql:latest


  INSERT INTO learnops.users (name, email, password ) VALUES ('testuser', 'testuser@kiranbaddi.com', '$iou09u00uudasdad')


someone@kb.com
l8WR57Uvbk