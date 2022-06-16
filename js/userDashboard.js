// get coin list data
async function getCoinsList(){
    try{
        let list = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
        let jsonList = await list.json();
        console.log(jsonList);
    }catch(error){
        console.log("error");
    }
};
//user dashboard
export function dashboard(){
    let main = document.querySelector(".main");
    main.parentElement.removeChild(main);
    let userSidePanel = document.createElement("div");
    userSidePanel.className = "userSidePanel";
    userSidePanel.innerHTML=`<ul>
        <li><button class="settings" type="button">Settings</button></li>
        <li><button class="User Info" type="button">User Info</button></li>
        <li><button class="Portfolio" type="button">Portfolio</button></li>
    </ul>`;
    main = document.createElement("main");
    main.className = "main";
    document.body.appendChild(main);
    main.appendChild(userSidePanel);
    listCoins();
}

//list coins
export function listCoins(){
    getCoinsList();
}