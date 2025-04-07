const ulgt = document.getElementById('gold200');
const uldt = document.getElementById('death200');
const ulgo = document.getElementById('gold100');
const uldo = document.getElementById('death100');
const oldulgt = document.getElementById('old-gold200');
const olduldt = document.getElementById('old-death200');
const oldulgo = document.getElementById('old-gold100');
const olduldo = document.getElementById('old-death100');
let newLi;

async function meta(){
    get_old_c()
    get_c()
}

async function get_old_c(){
    const r = await fetch('http://13.41.110.181:8080/anal/old/', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok){
            throw new Error("Something went wrong");
        }
        return res.json();
    })
    .then(data => {
        return data.data;
    })
    .then(stocks => {
        for (let i=0; i<stocks.length; i++){
            switch(stocks[i].type){
                case 'death100':{
                    newLi = document.createElement("li");
                    newLi.textContent = stocks[i].ticker;
                    olduldo.appendChild(newLi);
                    break;
                }
                case 'death200':{
                    newLi = document.createElement("li");
                    newLi.textContent = stocks[i].ticker;
                    olduldt.appendChild(newLi);
                    break;
                }
                case 'gold100':{
                    newLi = document.createElement("li");
                    newLi.textContent = stocks[i].ticker;
                    oldulgo.appendChild(newLi);
                    break;
                }
                case 'gold200':{
                    newLi = document.createElement("li");
                    newLi.textContent = stocks[i].ticker;
                    oldulgt.appendChild(newLi);
                    break;
                }
            }
        }
    })
    .finally(() => {
        console.log("Done")
    })
    .catch(e => {
        console.error(e)
    })
}

async function get_c(){
    const r = await fetch('http://13.41.110.181:8080/anal/', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            }
        }
    )
    .then(res => {
        if(!res.ok){
            throw new Error("Something went wrong");
        }
        return res.json()
        }
    )
    .then(data => {
        uldo.innerHTML = '';
        uldt.innerHTML = '';
        ulgo.innerHTML = '';
        ulgt.innerHTML = '';
        return data.data
    })
    .then(stocks => {
        for (let i=0; i<stocks.length; i++){
            const crosses = stocks[i].cross;
            if (crosses.one == 'Death'){
                newLi = document.createElement("li");
                newLi.textContent = stocks[i].ticker;
                uldo.appendChild(newLi);
            }
            if (crosses.one == 'Gold'){
                newLi = document.createElement("li");
                newLi.textContent = stocks[i].ticker;
                ulgo.appendChild(newLi);
            }
            if (crosses.two == 'Death'){
                newLi = document.createElement("li");
                newLi.textContent = stocks[i].ticker;
                uldt.appendChild(newLi);
            }
            if (crosses.two == 'Gold'){
                newLi = document.createElement("li");
                newLi.textContent = stocks[i].ticker;
                ulgt.appendChild(newLi);
            }
            console.log(crosses.one==null, crosses.two==null)
        }
    })
    .finally(() => {
        console.log("Done")
    })
    .catch(e => {
        console.error(e)
    })
        
}

function timecheck(){
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    if (h > 16 || (h === 16 && m >= 30)){
        return true;
    }
    else{
        return false;
    }
}
