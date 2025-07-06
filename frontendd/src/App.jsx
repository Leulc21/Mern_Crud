import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/create" element={<CreatePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </div>
  );
}

export default App;
