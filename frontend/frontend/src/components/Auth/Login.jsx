import React, { useState } from "react";
import axios from "../../api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("/auth/login", { email, password });
            alert(`Добро пожаловать, ${response.data.name}`);
        } catch (error) {
            alert("Ошибка авторизации!");
        }
    };

    return (
        <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
};

export default Login;
