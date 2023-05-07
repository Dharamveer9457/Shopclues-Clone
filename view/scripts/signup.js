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
submit.addEventListener("click",(e)=>{
  e.preventDefault()
  signUP()
})


function signUP(){
  const payload = {
      username : document.getElementById("username").value,
      email : document.getElementById("emailS").value,
      password : document.getElementById("password").value,
      gender : document.getElementById("gender").value,
      age : document.getElementById("age").value,
      city : document.getElementById("city").value
  }

  fetch("http://localhost:4500/users/register",{
      method:"POST",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify(payload)
  })
  .then((res)=>res.json())
  .then(res=>console.log(res))
  alert("New user has been registered")
  .catch((err)=>console.log(err))
}


//---------------------------------LoGIN--------------------------------------

let login = document.getElementById("login")
login.addEventListener("click",(e)=>{
  signIN()
})

function signIN(){
  const payload = {
      email : document.getElementById("email").value,
      password : document.getElementById("passwordL").value
  }
  fetch("http://localhost:4500/users/login",{
      method:"POST",
      body: JSON.stringify(payload),
      headers:{
          "Content-type":"application/json",
      }
  })
  .then((res)=>res.json())
.then(res=>{
  console.log(res)

  if(res.msg == 'Wrong Credentials'){
    alert("Wrong Credentials")
  }else{
    localStorage.setItem("token",res.token)
    alert("Login Successfull")
    window.location.href = "index.html"
  }
})
.catch((err)=>console.log(err))
}
