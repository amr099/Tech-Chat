import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn.jsx";
import Register from "./Pages/Register.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route path='register' element={<Register />} />

                <Route path='signin' element={<SignIn />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </>
    );
}

export default App;
