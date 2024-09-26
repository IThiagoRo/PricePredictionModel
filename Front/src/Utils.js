let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// This module is for some generic used function by charts to help populating data and Legends.

module.exports = {
    CHART_COLORS: {
        red: "#ff6384",
        blue: "#36a2eb",
        green: "#4bc0c0",
        yellow: "#ffcd56"
    },
    months: (data) => {
        return monthsArray.slice(0, data.count);
    },
    numbers: ({ count, max, min }) => {
        let num_arr = [];
        while (count !== 0) {
            num_arr.push(randomNumber(min, max));
            count--;
        }
        //console.log(num_arr.length);
        return num_arr;
    }
}
