import { LogType, time } from '../../lib/util';
import { Infinite } from './_infinite';

const $main: HTMLElement = document.querySelector('main')!;
const $content: HTMLDivElement = $main.querySelector('.content')!;
const $loading: HTMLDivElement = $content.querySelector('.loading')!;

const $icons: HTMLDivElement = $main.querySelector('.icons')!;
const ICONS = {
       infoCircle: $icons.querySelector('.icon-tabler-info-circle')!.outerHTML,
    alertTriangle: $icons.querySelector('.icon-tabler-alert-triangle')!.outerHTML,
     alertHexagon: $icons.querySelector('.icon-tabler-alert-hexagon')!.outerHTML
}

interface LogDisplay {
    source: string;
    message: string;
    type: LogType;
    date: Date;
}

new Infinite('/api/list-logs', (log: LogDisplay)=>{

    const $log = document.createElement('div');

        if(log.type == LogType.info){
            $log.className = 'log info-log';
            $log.innerHTML = ICONS.infoCircle;
        }
        if(log.type == LogType.warn){
            $log.className = 'log warn-log';
            $log.innerHTML = ICONS.alertTriangle;
        }
        if(log.type == LogType.error){
            $log.className = 'log error-log';
            $log.innerHTML = ICONS.alertHexagon;
        }

        const $source = document.createElement('div');
        $source.className = 'source';
        $source.innerText = `[${time(new Date(log.date))}] ${log.source}: `;
        $log.appendChild($source);

        const $message = document.createElement('div');
        $message.className = 'message';
        $message.innerText = log.message;
        $log.appendChild($message);

        $content.insertBefore($log, $loading);

})