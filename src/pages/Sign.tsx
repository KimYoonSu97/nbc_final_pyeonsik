import React, { useState } from "react";
import { supabase } from "../supabse";
import { useNavigate } from "react-router";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          nickname,
        },
      },
    });
    if (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Error signing in:", error.message);
      } else {
        console.log("User signed in:", data);
        alert("로그인성공");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Supabase Auth Example</h1>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default Sign;
