const categoryContainer =document.getElementById("categoryContainer");
const treeContainer =document.getElementById("treeContainer");
const cartContainer = document.getElementById("cartContainer");
const cartTotal =document.getElementById("cartTotal");
const modalContainer = document.getElementById("modalContainer");
const treeModal = document.getElementById("tree-details-modal");

let cart = [];
let allPlants = [];
let allCategories = [];






//Load all plant
const loadAllPlants = () => {
  showLoading(treeContainer,"please wait Loading all plants...");
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res =>res.json())
    .then(data =>{
      if (data.status && data.plants) 
      {
        allPlants = data.plants;
        displayTrees(allPlants);
      } 
      else {
        treeContainer.innerHTML =`<p class="text-center text-gray-500 py-10"> Sorry no plants are available</p>`;
      }
    
    })

    .catch(err => {
      console.log(err);
      treeContainer.innerHTML = "<p class='text-red-500 py-10'>Failed to load plants</p>";
    
    });
};

