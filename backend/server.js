const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const routes =require('./routes/router');
app.use(cors());

//parse JSON bodies
app.use(express.json());

//api middleware
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
