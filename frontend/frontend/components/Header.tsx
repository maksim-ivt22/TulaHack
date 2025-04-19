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

    const handleDashboardClick = () => {
        router.push("/dashboard");
    };

    const handleProfileClick = () => {
        if (currentUser) {
            setIsModalOpen(true);
        } else {
            console.warn("Cannot open profile: user not authenticated");
        }
    };

    const handleMailClick = () => {
        if (currentUser && currentUser.role === "admin") {
            router.push("/mail");
        } else {
            console.warn("Only admins can access Mail");
        }
    };

    const handleWelClick = () => {
        router.push("/welcome");
    };

    const handleLogout = () => {
        if (currentUser) {
            logout();
            router.push("/");
        } else {
            console.warn("Cannot logout: user not authenticated");
        }
    };

    const handleLoginClick = () => {
        router.push("/"); // Перенаправляем на страницу входа
    };

    const handleRegisterClick = () => {
        router.push("/register"); // Предполагаем, что есть страница регистрации
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <header className="text-black p-4">
            <div className="container mx-auto flex items-center">
            <div onClick={handleWelClick} className="cursor-pointer">
                <span className="text-[24px] font-bold mon">ПомощьРядом</span>
            </div>

                {/* Показываем кнопки только для авторизованных пользователей */}
                {currentUser && (
                    <>
                        {currentUser.role === "admin" && (
                            <button onClick={handleMailClick} className="p-2 rounded text-xl ml-16">
                                Создать аккаунт сотрудника
                            </button>
                        )}
                        <button onClick={handleDashboardClick} className="p-2 rounded text-xl ml-16">
                            Список сотрудника
                        </button>
                    </>
                )}

                <div className="space-x-4 ml-auto flex">
                    {/* Если пользователь авторизован, показываем "Учетная запись" */}
                    {currentUser ? (
                        <button onClick={handleProfileClick} className="h-[40px] w-[180px] text-xl">
                            Учетная запись
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleLoginClick}
                                className="h-[40px] w-[120px] text-[18px] text-[#5DBA32] rounded"
                            >
                                Вход
                            </button>
                            <button
                                onClick={handleRegisterClick}
                                className="h-[40px] w-[120px] text-[18px] bg-[#5DBA32] text-white rounded-[12]"
                            >
                                Регистрация
                            </button>
                        </>
                    )}
                </div>
            </div>

            {isModalOpen && currentUser && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white p-20 rounded-[40] shadow-lg w-[50%] relative h-[60vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-16 mt-16 text-black hover:text-gray-700 text-2xl font-bold"
                        >
                            ×
                        </button>
                        <h2 className="text-3xl font-bold mb-4">Профиль</h2>
                        <div className="h-[40%] w-[80%] mx-auto p-10 flex">
                            <div className="h-[100%] w-2/3"></div>
                            <div className="h-full w-1/3 flex">
                                <button
                                    onClick={handleLogout}
                                    className="rounded-full border-2 h-10 w-20 bg-red-400 text-xl ml-auto mt-auto"
                                >
                                    Выйти
                                </button>
                            </div>
                        </div>
                        <div className="h-[55%] w-full border-2 border-black rounded-[20] p-16 flex">
                            <p className="text-3xl font-bold absolute mt-[-50px]">Персональная информация</p>
                            <div className="h-full w-1/3">
                                <p className="text-gray-400 text-xl">Имя:</p>
                                <p className="text-xl">{currentUser.full_name}</p>
                                <p className="text-gray-400 text-xl mt-5">Номер телефона:</p>
                                <p className="text-xl">{currentUser.phone_number || "N/A"}</p>
                                <p className="text-gray-400 text-xl mt-10">Телеграм:</p>
                                <p className="text-xl">{currentUser.full_name}</p>
                            </div>
                            <div className="h-full w-1/3">
                                <p className="text-gray-400 text-xl">Фамилия:</p>
                                <p className="text-xl">{currentUser.full_name}</p>
                                <p className="text-gray-400 text-xl mt-5">Email:</p>
                                <p className="text-xl">{currentUser.email}</p>
                                <p className="text-gray-400 text-xl mt-10">Подразделение:</p>
                                <p className="text-xl">{currentUser.full_name}</p>
                            </div>
                            <div className="h-full w-1/3">
                                <p className="text-gray-400 text-xl">Отчество:</p>
                                <p className="text-xl">{currentUser.full_name}</p>
                                <p className="text-gray-400 text-xl mt-5">Корп. Email:</p>
                                <p className="text-xl">{currentUser.full_name}</p>
                                <p className="text-gray-400 text-xl mt-10">Должность:</p>
                                <p className="text-xl">{currentUser.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;