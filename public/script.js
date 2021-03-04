    const cities = [];
    fetch('/api', {
      method: 'post'
    }) 
      .then(blob => blob.json())
      .then(data => cities.push(...data));
    
    function findMatches(wordToMatch, cities) {
      return cities.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        // Can find results filtered from name, zip, city, and category
        return place.name.match(regex) || place.zip.match(regex) || place.city.match(regex) || place.category.match(regex)
      });
    }
    
    //Retrieves specific info from endpoint file
    function displayMatches() {
      const matchArray = findMatches(this.value, cities);
      const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        const restaurantName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
        const restaurantType = place.category.replace(regex, `<span class="hl">${this.value}</span>`);
        const address = place.address_line_1.replace(regex, `<span class="hl">${this.value}</span>`);
        const zipcode = place.zip.replace(regex, `<span class="hl">${this.value}</span>`);
    
        //Formats selected info
        return `
          <li>
            <span class ="restaurant"><b>${restaurantName}</b></span><br>
            <span class ="restaurantType">${restaurantType}</span><br>
            <span class = "address">${address}</span><br>
            <span class="name">${cityName}, ${stateName}</span><br>
            <span class ="zipcode">${zipcode}</span><br><br>
          </li>
          
        `;
      }).join('');
      suggestions.innerHTML = html;
    }
    
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
    
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);