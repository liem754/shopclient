import { Routes, Route } from "react-router-dom";
import { path } from "./ultils/path";
import { DefaultLayOut, Login } from "./pages/public";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={path.PUBLIC} element={<DefaultLayOut />}>
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
