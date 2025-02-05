
const $modalContainer: HTMLDivElement = document.querySelector('.modal-container')!;
const $modal: HTMLDivElement = $modalContainer.querySelector('.modal')!;

const $title: HTMLDivElement = $modal.querySelector('.title')!;
const $closeBtn: HTMLDivElement = $modal.querySelector('.close-btn')!;
const $body: HTMLDivElement = $modal.querySelector('.body')!;
const $footer: HTMLDivElement = $modal.querySelector('.footer')!;

interface Result {
    success: boolean;
    data: { [name: string]: string };
}
let resolve: ((value: Result)=>void) | null = null;

type InputCheck = (value: string)=>string | undefined | false;
let inputChecks: { [name: string]: InputCheck } = {};

interface InputOptions {
    placeholder?: string;
    check?: InputCheck;
    fix?: (value: string)=>string;
    className?: string;
    default?: string;
}

interface ActionOptions {
    className?: string;
    disabled?: boolean;
    hidden?: boolean;
}

const modal = {

    $: $modal,
    
    setTitle(title: string){
        $title.innerText = title;
    },

    clear(){
        inputChecks = {};
        $modal.style.width = '500px';
        $body.innerHTML = '';
        $footer.innerHTML = '';
    },

    width(size: number){
        $modal.style.width = `${size}px`;
    },

    addText(text: string){
        const $text = document.createElement('p');
        $text.innerText = text;
        $body.appendChild($text);
    },

    addInput(name: string, label: string, options?: InputOptions){
        
        const $group = document.createElement('div');
        $group.className = 'input-group';

            const $label = document.createElement('label');
            $label.htmlFor = name;
            $label.innerText = label;
            $group.appendChild($label);
        
            const $input = document.createElement('input');
            if(options?.className) $input.className = options.className;
            $input.id = name;
            $input.name = name;
            $input.addEventListener('input', ()=>{
                if(options?.fix) $input.value = options.fix($input.value);
                $group.classList.remove('has-error');
            });
            if(options?.placeholder) $input.placeholder = options.placeholder;
            if(options?.default) $input.value = options.default;
            $group.appendChild($input);

            const $error = document.createElement('div');
            $error.className = 'error';
            $group.appendChild($error);

        $body.appendChild($group);

        if(options?.check) inputChecks[name] = options.check

    },

    addSelect<K extends string>(name: string, label: string, options: { [value in K]: string }, defaultOption?: K){
        
        const $group = document.createElement('div');
        $group.className = 'input-group';

            const $label = document.createElement('label');
            $label.htmlFor = name;
            $label.innerText = label;
            $group.appendChild($label);
        
            const $select = document.createElement('select');
            $select.id = name;
            $select.name = name;

                for(const [value, text] of Object.entries(options) as [K, string][]){
                    const $option = document.createElement('option');
                    $option.value = value;
                    $option.innerText = text;
                    $select.appendChild($option);
                }

            $group.appendChild($select);

            if(defaultOption){
                const i = Object.keys(options).findIndex(o=>o == defaultOption);
                if(i != -1) $select.selectedIndex = i;
            }

            const $error = document.createElement('div');
            $error.className = 'error';
            $group.appendChild($error);

        $body.appendChild($group);

    },

    addAction(text: string, action: 'submit' | 'cancel' | (()=>void) | null, options?: ActionOptions){
        const $btn = document.createElement('button');
        $btn.className = `btn ${options?.className ?? ''}`.trim();
        if(options?.disabled) $btn.disabled = true;
        if(options?.hidden) $btn.style.display = 'none';
        $btn.innerText = text;
        if(action != null){
            $btn.addEventListener('click', typeof action === 'string'
                ? ()=>modal[action]()
                : ()=>action()
            );
        }
        $footer.appendChild($btn);
    },

    cancel(){
        if(!resolve) return;

        resolve({ success: false, data: {} });
        resolve = null;

        modal.close();

    },

    getData(check = true){
        
        let success = true;

        const data: Record<string, string> = {};

        for(const $input of $body.querySelectorAll('input')){

            const { value } = $input;
            if(check && inputChecks[$input.name]){

                const error = inputChecks[$input.name](value);

                if(error){

                    const $container = $input.parentElement! as HTMLDivElement;
                    const $error: HTMLDivElement = $container.querySelector('.error')!; 

                    $container.classList.add('has-error');
                    $error.innerText = error;
                    
                    success = false;

                }

            }

            data[$input.name] = value;
        }

        for(const $select of $body.querySelectorAll('select')){
            data[$select.name] = $select.value;
        }

        return { success, data }
    },

    submit(){
        if(!resolve) return;

        const res = modal.getData();
        if(!res.success) return;

        resolve(res);
        resolve = null;

        modal.close();

    },

    open(){
        $modalContainer.classList.remove('off');
        return new Promise<Result>(r=>resolve = r);
    },
    
    close(){
        $modalContainer.classList.add('off');
    }
    
}

$modalContainer.addEventListener('click', e=>e.target == $modalContainer && modal.cancel());
$closeBtn.addEventListener('click', ()=>modal.cancel());

export default modal;