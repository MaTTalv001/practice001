import Headers from "./components/Headers";
import { Routes, Route } from "react-router-dom";
import Sample1 from "./components/Sample1";
import Sample2 from "./components/Sample2";
import Sample3 from "./components/Sample3";
import Bodies from "./components/Bodies";
import { RoutePath } from "./common/Route";

function App() {
  return (
    <div className="App" style={{ maxWidth: 900, margin: "auto" }}>
      <Headers />
      <Routes>
        <Route path={RoutePath.bodies.path} element={<Bodies />} />
        <Route path={RoutePath.sample1.path} element={<Sample1 />} />
        <Route path={RoutePath.sample2.path} element={<Sample2 />} />
        <Route path={RoutePath.sample3.path} element={<Sample3 />} />
      </Routes>
    </div>
  );
}

export default App;
