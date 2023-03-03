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

    // loop for single object access
    datas.forEach(data => {
        //nested featureContainer loop
        const features = data.features;
        let featureContainer = '';
            features.forEach(feature => {
            featureContainer += `<ul><li>${feature}</li></ul>`;
        })

        // dynamic Card create
        const toolsDiv = document.createElement('div');
        toolsDiv.classList.add('col');
        toolsDiv.innerHTML = `
        <div class="card h-100">
            <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title fw-bold">Features</h5>
            <p class="card-text"><small>${featureContainer}</small></p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
            <div>
                <h5 class="card-title fw-bold">${data.name}</h5>
                <small class="text-muted d-block"><i class="fa-solid fa-calendar-days"></i> ${data.published_in}</small>
            </div>
            <div>
                <button class="btn btn-danger text-white rounded-circle"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
        
        `,

        toolsContainer.appendChild(toolsDiv);
    });
};





// see more function
const seeMore = (dataLimits) => {
    loadUniverseAPI(dataLimits);
};


// load all data by seeMore btn
document.getElementById('load-all-data').addEventListener('click', function(){
    seeMore();
});




loadUniverseAPI(' ');

