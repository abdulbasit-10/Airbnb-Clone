const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// ✅ Enable CORS for all origins
app.use(cors());

// ✅ Mongoose Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/ai-tool', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Error: ", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/gemini', require('./routes/geminiRoute'));
app.use('/api/tool', require('./routes/toolRoute'));

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
