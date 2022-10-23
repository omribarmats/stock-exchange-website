async function search(searchTerm) {  
    try {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchTerm}&limit=10&exchange=NASDAQ`);
        const result = await response.json();
        return result;
    }
    catch (err) {
        throw new Error("ERROR: server error", err);
    
}
}