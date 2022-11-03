class Marquee {
    constructor(element) {
        this.element = element;
        this.baseURL="https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/"
    }

    async load() {
        try {
            const response = await fetch(`${this.baseURL}quotes/nyse/`);
            const results = await response.json();
            this.presentData(results)
        } catch (error) {
            return false;
        }
    }

    async presentData(data) {
        const dataMarquee = await data;
        let sliceddataMarquee = dataMarquee.slice(0, 50);
        const marqueeElement = this.element;
        marqueeElement.className = "marqueeContainer";
        let marqueeRow = document.createElement("div")
        marqueeRow.className = "marquee";
        marqueeElement.appendChild(marqueeRow);

        sliceddataMarquee.forEach(item => {
            let symbol = item.symbol;
            let price = item.open;
            const marqueItem = document.createElement("div");
            marqueItem.classList.add("marquee-item");
            marqueItem.innerHTML = `<span> <b>${symbol}</b> <span class="marquee-price"> $${price}</span></span>`
            marqueeRow.appendChild(marqueItem);
        });
    }


}