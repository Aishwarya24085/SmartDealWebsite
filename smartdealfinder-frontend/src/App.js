import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home.jsx";
import Login from "./Pages/LoginForm.jsx";
import Signup from "./Pages/SignUpForm.jsx";
import Comparision from "./Pages/Comparision.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/comparision" element={<Comparision />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
