import { Response } from 'express';
import { STATUS_CODES } from 'http';

export default function error(res: Response, code: number, message?: string){

    if(!message) message = STATUS_CODES[code] ?? 'Ocorreu um erro!';

    res.status(code);
    res.render('error', { code, message });
}