
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemparatureAndDetails from './components/TemparatureAndDetails';
import Forecast from './components/Forecast';


function App() {
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-28 bg-gradient-to-br 
    from-cyan-600 to-blue-700 shadow-xl shadow-gray-400 rounded-[7px]">
      <TopButtons/>
      <Inputs/>
      
      <TimeAndLocation/>
      <TemparatureAndDetails/>
      <Forecast/>
    </div>
      );
}

export default App;
