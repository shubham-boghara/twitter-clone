import './App.css';
import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import authService from "../firebase";



function App() {

    const[init, setInit] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj , setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if(user){
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        })
    },[]);


  return (
    <div className="App">
        {init ? (<AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>) : "Loading.." }

        <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </div>
  );
}

export default App;
