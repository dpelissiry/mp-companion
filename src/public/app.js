async function search() {
    const query = document.getElementById('searchInput').value;
    let type = ''
    if(document.getElementById('boulder').checked) {
        type = 'boulder'
    }else if(document.getElementById('sport').checked) {
        type = 'sport'
    }else if(document.getElementById('trad').checked) {
        type = 'trad'
    }
    //console.log(type)
    const response = await fetch(`/search?type=${type}&query=${query}`);
    const data = await response.json();
    const json = data;
    //console.log(data);
    const searchResults = document.getElementById('results-container');
    searchResults.innerHTML = ''; // Clear previous results
    console.log(json)
    for (let res in json){
        console.log(json[res])
        const div = create_result_div(json[res])
        searchResults.appendChild(div); // Append the div to the searchResults container
    }
    
}

function create_result_div(data){
    //create main div
    const main_div = document.createElement('div');
    main_div.className = 'search-result';
    const title_div = document.createElement('div')
    title_div.className = 'search-result-title'
    title_div.textContent = data['name'];
    //append to main
    main_div.appendChild(title_div)
    //create div for img
    const img_div = document.createElement('div');
    img_div.className = 'search-result-image';
    const img = document.createElement('img');
    
    img.src = data['image'];
    //append img to img_div
    img_div.appendChild(img);
    main_div.appendChild(img_div);
    //create title div
    
    


    return main_div
}