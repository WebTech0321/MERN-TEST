const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/security/:what', (req, res) => {
  setTimeout(() => {
    let data = {};
    if( req.params.what === '1' ) {
      data = {
        "view": ["SEARCH", "GRID", "ADD"],
        "access": ["EDIT","DELETE", "VIEW", "ADD"]
      }
    } else if( req.params.what === '2' ) {
      data = {
        "view": ["SEARCH", "GRID", "ADD"],
        "access": ["VIEW"]
      }
    }
  
    res.send(data);
  }, 2000)
});

app.post('/table-content', (req, res) => {
  res.send("Data is " + req.body.data);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
