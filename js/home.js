class User{
    constructor(id,name,password,role,wallet,coins){
        this.id = id;
        this.name = name;
        this.password = password;
        this.role = role;
        this.wallet = wallet;
        this.coins = coins;
    }
};

if(!localStorage.getItem("users")){
    const user0 = {
        id : 0,
        name : "admin",
        password : "admin",
        role : "admin",
        wallet: null,
        coins : null
    };
    const users = [user0];
    localStorage.setItem("users",JSON.stringify(users));
}else{
    const users = localStorage.getItem("users");
}

function fromSelector(){
    loginBox();
    registerBox();
};

// function appendLoginBox(){
//     const loginForm = document.createElement("div");
//     loginForm.classList.add("loginBox");
//     loginForm.innerHTML=`
//         <form action="#!" id="form">
//         <h2>Ingrese a su cuenta</h2>
    
//         <div class="input-parent">
//         <label for="username">Username or Email</label>
//         <input type="text" id="username">
//         </div>
    
//         <div class="input-parent">
//         <label for="password">Password</label>
//         <input type="password" id="password">
//         </div>
    
//         <button class="loginBtn"type="submit">Login</button>
//         </form>
//         `;
//         const main = document.querySelector(".main");
//         main.append(loginForm);
//         const loginBtn = document.querySelector(".loginBtn");
//             loginBtn.addEventListener("click",()=>{
//             const username = document.getElementById("username").value;
//             const password = document.getElementById("password").value;
//             let validate = users.find((user)=>{
//                 return user === username && user === password;
//             });
//             if(!validate){
//                 const main = document.querySelector("main");
//                 let notFound = document.querySelector(".loginSpan");
//                 if(!notFound){
//                     notFound = document.createElement("span");
//                     notFound.className="loginSpan";
//                 }
//                 notFound.setAttribute("style", "color: red;");
//                 notFound.innerHTML = "No username or password found";
//                 main.appendChild(notFound);
//             }else{
//                 let success = document.querySelector(".loginSpan");
//                 if(!success){
//                     success = document.createElement("span");
//                     success.className="loginSpan";
//                 }
//                 success.setAttribute("style", "color: green;");
//                 success.innerHTML = "Successfully logged in";
//                 const main = document.querySelector("main");
//                 main.appendChild(success);
//                 localStorage.setItem("currentUser","admin");
//             }
//             });
// }
function loginBox(){
    const fromSelect = document.querySelector(".loginBoxbtn");
    fromSelect.addEventListener("click", ()=>{
        const loginBoxbtn = document.querySelector(".loginBox");
        if (!loginBoxbtn){
            const loginSpan = document.querySelector(".loginSpan");
            if (loginSpan) { loginSpan.remove(loginSpan); };
            const registerSpan = document.querySelector(".registerSpan");
            if (registerSpan){ registerSpan.remove(registerSpan); }
            const registerBox = document.querySelector(".registerBox");
            if (registerBox) { registerBox.remove(registerBox); }
            const loginForm = document.createElement("div");
            loginForm.classList.add("loginBox");
            loginForm.innerHTML=`
                <form action="#!" id="form">
                <h2>Ingresa a su cuenta</h2>
            
                <div class="input-parent">
                <label for="username">Username or Email</label>
                <input type="text" id="username">
                </div>
            
                <div class="input-parent">
                <label for="password">Password</label>
                <input type="password" id="password">
                </div>
            
                <button class="loginBtn"type="submit">Login</button>
                </form>
                `;
                const main = document.querySelector(".main");
                main.append(loginForm);
            const loginBtn = document.querySelector(".loginBtn");
            loginBtn.addEventListener("click",()=>{
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            let users = JSON.parse(localStorage.getItem("users"));
            let validate = users.find((user)=>{
                return user.name === username && user.password === password;
            });
            if(!validate){
                const main = document.querySelector("main");
                let notFound = document.querySelector(".loginSpan");
                if(!notFound){
                    notFound = document.createElement("span");
                    notFound.className="loginSpan";
                }
                notFound.setAttribute("style", "color: red;");
                notFound.innerHTML = "No username or password found";
                main.appendChild(notFound);
            }else{

                let success = document.querySelector(".loginSpan");
                // success.className="loginSpan";
                if(!success){
                    success = document.createElement("span");
                    success.className="loginSpan";
                }
                success.setAttribute("style", "color: green;");
                success.innerHTML = "Successfully logged in";
                const main = document.querySelector("main");
                main.appendChild(success);
            }
            });
            };
    });}

function registerBox(){
    const fromSelect = document.querySelector(".registerBoxbtn");
    fromSelect.addEventListener("click", ()=>{
    const registerBoxbtn = document.querySelector(".registerBox");
    if (!registerBoxbtn){
        const loginBox = document.querySelector(".loginBox");
        if (loginBox){ loginBox.remove(loginBox); } 
        const loginSpan = document.querySelector(".loginSpan");
        if (loginSpan){ loginSpan.remove(loginSpan); }
        const registerForm = document.createElement("div");
        registerForm.classList.add("registerBox");
        registerForm.innerHTML=`
            <form action="#!" id="form">
            <h2>Registrarse con mail o nombre</h2>
        
            <div class="input-parent">
            <label for="username">Enter Username or Email</label>
            <input type="text" id="username">
            </div>
        
            <div class="input-parent">
            <label for="password">Enter Password</label>
            <input type="password" id="password">
            </div>
            <div class="input-parent">
            <label for="password">Repeat Password</label>
            <input type="password" id="password2">
            </div>
            <button class="registerBtn"type="submit">Register</button>
            </form>
            `;
            const main = document.querySelector(".main");
            main.append(registerForm);
            const registerBtn = document.querySelector(".registerBtn");
            registerBtn.addEventListener("click",()=>{
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;
                const password2 = document.getElementById("password2").value;
                let users = JSON.parse(localStorage.getItem("users"));
                let found = users.find((user)=>{
                    return user.name === username;
                });
                if(!found){if (password === password2 & password !==""){
                        let user = new User(users.length,username,password,"user",null,null);
                        users.push(user);
                        localStorage.setItem("users", JSON.stringify(users));
                        let success = document.querySelector(".registerSpan");
                        if(!success){
                            success = document.createElement("span");
                            success.className="registerSpan";
                        }
                        success.setAttribute("style", "color: green;");
                        success.innerHTML = `${username} successfully signed up`;
                        const main = document.querySelector("main");
                        main.appendChild(success);
                }else{
                    let noMatch = document.querySelector(".registerSpan");
                    if(!noMatch){
                        const noMatch = document.createElement("span");
                        noMatch.className="registerSpan";
                        const main = document.querySelector("main");
                        main.appendChild(noMatch);
                    }
                    noMatch.setAttribute("style", "color: red;");
                    noMatch.innerHTML = "Passwords do not match";
                    main.appendChild(noMatch);
                };}else{
                    let noMatch = document.querySelector(".registerSpan");
                    if(!noMatch){
                        const noMatch = document.createElement("span");
                        noMatch.className="registerSpan";
                        const main = document.querySelector("main");
                        main.appendChild(noMatch);
                    }
                    noMatch.setAttribute("style", "color: red;");
                    noMatch.innerHTML = "Username already taken";
                    main.appendChild(noMatch);
                }
            });
        };
});}   
fromSelector();