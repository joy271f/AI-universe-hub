const loadUniverseAPI = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    displayUniverseAPI(data.data.tools);
}


const displayUniverseAPI = data => {
    const toolsContainer = document.getElementById('tools-container');
    data = data.slice(0, 6);

    // loop for single object access
    data.forEach(data => {
        // console.log(data.features)

        // Show Features Loop
        

        const toolsDiv = document.createElement('div');
        toolsDiv.classList.add('col');
        toolsDiv.innerHTML = `
        <div class="card h-100">
            <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title fw-bold">Features</h5>
            <p class="card-text"><small>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</small></p>
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

loadUniverseAPI();