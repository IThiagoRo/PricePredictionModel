import './App.css';
import Drawer from './components/Navigation/Drawer/Drawer';
import ChartLayout from './components/Layout/ChartLayout/ChartLayout';

const App = () => {

  // This components include drawer and main chart layout 
  // If someone wish to routes if future, it can be added here
  // for dashboard routes we can load the ChartLayout component

  let dasboard = <ChartLayout />
  return (
    <div className="App">
      <Drawer title={"UN IA"} content={dasboard} />
    </div>

  );
}

export default App;
