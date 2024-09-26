async function getPrediction(){
    let response = await fetch('http://localhost:8000/predict/?asset=btc')
    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}
const predictionService = {   
    getData: async () => {
        let prediction = await getPrediction(); 
        prediction = JSON.parse(prediction)['predicted_price']
        return prediction;
    }
}


export default predictionService;