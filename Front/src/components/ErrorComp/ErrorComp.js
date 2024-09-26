import { Chart } from 'react-chartjs-2';
const ErrorComp = () => {
    // This function is to set error text on no data
    Chart.pluginService.register({
        afterDraw: function (chart) {
            // Plugin code.
            if (chart.data.datasets.length === 0) {
                // No data is present
                var ctx = chart.chart.ctx;
                var width = chart.chart.width;
                var height = chart.chart.height
                chart.clear();

                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = "16px normal 'Helvetica Nueue'";
                ctx.fillText('No data to display', width / 2, height / 2);
                ctx.restore();
            }
        }
    });
}

export default ErrorComp;