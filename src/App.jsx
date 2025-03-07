import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AuthForm from "./components/AuthFrom";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  axios
    .get("https://sociopath-z47y.onrender.com/auth/check", { withCredentials: true })
    .then((res) => {
      console.log(res.data); // Log the response to check the authenticated status
      if (res.data.authenticated) {
        setUser(res.data.user);
      }
    })
    .catch((error) => {
      console.error('Error:', error); // Log the error for more insights
      setUser(null);
    })
    .finally(() => setLoading(false));
}, []);


  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
