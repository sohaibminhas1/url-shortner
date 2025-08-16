require('dotenv').config(); 

const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');

const userRoute = require('./Routes/user');
const urlRoute = require("./Routes/url");
const discordRoutes = require('./Routes/discordRoutes');
const { connectToDB } = require("./DBconnection");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");
const staticRoute = require("./Routes/staticRouter");
const URL = require("./Models/url");

const app = express();
const PORT = process.env.PORT || 8001;


connectToDB(process.env.MONGODB_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", urlRoute);
app.use("/",  staticRoute);
app.use("/user", userRoute);
app.use('/api', discordRoutes);

console.log('Discord routes registered at: /api/discord');

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use('/api/discord', (req, res, next) => {
    console.log(`Discord API route hit: ${req.method} ${req.path}`);
    next();
}, discordRoutes);

app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: 'URL Shortener'
    });
});

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
