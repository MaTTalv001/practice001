import Headers from "./components/Headers";
import { Routes, Route } from "react-router-dom";
import Sample1 from "./components/Sample1";
import Sample2 from "./components/Sample2";
import Sample3 from "./components/Sample3";
import { RoutePath } from "./common/Route";
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App" style={{ width: '100%', margin: 0 }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={RoutePath.sample1.path} element={<Sample1 />} />
        <Route path={RoutePath.sample2.path} element={<Sample2 />} />
        <Route path={RoutePath.sample3.path} element={<Sample3 />} />
      </Routes>
      
      <footer>©2024</footer>
    </div>
  );
}

export default App;
