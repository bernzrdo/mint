import { Infinite } from './_infinite';

const $main: HTMLElement = document.querySelector('main')!;
const $content: HTMLDivElement = $main.querySelector('.content')!;
const $loading: HTMLDivElement = $content.querySelector('.loading')!;

const $icons: HTMLDivElement = $main.querySelector('.icons')!;
const ICONS = {
       infoCircle: $icons.querySelector('.icon-tabler-info-circle')!.outerHTML,
             bell: $icons.querySelector('.icon-tabler-bell')!.outerHTML,
            clock: $icons.querySelector('.icon-tabler-clock')!.outerHTML,
    alertTriangle: $icons.querySelector('.icon-tabler-alert-triangle')!.outerHTML
}

interface AlertDisplay {
    title: string;
    text: string;
    id: string;
    source: string;
    interruptionLevel: string;
    sentAt: string;
    hasError: boolean;
}

new Infinite('/api/list-alerts', (alert: AlertDisplay)=>{

    const $alert = document.createElement('div');
    $alert.className = 'card';

        const $title = document.createElement('div');
        $title.className = 'title';
        $title.innerText = alert.title;
        $alert.appendChild($title);

        const $text = document.createElement('div');
        $text.className = 'text';
        $text.innerText = alert.text;
        $alert.appendChild($text);

        const $id = document.createElement('div');
        $id.className = 'subtitle';
        $id.innerText = alert.id;
        $alert.appendChild($id);

        const $source = document.createElement('div');
        $source.className = 'info';
        $source.innerText = alert.source;
        $source.innerHTML = ICONS.infoCircle + $source.innerHTML;
        $alert.appendChild($source);

        const $interruptionLevel = document.createElement('div');
        $interruptionLevel.className = 'info';
        $interruptionLevel.innerText = alert.interruptionLevel;
        $interruptionLevel.innerHTML = ICONS.bell + $interruptionLevel.innerHTML;
        $alert.appendChild($interruptionLevel);

        const $sentAt = document.createElement('div');
        $sentAt.className = 'info';
        $sentAt.innerText = 'Enviado ' + alert.sentAt;
        $sentAt.innerHTML = ICONS.clock + $sentAt.innerHTML;
        $alert.appendChild($sentAt);

        if(alert.hasError){
            const $warn = document.createElement('div');
            $warn.className = 'warn';
            $warn.innerText = 'Ocorreu um erro ao tentar entregar este alerta.';
            $warn.innerHTML = ICONS.alertTriangle + $warn.innerHTML;
            $alert.appendChild($warn);
        }

    $content.insertBefore($alert, $loading);

})