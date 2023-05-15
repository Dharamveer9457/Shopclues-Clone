//----------------------------------Common in everypage--------------------------------

let token = localStorage.getItem("token")||""


const usericon = document.getElementById("usericon")
const carticon = document.getElementById("carticon")



carticon.addEventListener("click",()=>{
    if(token==""){
        alert("Please login first")
        window.location.href = "signup.html"
    }else{
        window.location.href = "cart.html"
    }
})

usericon.addEventListener("click",()=>{
    if(token==""){
        window.location.href = "signup.html"
    }
})


//-----------------------------------------USERNAME--------------------------------------------

const remove = document.getElementById("usericon")
let user = localStorage.getItem("username")||""
let n = document.getElementById("username")
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
        window.location.href = "index.html"
    })
}


// ---------------------------------payement option------------------------------------------

let form = document.querySelector("form")

let cod=document.querySelector("#cod")
let cp=document.querySelector("#cp")

var otp;

    form.addEventListener("submit", function(event){
        event.preventDefault()

        if(token==""){
            alert("Please login first")
            window.location.href = "signup.html"
        }

        if(cod.checked){
            alert("Cash on Delivery is not available")
            window.location.href = "payment.html"
        }else if(cp.checked){

            let inputData = {
                name:form.name.value,
                number:form.cardNo.value,
                cvv:form.cardCvv.value
              }
              
              if(inputData.name==""||inputData.number==""||inputData.cvv==""){
                alert("Any of the Given fields are empty")
              }else if(inputData.name.length<3){
                alert("Please enter Valid Name")
              }else if(inputData.number.length<12 || inputData.number.length>12){
                alert("Please enter Valid Card Number")
              }else if(inputData.cvv.length<3 || inputData.cvv.length>3){
                alert("Please enter Valid CVV")
              }else{
                function generateOTP() {
                    otp = Math.floor(1000 + Math.random() * 9000);
                    alert("Your OTP is: " + otp);
                }
                generateOTP()

                let orderplace = document.createElement("button")
                orderplace.textContent = "PLACE ORDER"

                orderplace.addEventListener("click",()=>{

                    function checkOTP() {
                    // Get the OTP entered by the user
                    var userInput = prompt("Enter the OTP you received:");

                    // Compare the user input with the generated OTP
                    if (userInput == otp) {
                        alert("Order Placed Successfully🎉");
                        window.location.href = "thankyou.html"
                    } else {
                        alert("OTP is incorrect. Please try again.");
                        location.reload()
                    }
                }
                checkOTP()
                
                })

                form.append(orderplace)

              }
                
        }else{
            alert("Please select one of the payment method")
        }

    })


    let total = localStorage.getItem("total")||""
    
    const totalTopay = document.getElementById("totalAmount")
    totalTopay.textContent = `₹ ${total}`
    

   

    

    