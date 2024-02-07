import Headers from "./components/Headers";
import { Routes, Route } from "react-router-dom";
import Sample1 from "./components/Sample1";
import Sample2 from "./components/Sample2";
import Sample3 from "./components/Sample3";

function App() {
  return (
    <div className="App" style={{ maxWidth: 900, margin: "auto" }}>
      <Headers />
      <Routes>
        <Route path="/sample1" element={<Sample1 />} />
        <Route path="/sample2" element={<Sample2 />} />
        <Route path="/sample3" element={<Sample3 />} />
      </Routes>
    </div>
  );
}

export default App;
