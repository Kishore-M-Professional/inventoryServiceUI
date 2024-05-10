import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddItem from "./components/AddItem";
import NavigationSlide from './components/NavigationSlide';
import UpdateItem from "./components/UpdateItem";
import DeleteItem from "./components/DeleteItem";
import FallBackData from "./components/FallBackData";
import PopupModal from "./components/PopupModal";

function App() {
  return (
    <div className="App">
      <NavigationSlide />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/fallbackdata" element={<FallBackData />} />
        <Route path="/update/:id" element={<UpdateItem />} />
        <Route path="/delete/:id" element={<DeleteItem />} />
        <Route path="/deleteall" element={<PopupModal />} />
      </Routes>
    </div>
  );
}

export default App;
