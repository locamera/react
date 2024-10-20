#!/bin/bash

# Colors for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to display the menu
show_menu() {
    echo -e "${YELLOW}LoCamera Management Script${NC}"
    echo "1) Start local development environment (HTTP)"
    echo "2) Start local development environment with HTTPS"
    echo "3) Start production environment"
    echo "4) Generate local SSL certificate"
    echo "5) Renew SSL certificate (for production)"
    echo "6) Run tests"
    echo "7) Build and push Docker images"
    echo "8) View logs"
    echo "9) Stop all containers"
    echo "10) Exit"
}

# Function to execute the selected option
execute_option() {
    case $1 in
        1)
            echo -e "${GREEN}Starting local development environment...${NC}"
            docker compose up --build
            ;;
        2)
            echo -e "${GREEN}Starting local development environment with HTTPS...${NC}"
            ./start-local-https.sh
            ;;
        3)
            echo -e "${GREEN}Starting production environment...${NC}"
            docker compose -f docker compose.prod.yml up -d
            ;;
        4)
            echo -e "${GREEN}Generating local SSL certificate...${NC}"
            ./generate-local-ssl.sh
            ;;
        5)
            echo -e "${GREEN}Renewing SSL certificate...${NC}"
            ./ssl-renew.sh
            ;;
        6)
            echo -e "${GREEN}Running tests...${NC}"
            docker compose run --rm frontend npm test
            docker compose run --rm api npm test
            ;;
        7)
            echo -e "${GREEN}Building and pushing Docker images...${NC}"
            docker compose build
            docker compose push
            ;;
        8)
            echo -e "${GREEN}Viewing logs...${NC}"
            docker compose logs -f
            ;;
        9)
            echo -e "${GREEN}Stopping all containers...${NC}"
            docker compose down
            ;;
        10)
            echo -e "${YELLOW}Exiting...${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option${NC}"
            ;;
    esac
}

# Main loop
while true; do
    show_menu
    read -p "Enter your choice: " choice
    execute_option $choice
    echo
    read -p "Press enter to continue..."
    clear
done
