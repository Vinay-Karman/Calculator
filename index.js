let storerender = '';
function clearlast(){
    storerender = storerender.slice(0,-1 )
    render();
}
function render(){
    document.querySelector(".render").innerHTML = storerender ;
    document.querySelector(".render").scrollLeft = document.querySelector(".render").scrollWidth;
    if(document.querySelector(".render").innerHTML === 'Error!'){
        document.querySelector(".render").classList.add('errormsg');
    }else {
        document.querySelector(".render").classList.remove('errormsg');
    }
}


function calculator(store){
    if(store ===''){
        return;
    }
    let partial = [];
    let par = ''
    for ( let i=0; i<store.length ;i++){
        
        if (store[i]=== '1' || store[i]=== '2' ||
        store[i]=== '3' || store[i]=== '4' ||
        store[i]=== '5' || store[i]=== '6' ||
        store[i]=== '7' || store[i]=== '8' ||store[i]=== '9' || store[i]=== '0' || store[i] === '.'){
            par += store[i]

        }else if(store[i] === '/' ||
        store[i] === '*' ||
        store[i] === '+' ||
        //store[i] === '-' ||
        store[i] === '%' ){
            if(par === '' || store[i+1]=== '/' ||
            store[i+1] === '*' ||
            store[i+1] === '+' ||
            store[i+1] === '-' ||
            store[i+1] === '%' ){
                document.querySelector(".render").innerHTML = 'Error!';
                document.querySelector(".render").classList.add('errormsg');
                storerender = '';
                return; 
            }
            partial.push(Number(par));
            par = '';
            partial.push(store[i])
        }
        else if(store[i] === '-'){
            if(store[i+1]=== '/' ||
            store[i+1] === '*' ||
            store[i+1] === '+' ||
            store[i+1] === '-' ||
            store[i+1] === '%' ){
                document.querySelector(".render").innerHTML = 'Error!';
                document.querySelector(".render").classList.add('errormsg');
                storerender = '';
                return; 
            }
            partial.push(Number(par));
            par = '';
            partial.push(store[i])
        }
    }
    if(par !== ''){
        partial.push(Number(par));
    }

    let m = 0;
    while(partial.length !== 1){
        let sum = 0;
        if(partial[m] === '%' ){
            sum = partial[m-1] *0.01;
            partial[m-1] = sum;
            if(partial.length >2){
                partial[m] = '*';
            }
            if(partial.length == 2){
                partial.splice(1);
            }
            m = 0;
        }
        if(m>partial.length){
            break;
        }
        m++;
    }

    m = 0;
    while(partial.length !== 1){
        let sum = 0;
        if(partial[m] === '/' ){
            sum = partial[m-1] / partial[m+1];
            partial[m-1] = sum;
            partial.splice(m , 2); 
            m = 0;
        }
        if(m>partial.length){
            break;
        }
        m++;
    }

    m = 0;
    while(partial.length !== 1){
        let sum = 0;
        if(partial[m] === '*' ){
            sum = partial[m-1] * partial[m+1];
            partial[m-1] = sum;
            partial.splice(m , 2);
            m = 0;
        }
        if(m>partial.length){
            break;
        }
        m++;
    }

    m = 0;
    while(partial.length !== 1){
        let sum = 0;
        if(partial[m] === '-' ){
            sum = partial[m-1] - partial[m+1];
            partial[m-1] = sum;
            partial.splice(m , 2); 
            m = 0; 
        }
        if(m>partial.length){
            break;
        }
        m++;
    }

    m = 0;
    while(partial.length !== 1){
        let sum = 0;
        if(partial[m] === '+' ){
            sum = partial[m-1] + partial[m+1];
            partial[m-1] = sum;
            partial.splice(m , 2);
            m = 0;
        }
        if(m>partial.length){
            break;
        }
        m++;
    }
    document.querySelector(".render").innerHTML = partial;

    storerender = partial;
}

function playAudio(){
    const audio = new Audio();
    audio.src = "clickUp.mp3";
    audio.play();
}
