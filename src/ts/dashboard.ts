import modal from './_modal';

const $dndBtn: HTMLButtonElement = document.querySelector('.dnd-btn')!;

$dndBtn.addEventListener('click', ()=>{

    modal.setTitle('Silenciar notificações');
    modal.clear();
    modal.addText('Obrigado pelo interesse! Infelizmente esta funcionalidade ainda não foi desenvolvida mas, se tiveres interesse, manifesta-o à nossa equipa.');
    modal.addAction('OK', 'submit');
    modal.open();

});