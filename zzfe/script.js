async function get_crossings(){
    // const run = checktime();
        if (true) {
        try{
            const resp = await fetch('http://127.0.0.1:8000/anal/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
            }
            });
            
            if (!resp.ok){
                throw new Error("An error occured");
            }

            const data = resp.json();

            console.log(data);
            const stock = data.data;
            console.log(stock)
            // for (let i=0; i<cross.length; i++){
            //     if (stock[i].cross.two != null){
            //         console.log(stock[i].cross.two);
            //     }
            //     if (stock[i].cross.one != null){
            //         console.log(stock[i].cross.one)
            //     }
            // }

        }
        catch(error){
            console.error(error);
        }
    }else{
        return null;
    }
}

const ulgt = document.getElementById('gold200');
const uldt = document.getElementById('death200');
const ulgo = document.getElementById('gold100');
const uldo = document.getElementById('death100');
let newLi;

async function get_c(){
    const r = await fetch('http://127.0.0.1:8080/anal/', {
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
