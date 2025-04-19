import "../styles/globals.css";
import { AppProps } from "next/app";
import Header from "../components/Header";
import { User } from "../lib/types";
import { isAuthenticated, parseCookies } from "../lib/auth";
import api from "../lib/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps & { currentUser?: User }) {
    const router = useRouter();
    const isLoginPage = router.pathname === "/"; // Исправленная проверка

    console.log("Rendering Component:", Component); // Отладка для диагностики

    if (isLoginPage) {
        return <Component {...pageProps} />;
    }

    const initialCurrentUser = (pageProps as { currentUser?: User }).currentUser;
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(initialCurrentUser || null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const cookies = parseCookies();
            const token = cookies._token;
            if (token && !currentUser) {
                api.get<User>("/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                    .then((response) => {
                        setCurrentUser(response.data);
                        router.push("/welcome");
                    })
                    .catch((error) => {
                        console.error("Error fetching user on client:", error);
                        setCurrentUser(null);
                        router.push("/");
                    })
                    .finally(() => setIsAuthChecked(true));
            } else if (token) {
                setCurrentUser(initialCurrentUser || null);
                setIsAuthChecked(true);
                router.push("/welcome");
            } else {
                setIsAuthChecked(true);
                router.push("/");
            }
        } else {
            setIsAuthChecked(true);
        }
    }, []);

    if (!isAuthChecked) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return <Component {...pageProps} />;
    }

    return (
        <div>
            <Header currentUser={currentUser} />
            <main>
                <Component {...pageProps} currentUser={currentUser} />
            </main>
        </div>
    );
}

export default MyApp;