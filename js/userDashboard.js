// get coin list data
async function getCoinsList(){
    try{
        let list = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
        var jsonList = await list.json();
    }catch(error){
        console.log(error);
     }
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
                            <th><button type="button" class="addToPortfolioBtn" value="${coin.id}">add</button></th>
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
                            <th><button type="button" class="addToPortfolioBtn" value="${coin.id}">add</button></th>
                        `;
                        table.appendChild(coinTr);}
            });}
            displayCoinList(arr);
            coinListContainer.appendChild(table);
            let main = document.querySelector(".mainUserDashboard");
            main.appendChild(coinListContainer);
            let sortCoinList = document.getElementById("coinListSort");
            sortCoinList.addEventListener("input",()=>{
                    let coinSort = arr.sort((a,b)=>{ return b[sortCoinList.value] - a[sortCoinList.value];});
                    displayCoinList(coinSort);
            });
            const coinListFilter = document.getElementById("coinListFilter");
            coinListFilter.addEventListener("keypress",()=>{
                let coinFound = arr.filter(coin => coin.name.includes(coinListFilter.value));
                displayCoinList(coinFound);
            });
            let addToPortfolioBtn = document.querySelectorAll(".addToPortfolioBtn");
            for(let i=0;i<addToPortfolioBtn.length;i++){
                addToPortfolioBtn[i].addEventListener("click",()=>{
                    let userPortfolio = localStorage.getItem("users");
                    userPortfolio = JSON.parse(userPortfolio);
                    let userId = localStorage.getItem("currentLoggedUser");
                    if(!userPortfolio[userId].wallet){
                        let WalletArr = [];
                        let newCoins = {amount:null,coin:`${addToPortfolioBtn[i].value}`};
                        WalletArr.push(newCoins);
                        userPortfolio[userId].wallet = WalletArr;
                        localStorage.setItem("users",JSON.stringify(userPortfolio));}
                    else{
                        let WalletArr = [];
                        WalletArr = userPortfolio[userId].wallet;
                        let found = WalletArr.find(o => o.coin === `${addToPortfolioBtn[i].value}`);
                        if(!found){let newCoins = {amount:null,coin:`${addToPortfolioBtn[i].value}`};
                            WalletArr.push(newCoins);
                            localStorage.setItem("users",JSON.stringify(userPortfolio));
                            let popUp = document.getElementById("portfolioPopUp");
                            popUp.style.display="inline";
                            setTimeout(()=>{
                                popUp.style.display="none";
                            },1500);
                        }
                        else{
                            Swal.fire({
                                title:'La moneda ya está en su wallet',
                                color:"white",
                                icon: 'info',
                                position:"center",
                                width:"500px",
                                background: "rgb(66, 59, 59)",
                                showConfirmButton: false,})
                            
                        }
                    }
                });
            };
    };
    printCoinList(jsonList);
    function portfolio(){
        let portfolioBtn = document.querySelector(".portfolioBtn");
        portfolioBtn.addEventListener("click",()=>{
            let mainUserDashboard = document.querySelector(".mainUserDashboard");
            mainUserDashboard.remove(mainUserDashboard);
            let main = document.createElement("main");
            main.className = "mainUserDashboard";
            let userId = localStorage.getItem("currentLoggedUser");
            let users = localStorage.getItem("users");
            JSON.parse(users);
            let portfolioArr = users[userId].wallet;
            console.log(users[userId].wallet);
            // printCoinList();
        })
    };
    portfolio();
};
//User Side Panel
function userInfo(){let userInfoBtn = document.querySelector(".user-infoBtn");
    userInfoBtn.addEventListener("click",()=>{
        if(!localStorage.getItem("userProfilePic")){ localStorage.setItem("userProfilePic","https://m.media-amazon.com/images/I/51qwyXpJNHL._AC_SL1000_.jpg")};
        let userProfilePicUrl = localStorage.getItem("userProfilePic");
        let mainUserDashboard = document.querySelector(".mainUserDashboard");
        mainUserDashboard.remove(mainUserDashboard);
        let main = document.createElement("main");
        main.className = "mainUserInfoDashboard";
        main.innerHTML = `<img src="${userProfilePicUrl}" id="userImg"></img>
        <input type="text" id="changeProfilePic" autocomplete="off" placeholder="change profile image with url">
        <button id="changeProfilePicBtn" type="button">Save Profile Pic</button>
        <button id="logOutBtn" type="button">Log Out</button>
        <button id="backToMainDashboard" type="button">Back to main</button>`;
        document.body.appendChild(main);
        function userProfilePic(){
            let changeProfilePicBtn = document.getElementById("changeProfilePicBtn");
            changeProfilePicBtn.addEventListener("click",()=>{
                let changeProfilePic = document.getElementById("changeProfilePic");
                localStorage.setItem("userProfilePic",changeProfilePic.value);
            })
        };
        userProfilePic();
        function backToMainDashboard(){
            let backToMainDashboardBtn = document.getElementById("backToMainDashboard");
            backToMainDashboardBtn.addEventListener("click",()=>{
                document. location. reload();
            })
        };
        backToMainDashboard();
        function logOut(){
            let logOutBtn = document.getElementById("logOutBtn");
            logOutBtn.addEventListener("click",()=>{
                localStorage.removeItem("currentLoggedUser");
                document. location. reload();
            })
        };
        logOut();
    }) 
};



//user dashboard
export function dashboard(){
    let main = document.querySelector(".main");
    main.parentElement.removeChild(main);
    let userSidePanel = document.createElement("div");
    userSidePanel.className = "userSidePanel";
    userSidePanel.innerHTML=`
        <button class="settingsBtn" type="button">Settings</button>
        <button class="user-infoBtn" type="button">User Info</button>
        <button class="portfolioBtn" type="button">Portfolio<span id="portfolioPopUp">coin added</span></button>`;
    main = document.createElement("main");
    main.className = "mainUserDashboard";
    document.body.appendChild(main);
    main.appendChild(userSidePanel);
    getCoinsList();
    userInfo();
}
