// get coin list data
async function getCoinsList(){
    try{
        let list = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
        let jsonList = await list.json();
        console.log(jsonList);
        // print coin list
        function printCoinList(arr){
            let coinListContainer = document.createElement("div");
            coinListContainer.innerHTML = `<div class="coinListFilters"><label for="sort">Sort by:</label>
            <select name="sort" id="coinListSort">
            <option value="market_cap">Market Cap</option>
            <option value="current_price">Price</option>
            <option value="name">Name</option>
            <option value="price_change_24h">Price change 24h</option>
            </select>
            <input type="text" name="filter" autocomplete="off" placeholder="search by name" id="coinListFilter"></div>`
            coinListContainer.className = "coinList";
            let table = document.createElement("table");
            table.className = "coinListTable";
            table.innerHTML =`<tr>
                <th>image</th>
                <th>symbol</th>
                <th>current_price</th>
                <th>market_cap</th>
                <th>price_change_24h</th>
                <th>market_cap_rank</th>
                <th>add to portfolio</tr>
            </tr>`;
            function displayCoinList(arr){
                table.remove(table);
                table = document.createElement("table");
                table.className = "coinListTable";
                table.innerHTML =`<tr>
                    <th>image</th>
                    <th>symbol</th>
                    <th>current_price</th>
                    <th>market_cap</th>
                    <th>price_change_24h</th>
                    <th>market_cap_rank</th>
                    <th>add to portfolio</tr>
                </tr>`;
                coinListContainer.appendChild(table);
                arr.forEach(coin => {
                    let coinTr = document.querySelector(".coinListTable");
                    if(!coinTr) {
                        let coinTr = document.createElement("tr");
                        coinTr.innerHTML = `<th><img src="${coin.image}" alt="${coin.name}" width="20" height="20"></th>
                            <th>${coin.symbol}</th>
                            <th>${coin.current_price}</th>
                            <th>${coin.market_cap}</th>
                            <th>${coin.price_change_24h}</th>
                            <th>${coin.market_cap_rank}</th>
                            <th><button type="button" id="${coin.id}">add</button></th>
                        `;
                        table.appendChild(coinTr);}
                    else{
                        let coinTr = document.createElement("tr"); 
                        coinTr.className = "coinListTable";
                        coinTr.innerHTML = `<th><img src="${coin.image}" alt="${coin.name}" width="20" height="20"></th>
                            <th>${coin.symbol}</th>
                            <th>${coin.current_price}</th>
                            <th>${coin.market_cap}</th>
                            <th>${coin.price_change_24h}</th>
                            <th>${coin.market_cap_rank}</th>
                            <th><button type="button" id="${coin.id}">add</button></th>
                        `;
                        table.appendChild(coinTr);}
            });}
            displayCoinList(arr);
            coinListContainer.appendChild(table);
            let main = document.querySelector(".mainUserDashboard");
            main.appendChild(coinListContainer);
            let sortCoinList = document.getElementById("coinListSort");
            sortCoinList.addEventListener("input",()=>{
                    let coinSort = arr.sort((a,b)=>{ return b[sortCoinList] - a[sortCoinList];});
                    console.log(coinSort);
                    console.log(sortCoinList.value);
                    displayCoinList(coinSort);
            });
            const coinListFilter = document.getElementById("coinListFilter");
            coinListFilter.addEventListener("keypress",()=>{
                setTimeout(()=>{
                    let coinFound = arr.filter(coin => coin.name.includes(coinListFilter.value));
                    console.log(coinFound);
                    displayCoinList(coinFound);
                },1000);
            });
    };
    printCoinList(jsonList);
    }catch(error){
       console.log(error);
    }
};
//user dashboard
export function dashboard(){
    let main = document.querySelector(".main");
    main.parentElement.removeChild(main);
    let userSidePanel = document.createElement("div");
    userSidePanel.className = "userSidePanel";
    userSidePanel.innerHTML=`
        <button class="settings" type="button">Settings</button>
        <button class="User Info" type="button">User Info</button>
        <button class="Portfolio" type="button">Portfolio</button>`;
    main = document.createElement("main");
    main.className = "mainUserDashboard";
    document.body.appendChild(main);
    main.appendChild(userSidePanel);
    getCoinsList();
}
