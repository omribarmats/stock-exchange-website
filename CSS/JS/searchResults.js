class SearchResults {
    constructor(element) {
        this.element = element;
    }

    renderResults() {
        this.element.innerHTML = `<div class="pl-3 ml-5 mt-3">
        <ul class="searchResults" id="searchResults"></ul>
    </div>`
    }
}