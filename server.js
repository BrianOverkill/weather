import express from 'express';
import fetch from 'node-fetch';
import config from './config.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./'));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }
    const apiUrl = `${config.baseUrl}/weather?q=${city}&appid=${config.weatherApiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
