// write your code here
document.addEventListener("DOMContentLoaded",()=>{
    getRamens()
    addRamen()
  })
  function getRamens(){
    fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      renderRamen(data)
    })
  }
  function renderRamen(RamenArray){
    const ramenMenu =document.querySelector("#ramen-menu")
    ramenMenu.innerHTML = ""
    RamenArray.forEach(ramen => {
      const img = document.createElement("img")
      img.src = ramen.image
      ramenMenu.appendChild(img)
  
      img.addEventListener("click",()=>{
        displayImgDetails(ramen)
      })
    })
  }
  
  function displayImgDetails(ramen){
    const rating = document.querySelector("#rating-display")
    const comment = document.querySelector("#comment-display")
    const img = document.querySelector(".detail-image")
    const name = document.querySelector(".name")
    const restaurant = document.querySelector(".restaurant")
  
    rating.innerHTML=""
    comment.innerHTML=""
    img.src=""
    name.innerHTML=""
    restaurant.innerHTML=""
  
    rating.innerText = ramen.rating
    comment.innerText = ramen.comment
    img.src = ramen.image
    name.innerText = ramen.name
    restaurant.innerText = ramen.restaurant
  }
  
  function addRamen(){
  
    const form = document.querySelector("#new-ramen")
    const name = form.querySelector("#new-name")
    const restaurant = form.querySelector("#new-restaurant")
    const image = form.querySelector("#new-image")
    const rating = form.querySelector("#new-rating")
    const comment = form.querySelector("#new-comment")
  
    form.addEventListener("submit",(event) => {
      event.preventDefault()
  
      const dataObj = {
        name:name.value,
        restaurant:restaurant.value,
        image:image.value,
        rating:rating.value,
        comment:comment.value
      }
  
      fetch("http://localhost:3000/ramens",{
        method:"POST",
        headers:{
          "content-type":"application/json",
          accept:"application/json"
        },
        body:JSON.stringify(dataObj)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        getRamens()
      })
      form.reset()
    })
  }
