import "../styles/globals.css";
import { AppProps } from "next/app";
import Header from "../components/Header";
import { User } from "../lib/types";
import { getCookies } from "../lib/auth";
import api from "../lib/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps & { currentUser?: User }) {
    const router = useRouter();
    const initialCurrentUser = (pageProps as { currentUser?: User }).currentUser;
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(initialCurrentUser || null);

    // Список страниц, доступных без авторизации
    const publicPages = ["/", "/login", "/register", "/requests"];

    useEffect(() => {
        if (typeof window !== "undefined") {
            const cookies = getCookies();
            const token = cookies._token;

            if (token && !currentUser) {
                api.get<User>("/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                    .then((response) => {
                        setCurrentUser(response.data);
                        if (router.pathname === "/") {
                            console.log("User authenticated, redirecting to /welcome");
                            router.push("/welcome");
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching user on client:", error);
                        setCurrentUser(null);
                        // Перенаправляем на главную, только если текущая страница не публичная
                        if (!publicPages.includes(router.pathname)) {
                            console.log("User not authenticated, redirecting to /");
                            router.push("/");
                        }
                    })
                    .finally(() => setIsAuthChecked(true));
            } else if (token && currentUser) {
                setIsAuthChecked(true);
                if (router.pathname === "/") {
                    console.log("User authenticated (token exists), redirecting to /welcome");
                    router.push("/welcome");
                }
            } else {
                setIsAuthChecked(true);
                // Перенаправляем на главную, только если текущая страница не публичная
                if (!publicPages.includes(router.pathname)) {
                    console.log("No token, redirecting to /");
                    router.push("/");
                }
            }
        } else {
            setIsAuthChecked(true);
        }
    }, [router.pathname, currentUser]);

    if (!isAuthChecked) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header currentUser={currentUser} />
            <main>
                <Component {...pageProps} currentUser={currentUser} />
            </main>
            <Footer currentUser={currentUser} />
        </div>
    );
}

export default MyApp;