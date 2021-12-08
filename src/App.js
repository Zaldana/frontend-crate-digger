import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContextComponent, { AuthContext } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";

import ProtectedHome from "./components/protectedHome/ProtectedHome";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

// import addToCollection from "./components/protectedHome/addToCollection/addToCollection"
// import userCollection from "./components/protectedHome/userCollection/userCollection"
// import userDetails from "./components/protectedHome/userDetails/userDetails"


function App() {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    
    let jwtToken = window.localStorage.getItem("jwtToken");

    if (jwtToken) {
      
      let decodedToken = jwtDecode(jwtToken);

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        
        window.localStorage.removeItem("jwtToken");
        dispatch({ type: "LOGOUT" });
      
      } else {
      
        let decodedToken = jwtDecode(jwtToken);

        dispatch({
          type: "LOGIN",
          email: decodedToken.email,
          username: decodedToken.username,
        });
      }
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer theme="colored" />

      <AuthContextComponent>

      <Router>
        
        <Nav />
        
        <Routes>
          
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/protected-home"
            element={
              <PrivateRoute>
                <ProtectedHome />
              </PrivateRoute>
              }
          />

            <Route path="/" element={<Home />} />
            <Route render={() => <h1>Not found 404</h1>} />

        </Routes>
      </Router>
    </AuthContextComponent>
    </div>
  );
}

export default App;