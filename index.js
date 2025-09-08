const categoryContainer =document.getElementById("categoryContainer");
const treeContainer =document.getElementById("treeContainer");
const cartContainer = document.getElementById("cartContainer");
const cartTotal =document.getElementById("cartTotal");
const modalContainer = document.getElementById("modalContainer");
const treeModal = document.getElementById("tree-details-modal");

let cart = [];
let allPlants = [];
let allCategories = [];



//Loading spinner
const showLoading = (container, message) => {
  container.innerHTML = `
    <div class="flex flex-col justify-center items-center py-10">
      <span class="loading loading-spinner loading-xl text-green-700"></span>
      <p class="text-center text-gray-500 mt-3">${message}</p>
    </div>
  `;
};



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






// Load categories
const loadCategories = () => {
  showLoading(categoryContainer, "please wait  loading all categories....");
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
      if (data.categories) 
      {
        allCategories = data.categories;
        displayCategories(allCategories);
      }
    
    
    })
    .catch(err => {
      console.log(err);
      categoryContainer.innerHTML ="<p class='text-red-500'>Failed to load categories.</p>";
    });

  };

