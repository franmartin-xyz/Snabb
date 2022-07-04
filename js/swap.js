function deleteAtCaret(areaId,text) {
	var txtarea = document.getElementById(areaId);
	var scrollPos = txtarea.scrollTop;
	var strPos = 0;
	var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
		"ff" : (document.selection ? "ie" : false ) );
	if (br == "ie") { 
		txtarea.focus();
		var range = document.selection.createRange();
		range.moveStart ('character', -txtarea.value.length);
		strPos = range.text.length;
	}
	else if (br == "ff") strPos = txtarea.selectionStart;
	
	var front = (txtarea.value).substring(0,strPos);  
	var back = (txtarea.value).substring(strPos,txtarea.value.length); 
	txtarea.value=" ";
	strPos = strPos + text.length;
	if (br == "ie") { 
		txtarea.focus();
		var range = document.selection.createRange();
		range.moveStart ('character', -txtarea.value.length);
		range.moveStart ('character', strPos);
		range.moveEnd ('character', 0);
		range.select();
	}
	else if (br == "ff") {
		txtarea.selectionStart = strPos;
		txtarea.selectionEnd = strPos;
		txtarea.focus();
	}
	txtarea.scrollTop = scrollPos;
}

function insertAtCaret(areaId,text) {
	var txtarea = document.getElementById(areaId);
	var scrollPos = txtarea.scrollTop;
	var strPos = 0;
	var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
		"ff" : (document.selection ? "ie" : false ) );
	if (br == "ie") { 
		txtarea.focus();
		var range = document.selection.createRange();
		range.moveStart ('character', -txtarea.value.length);
		strPos = range.text.length;
	}
	else if (br == "ff") strPos = txtarea.selectionStart;
	
	var front = (txtarea.value).substring(0,strPos);  
	var back = (txtarea.value).substring(strPos,txtarea.value.length); 
	txtarea.value=front+text+back;
	strPos = strPos + text.length;
	if (br == "ie") { 
		txtarea.focus();
		var range = document.selection.createRange();
		range.moveStart ('character', -txtarea.value.length);
		range.moveStart ('character', strPos);
		range.moveEnd ('character', 0);
		range.select();
	}
	else if (br == "ff") {
		txtarea.selectionStart = strPos;
		txtarea.selectionEnd = strPos;
		txtarea.focus();
	}
	txtarea.scrollTop = scrollPos;
}

function Swap(){
    let users = localStorage.getItem("users");
    let usersArr = JSON.parse(users);
    let userId = localStorage.getItem("currentLoggedUser");
    if(usersArr != null){
        if (userId != null){
            if(usersArr[userId].wallet ){
                let inputFromToken = document.getElementById("fromToken");
                let swapSelectFrom = document.createElement("select");
                swapSelectFrom.className = "swapSelectFrom"; 
                let stringTo=""; 
                for(let i=0; i<usersArr[userId].wallet.length;i++){
                    stringTo = stringTo+ `<option value="${usersArr[userId].wallet[i].coin}">${usersArr[userId].wallet[i].coin}</option>`;};
                swapSelectFrom.innerHTML = stringTo;
                inputFromToken.insertAdjacentElement("afterEnd",swapSelectFrom);
                //to token
                let jsonList = localStorage.getItem("coins");
                jsonList = JSON.parse(jsonList);
                let inputToToken = document.getElementById("toToken");
                let swapSelectTo = document.createElement("select");
                swapSelectTo.className = "swapSelectTo"; 
                let stringFrom=""; 
                for(let i=0; i<jsonList.length;i++){
                    stringFrom = stringFrom+ `<option value="${jsonList[i].id}">${jsonList[i].id}</option>`;};
                swapSelectTo.innerHTML = stringFrom;
                inputToToken.insertAdjacentElement("afterEnd",swapSelectTo);
                //options From
                for(let i=0;i<usersArr[userId].wallet.length;i++){
                    if(swapSelectFrom.value === usersArr[userId].wallet[i].coin){
                        inputFromToken.placeholder = `you have ${usersArr[userId].wallet[i].amount}`;
                        let buyPrice; 
                        jsonList.find((o)=>{
                            if(o.id === usersArr[userId].wallet[i].coin ){
                                buyPrice=o.current_price;
                            };
                        });
                        jsonList.find((o)=>{
                            if(o.id === swapSelectTo.value ){
                                sellPrice=o.current_price;
                            };
                        });
                        inputToToken.placeholder = `1 ${swapSelectTo.value} -> $usd ${buyPrice}`;
                    }
                };
                function PPP(){
                    setTimeout(()=>{
                        let amount;
                        let sellAmount;
                        let result;
                        for(let i=0;i<usersArr[userId].wallet.length;i++){
                            if(swapSelectFrom.value === usersArr[userId].wallet[i].coin){
                                amount = usersArr[userId].wallet[i].amount;
                                jsonList.find((o)=>{
                                    if(o.id === swapSelectFrom.value ){
                                        sellAmount = o.current_price * inputFromToken.value;  
                                    }
                                });
                                jsonList.find((o)=>{
                                    if(o.id === swapSelectTo.value ){
                                        result = sellAmount / o.current_price;
                                    }
                                })
                        };};
                        if(inputFromToken.value > 0 && inputFromToken.value <= amount){
                            deleteAtCaret("toToken","");
                            insertAtCaret("toToken",result);
                    }else{
                        deleteAtCaret("toToken",""); 
                    }},1000)
                };
                swapSelectFrom.addEventListener("input",()=>{
                    if(inputFromToken.value !== ""){PPP();};
                    for(let i=0;i<usersArr[userId].wallet.length;i++){
                        if(swapSelectFrom.value === usersArr[userId].wallet[i].coin){
                            inputFromToken.placeholder = `you have ${usersArr[userId].wallet[i].amount}`;
                        }
                    };
                })

                inputFromToken.addEventListener("change",()=>{
                    PPP();
                })

                swapSelectTo.addEventListener("input",()=>{
                    if(inputFromToken.value !== ""){PPP();}
                    for(let i=0;i<jsonList.length;i++){                    
                        if(swapSelectTo.value === jsonList[i].id){
                            inputToToken.placeholder = `1 ${swapSelectTo.value} -> $usd ${jsonList[i].current_price}`;
                        }
                    };
                });
                
                let swapButton = document.getElementById("swapButton");
                swapButton.addEventListener("click",()=>{
                    let usersArr = JSON.parse( localStorage.getItem("users"));
                    let amount;
                    for(let i=0;i<usersArr[userId].wallet.length;i++){
                        if(swapSelectFrom.value === usersArr[userId].wallet[i].coin){
                            amount=usersArr[userId].wallet[i].amount;
                        }
                    };
                    if(inputFromToken.value > 0 && inputFromToken.value <= amount) {
                    usersArr[userId].wallet.find((o)=>{
                        if(o.coin === swapSelectFrom.value){
                            o.amount = o.amount - inputFromToken.value;
                            let amount;
                            let sellAmount;
                            let result;
                            for(let i=0;i<usersArr[userId].wallet.length;i++){
                                if(swapSelectFrom.value === usersArr[userId].wallet[i].coin){
                                    amount = usersArr[userId].wallet[i].amount;
                                    jsonList.find((o)=>{
                                        if(o.id === swapSelectFrom.value ){
                                            sellAmount = o.current_price * inputFromToken.value;  
                                        }
                                    });
                                    jsonList.find((o)=>{
                                        if(o.id === swapSelectTo.value ){
                                            result = sellAmount / o.current_price;
                                        }
                                    })
                                };};
                            let walletArr = usersArr[userId].wallet;
                            let find = walletArr.find((o)=>{return o.coin === swapSelectTo.value})
                            if(!find){ 
                                usersArr[userId].wallet.push({amount:result,coin:swapSelectTo.value});
                                localStorage.setItem("users",JSON.stringify(usersArr));
                                document. location. reload();
                            }else{
                                walletArr.find((o)=>{
                                    if(o.coin === swapSelectTo.value){
                                        o.amount= o.amount + result;
                                        usersArr[userId].wallet = walletArr;
                                        localStorage.setItem("users",JSON.stringify(usersArr));
                                        document. location. reload();
                                    }
                                })
                            }   
                            
                            }
                        })
                    } else {
                    Swal.fire({
                        title:'No tiene suficiente',
                        color:"white",
                        icon: 'error',
                        position:"center",
                        width:"500px",
                        background: "rgb(66, 59, 59)",
                        showConfirmButton: false,})
                    }
                });
            }else{
                Swal.fire({
                    title:'Su portafolio no está generado',
                    color:"white",
                    icon: 'error',
                    position:"center",
                    width:"500px",
                    background: "rgb(66, 59, 59)",
                    showConfirmButton: false,})
            }
        }else{
            Swal.fire({
                title:'No hay usuarios conectados',
                color:"white",
                icon: 'error',
                position:"center",
                width:"500px",
                background: "rgb(66, 59, 59)",
                showConfirmButton: false,})
        }
    }else{
        Swal.fire({
            title:'No hay usuarios registrados',
            color:"white",
            icon: 'error',
            position:"center",
            width:"500px",
            background: "rgb(66, 59, 59)",
            showConfirmButton: false,})
    }

}
Swap();