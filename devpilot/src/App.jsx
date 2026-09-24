import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import NaveBar from "./components/NaveBar/NaveBar.jsx";
import History from "./pages/History/History.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {
    return (


        <>
            <NaveBar />
            <Routes>

                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/history" element={<History/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>

            </Routes></>
    )
}

export default App;