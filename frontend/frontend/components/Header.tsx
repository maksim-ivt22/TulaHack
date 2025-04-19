import { useRouter } from "next/router";
import { User } from "../lib/types";
import { logout } from "../lib/auth";
import { useState } from "react";

interface HeaderProps {
    currentUser: User | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleDashboardClick = () => {
        router.push("/dashboard");
        setIsMenuOpen(false);
    };

    const handleProfileClick = () => {
        if (currentUser) {
            setIsModalOpen(true);
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
        setIsModalOpen(false);
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="text-black p-2 md:p-4 bg-[#FFFFFF]">
            <div className="container mx-auto flex items-center justify-between">
                <div onClick={handleWelClick} className="cursor-pointer">
                    <span className="text-lg md:text-[24px] font-bold mon">ПомощьРядом</span>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-2xl focus:outline-none">
                        {isMenuOpen ? "✕" : "☰"}
                    </button>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {currentUser && (
                        <>
                            {currentUser.role === "admin" && (
                                <button
                                    onClick={handleMailClick}
                                    className="p-2 rounded text-lg md:text-xl hover:bg-gray-100"
                                >
                                    Создать аккаунт сотрудника
                                </button>
                            )}
                            <button
                                onClick={handleDashboardClick}
                                className="p-2 rounded text-lg md:text-xl hover:bg-gray-100"
                            >
                                Список сотрудника
                            </button>
                        </>
                    )}
                    <div className="space-x-2 md:space-x-4 flex items-center">
                        {currentUser ? (
                            <button
                                onClick={handleProfileClick}
                                className="h-[40px] w-[150px] md:w-[180px] text-base md:text-xl hover:bg-gray-100 rounded-[12px]"
                            >
                                Учетная запись
                            </button>
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
                <div className="md:hidden bg-white shadow-lg mt-2 p-4 rounded-lg">
                    <div className="flex flex-col space-y-2">
                        {currentUser && (
                            <>
                                {currentUser.role === "admin" && (
                                    <button
                                        onClick={handleMailClick}
                                        className="text-base text-left p-2 rounded hover:bg-gray-100"
                                    >
                                        Создать аккаунт сотрудника
                                    </button>
                                )}
                                <button
                                    onClick={handleDashboardClick}
                                    className="text-base text-left p-2 rounded hover:bg-gray-100"
                                >
                                    Список сотрудника
                                    </button>
                            </>
                        )}
                        {currentUser ? (
                            <button
                                onClick={handleProfileClick}
                                className="text-base text-left p-2 rounded hover:bg-gray-100"
                            >
                                Учетная запись
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleLoginClick}
                                    className="text-base text-[#5DBA32] p-2 rounded hover:bg-gray-100"
                                >
                                    Вход
                                </button>
                                <button
                                    onClick={handleRegisterClick}
                                    className="text-base bg-[#5DBA32] text-white p-2 rounded hover:bg-green-600"
                                >
                                    Регистрация
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {isModalOpen && currentUser && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white p-4 md:p-20 rounded-[20px] md:rounded-[40px] shadow-lg w-[90%] md:w-[50%] max-h-[90vh] md:h-[60vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-4 md:right-16 mt-4 md:mt-16 text-black hover:text-gray-700 text-xl md:text-2xl font-bold"
                        >
                            ×
                        </button>
                        <h2 className="text-xl md:text-3xl font-bold mb-4 mon">Профиль</h2>
                        <div className="h-auto md:h-[40%] w-full md:w-[80%] mx-auto p-4 md:p-10 flex flex-col md:flex-row">
                            <div className="h-[100px] md:h-[100%] w-full md:w-2/3 mb-4 md:mb-0"></div>
                            <div className="h-auto md:h-full w-full md:w-1/3 flex">
                                <button
                                    onClick={handleLogout}
                                    className="rounded-full border-2 h-8 md:h-10 w-16 md:w-20 bg-red-400 text-base md:text-xl ml-auto"
                                >
                                    Выйти
                                </button>
                            </div>
                        </div>
                        <div className="h-auto md:h-[55%] w-full border-2 border-black rounded-[20px] p-4 md:p-16 flex flex-col md:flex-row relative">
                            <p className="text-xl md:text-3xl font-bold absolute -top-10 md:mt-[-50px] mon">
                                Персональная информация
                            </p>
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <p className="text-gray-400 text-base md:text-xl">Имя:</p>
                                <p className="text-base md:text-xl">{currentUser.full_name}</p>
                                <p className="text-gray-400 text-base md:text-xl mt-2 md:mt-5">Номер телефона:</p>
                                <p className="text-base md:text-xl">{currentUser.phone_number || "N/A"}</p>
                                <p className="text-gray-400 text-base md:text-xl mt-4 md:mt-10">Телеграм:</p>
                                <p className="text-base md:text-xl">{currentUser.full_name}</p>
                            </div>
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <p className="text-gray-400 text-base md:text-xl">Фамилия:</p>
                                <p className="text-base md:text-xl">{currentUser.full_name}</p>
                                <p className="text-gray-400 text-base md:text-xl mt-2 md:mt-5">Email:</p>
                                <p className="text-base md:text-xl">{currentUser.email}</p>
                                <p className="text-gray-400 text-base md:text-xl mt-4 md:mt-10">Подразделение:</p>
                                <p className="text-base md:text-xl">{currentUser.full_name}</p>
                            </div>
                            <div className="w-full md:w-1/3">
                                <p className="text-gray-400 text-base md:text-xl">Отчество:</p>
                                <p className="text-base md:text-xl">{currentUser.full_name}</p>
                                <p className="text-gray-400 text-base md:text-xl mt-2 md:mt-5">Корп. Email:</p>
                                <p className="text-base md:text-xl">{currentUser.full_name}</p>
                                <p className="text-gray-400 text-base md:text-xl mt-4 md:mt-10">Должность:</p>
                                <p className="text-base md:text-xl">{currentUser.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;