import { change, INTERRUPTION_LEVEL, Search, SOUNDS, wait } from '../../lib/util';
import modal from './_modal';

declare const LAST_CHANIFY_TOKEN: string;

const $addBtn: HTMLButtonElement = document.querySelector('.add-btn')!;
const $cards: HTMLButtonElement = document.querySelector('.cards')!;

let busy = false;

function addTestBtn(){
    modal.addAction('Enviar alerta de teste', testAlert, { className: 'test-btn' });
    modal.addAction('A enviar...', null, { className: 'test-sending', disabled: true, hidden: true });
    modal.addAction('Enviado!', null, { className: 'test-sent', disabled: true, hidden: true });
    modal.addAction('Ocorreu um erro!', null, { className: 'test-error danger', disabled: true, hidden: true });
}

async function testAlert(){
    if(busy) return;
    busy = true;

    const $testBtn: HTMLButtonElement = modal.$.querySelector('.test-btn')!;
    const $sendingBtn: HTMLButtonElement = modal.$.querySelector('.test-sending')!;
    const $sentBtn: HTMLButtonElement = modal.$.querySelector('.test-sent')!;
    const $errorBtn: HTMLButtonElement = modal.$.querySelector('.test-error')!;

    const { data } = modal.getData(false);
    if(!data.token){
        
        change($testBtn, $errorBtn);
        await wait(3);
        change($errorBtn, $testBtn);

        busy = false;
        return;
    }
    
    change($testBtn, $sendingBtn);
    try{
        
        const req = await fetch('/api/test-alert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: data.token,
                sound: data.sound,
                interruptionLevel: data.interruptionLevel
            })
        });
        if(!req.ok) throw new Error(await req.text());

        change($sendingBtn, $sentBtn);
    }catch(e){
        change($sendingBtn, $errorBtn);
        console.error(e);
    }

    await wait(3);

    change([ $sentBtn, $errorBtn ], $testBtn);

    busy = false;
}

$addBtn.addEventListener('click', async ()=>{

    modal.setTitle('Adicionar pesquisa');

    modal.clear();
    modal.width(500);

    modal.addText('Cria uma pesquisa que envie alertas.');
    modal.addInput('query', 'Termo', {
        placeholder: 'One Direction',
        check: value=>!value && 'O termo de pesquisa é obrigatório.'
    });
    modal.addInput('interval', 'Frequência (minutos)', {
        default: '1',
        fix: value=>value.replace(/[^0-9]/g, ''),
        check(value){
            if(!value) return 'A frequência é obrigatória.';
            const n = Number(value);
            if(isNaN(n)) return 'A frequência é inválida.';
            if(n < 1) return 'O mínimo é a cada minuto.'
        }
    });
    modal.addInput('token', 'Token do Chanify', {
        default: LAST_CHANIFY_TOKEN,
        className: 'monospace',
        check: value=>!value && 'O token do Chanify é obrigatório.'
    });
    modal.addSelect('sound', 'Toque', SOUNDS);
    modal.addSelect('interruptionLevel', 'Nível de Interrupção', INTERRUPTION_LEVEL);
    
    modal.addAction('Cancelar', 'cancel', { className: 'secondary' });
    addTestBtn();
    modal.addAction('Adicionar', 'submit');

    let { success, data } = await modal.open();
    if(!success) return;

    await fetch('/api/add-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    location.reload();

});

for(const $card of $cards.querySelectorAll('.card') as NodeListOf<HTMLDivElement>){

    const id = $card.dataset.id;

    const $title: HTMLDivElement = $card.querySelector('.title')!;
    const $editBtn: HTMLButtonElement = $card.querySelector('.edit-btn')!;
    const $deleteBtn: HTMLButtonElement = $card.querySelector('.delete-btn')!;

    $editBtn.addEventListener('click', async ()=>{

        const req = await fetch(`/api/get-search/${id}`);
        const search: Search = await req.json();

        modal.setTitle('Editar pesquisa');

        modal.clear();
        modal.width(500);

        modal.addInput('query', 'Termo', {
            placeholder: search.query,
            default: search.query,
            check: value=>!value && 'O termo de pesquisa é obrigatório.'
        });
        modal.addInput('interval', 'Frequência (minutos)', {
            placeholder: search.interval.toString(),
            default: search.interval.toString(),
            fix: value=>value.replace(/[^0-9]/g, ''),
            check(value){
                if(!value) return 'A frequência é obrigatória.';
                const n = Number(value);
                if(isNaN(n)) return 'A frequência é inválida.';
                if(n < 1) return 'O mínimo é a cada minuto.'
            }
        });
        modal.addInput('token', 'Token do Chanify', {
            placeholder: search.token,
            default: search.token,
            className: 'monospace',
            check: value=>!value && 'O token do Chanify é obrigatório.'
        });
        modal.addSelect('sound', 'Toque', SOUNDS, search.sound);
        modal.addSelect('interruptionLevel', 'Nível de Interrupção', INTERRUPTION_LEVEL, search.interruptionLevel);

        modal.addAction('Cancelar', 'cancel', { className: 'secondary' });
        addTestBtn();
        modal.addAction('Editar', 'submit');

        let { success, data } = await modal.open();
        if(!success) return;

        await fetch('/api/edit-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...data })
        });
    
        location.reload();

    });

    $deleteBtn.addEventListener('click', async ()=>{

        modal.setTitle('Apagar pesquisa');

        modal.clear();

        modal.addText(`Irá deixar de receber alertas para a pesquisa ${$title.innerText.trim()}.`);

        modal.addAction('Cancelar', 'cancel');
        modal.addAction('Apagar', 'submit', { className: 'danger' });

        let { success } = await modal.open();
        if(!success) return;

        await fetch(`/api/delete-search/${id}`);
    
        location.reload();

    });

}
