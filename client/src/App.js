import "./App.css";
import Details from "./components/Details/Details.jsx";
import CreateDog from "./components/CreateDog/CreateDog.jsx";
import Home from "./components/Home/Home.jsx";
import Landing from "./components/Landing/Landing.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import About from "./components/About/About"
import EditDog from "./components/CreateDog/EditDog";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<Details />} />
          <Route path="/home/:id/edit" element={<EditDog />} />
          <Route path="/dog" element={<CreateDog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
