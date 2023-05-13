//--------------------------add hovered class to selected list item--------------
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

//-----------------------------Menu Toggle---------------------------------

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

//-----------------------------Menu Toggle---------------------------------

const signout = document.querySelector("#signout")

signout.addEventListener("click",()=>{
  window.location.href = "index.html"
})

// ----------------------------Add New Products--------------------------------------
const dashboard = document.querySelector("#dashboard")
const addBox = document.querySelector(".details")
const addButton = document.querySelector("#addnew")

addButton.addEventListener("click",(e)=>{
  e.preventDefault()
  addBox.innerHTML = ""
  addBox.setAttribute('id', 'addpro');
  addBox.classList.remove("details")

    // const heading = document.createElement("h2")
    // heading.innerHTML = "Add Product:-"
    // addBox.appendChild(heading)    

          const name = document.createElement('input');
          name.type = 'text';
          name.name = 'name';
          name.placeholder = 'Name';
          addBox.appendChild(name);

          const image = document.createElement('input');
          image.type = 'text';
          image.name = 'image';
          image.placeholder = 'Image URL';
          addBox.appendChild(image);

          const price = document.createElement('input');
          price.type = 'number';
          price.name = 'price';
          price.placeholder = 'Price';
          addBox.appendChild(price);

          const gender = document.createElement('select');
          gender.name = 'gender';

          const maleOption = document.createElement('option');
          maleOption.value = 'male';
          maleOption.text = 'Male';
          gender.appendChild(maleOption);

          const femaleOption = document.createElement('option');
          femaleOption.value = 'female';
          femaleOption.text = 'Female';
          gender.appendChild(femaleOption);

          addBox.appendChild(gender);

          const strikePrice = document.createElement('input');
          strikePrice.type = 'number';
          strikePrice.name = 'strikePrice';
          strikePrice.placeholder = 'Strike Price';
          addBox.appendChild(strikePrice);

          const categorySelect = document.createElement('select');
          categorySelect.name = 'category';

          const categories = ['Shirts', 'Jeans', 'Jackets', 'Hoodie', 'Ethnic', 'T-shirt'];

          categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.toLowerCase();
            option.text = category;
            categorySelect.appendChild(option);
          });

          addBox.appendChild(categorySelect);

          const brandInput = document.createElement('input');
          brandInput.type = 'text';
          brandInput.name = 'brand';
          brandInput.placeholder = 'Brand';
          addBox.appendChild(brandInput);

          const ratingInput = document.createElement('input');
          ratingInput.type = 'text';
          ratingInput.name = 'rating';
          ratingInput.placeholder = 'Rating';
          addBox.appendChild(ratingInput);

          const colorInput = document.createElement('input');
          colorInput.type = 'text';
          colorInput.name = 'color';
          colorInput.placeholder = 'Color';
          addBox.appendChild(colorInput);

          const discountInput = document.createElement('input');
          discountInput.type = 'text';
          discountInput.name = 'discount';
          discountInput.placeholder = 'Discount';
          addBox.appendChild(discountInput);

          const submitButton = document.createElement('button');
          submitButton.type = 'submit';
          submitButton.textContent = 'Add Product';
          addBox.appendChild(submitButton);

          submitButton.addEventListener("click",()=>{
            add()
          })

          function add(){
            const payload = {
               name: name.value,
               image : image.value,
               price : price.value,
               gender : gender.value,
               strikePrice : strikePrice.value,
               category : categorySelect.value,
               brand : brandInput.value,
               rating : ratingInput.value,
               color : colorInput.value,
               discount : discountInput.value
            }
    
            fetch("https://stormy-flannel-shirt-ox.cyclic.app/products/add",{
                method:"POST",
                body: JSON.stringify(payload),
                headers:{
                    "Content-type":"application/json",
                }
            })
            .then((res)=>res.json())
        .then(res=>{
            console.log(res)
            alert(`${res.msg}`)
        })

        .catch((err)=>{
            console.log(err)
        })
        }
})

dashboard.addEventListener("click",()=>{
  location.reload()
})


// ----------------------------Get all Products--------------------------------------

const getButton = document.querySelector("#getAll")

getButton.addEventListener("click",(e)=>{
  e.preventDefault()
  addBox.innerHTML = ""
  addBox.id = ""
  addBox.classList.remove("details")
  addBox.setAttribute('id', 'getpro');
  
  


  function fetched(){
    fetch("https://stormy-flannel-shirt-ox.cyclic.app/products/")
        .then((res)=>res.json())
        .then(res=>{
            console.log(res.product)
            displayData(res.product)
        })

        .catch((err)=>{
            console.log(err)
        })
    }
    fetched()

    function displayData(data){

      addBox.innerHTML = null

      data.forEach(el=>{
        let getbox = document.createElement("div")
        let image = document.createElement("img")
        let productID = document.createElement("h4")
        let name = document.createElement("h3")
        let price = document.createElement("p")
        let gender = document.createElement("p")
        let strikePrice = document.createElement("s")
        let category = document.createElement("p")
        let brand = document.createElement("p")
        let rating = document.createElement("p")
        let color = document.createElement("p")
        let discount = document.createElement("p")
        let remove = document.createElement("button")
      

        image.src = el.image
        productID.textContent = `ID: ${el._id}`
        name.textContent = `${el.name}`
        price.textContent = `Price  : ${el.price}`
        gender.textContent = `Gender  : ${el.gender}`
        strikePrice.textContent = `${el.strikePrice}`
        strikePrice.style.display = "inline"
        category.textContent = `Category  : ${el.category}`
        brand.textContent = `Brand  : ${el.brand}`
        rating.textContent = `Rating  : ${el.rating}`
        color.textContent = `Color  : ${el.color}`
        discount.textContent = `Discount  : ${el.discount}`
        remove.textContent = "Delete Item"

        remove.addEventListener("click",()=>{
          const confirmed = confirm("Are you sure you want to delete this item?");
              if (confirmed) {
                deleteProduct(el._id)
                location.reload()
              } else {
                // do nothing
              }
        })

        getbox.append(image,productID,name,gender,price,strikePrice,category,brand,rating,color,discount,remove)
        addBox.append(getbox)

      })
    }
  
})

function deleteProduct(id){
  fetch(`https://stormy-flannel-shirt-ox.cyclic.app/products/delete/${id}`,{
                method:"DELETE",
            })
            .then((res)=>res.json())
        .then(res=>{
            console.log(res)
        })

        .catch((err)=>{
            console.log(err)
        })
  }


// ---------------------------------------Update any Products--------------------------------------------

const updateBtn = document.querySelector("#updatenew")

updateBtn.addEventListener("click",(e)=>{
  e.preventDefault()
  addBox.innerHTML = ""
  addBox.setAttribute('id', 'updatepro');

          const ProductID = document.createElement('input')
          ProductID.type = 'text'
          ProductID.placeholder = 'Product ID'
          addBox.appendChild(ProductID)
          

          const name = document.createElement('input');
          name.type = 'text';
          name.name = 'name';
          name.placeholder = 'Name';
          addBox.appendChild(name);

          const image = document.createElement('input');
          image.type = 'text';
          image.name = 'image';
          image.placeholder = 'Image URL';
          addBox.appendChild(image);

          const price = document.createElement('input');
          price.type = 'number';
          price.name = 'price';
          price.placeholder = 'Price';
          addBox.appendChild(price);

          const gender = document.createElement('select');
          gender.name = 'gender';

          const maleOption = document.createElement('option');
          maleOption.value = 'Male';
          maleOption.text = 'Male';
          gender.appendChild(maleOption);

          const femaleOption = document.createElement('option');
          femaleOption.value = 'Female';
          femaleOption.text = 'Female';
          gender.appendChild(femaleOption);

          addBox.appendChild(gender);

          const strikePrice = document.createElement('input');
          strikePrice.type = 'number';
          strikePrice.name = 'strikePrice';
          strikePrice.placeholder = 'Strike Price';
          addBox.appendChild(strikePrice);

          const categorySelect = document.createElement('select');
          categorySelect.name = 'category';

          const categories = ['Shirts', 'Jeans', 'Jackets', 'Hoodie', 'Ethnic', 'T-shirt'];

          categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.toLowerCase();
            option.text = category;
            categorySelect.appendChild(option);
          });

          addBox.appendChild(categorySelect);

          const brandInput = document.createElement('input');
          brandInput.type = 'text';
          brandInput.name = 'brand';
          brandInput.placeholder = 'Brand';
          addBox.appendChild(brandInput);

          const ratingInput = document.createElement('input');
          ratingInput.type = 'text';
          ratingInput.name = 'rating';
          ratingInput.placeholder = 'Rating';
          addBox.appendChild(ratingInput);

          const colorInput = document.createElement('input');
          colorInput.type = 'text';
          colorInput.name = 'color';
          colorInput.placeholder = 'Color';
          addBox.appendChild(colorInput);

          const discountInput = document.createElement('input');
          discountInput.type = 'text';
          discountInput.name = 'discount';
          discountInput.placeholder = 'Discount';
          addBox.appendChild(discountInput);

          const getData = document.createElement("button")
          getData.textContent = "Get the Data"
          addBox.appendChild(getData)

          getData.addEventListener("click",(e)=>{
            e.preventDefault()
              let id = ProductID.value
            function fetched(id){
              fetch(`https://stormy-flannel-shirt-ox.cyclic.app/products/${id}`)
                  .then((res)=>res.json())
              .then(res=>{
                  console.log(res.product)

                  if(res.product==null || res.product==undefined){
                    alert("Enter correct Product ID")
                  }else{
                  name.value = res.product.name
                  image.value = res.product.image
                  price.value = res.product.price
                  gender.value = res.product.gender
                  strikePrice.value = res.product.strikePrice
                  categorySelect.value = res.product.category
                  brandInput.value = res.product.brand
                  ratingInput.value = res.product.rating
                  colorInput.value = res.product.color
                  discountInput.value = res.product.discount
                  }
              })
      
              .catch((err)=>{
                  console.log(err)
                  
              })
          }
          fetched(id)
          })

          const submitButton = document.createElement('button');
          submitButton.type = 'submit';
          submitButton.textContent = 'Update Product';
          addBox.appendChild(submitButton);

          submitButton.addEventListener("click",()=>{
            let id = ProductID.value

            let updatedUser = {
                name : name.value,
                image : image.value,
                price : price.value,
                gender : gender.value,
                strikePrice : strikePrice.value,
                categorySelect : categorySelect.value,
                brand : brandInput.value,
                rating : ratingInput.value,
                color : colorInput.value,
                discount : discountInput.value
            }

            function updateFetch(id){
              fetch(`https://stormy-flannel-shirt-ox.cyclic.app/products/update/${id}`,{
                method : "PATCH",
                body : JSON.stringify(updatedUser),
                headers : {
                  "Content-type":"application/json"
                }
              })

              .then((res)=>res.json())
              .then(res=>{
                console.log(res)
                
                if(res.msg=="Error while updating Product"){
                  alert("Error while updating Product")
                }else if(res.msg=="product updated successfully"){
                  alert("Product updated Successfull")
                  location.reload()
                }else{
                  alert("Product not found")
                }
              })

              .catch((err)=>{
                console.log(err)
              })
            }
            updateFetch(id)
      })
})


// ---------------------------------------Customer List--------------------------------------------

const userlist = document.getElementById("customerlist")

userlist.addEventListener("click",(e)=>{
  e.preventDefault()
  addBox.innerHTML = "";
  addBox.id = "";
  addBox.setAttribute('id', 'userlist');

  var table = document.createElement('table');
      table.classList.add('tableC');

      // let heading = document.createElement("h2")
      // heading.innerHTML = "Customer List:-"
      
      // create table header
      var header = document.createElement('thead');
      var headerRow = document.createElement('tr');
      headerRow.appendChild(createCell('th', 'Sr.No.'))
      headerRow.appendChild(createCell('th', 'Username'));
      headerRow.appendChild(createCell('th', 'Email'));
      headerRow.appendChild(createCell('th', 'Gender'));
      headerRow.appendChild(createCell('th', 'Age'));
      headerRow.appendChild(createCell('th', 'City'));
      headerRow.appendChild(createCell('th', 'Phone'));
      header.appendChild(headerRow);
      table.appendChild(header);


        fetch('https://stormy-flannel-shirt-ox.cyclic.app/users/')
        .then(res => res.json())
        .then(data => {
          console.log(data.user)
          displayData(data.user)
      })
        .catch((err)=>{
          console.log(err)
        })

      function displayData(data){
        let tbody = document.createElement("tbody")
        tbody.innerHTML = null
        let count=0
        data.forEach((el)=>{
      
          let row = document.createElement("tr")
      
              let srno = document.createElement("td")
              let username = document.createElement("td")
              let email = document.createElement("td")
              let gender = document.createElement("td")
              let age = document.createElement("td")
              let city = document.createElement("td")
              let phone = document.createElement("td")
      
              
              count++
              srno.textContent = `${count}.`
              username.textContent = el.username
              username.style.fontWeight = "Bold"
              email.textContent = el.email
              gender.textContent = el.gender
              age.textContent = el.age
              city.textContent = el.city
              phone.textContent = generateMobileNumber()
          

            row.append(srno,username,email,gender,age,city,phone)
            tbody.append(row)
            table.appendChild(tbody)
            
        })
        // addBox.appendChild(heading)
        addBox.appendChild(table)
      }


      
      function createCell(tag, text) {
        var cell = document.createElement(tag);
        cell.textContent = text;
        return cell;
      }


      function generateMobileNumber() {
        var mobileNumber = '9'; 
        for (var i = 1; i < 10; i++) { 
          mobileNumber += Math.floor(Math.random() * 10); 
        }
        return mobileNumber;
      }
})

fetch('https://stormy-flannel-shirt-ox.cyclic.app/products/')
        .then(res => res.json())
        .then(data => {
          console.log(data.product.length)   
          const totalP = document.querySelector("#totalP")
          totalP.innerHTML = data.product.length
      })
        .catch((err)=>{
          console.log(err)
        })


fetch('https://stormy-flannel-shirt-ox.cyclic.app/users/')
        .then(res => res.json())
        .then(data => {
          console.log(data.user)
          const totalU = document.querySelector("#totalU")
          totalU.innerHTML = data.user.length
      })
        .catch((err)=>{
          console.log(err)
        })








