// NETWORK
const addr = 'http://localhost:8000'; // CHANGE BEFORE DEPLOY

// DOM
const ulgt = document.getElementById('gold200');
const uldt = document.getElementById('death200');
const ulgo = document.getElementById('gold100');
const uldo = document.getElementById('death100');
const oldulgt = document.getElementById('old-gold200');
const olduldt = document.getElementById('old-death200');
const oldulgo = document.getElementById('old-gold100');
const olduldo = document.getElementById('old-death100');
const updated = document.getElementById('update-time');
let newLi;

async function meta(){
    get_old_c()
    if (before_market()){
        display_before_market();
    }else{
        get_c();
    }
}

function display_before_market(){
    uldo.innerHTML = 'N/A';
    uldt.innerHTML = 'N/A';
    ulgo.innerHTML = 'N/A';
    ulgt.innerHTML = 'N/A';
    const now = new Date();
    updated.innerHTML = "Updated: " + now;
}

async function get_old_c(){
    const r = await fetch(addr + '/anal/old/', {
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

        olduldo.innerHTML = '';
        olduldt.innerHTML = '';
        oldulgo.innerHTML = '';
        oldulgt.innerHTML = '';

        return data.data;
    })
    .then(stocks => {
        for (let i=0; i<stocks.length; i++){
            switch(stocks[i].type){
                case 'death100':{
                    newLi = document.createElement("li");
                    const t = document.createElement('p');
                    t.innerHTML = stocks[i].ticker;
                    const d = document.createElement('p');
                    d.innerHTML = stocks[i].date.split('T')[0];
                    newLi.appendChild(t);
                    newLi.appendChild(d);
                    olduldo.appendChild(newLi);
                    break;
                }
                case 'death200':{
                    newLi = document.createElement("li");
                    const t = document.createElement('p');
                    t.innerHTML = stocks[i].ticker;
                    const d = document.createElement('p');
                    d.innerHTML = stocks[i].date.split('T')[0];
                    newLi.appendChild(t);
                    newLi.appendChild(d);
                    olduldt.appendChild(newLi);
                    break;
                }
                case 'gold100':{
                    newLi = document.createElement("li");
                    const t = document.createElement('p');
                    t.innerHTML = stocks[i].ticker;
                    const d = document.createElement('p');
                    d.innerHTML = stocks[i].date.split('T')[0];
                    newLi.appendChild(t);
                    newLi.appendChild(d);
                    oldulgo.appendChild(newLi);
                    break;
                }
                case 'gold200':{
                    newLi = document.createElement("li");
                    const t = document.createElement('p');
                    t.innerHTML = stocks[i].ticker;
                    const d = document.createElement('p');
                    d.innerHTML = stocks[i].date.split('T')[0];
                    newLi.appendChild(t);
                    newLi.appendChild(d);
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

    const localData = localStorage.getItem("stocks");

    if (localData != null){

        // console.log(localData);

        const localJSON = JSON.parse(localData)

        // console.log(localJSON.date);

        if (isToday(localJSON.date)){
            
            uldo.innerHTML = '';
            uldt.innerHTML = '';
            ulgo.innerHTML = '';
            ulgt.innerHTML = '';

            const stocks = localJSON.stocks

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
        }
    }

    const r = await fetch(addr + '/anal/', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
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
        return data
    })
    .then(stocks => {

        console.log(stocks.meta)

        stocks = stocks.data

        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth();
        const d = now.getDate();
        const date = y + "-" + m + "-" + d;
    
        let toStore = {
            "date": date,
            "stocks": []
        }

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
            toStore['stocks'].push(stocks[i])
            console.log(crosses.one==null, crosses.two==null)
        }

        localStorage.setItem("stocks", JSON.stringify(toStore))
        console.log(localStorage.getItem("stocks"))

    })
    .finally(() => {
        const now = new Date();
        updated.innerHTML = "Updated: " + now;
        console.log("Done")
    })
    .catch(e => {
        updated.innerHTML = "Error fetching stock data";
        console.error(e)
    })
}

function isToday(date){
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    const d = date.split("-")
    if (d[0] != year || d[1] != month || d[2] != day){
        return false
    }
    return true
}

function before_market(){
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    if (h < 7 || (h === 7 && m < 30)){
        return true;
    }
    return false;
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
