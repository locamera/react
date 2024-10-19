# [react](http://react.locamera.com)

![alt text](image.png)

Files strucutre
```bash
locamera/
├── api/
│   └── index.js
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Map.js
│   ├── App.js
│   └── index.js
│   └── index.css
├── package.json
└── README.md
```

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

Start
```bash
npm start
```


This should open your default browser to http://localhost:3000 (or another port if 3000 is already in use).
