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


// Display categories
const displayCategories = (categories) => {
  categoryContainer.innerHTML= "<h3 class='font-bold mb-3'>Categories</h3>";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat.category_name;
    btn.id = cat.id;
    btn.className =
      "block w-full text-left px-3 py-2 mb-2 rounded cursor-pointer text-white bg-green-600 hover:bg-green-800";
    categoryContainer.appendChild(btn);
  
  });

};

//click Category 

categoryContainer.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const allBtn = categoryContainer.querySelectorAll("button");
    allBtn.forEach(b => {
      b.classList.remove("bg-gray-800");
      b.classList.add("bg-green-600", "hover:bg-green-800");
    });

    e.target.classList.remove("bg-green-600", "hover:bg-green-800");
    e.target.classList.add("bg-gray-800");

    loadPlantsByCategory(e.target.textContent);
  }
});
