class SearchForm {
    constructor(element) {
        this.companies = companies;
        this.element = element; 
        this.window = window;
        this.load();
        this.searchButton = document.getElementById("searchButton").addEventListener('click', this.performSearch);
        this.loadingSpot = document.getElementById("loading")
        this.loadingIndicator = `<div class="d-flex justify-content-center"><div class="spinner-grow text-info" role="status"><span class="sr-only">Loading...</span>
</div></div>`;
this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=aa&limit=10&exchange=NASDAQ`
    }

    load() {
        this.element.innerHTML = `<nav class="navbar navbar-light bg-light">
                    <form class="form-inline">
                        <a class="navbar-brand" href="#">
                            <img src="Images/stock_market_website_logo_300_300_v2.png" width="40" height="40" alt="">
                        </a>
                        <input id="searchTerm" class="form-control mr-sm-2 border-info" type="search" placeholder="Search"
                            aria-label="Search">
                        <button id="searchButton" class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                        <div class="ml-2" id="loading"></div>
                    </form>
                    <script>
                    this.searchButton = document.getElementById("searchButton").addEventListener('click', search);
                    </script>
                </nav>`
    }

     async performSearch(e) { 
    e.preventDefault();
    let loadingSpot = document.getElementById("loading")
let loadingIndicator = `<div class="d-flex justify-content-center"><div class="spinner-grow text-info" role="status">
<span class="sr-only">Loading...</span>
</div></div>`;
loadingSpot.innerHTML = loadingIndicator;
let searchTerm = document.getElementById("searchTerm").value;
       let companies = await search(searchTerm); 
       console.log(companies)
       loadingSpot.innerHTML = "";
    }
   
}