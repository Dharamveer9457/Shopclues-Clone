// ---------------------------------CART ITEM----------------------------------

let Cart = JSON.parse(localStorage.getItem("cart"))||[];
    let Container = document.getElementById("cartitem");
    
    function ecommerceData(data) {
     
      Container.innerHTML = "";
      Cart.forEach((el) => {
        let card = document.createElement("div");
        card.setAttribute("id","card")
        let image = document.createElement("img");
        let name = document.createElement("h3");
        let category = document.createElement("p");
        let quantity = document.createElement("span");
        quantity.setAttribute("id","quantity")
        let price = document.createElement("h4");
        price.style.color = "green"
        price.style.fontSize = "20px"
        let Remove = document.createElement("button");
        Remove.setAttribute("id","remove")
        let Increment = document.createElement("button");
        Increment.setAttribute("id","increase")
        let Decrement = document.createElement("button");
        Decrement.setAttribute("id","decrease")
        let line = document.createElement("hr")
        quantity.textContent=el.quantity
        Remove.textContent = "Remove";
    
        Increment.textContent="+"
        Decrement.textContent="-"
        image.src = el.image;
        name.textContent = el.name;
        category.textContent = el.category;
        price.textContent = `₹ ${el.price}`;
        
        Remove.addEventListener("click", () => {
            Cart=Cart.filter((ele)=>{
              return ele.name!==el.name
            })
            localStorage.setItem("cart",JSON.stringify(Cart))
            ecommerceData()
        });
        Increment.addEventListener("click", () => {
          el=el.quantity++
          localStorage.setItem("cart",JSON.stringify(Cart))
          ecommerceData()
        });
        Decrement.addEventListener("click", () => {
          if(el.quantity>1){
            el=el.quantity--
          localStorage.setItem("cart",JSON.stringify(Cart))
          ecommerceData()
          }
        });
        card.append(image, name, price, category, line, Increment, quantity,Decrement,Remove);
        Container.append(card);
      });
      let totalamount= document.querySelector("#totalamount")
      let payableamount= document.querySelector("#payableamount>span")
      let deliverycharge = document.querySelector("#deliverycharge")
      let items = document.querySelector("#items")
      let tip = document.querySelector("#p")
      let saved = document.querySelector("#saved")
      
      let count=0;
      for(let i=0;i<Cart.length ; i++){
        count+=Cart[i].quantity
      }
      items.textContent = count

      let sum=0
      for(let i=0;i<Cart.length;i++){
        sum+=Cart[i].price*Cart[i].quantity
      }

      let sum1=0
      for(let i=0;i<Cart.length;i++){
        sum1+=Cart[i].strikePrice*Cart[i].quantity
      }

      saved.textContent = sum1
   totalamount.textContent=sum
   payableamount.textContent=Math.floor(Number(totalamount.textContent) + Number(deliverycharge.textContent))
    
   if(Number(totalamount.textContent)<500){
    deliverycharge.textContent = 50
    tip.textContent =""
   }else if(Number(totalamount.textContent)<1000 && Number(totalamount.textContent)>500){
    deliverycharge.textContent = 25
    tip.textContent = ""
   }else{
    deliverycharge.textContent = 0
    tip.textContent = "*(Delivery Free for order above ₹1000)"
    tip.style.marginLeft = "10%"
   }

   
    }
    ecommerceData()

    let placeorder = document.querySelector("#placeorder")

    let name=document.querySelector("#name")
    let mobile=document.querySelector("#mobile")
    let house=document.querySelector("#house")
    let town=document.querySelector("#town")
    let city=document.querySelector("#city")
    let landmark = document.querySelector("#landmark")
    let pin=document.querySelector("#pin")

    placeorder.addEventListener("click", function(event){
        
        event.preventDefault()

        if(name.value=="" || mobile.value=="" || house.value==""|| town.value==""|| city.value==""|| landmark.value==""|| pin.value==""){
            alert("Please fill all details")
        }else{
            window.location.href = "payment.html"
        }
    })

// -----------------------------------FORM FILL------------------------------------------

    let userid = localStorage.getItem("userID")||""
    let formname = document.getElementById("name")
    let formmobile = document.getElementById("mobile")
    let formcity = document.getElementById("city")

    window.addEventListener("load",()=>{
        fetched(userid)
    })
    function fetched(id){
        fetch(`https://crowded-trunks-clam.cyclic.app/users/${id}`)
            .then((res)=>res.json())
        .then(res=>{
            console.log(res.user)
            formname.value = res.user.username
            formname.style.fontWeight = "Bold"
            formmobile.value = generateMobileNumber()
            formmobile.style.fontWeight = "Bold"
            formcity.value = res.user.city
            formcity.style.fontWeight = "Bold"
        })

        .catch((err)=>{
            console.log(err)
            
        })
    }


    function generateMobileNumber() {
        var mobileNumber = '9'; 
        for (var i = 1; i < 10; i++) { 
          mobileNumber += Math.floor(Math.random() * 10); 
        }
        return mobileNumber;
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

// carticon.addEventListener("click",()=>{
//     if(token==""){
//         alert("Please login first")
//         window.location.href = "signup.html"
//     }else{
//         window.location.href = "cart.html"
//     }
// })

// -----------------------------------------USERNAME--------------------------------------------

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
    })
}
