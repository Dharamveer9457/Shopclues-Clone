
// ------------------------------MAIN-----------------------------------------

let dummyData = JSON.parse(localStorage.getItem("product"))||[]
console.log(dummyData)

let mainImg = document.getElementById("mainImg")
let brand = document.getElementById("brand")
let Pname = document.getElementById("name")
let rating = document.getElementById("rating")
let price = document.getElementById("price")
let strike = document.getElementById("strike")
let img1 = document.getElementById("img1")
let img2 = document.getElementById("img2")
let img3 = document.getElementById("img3")
let pID = document.getElementById("pID")
let discount = document.getElementById("discount")
let color = document.getElementById("color")
let gender = document.getElementById("gender")
let pname = document.getElementById("pname")

pname.innerHTML = dummyData.name

console.log(dummyData.image)
window.addEventListener("load",()=>{
    mainImg.src = dummyData.image
    img1.src = dummyData.image
    img2.src = dummyData.image
    img3.src = dummyData.image

    Pname.innerHTML = dummyData.name
    rating.innerHTML = `${convertRatingToStars(dummyData.rating)}`

    function convertRatingToStars(rating) {
        const ratingValue = Math.floor(parseFloat(rating));
        const ratingOutofTen = ratingValue * 2;
        const fullStars = Math.floor(ratingOutofTen / 2);
        const halfStar = ratingOutofTen % 2 === 1 ? "half" : "";
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        const starRating = `${"★".repeat(fullStars)}${halfStar ? "½" : ""}${"☆".repeat(emptyStars)}`;
        return starRating;
      }

    brand.innerHTML = `Brand: ${dummyData.brand} |`
    pID.innerHTML = `Product ID: ${dummyData._id}`
    price.innerHTML = `₹ ${dummyData.price}`
    strike.innerHTML = `₹ ${dummyData.strikePrice}`
    discount.innerHTML = dummyData.discount
    color.innerHTML = `Color : ${dummyData.color}`
    gender.innerHTML = `Gender : ${dummyData.gender}`
})


// ***************************ADD TO CART BUTTON**********************************************

let CartArr=JSON.parse(localStorage.getItem("cart"))||[]
let token = localStorage.getItem("token")||""

let cartBtn = document.getElementById("cart")
let el = dummyData
cartBtn.addEventListener("click",()=>{

    if(token==""){
        alert("Please Sign In...Before accessing Cart")
        window.location.href = "signup.html"
    }else{
            if(checkDuplicate(el)){
                alert("Product Already in Cart")
            }else{
                CartArr.push({...el,quantity:1})
                localStorage.setItem("cart",JSON.stringify(CartArr))
                alert("Product Added To Cart")
            }
    }
    
})

let buyBtn = document.getElementById("buy")

buyBtn.addEventListener("click",()=>{

    if(token==""){
        alert("Please Sign In...Before Checking Out")
        window.location.href = "signup.html"
    }else{
            if(checkDuplicate(el)){
            alert("Product Already in Cart...Check it Out")
                window.location.href = "cart.html"
            }else{
                CartArr.push({...el,quantity:1})
                localStorage.setItem("cart",JSON.stringify(CartArr))
                window.location.href = "cart.html"
            }
    }
    
})

function checkDuplicate(product){
    for(let i=0;i<CartArr.length;i++){
      if(CartArr[i].name===product.name){
        return true
      }
    }
    return false
  }



//----------------------------------Common in everypage--------------------------------


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

//-----------------------------MENS CLOTH BUTTON-------------------------------------------

function mensP(){
    window.location.href = "mensProduct.html"
}
