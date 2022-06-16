const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.walletConnect');

 if(typeof window.ethereum !== 'undefined') showAccount.setAttribute("style","display: none;");


ethereumButton.addEventListener('click', () => {
  getAccount();
});

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