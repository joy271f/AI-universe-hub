const loadUniverseAPI = async (dataLimits) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    displayUniverseAPI(data.data.tools, dataLimits);
}


const displayUniverseAPI = (datas, dataLimits) => {
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.innerText = "";
    
    // all data show function
    const seeMore = document.getElementById("see-more");
    if (dataLimits && datas.length > 6){
        datas = datas.slice(0, 6);
        seeMore.classList.remove("d-none");
    }else{
        seeMore.classList.add("d-none");
    }

//------------------------****--------------------------------
    // loop for single object access
    datas.forEach(data => {
        //nested featureContainer loop
        const features = data.features;
        let featureContainer = '';
            features.forEach(feature => {
            featureContainer += `<ul><li class="lh-1">${feature}</li></ul>`;
        })

        // dynamic Card create
        const toolsDiv = document.createElement('div');
        toolsDiv.classList.add('col');
        toolsDiv.innerHTML = `
        <div class="card h-100">
            <img src="${data.image}" class="card-img-top" style="height:32vh;" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p class="card-text"><small>${featureContainer}</small></p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
            <div>
                <h5 class="card-title fw-bold">${data.name}</h5>
                <small class="text-muted d-block"><i class="fa-solid fa-calendar-days"></i> ${data.published_in}</small>
            </div>
            <div>
                <button onclick="ShowDetailsBtn('${data.id}')" class="btn btn-danger text-white rounded-circle" data-bs-toggle="modal" data-bs-target="#showDetailsModal"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
        
        `,

        toolsContainer.appendChild(toolsDiv);
    });
    toggleSpinner(false);
};
//------------------------****--------------------------------



// ---------------------***----------------------------
// see more function
const seeMoreBtn = (dataLimits) => {
    toggleSpinner(true);
    loadUniverseAPI(dataLimits);
};


// load all data by seeMore btn
document.getElementById('load-all-data').addEventListener('click', function(){
    seeMoreBtn();
});
// ---------------------***----------------------------



// ----------------------Start--------------------------------***
// show Details button
const ShowDetailsBtn = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayCardDetails(data.data);
} 

// display card details
const displayCardDetails = data => {
     console.log(data);
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
    
    <!-- modal main div start -->
                <div id="modal-container" class="container row row-cols-1 row-cols-md-3 g-4">
                    <!-- modal first div -->
                    <div class="col col-md-6 border border-danger bg-danger bg-opacity-10">
                        <h5 class="pe-3 ps-3 mt-2"><small>${data.description}</small></h5>
                        
                        <div class="d-flex justify-content-around align-items-center mt-4">
                            <div style="height: 10vh;" class="bg-light w-25 rounded text-center"><small>hello </small></div>
                            <div style="height: 10vh;" class="bg-light w-25 rounded text-center"><small>hello</small></div>
                            <div style="height: 10vh;" class="bg-light w-25 rounded text-center"><small>hello</small></div>
                        </div>

                        <div class="d-flex justify-content-evenly align-items-center mt-4">
                            <div class="w-25 rounded"><small>hello</small></div>
                            <div class="w-25 rounded"><small>hello</small></div>
                        </div>

                    </div>

                    <!-- modal second div -->
                    <div class="col col-md-6 p-2 text-center">
                        <img class="img-fluid mb-2" src="${data.image_link[0]}" alt="">
                        <h5><small>${data.input_output_examples[0].input}</small></h5>
                        <p><small class="p-3">${data.input_output_examples[0].output}</small></p>
                    </div>
                </div>
                <!-- modal main div end -->
    
    
    `;





















}




// ------------------------end-------------------------------***


// loader Section
const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {
        loaderSection.classList.remove("d-none");
      } else {
        loaderSection.classList.add("d-none");
      }
}
// ---------------****----------------------------------




loadUniverseAPI(' ');

