
export interface Search {
    query: string;
    interval: number;
    token: string;
    sound: Sound;
    interruptionLevel: InterruptionLevel;
}

export const SOUNDS = {
    default: 'Predefinido',
    none: 'Silêncio',
    alarm: '⏰ Alarme',
    anticipate: '😯 Anticipar',
    bell: '🔔 Sino',
    bloom: '🌼 Florescer',
    calypso: '☝️ Calipso',
    chime: '✨ Sininhos',
    choo: '🚂 Chuu',
    descent: '📉 Descida',
    electronic: '🤖 Eletrónico',
    fanfare: '🎺 Fanfarra',
    glass: '🥃 Vidro',
    go_to_sleep: '😴 Hora de Dormir',
    health_notification: '💧 Gotinhas',
    horn: '📣 Buzina',
    ladder: '🪜 Escadote',
    minuet: '🐤 Minueto',
    multiway_invitation: '✅ Sucesso',
    new_mail: '📨 E-mail',
    news_flash: '📰 Notícias',
    noir: '🎷 Noir',
    payment_sucess: '💸 Pagamento',
    sent_mail: '📤 Enviado',
    sent_sms: '✉️ Mensagem',
    shake: '🫨 Agitar',
    sherwood_forest: '📯 Chamamento',
    spell: '🪄 Feitiço',
    suspense: '😨 Suspense',
    telegraph: '📠 Telégrafo',
    tiptoes: '🩰 Pontas dos Pés',
    typewriters: '⌨️ Máquina de Escrever',
    update: '‼️ Última Hora'
}

export type Sound = keyof typeof SOUNDS;

export const INTERRUPTION_LEVEL = {
    'active': 'Normal',
    'passive': 'Silencioso - Não acende o telemóvel',
    'time-sensitive': 'Urgente - Entregue imediatamente'
}

export type InterruptionLevel = keyof typeof INTERRUPTION_LEVEL;

export enum LogType { info, warn, error }

export function change($from: HTMLElement | HTMLElement[], $to: HTMLElement | HTMLElement[]){

    if(Array.isArray($from)){
        for(let $el of $from) $el.style.display = 'none';
    }else $from.style.display = 'none';

    if(Array.isArray($to)){
        for(let $el of $to) $el.style.removeProperty('display');
    }else $to.style.removeProperty('display');

}

export function wait(seconds: number){
    return new Promise(res=>setTimeout(res, seconds * 1e3));
}

export function time(date?: Date){
    if(!date) date = new Date();
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
}