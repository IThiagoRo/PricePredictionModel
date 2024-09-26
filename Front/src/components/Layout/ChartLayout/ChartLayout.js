import React, { useState, useEffect } from 'react'
import './ChartLayout.css';

import lineChartService from '../../../dataServices/lineChart';

import LineChart from '../../Charts/LineChart/LineChart';
import predictionService from '../../../dataServices/prediction';
import lastPriceService from '../../../dataServices/getLastPrice';

import { Button, Box } from '@material-ui/core';

const ChartLayout = () => {
    const [lineChartData, setLineChartData] = useState(undefined);
    const [predictionData, setPredictionData] = useState(undefined);
    const [lastPrice, setLastPrice] = useState(undefined);
    const [isUp, setIsUp] = useState(false)

    function fetchPredictionData(){
        predictionService.getData()
            .then((data) => {
                setPredictionData(data);
            })
            .catch((err) => {
                console.log(err);
                setPredictionData(null);
            });
    };

    useEffect(() => {
        getChartDataFromService();
    }, [])

    useEffect(() => {
        if(predictionData && lastPrice && predictionData<lastPrice){
            setIsUp(true)
        }
    }, [predictionData, lastPrice])

    const getChartDataFromService = () => {
        lineChartService.getData()
            .then((data) => {
                setLineChartData(data);
            }).catch((err) => {
                setLineChartData(undefined);
                console.log(err);
            })
        lastPriceService.getData()
            .then((data) => {
                setLastPrice(data);
            }).catch((err) => {
                setLastPrice(undefined);
                console.log(err);
            })
    }

    return (
        <div className="container">
            <div className="grid-1">
                <div className="grid-item-5">
                    <div className="grid-item-5-2">
                        {lineChartData && <LineChart data={lineChartData} />}
                    </div>
                </div>
                <div className="grid-item-5-2">
                <Button variant="outlined" color="primary" onClick={() => { fetchPredictionData() }}> Predecir el precio para mañana </Button>
                </div>
                <div className="grid-item-5-2">
                <Box component="span" m={1} className={`${isUp ? 'cyan-box illuminated' : 'red-box red-glow'}`}>
                    {predictionData ? (<span>{JSON.stringify(predictionData, null, 2)}</span>) : ('')}
                </Box>
                </div>
            </div>
        </div>
    )
}

export default ChartLayout;
