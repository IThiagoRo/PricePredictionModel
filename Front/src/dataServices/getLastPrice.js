async function getLastPrice(){
    let response = await fetch('http://localhost:8000/btc_last_price/?asset=btc')
    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}
const lastPriceService = {   
    getData: async () => {
        let lastPrice = await getLastPrice();
        lastPrice = JSON.parse(lastPrice)['last_adj_close']
        return lastPrice;
    }
}

export default lastPriceService;