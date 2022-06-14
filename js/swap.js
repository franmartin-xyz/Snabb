const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.walletConnect');

 if(typeof window.ethereum !== 'undefined') showAccount.setAttribute("style","display: none;");


ethereumButton.addEventListener('click', () => {
  getAccount();
});

function listArray(array,text){
    const walletConnect = document.querySelector(".walletConnect");
    let arrayList = document.querySelector("#walletList");
    let H1 = document.querySelector("#listTitle");
    if(!arrayList){
       H1 = document.createElement("h1");
       H1.setAttribute("id", "listTitle");
        arrayList = document.createElement("table");
        arrayList.setAttribute("id","walletList");
    }
    H1.innerHTML= text;
    walletConnect.appendChild(H1);
    arrayList.innerHTML="";
    const header = document.createElement("tr");
    const tdName = document.createElement("th");
    tdName.innerHTML="adress";
    header.appendChild(tdName);
    arrayList.appendChild(header);
    for(let i=0;i<array.length;i++){
       const nodotr = document.createElement("tr");
       let nodotd = document.createElement("td");
       nodotd.innerHTML=`${array[i]}`;
       nodotr.appendChild(nodotd)
       arrayList.appendChild(nodotr);
    };
    walletConnect.appendChild(arrayList);
}

async function getAccount() {
    try{
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        ethereumButton.setAttribute("style", "background-color: green;");
        showAccount.setAttribute("style","display: ;");
        const walletConnect = document.querySelector(".walletConnect");
        let appendAccount = document.querySelector(".walletAdress");
        if(!appendAccount){
            appendAccount = document.createElement("span");
            appendAccount.className = "walletAdress";
        }
        if (typeof window.ethereum !== 'undefined') {
        if(accounts) {
        appendAccount.innerHTML= `Wallet: ${accounts[0]}`;
        walletConnect.appendChild(appendAccount);}}
    }
    catch(error){
        Swal.fire({
            title:'NO TIENE METAMASK',
            color:"white",
            icon: 'error',
            position:"center",
            background: "rgb(66, 59, 59)",
            showConfirmButton: false,})
        }
}

const swapContainerArrowBtn = document.querySelector(".swapContainerArrowBtn");
swapContainerArrowBtn.addEventListener("click", ()=>{
    swapContainerArrowBtn.innerHTML === "↑" ?  
        swapContainerArrowBtn.innerHTML = "↓" : swapContainerArrowBtn.innerHTML = "↑";
})