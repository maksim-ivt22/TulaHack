import { setCookie, parseCookies as parseCookiesFromNookies, destroyCookie } from "nookies";
import { NextApiRequest } from "next";
import api from "./api";

export interface NextApiRequestWithCookies extends NextApiRequest {
    cookies: Record<string, string>;
}

export function getCookies(context?: { req: NextApiRequestWithCookies }) {
    return parseCookiesFromNookies(context);
}

export async function login(email: string, password: string) {
    const response = await api.post("/token", { email, password });
    const { access_token } = response.data;
    setCookie(null, "_token", access_token, {
        maxAge: 30 * 24 * 60 * 60, // 30 дней
        path: "/",
    });
    return response.data;
}

export function logout() {
    destroyCookie(null, "_token", { path: "/" });
}

export function isAuthenticated(context?: { req: NextApiRequestWithCookies }): boolean {
    let cookies: Record<string, string> = {};

    if (typeof window === "undefined" && context?.req) {
        cookies = getCookies(context);
        console.log("Server-side cookies:", cookies);
    } else {
        cookies = getCookies();
        console.log("Client-side cookies:", cookies);
    }

    const { _token } = cookies;
    console.log("Token found:", _token);
    return !!_token;
}