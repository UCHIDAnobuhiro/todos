import { Routes, Route } from "react-router-dom";
import { Todos } from "./pages/Todos";

export function App() {
  return (
    <Routes>
      <Route path="/todos" element={<Todos />} />
    </Routes>
  );
}
export default App;
