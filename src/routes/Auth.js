import React,{useState} from "react";
import authService, {firebaseinstance} from "../firebase";

const form = {
    email:"",
    password:"",
}

const Auth = () => {
    const [auth,setAuth] = useState(form)
    const [newAccount,setNewAccount] = useState(true)
    const [error,setError] = useState("");

    const onChange = (event) => {
        const value = event.target.value;
        setAuth({...auth,[event.target.name]:value})

    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                const data = await authService.createUserWithEmailAndPassword(
                    auth.email, auth.password
                )
                console.log(data);
            } else {
              const data = await authService.signInWithEmailAndPassword(
                    auth.email, auth.password
                )
                console.log(data);
            }

        }catch(error) {
            setError(error.message);
        }

    }

    const toggleAccount = () => setNewAccount(prev => !prev);

    const onSocialClick = async (event) => {
        const { target: {name}, } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseinstance.auth.GoogleAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text"
                   id="email"
                   name="email"
                   placeholder="Email"
                   required
                   value={auth.email}
            onChange={onChange}/>
            <input type="password"
                   id="password"
                   name="password"
                   placeholder="password"
                   value={auth.password}
                   required
            onChange={onChange}/>
            <input type="submit" value={newAccount?"New Account":"Login"}/>
            {error}
        </form>
        <span onClick={toggleAccount}>
            {newAccount ? "Sign in" : "Create Account"}</span>
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
        </div>
    </div>
    )
}
    export default Auth;