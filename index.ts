import express, { Response } from 'express';
import icon from './lib/icon';
import cookieParser from 'cookie-parser';
import { sessions } from './lib/sessions';
import 'dotenv/config';
import error from './lib/error';
import { searches } from './lib/searches';
import { InterruptionLevel, Sound } from './lib/util';
import { alerts } from './lib/alerts';
import { syncWorkers } from './worker';
import { logs } from './lib/logs';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.locals = { icon }
app.use((req, res, next)=>{

    res.locals.path = req.path;

    next();
})

app.use(sessions.middleware);

function greeting(){
    const hour = new Date().getHours();
    if(hour < 5) return 'Boa noite!';
    if(hour < 12) return 'Bom dia!';
    if(hour < 20) return 'Boa tarde!';
    return 'Boa noite!';
}

/* ---------- HOME ---------- */

app.get('/', (req, res)=>res.render('home', { greeting: greeting() }));

/* ---------- ALERTS ---------- */

app.get('/alerts', (req, res)=>res.render('alerts'));
app.get('/api/list-alerts', async (req, res)=>{
    const { page } = req.query;
    res.json(await alerts.list(Number(page)));
});

/* ---------- SEARCHES ---------- */

app.get('/searches', async (req, res)=>res.render('searches', {
    searches: await searches.list(),
    lastChanifyToken: await searches.lastToken()
}));
app.post('/api/test-alert', async (req, res)=>{
    
    const { token, sound, interruptionLevel } = req.body as Record<string, string>;

    const { error } = await alerts.send({
        token,
        title: '🧪 Alerta de Teste',
        text: 'Ignora esta mensagem se não for relevante.',
        sound: sound as Sound,
        interruptionLevel: interruptionLevel as InterruptionLevel,
        source: 'Teste'
    });
    
    if(error){
        res.status(500);
        res.end(error);
        return;
    }

    res.end();
});
app.post('/api/add-search', async (req, res)=>{
    const { query, interval, token, sound, interruptionLevel } = req.body as Record<string, string>;
    await searches.create({
        query: query,
        interval: Number(interval),
        token: token,
        sound: sound as Sound,
        interruptionLevel: interruptionLevel as InterruptionLevel,
    });
    res.end();
});
app.get('/api/get-search/:id', async (req, res)=>{
    res.json(await searches.get(req.params.id));
});
app.post('/api/edit-search', async (req, res)=>{
    const { id, query, interval, token, sound, interruptionLevel } = req.body as Record<string, string>;
    await searches.edit(id, {
        query: query,
        interval: Number(interval),
        token: token,
        sound: sound as Sound,
        interruptionLevel: interruptionLevel as InterruptionLevel,
    });
    res.end();
});
app.get('/api/delete-search/:id', async (req, res)=>{
    await searches.delete(req.params.id);
    res.end();
});

/* ---------- DEVICES ---------- */

app.get('/devices', async (req, res)=>res.render('devices', { sessions: await sessions.list() }));
app.post('/api/add-device', async (req, res)=>{
    const { deviceId, name } = req.body;
    await sessions.create(deviceId, name);
    res.end();
});
app.post('/api/change-device-name', async (req, res)=>{
    const { deviceId, name } = req.body;
    await sessions.changeName(deviceId, name);
    res.end();
});
app.post('/api/revoke-device', async (req, res)=>{
    const { deviceId } = req.body;
    await sessions.revoke(deviceId);
    res.end();
});

/* ---------- LOGS ---------- */

app.get('/logs', (req, res)=>res.render('logs'));
app.get('/api/list-logs', async (req, res)=>{
    const { page } = req.query;
    res.json(await logs.list(Number(page)));
});

/* ---------- 404 ---------- */

app.use((req, res)=>error(res, 404));

app.listen(process.env.PORT, ()=>console.log(`Ready! http://localhost:${process.env.PORT}`));

/* ---------- WORKERS ---------- */

syncWorkers();