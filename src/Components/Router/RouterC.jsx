import { BrowserRouter as Router, Routes,Route,Link  } from "react-router-dom";
import Company from "../../Pages/Company";
import Home from "../../Pages/Home";
import Contact from "../../Pages/Contact";
import NewProject from "../../Pages/NewProject";
import Container from "./layout/Container";

function RouterC(){
    return(
        <Router>
            <div>
                <Link to= "Home">Home</Link>
                <Link to= "Company"> Company</Link>
                <Link to="Contact"> Contact</Link>
                <Link to="New Project">New Project</ Link>
            </div>  
            <Container customClass="min-height">
                <Routes>
                    <Route path="/Home" element={<Home/>}/>
                    <Route path="/Company" element={<Company/>}/>
                    <Route path="/Contact" element={<Contact/>}/>
                    <Route path="/New Project" element={<NewProject/>}/>
                </Routes>
            </Container>
        </Router>
    )
}

export default RouterC