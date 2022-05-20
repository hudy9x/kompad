import { Routes, Route } from "react-router-dom";
import Tiptap from "./components/Tiptap";
import Titlebar from "./components/Titlebar";
import Signin from "./containers/Signin";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sigin" element={<Signin />}></Route>

      </Routes>
      <Titlebar />

      <Tiptap />
    </div>
  );
}

export default App;
