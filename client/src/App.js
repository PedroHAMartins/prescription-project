import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/Connected/Main";
import PrivateRoutes from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/main" element={<MainPage />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
