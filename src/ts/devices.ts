import modal from './_modal';

const $addBtn: HTMLButtonElement = document.querySelector('.add-btn')!;
const $cards: HTMLButtonElement = document.querySelector('.cards')!;

$addBtn.addEventListener('click', async ()=>{

    modal.setTitle('Adicionar dispositivo');

    modal.clear();

    modal.addText('Concede acesso ao painel de controlo a um novo dispositivo.');
    modal.addInput('deviceId', 'Código', {
        placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        check(value){
            if(!value) return 'O código do dispositivo é obrigatório.';
            if(/[^0-9a-f-]/.test(value)) return 'Verifica se o código está correto.'
        },
        className: 'monospace'
    });
    modal.addInput('name', 'Nome', {
        placeholder: 'iPhone, Portátil, MacBook...',
        check: value=>!value && 'Um nome para o dispositivo é obrigatório.'
    });

    modal.addAction('Cancelar', 'cancel', { className: 'secondary' });
    modal.addAction('Adicionar', 'submit');

    let { success, data } = await modal.open();
    if(!success) return;

    await fetch('/api/add-device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    location.reload();
    
});

for(const $card of $cards.querySelectorAll('.card') as NodeListOf<HTMLDivElement>){

    const deviceId = $card.dataset.id;

    const $title: HTMLDivElement = $card.querySelector('.title')!;
    const $editBtn: HTMLButtonElement = $card.querySelector('.edit-btn')!;
    const $revokeBtn: HTMLButtonElement = $card.querySelector('.revoke-btn')!;

    $editBtn.addEventListener('click', async ()=>{

        modal.setTitle('Editar nome');

        modal.clear();

        modal.addInput('name', 'Nome', {
            placeholder: 'iPhone, Portátil, MacBook...',
            check: value=>!value && 'Um nome para o dispositivo é obrigatório.',
            default: $title.innerText.trim()
        });

        modal.addAction('Cancelar', 'cancel', { className: 'secondary' });
        modal.addAction('Editar', 'submit');

        let { success, data } = await modal.open();
        if(!success) return;

        await fetch('/api/change-device-name', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deviceId, name: data.name })
        });
    
        location.reload();

    });

    $revokeBtn.addEventListener('click', async ()=>{

        modal.setTitle('Revogar acesso');

        modal.clear();

        modal.addText(`O dispositivo "${$title.innerText.trim()}" irá deixar de ter acesso a este painel de controlo.`);

        modal.addAction('Cancelar', 'cancel');
        modal.addAction('Revogar', 'submit', { className: 'danger' });

        let { success } = await modal.open();
        if(!success) return;

        await fetch('/api/revoke-device', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deviceId })
        });
    
        location.reload();

    });

}
