import RouterC from './Components/Router/RouterC'
import Footer from './Components/Router/layout/Footer';
import { Outlet } from 'react-router-dom';
import Navbar from "../src/Components/Router/layout/Navbar"

function App() {
  return (
    <div className="App">
        <Navbar/>
        < Outlet/>
        {/* <RouterC/> */}
        <Footer/>
    </div>
  );
}

export default App;
