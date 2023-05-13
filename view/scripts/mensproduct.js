//---------------------------GET ALL PRODUCTS---------------------------------------
const container = document.getElementById("right")
let fetchedData = []

document.querySelector("#reset").addEventListener("click",()=>{
  location.reload()
})

window.addEventListener("load",()=>{
    fetched(1)
})

const pageArr = document.querySelectorAll(".pagination-button")

pageArr.forEach(el=>{
  let page = parseInt(el.textContent)
  el.addEventListener("click",(e)=>{
    e.preventDefault()
      fetched(page)
  })
})

function fetched(pageNumber){
    fetch(`https://stormy-flannel-shirt-ox.cyclic.app/products/page/${pageNumber}`)
        .then((res)=>res.json())
        .then(res=>{
            console.log(res)
            fetchedData = res.products
            displayData(res.products)
            // console.log(fetchedData) 
 
 
 
//------------------------------Search-------------------------------
           

          document.querySelector("#search-btn").addEventListener("click",()=>{
              let q = document.querySelector("#search").value;
              console.log(q);
              let newData = fetchedData.filter((el) =>
                  el.name.toLowerCase().includes(q.toLowerCase())
              );
              displayData(newData);
          })

  //------------------------------filter by brand-------------------------------

  let brandC = document.querySelectorAll(".brand")

      let selected={}

      brandC.forEach(el => {
        el.addEventListener("change",()=>{
          if(el.checked){
            selected[el.value] = true;
          }else{
            delete selected[el.value]
          }

          const filtered = fetchedData.filter(x=>{
            return Object.keys(selected).includes(x.brand)
          })
          displayData(filtered)
        })
      })

    //------------------------------filter by type-------------------------------

    let typeC = document.querySelectorAll(".category")

    let selected2={}

    typeC.forEach(el => {
      el.addEventListener("change",()=>{
        if(el.checked){
          selected2[el.value] = true;
        }else{
          delete selected2[el.value]
        }

        const filtered2 = fetchedData.filter(x=>{
          return Object.keys(selected2).includes(x.category)
        })
        displayData(filtered2)
      })
    })


    //------------------------------filter by discount-------------------------------

    let discountC = document.querySelectorAll(".discount")

    let selected3={}

    discountC.forEach(el => {
      el.addEventListener("change",()=>{
        if(el.checked){
          selected3[el.value] = true;
        }else{
          delete selected3[el.value]
        }

        const filtered = fetchedData.filter(x=>{
          const matchingDiscount = Object.keys(selected3).find(dis => {

            const discountStr = x.discount;
            const discount = parseInt(discountStr.replace("% off", ""));

            const [min, max] = dis.split("-");
            return discount >= Number(min) && discount <= Number(max);
          });
    
          if (!matchingDiscount) {
            return false;
          }
    
          return true;
        })
        displayData(filtered)
        })
      
      })
  
      //------------------------------filter by Color-------------------------------
      let colorC = document.querySelectorAll(".color")

      let selected4={}
  
      colorC.forEach(el => {
        el.addEventListener("change",()=>{
          if(el.checked){
            selected4[el.value] = true;
          }else{
            delete selected4[el.value]
          }
  
          const filtered = fetchedData.filter(x=>{
            return Object.keys(selected4).includes(x.color)
          })
          displayData(filtered)
        })
      })


     //------------------------------filter by Rating-------------------------------
      
     let ratingC = document.querySelectorAll(".Rating")

      let selected5={}
  
      ratingC.forEach(el => {
        el.addEventListener("change",()=>{
          if(el.checked){
            selected5[el.value] = true;
          }else{
            delete selected5[el.value]
          }
  
          const filtered = fetchedData.filter(x=>{
            const matchingRating = Object.keys(selected5).find(rat => {
  
              const ratingStr = x.rating;
              const rating = parseFloat(ratingStr)
  
              const [min, max] = rat.split("-");
              return rating >= Number(min) && rating <= Number(max);
            });
      
            if (!matchingRating) {
              return false;
            }
            return true;
          })
          displayData(filtered)
        })
      })
   //------------------------------Sort by price-------------------------------

      let sortC = document.querySelectorAll(".sort")


      function sortAsc(el) {
        return fetchedData.slice().sort((a, b) => a.price - b.price);
      }
      
      function sortDesc(el) {
        return fetchedData.slice().sort((a, b) => b.price - a.price);
      }

    sortC.forEach(el=>{
      el.addEventListener("change",()=>{
        let sortedClothes;
        if (el.value === "asc" && el.checked) {
          sortedClothes = sortAsc(el);
        } else if (el.value === "desc" && el.checked) {
          sortedClothes = sortDesc(el);
        }
        displayData(sortedClothes)
      })
    })
// ---------------------------------------------------------------------------------------------------      
    })
        .catch((err)=>{
            return err
        })
  }


    function displayData(data){

      container.innerHTML = null

      data.forEach(el=>{
        let getbox = document.createElement("div")
        let image = document.createElement("img")
        let name = document.createElement("h3")
        let price = document.createElement("p")
        // let gender = document.createElement("p")
        let strikePrice = document.createElement("s")
        // let category = document.createElement("p")
        // let brand = document.createElement("p")
        let rating = document.createElement("p")
        // let color = document.createElement("p")
        let discount = document.createElement("p")
        // let remove = document.createElement("button")
      

        image.src = el.image
        name.textContent = `${el.name}`
        price.textContent = `₹${el.price}`
        // gender.textContent = `Gender  : ${el.gender}`
        strikePrice.textContent = `₹${el.strikePrice}`
        // strikePrice.style.display = "inline"
        // category.textContent = `Category  : ${el.category}`
        // brand.textContent = `Brand  : ${el.brand}`
        rating.textContent = convertRatingToStars(el.rating)

        function convertRatingToStars(rating) {
          const ratingValue = Math.floor(parseFloat(rating));
          const ratingOutofTen = ratingValue * 2;
          const fullStars = Math.floor(ratingOutofTen / 2);
          const halfStar = ratingOutofTen % 2 === 1 ? "half" : "";
          const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
          const starRating = `${"★".repeat(fullStars)}${halfStar ? "½" : ""}${"☆".repeat(emptyStars)}`;
          return starRating;
        }
        // color.textContent = `Color  : ${el.color}`
        discount.textContent = `${el.discount}`
        // remove.textContent = "Delete Item"

        // remove.addEventListener("click",()=>{
        //   const confirmed = confirm("Are you sure you want to delete this item?");
        //       if (confirmed) {
        //         deleteProduct(el._id)
        //         location.reload()
        //       } else {
        //         // do nothing
        //       }
        // })

        getbox.addEventListener("click",()=>{
          localStorage.setItem("product",JSON.stringify(el));
          window.location.href="productDetail.html";
      })

        getbox.append(image,name,price,strikePrice,discount,rating)
        container.append(getbox)

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