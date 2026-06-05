import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TranscribePage from "./pages/TranscribePage";
import SeparatePage from "./pages/SeparatePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="transcribe" element={<TranscribePage />} />
        <Route path="separate" element={<SeparatePage />} />
      </Route>
    </Routes>
  );
}
