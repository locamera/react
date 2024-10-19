# LoCamera - Local Cameras on the Map

LoCamera is a web application that displays local cameras on an interactive map. It allows users to view camera locations, their live streams, and recent incidents.

## Features

- Interactive map displaying camera locations
- Camera information on hover
- Live stream playback controls
- Recent incidents display for each camera
- Dockerized application for easy deployment

## Technologies Used

- Frontend: React, Leaflet
- Backend: Node.js, Express
- Containerization: Docker, Docker Compose
- CI/CD: GitLab CI

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- Git

### Installation

Run the following commands:
```bash
cd api
npm install express cors
node index.js
```
You should see the message: "API running at http://localhost:3000"

For the frontend, we need to ensure all necessary dependencies are installed. In a new terminal window:

```bash
cd src
npm audit fix --force
npm install react-leaflet leaflet
npm audit fix --force
```

1. Clone the repository:
   ```
   git clone https://gitlab.com/your-username/locamera.git
   cd locamera
   ```

2. Install dependencies:
   ```
   npm install
   cd api && npm install && cd ..
   ```

3. Create a `.env` file in the root directory and add the necessary environment variables (see `.env.example`).

4. Start the development servers:
   ```
   npm start
   cd api && npm start
   ```

5. Open `http://localhost:3000` in your browser to view the application.

### Running with Docker

1. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

2. Open `http://localhost:80` in your browser to view the application.

## Deployment

The project includes a `.gitlab-ci.yml` file for GitLab CI/CD. To deploy:

1. Push your changes to the GitLab repository.
2. The pipeline will automatically build, test, and deploy the application.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenStreetMap for providing map data
- Leaflet.js for the interactive map functionality

## backend
Files structure
```
locamera/
├── api/
│   └── index.js
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Map.js
│   ├── App.js
│   └── index.css
│   └── index.js
├── package.json
└── README.md
```


## frontend
react

```
src/
├── components/
│   ├── Header.js
│   └── Map.js
├── styles/
│   ├── App.css
│   └── Header.css
├── App.js
└── index.js
public/
└── logo.svg
```



![img.png](img.png)
