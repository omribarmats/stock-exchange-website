
    window.onload = (e) => {
        e.preventDefault();
        let urlParams = new URLSearchParams(window.location.search);
        symbol = urlParams.get('symbol');
        getCompanyProfile(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
        getStockPriceHistiry(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`)
    };

    async function getCompanyProfile(url) {
        try {
            const response = await fetch(url);
            const result = await response.json();
            document.getElementById("loadingSpot").innerHTML="";
            resultImage = result.profile.image;
            resultName = result.profile.companyName;
            resultLink = result.profile.website;
            resultPrice = result.profile.price;
            resultChange = result.profile.changesPercentage;
            resultDescription = result.profile.description;

            document.getElementById("image").src = resultImage;
            document.getElementById("companyName").innerHTML = resultName + `<a href="${resultLink}" target="_blank">&#x2197</a>`;
            document.getElementById("changes").innerHTML = `(${resultChange}%)`
            document.getElementById("stockPrice").innerHTML = `<b class="mr-1">Price: </b>` + resultPrice + ` USD`;
            document.getElementById("description").innerHTML = `<b class="mr-1">Description: </b>` + resultDescription;

            if (resultChange > 0) {
                document.getElementById("changes").classList.add("text-success");
            }
            else {
                document.getElementById("changes").classList.add("text-danger");
            }
        }
        catch (err) {
            throw new Error("ERROR: server error", err);
        }
    }

    async function getStockPriceHistiry(historyUrl) {
        try {
            const response = await fetch(historyUrl);
            const result = await response.json();
            let Historicalarray = result.historical
            let datesArray = [];
            let priceArray = [];
            Historicalarray.forEach(item => {
                datesArray.push(item.date)
                priceArray.push(item.close)
            });
          const labels = datesArray.slice(0, 30).reverse();
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Last 30-days Price / Date',
                    backgroundColor: '#17A2B8',
                    borderColor: '#17A2B8',
                    data: priceArray.slice(0, 30).reverse(),
                }]
            };
            const config = {
                type: 'line',
                data: data,
                options: {}
            };
            const myChart = new Chart(
                document.getElementById('myChart'),
                config
            );
        }
        catch (err) {
            throw new Error("ERROR: server error", err);
        }
    }
