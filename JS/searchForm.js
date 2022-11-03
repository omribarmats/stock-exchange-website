class SearchForm {
    constructor(element) {
        this.element = element;
        this.logoNavImage = `Images/stock_market_website_logo_300_300_v2.png`
        this.loadSearchHTML();
    }

    loadSearchHTML() {
        const searchNav = document.createElement("nav");
        searchNav.classList.add("navbar", "navbar-light", "bg-light")
        const form = document.createElement("form");
        form.classList.add("form-inline")
        searchNav.append(form);
        const logo = document.createElement("a");
        logo.classList.add("navbar-brand")
        logo.setAttribute("href", "#");
        form.append(logo);
        const logoImage = document.createElement("img");
        logoImage.setAttribute("src", this.logoNavImage);
        logoImage.setAttribute("width", "40");
        logoImage.setAttribute("height", "40");
        logoImage.setAttribute("alt", "");
        logo.append(logoImage);
        const searchTerm = document.createElement("input");
        form.append(searchTerm);
        searchTerm.classList.add("form-control", "mr-sm-2", "border-info")
        searchTerm.setAttribute("id", "searchTerm");
        searchTerm.setAttribute("type", "search");
        searchTerm.setAttribute("placeholder", "Search Nasdaq Stocks...");
        searchTerm.setAttribute("aria-label", "search");
        const searchButton = document.createElement("searchButton");
        form.append(searchButton);
        searchButton.setAttribute("id", "searchButton");
        searchButton.setAttribute("type", "submit");
        searchButton.innerHTML = "Search";
        searchButton.classList.add("btn", "btn-outline-info", "my-2", "my-sm-0")
        searchButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.search();
        });
        const loadingSpot = document.createElement("div");
        loadingSpot.classList.add("ml-2");
        loadingSpot.setAttribute("id", "loading");
        form.append(loadingSpot);
        this.element.append(searchNav);
    }

    async search() {
        this.searchTerm = document.getElementById("searchTerm").value;
        const loading = document.getElementById("loading")
        loading.innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-grow text-info" role="status">
        <span class="sr-only">Loading...</span>
        </div></div>`;
        const results = await this.getData();
        this.callback(results);
        loading.innerHTML = ``;
    }

    async getData() {
        try {
            const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.searchTerm}&limit=10&exchange=NASDAQ`;

            const response = await fetch(url);
            const result = await response.json();
            return result;
        }
        catch (err) {
            throw new Error("ERROR: server error", err);
        }
    }

    onSearch(callback) {
        this.callback = callback;
    }
}


