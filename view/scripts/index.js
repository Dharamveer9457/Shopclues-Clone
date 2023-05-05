let img1 = "https://cdn.shopclues.com/images/banners/2023/May/04/HB4_JDD_Web_Esha_4thMay23.jpg"
let img2 = "https://cdn.shopclues.com/images/banners/2023/Apr/22/HB2_Refurbished_Web_SYM_22April23.jpg"
let img3 = "https://cdn.shopclues.com/images/banners/2023/Apr/25/HB1_MensClothing_Web_Esha_25Apr23Rev.jpg"
let img4 = "https://cdn.shopclues.com/images/banners/2023/May/04/HB3_Nirlon_Web_Esha_4thMay23.jpg"
let img5 = "https://cdn.shopclues.com/images/banners/2023/May/05/Intel_Gaming_Web_4May23.jpg"

var slideshowimages = [img1,img2,img3,img4,img5]

let slideshowBox = document.querySelector("#slideshow")
let img = document.createElement('img')

let i=0;
setInterval(function(){
    img.src = slideshowimages[i]
    i++
    if(i>=slideshowimages.length){
        i=0
    }
    slideshowBox.appendChild(img)
},1500)