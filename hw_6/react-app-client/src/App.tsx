import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewsView from "./pages/NewsView";
import NewsForm from "./pages/NewsForm";
import NewsEdit from "./pages/NewsEdit";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<NewsForm />} />
      <Route path="/news/:id" element={<NewsView />} />
      <Route path="/edit/:id" element={<NewsEdit />} />
    </Routes>
  );
}

export default App;
