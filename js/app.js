// main fetch
const loadUniverseAPI = async (dataLimits) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    displayUniverseAPI(data.data.tools, dataLimits);
}

// main fetch display
const displayUniverseAPI = (datas, dataLimits) => {
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.innerText = "";
    
    // See more btn all data show function
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
            featureContainer += `<li>${feature}</li>`;
        })

        // dynamic Card create
        const toolsDiv = document.createElement('div');
        toolsDiv.classList.add('col');
        toolsDiv.innerHTML = `
        <div class="card h-100">
            <img src="${data?.image ? data?.image : 'Not found image'}" class="card-img-top" style="height:32vh;" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p class="card-text"><small><ul>${featureContainer ? featureContainer : 'Not found features'}</ul></small></p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
            <div>
                <h5 class="card-title fw-bold">${data?.name ? data?.name : 'Not found name'}</h5>
                <small class="text-muted d-block"><i class="fa-solid fa-calendar-days"></i> ${data?.published_in ? data?.published_in : 'Not found date'}</small>
            </div>
            <div>
                <button onclick="ShowDetailsBtn('${data?.id ? data?.id : 'Not found button'}')" class="btn btn-danger text-white rounded-circle" data-bs-toggle="modal" data-bs-target="#showDetailsModal"><i class="fa-solid fa-arrow-right"></i></button>
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

// display card details (modal data display)
const displayCardDetails = data => {

    // Dynamic pricing  section
    let planContainer = '';
    const pricingContainer = data.pricing;
    pricingContainer.forEach(values => {
        planContainer += `<div class="col col-md-3 mx-auto bg-light rounded text-center text-success">
        <div class="mt-4">
        <small>${values?.price ? values?.price : 'No found price'}</small></div>
        <h6 class="mt-2">${values?.plan ? values?.plan : 'No found plan'}</h6>
        </div>
        `
    })


    // modal feature section
    const features = data.features;
    let featureNameContainer = '';
    for (const feature in features) {
        if (Object.hasOwnProperty.call(features, feature)) {
            let element = features[feature];
            featureNameContainer += `<li class="mt-4" style="line-height: .5px;">${element?.feature_name}</li>`;
        }
    }

    // modal Integrations section
    const modalIntegrations = data.integrations;
    let modalIntegration = '';
    modalIntegrations.forEach(element => {
        modalIntegration += `<li class="mt-4" style="line-height: .5px;">${element}</li>`;
    });




    //  dynamic modal
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
    
    <!-- modal main div start -->
                <div id="modal-container" class="row row-cols-1 row-cols-md-3 g-4">
                    <!-- modal first div -->
                    <div class="col col-md-6 border border-danger bg-danger bg-opacity-10">
                        <h5 class="pe-3 ps-3 mt-2 fw-bold"><small>${data.description ? data.description : 'Not found description'}</small></h5>
                        
                        <div class="row row-cols-1 row-cols-md-3 mt-4">
                            ${planContainer ? planContainer : 'No found'}
                        </div>

                        
                        <div style="font-size: 12px;" class="row row-cols-1 row-cols-md-3 g-4">
                            <div class="col col-md-6 rounded">
                                <h4 class="mt-4"><small>Features</small></h4>
                                <ul>${featureNameContainer ? featureNameContainer : 'Not found features'}</ul>
                            </div>
                            <div class="col col-md-6 rounded">
                                <h4 class="mt-4"><small>Integrations</small></h4>
                                <ul>${modalIntegration ? modalIntegration : 'Not found integration'}</ul>
                            </div>
                        </div>

                    </div>

                    <!-- modal second div -->
                    <div class="col col-md-6 text-center position-relative">
                        <div class="">
                            <img class="img-fluid mb-2" src="${data?.image_link[0] ? data?.image_link[0] : 'image not found'}" alt="">
                        </div>
                        <div class="position-absolute top-0 end-0">
                            <span class="badge text-bg-danger fs-6">${data?.accuracy?.score ? data?.accuracy?.score : 'No'} accuracy</span>
                        </div>
                        <h5><small>${data?.input_output_examples[0]?.input ? data?.input_output_examples[0]?.input : 'Not found'}</small></h5>
                        <p><small class="p-3">${data.input_output_examples[0].output ? data.input_output_examples[0].output : 'Not found'}</small></p>
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

