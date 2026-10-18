import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import NaveBar from "./components/NaveBar/NaveBar.jsx";
import History from "./pages/History/History.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import MyRepos from "./pages/MyRepos/MyRepos.jsx";

function App() {
    return (


        <>
            <NaveBar />
            <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/history" element={<History/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/repos" element={<MyRepos/>}/>
                </Routes>
            </main>
        </>
);
}

export default App;