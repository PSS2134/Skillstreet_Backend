const express =  require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./database/connection');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notesRoutes');
require('dotenv').config();

const PORT =process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/api/notes',notesRoutes);

const start = async() => {
try {
    await connectDB();
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`);
    })
}
catch (err) {
    console.error(err.message);

}
}

start();
