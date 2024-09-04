import { NextFunction, Request, Response } from 'express';
import path from 'path';

export const serveStaticAssetsMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const assetRegex =
        /\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)$/i;
    if (assetRegex.test(req.url)) {
        res.sendFile(path.join(__dirname, '../../dist/client', req.url));
    } else {
        next();
    }
};
