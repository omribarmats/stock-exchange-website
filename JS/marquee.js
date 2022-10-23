class Marquee {
    constructor(element) {
        this.element = element;
        this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse/`
    }

    async load() {
        this.data = await this.getData();
        this.presentData();
      }
   
    async getData() {
        try {
            const response = await fetch(this.url);
            const result = await response.json();
            return result;
        }
        catch (err) {
            throw new Error("ERROR: server error", err);
        }
    }

    async presentData() {
        let marqueeElement = this.element;
        marqueeElement.className = "marqueeElement flex-row";
        let marqueeItems = document.createElement("div")
        marqueeItems.className = "marquee";
        marqueeElement.appendChild(marqueeItems);

        let slicedResult = this.data.slice(0,200);
            slicedResult.forEach(item => {
                let symbol = item.symbol;
                let price = item.open;
                marqueeItems.innerHTML+=`<span class="marquee-item"> <b>${symbol}</b> <span class="marquee-price">${price}</span></span>` 
            });
    }
}



