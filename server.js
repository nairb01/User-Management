const jsonServer = require('json-server');
const path = require('path');
const express = require('express');
const app = express();

// Serve Angular App
app.use(express.static(path.join(__dirname, 'dist/angular-json-server')));

// JSON Server setup
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use('/api', middlewares, router);

// Redirect all other routes to Angular's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-json-server/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
