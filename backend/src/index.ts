import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/games', async (req: Request, res: Response) => {
    try {
        const response = await fetch('https://api.igdb.com/v4/games', {
            method: 'POST',
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID || '',
                'Authorization': `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
                'Accept': 'application/json',
                'Content-Type': 'text/plain'
            },
            body: `
                fields name, platforms.name, rating, first_release_date, cover.url;
                sort rating desc;
                limit 10;
            `
        });

        const data = await response.json();

        res.json(data);
    }
    catch (err){
        console.error('IGDB Gather error: ', err);
        res.status(500).json({ error: 'Failed to gather games from IGDB' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});