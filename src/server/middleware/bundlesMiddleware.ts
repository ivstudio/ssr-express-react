import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

interface Bundles {
    CSSBundles: string;
    JSBundles: string;
}

async function getAssetPaths(): Promise<Bundles> {
    try {
        const jsonData = fs.readFileSync(
            path.resolve(__dirname, '../../dist/client/assets.json'),
            'utf-8'
        );

        const assets = (JSON.parse(jsonData) || {}) as Record<string, string>;

        const { CSSBundles, JSBundles } = Object.values(assets).reduce(
            (acc, assetPath) => {
                if (assetPath.endsWith('.css')) {
                    acc.CSSBundles += `<link rel="stylesheet" href="${assetPath}">\n`;
                } else if (assetPath.endsWith('.js')) {
                    acc.JSBundles += `<script src="${assetPath}"></script>\n`;
                }
                return acc;
            },
            { CSSBundles: '', JSBundles: '' }
        );

        return {
            CSSBundles: CSSBundles.trim(),
            JSBundles: JSBundles.trim(),
        };
    } catch (error) {
        console.error('Error reading asset paths:', error);
        return {
            CSSBundles: '',
            JSBundles: '',
        };
    }
}

export async function bundlesMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const bundles = await getAssetPaths();
        res.locals.CSSBundles = bundles.CSSBundles;
        res.locals.JSBundles = bundles.JSBundles;
        next();
    } catch (error) {
        console.error('Error in bundles middleware:', error);
        next(error);
    }
}
