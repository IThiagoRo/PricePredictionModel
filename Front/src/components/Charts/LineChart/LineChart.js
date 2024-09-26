import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Transitions from '../../Animations/PaperTransition';
import errorHandler from '../../ErrorComp/ErrorComp'
import Utils from '../../../Utils';


const LineChart = (props) => {

    // If Data set is empty then this effect with Set the proper message on Card
    useEffect(() => {
        errorHandler();
    }, [])

    const config = () => {
        let data = props.data
        return {
            labels: data.map(entry => entry['Date']),
            datasets: [
                {
                    label: 'Historico del precio del Bitcoin',
                    data: data.map(entry => entry["Adj Close"]),
                    fill: false,
                    borderColor: Utils.CHART_COLORS.blue,
                    tension: 0.4 
                }
            ]
        }
    }

    return (

        <Transitions>
            <Line data={config} height={250} options={{
                responsive: true,
                maintainAspectRatio: false
            }} />
        </Transitions>


    )
}


export default LineChart;