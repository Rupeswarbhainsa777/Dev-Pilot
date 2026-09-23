import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import NaveBar from "./components/NaveBar/NaveBar.jsx";

function App() {
    return (


        <>
            <NaveBar />
            <Routes>

                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>

            </Routes></>
    )
}

export default App;