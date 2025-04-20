import { useRouter } from "next/router";
import { User } from "../lib/types";
import { logout } from "../lib/auth";
import { useState } from "react";

interface HeaderProps {
    currentUser: User | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleDashboardClick = () => {
        router.push("/dashboard");
        setIsMenuOpen(false);
    };

    const handleProfileClick = () => {
        if (currentUser) {
            router.push("/profile");
        } else {
            console.warn("Cannot open profile: user not authenticated");
        }
        setIsMenuOpen(false);
    };

    const handleMailClick = () => {
        if (currentUser && currentUser.role === "admin") {
            router.push("/mail");
        } else {
            console.warn("Only admins can access Mail");
        }
        setIsMenuOpen(false);
    };

    const handleWelClick = () => {
        router.push("/");
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        if (currentUser) {
            logout();
            router.push("/");
        } else {
            console.warn("Cannot logout: user not authenticated");
        }
        setIsMenuOpen(false);
    };

    const handleLoginClick = () => {
        console.log("Navigating to login page (/login)");
        router.push("/login");
        setIsMenuOpen(false);
    };

    const handleRegisterClick = () => {
        router.push("/register");
        setIsMenuOpen(false);
    };

    const handleLinkClick = (path: string) => {
        router.push(path);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Определяем маршруты в зависимости от авторизации
    const links = [
        { name: "Заявки", path: currentUser ? "/user/requests" : "/requests" },
        { name: "Обсуждения", path: currentUser ? "/user/pow-wow" : "/pow-wow" },
        { name: "Пожертвования", path: currentUser ? "/user/donations" : "/mony" },
        { name: "О платформе", path: currentUser ? "/user/abouw" : "/abouw" },
        { name: "База знаний", path: currentUser ? "/user/KnowledgeBasew" : "/KnowledgeBasew" },
    ];

    return (
        <header className="text-black p-2 md:p-4 bg-[#FFFFFF]">
            <div className="container mx-auto flex items-center justify-between">
                <div onClick={handleWelClick} className="cursor-pointer">
                    <span className="text-lg md:text-[24px] font-bold mon">ПомощьРядом</span>
                </div>

                <div className="hidden lg:flex space-x-4">
                    {links.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleLinkClick(link.path)}
                            className="text-base md:text-[18px] text-black hover:text-[#9E9E9E]"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-2xl focus:outline-none">
                        {isMenuOpen ? "✕" : "☰"}
                    </button>
                </div>

                <div className="hidden lg:flex items-center space-x-4">
                    <div className="space-x-2 md:space-x-4 flex items-center">
                        {currentUser ? (
                            <>
                                <button
                                    onClick={handleProfileClick}
                                    className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                                    aria-label="Перейти в профиль"
                                >
                                    <span className="text-base md:text-lg font-medium text-gray-700">
                                        {currentUser.full_name.charAt(0).toUpperCase()}
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleLoginClick}
                                    className="h-[40px] w-[100px] md:w-[120px] text-base md:text-[18px] text-[#5DBA32] rounded-[12px] hover:bg-gray-100"
                                >
                                    Вход
                                </button>
                                <button
                                    onClick={handleRegisterClick}
                                    className="h-[40px] w-[100px] md:w-[120px] text-base md:text-[18px] bg-[#5DBA32] text-white rounded-[12px] hover:bg-green-600"
                                >
                                    Регистрация
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden bg-white shadow-lg mt-2 p-4 rounded-lg">
                    <div className="flex flex-col space-y-2">
                        {links.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleLinkClick(link.path)}
                                className="text-base p-2 rounded text-black hover:text-[#9E9E9E] text-center"
                            >
                                {link.name}
                            </button>
                        ))}
                        {currentUser ? (
                            <>
                                <button
                                    onClick={handleProfileClick}
                                    className="text-base text-left p-2 rounded hover:bg-gray-100"
                                >
                                    Профиль
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="text-base text-left p-2 rounded text-red-500 hover:bg-gray-100"
                                >
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleRegisterClick}
                                    className="text-base bg-[#5DBA32] w-[45%] mx-auto text-white p-2 rounded-[12px] hover:bg-green-600"
                                >
                                    Регистрация
                                </button>
                                <button
                                    onClick={handleLoginClick}
                                    className="text-base text-[#5DBA32] p-2 rounded hover:bg-gray-100"
                                >
                                    Вход
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;