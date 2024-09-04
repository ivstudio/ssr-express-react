import express from 'express';
import path from 'path';

import { bundlesMiddleware, serveStaticAssetsMiddleware } from './middleware';
import { render } from './render';

const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist/client')));
app.use(serveStaticAssetsMiddleware);
app.use(bundlesMiddleware);
app.get('*', async (req, res) => {
    try {
        const appHtml = await render(req, res);
        return res.status(200).end(appHtml);
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
