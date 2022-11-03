class SearchResult {
    constructor(element) {
        this.element = element;
        this.createUl()
        this.baseURL = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/"
    }

    createUl() {
        const resultsUl = document.createElement("ul");
        resultsUl.classList.add("searchResults");
        resultsUl.setAttribute("id", "resultsUl");
        this.element.appendChild(resultsUl);
    }

    async renderResults(companies) {
        resultsUl.innerHTML = "";
        companies.forEach(async (item) => {
            const data = await this.getData(item.symbol);
            const instrument = data.profile;
            const listItem = this.loadList(instrument.image, instrument.changesPercentage, item.name, item.symbol);
            document.getElementById("resultsUl").appendChild(listItem);

        });
    }

    async getData(symbol) {
        try {
            let url = this.baseURL + symbol;
            let response = await fetch(url);
            let result = response.json();
            return result;
        } catch (err) {
            throw new Error("ERROR: server error", err);
        }
    }

    loadList(image, priceChange, companyName, symbol) {
        const listItem = document.createElement("li");
        const itemImage = document.createElement("img");
        itemImage.setAttribute("src", image);
        itemImage.setAttribute("width", "20px");
        itemImage.setAttribute("alt", "");
        itemImage.classList.add("item-image");
        const item = document.createElement("a");
        listItem.appendChild(item);
        item.setAttribute("href", `company.html?symbol=${symbol}`);
        item.setAttribute("target", "popup");
        item.setAttribute("onclick", `window.open('company.html?symbol=${symbol}','popup','width=800,height=600')`);
        item.innerHTML = `(${symbol}) ${companyName}`;
        let searchTerm = document.getElementById("searchTerm").value;
        const term = new RegExp(searchTerm, 'gi');
        item.innerHTML = item.innerHTML.replace(term, function (term) {
            return `<span class="hl-bg">${term}</span>`;
        });
        const itemChange = document.createElement("span");
        item.appendChild(itemChange);
        item.insertBefore(itemImage, item.firstChild);
        itemChange.classList.add("itemChange");
        itemChange.innerHTML = ` ${priceChange} % `;
        if (priceChange > 0) {
            itemChange.classList.add("text-success");
        } else {
            itemChange.classList.add("text-danger");
        }
        return listItem;
    }
}

