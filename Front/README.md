# React SPA for Dashboard using Chart.js

### Features

  - This project features a responsive Dashboard projecting multiple data through different Charts.
  - For now, project is using some hard coded data from Data Service, but we can make an API call since it is designed keeping asynchronous behaviour in mind.
  - Error handling on API fail has taken care with showing “No Data Available” on card, for testing one can simply “throw new Error()” from data service.

### How to setup this project

  - Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
  - Clone this repo using git clone https://github.com/surya5954/dashboard.git
  - Move to the appropriate directory: cd dashboard.
  - Run following commands to setup and start,
       ```sh
          npm install
          npm start
       ```
   - At this point you can run npm start to see the dashboard app at http://localhost:3000.

### Working demo
  
  This project is build and deployed with help of GitHub pages at https://surya-demo.github.io
  
  
### Dependencies

  - This project is using latest version of Chart.js 3.0.2, look at https://www.chartjs.org/docs/latest/
  - This project is also using latest version of Material UI, look at https://material-ui.com/getting-started/installation/
 
