

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});


// ----------------Password validation--------------------------

let passwordInput = document.querySelector('#password');
passwordInput.addEventListener('input', function() {
  let password = passwordInput.value;
  if (password.length < 6) {
    passwordInput.setCustomValidity('Password must be at least 8 characters long.');
  } else {
    passwordInput.setCustomValidity('');
  }
});

// --------------------------Sign UP--------------------------------------

let submit = document.getElementById("signup")
submit.addEventListener("click",()=>{
  signUP()
})


function signUP(){
  const payload = {
      username : document.getElementById("usernameS").value,
      email : document.getElementById("emailS").value,
      password : document.getElementById("password").value,
      gender : document.getElementById("gender").value,
      age : document.getElementById("age").value,
      city : document.getElementById("city").value
  }

  if(username=="" || email=="" || password=="" || gender=="" || age=="" || city==""){
    alert("Fill all the details")
  }else{
  fetch("https://stormy-flannel-shirt-ox.cyclic.app/users/register",{
      method:"POST",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify(payload)
  })
  .then((res)=>res.json())
  .then(res=>{
    console.log(res)
    alert(`${res.msg}`)
    location.reload()
  }
 )
  .catch((error)=>{
    return error
  })
}
}


//---------------------------------LoGIN--------------------------------------

let login = document.getElementById("login")
login.addEventListener("click",()=>{
  signIN()
})

function signIN(){

  const payload = {
      email : document.getElementById("email").value,
      password : document.getElementById("passwordL").value
  }
  
  if(payload.email=="admin@gmail.com" && payload.password=="admin"){
    window.location.href = "admin.html"
  }else{
    fetch("https://stormy-flannel-shirt-ox.cyclic.app/users/login",{
        method:"POST",
        body: JSON.stringify(payload),
        headers:{
            "Content-type":"application/json"
        }
    })
    .then((res)=>res.json())
    .then(res=>{
    console.log(res)

    if(res.msg == 'Wrong Credentials' || res.err == "Cannot read properties of undefined (reading 'username')" ){
      alert("Wrong Credentials")
    }else{
      localStorage.setItem("token",res.token)
      localStorage.setItem("username",res.name)
      localStorage.setItem("userID",res.id)

      alert("Login Successfull")
      window.location.href = "index.html"
    }
})
    .catch((error)=>{
      return error
    })
  }
}


// ---------------------------Username in Navbar-------------------------------------

const remove = document.getElementById("usericon")
let user = localStorage.getItem("username")||""
let n = document.getElementById("usernamep")
let link = document.getElementById("loginlink")
const box = document.querySelector(".nav-right")
if(user!=""){
    n.innerHTML = `Hi, ${user}`
    n.style.color = "green"
    n.style.fontWeight = "bold"
    link.href = "javascript:void(0)";
    box.style.width = "30%"
    box.removeChild(remove)

    const signout = document.createElement("button")
    signout.innerHTML = "Sign Out"
    box.appendChild(signout)

    signout.classList.add("signout")

    signout.addEventListener("click",()=>{
        localStorage.clear("user")
        localStorage.clear("token")
        location.reload()
    })
  }

//----------------------------------Common in everypage--------------------------------

let token = localStorage.getItem("token")||""

const usericon = document.getElementById("usericon")
const carticon = document.getElementById("carticon")

usericon.addEventListener("click",()=>{
    if(token==""){
        window.location.href = "signup.html"
    }
})

carticon.addEventListener("click",()=>{
    if(token==""){
        alert("Please login first")
        window.location.href = "signup.html"
    }else{
        window.location.href = "cart.html"
    }
})