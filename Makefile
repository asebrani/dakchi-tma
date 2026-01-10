NAME = ft_trancscendence

all: up

up:
	docker-compose up -d --build

down: 
	docker-compose down

logs :
	docker-compose logs -f

clean: down
	# we can delete database if needed here '-'
	docker-compose down --rmi all --volumes --remove-orphans

re: clean up