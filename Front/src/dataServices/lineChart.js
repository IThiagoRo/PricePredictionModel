async function getBTC(){
    let response = await fetch('http://localhost:8000/btc_prices/?asset=btc')
    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}
const lineChartService = {   
    getData: async () => {
        let dataBTC = await getBTC(); 
        dataBTC = JSON.parse(dataBTC)['btc_prices'];
        return dataBTC;
    }
}


export default lineChartService;