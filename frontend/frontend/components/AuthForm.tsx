import { useState } from "react";
import { useRouter } from "next/router";

const AuthForm: React.FC = () => {
    const router = useRouter();
    const [phone, setPhone] = useState("+7");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");

    const toggleStatus = (newStatus: string) => {
        setStatus(newStatus);
        setError("");
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        value = value.replace(/[^0-9+]/g, "");

        if (!value.startsWith("+7")) {
            value = "+7" + value.replace(/\+7/g, "");
        }

        if (value.length > 12) {
            value = value.slice(0, 12);
        }

        if (value.length > 2) {
            const digits = value.slice(2);
            if (/^\d*$/.test(digits)) {
                setPhone(value);
                setError(""); 
            }
        } else {
            setPhone("+7");
        }
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
        setError("");
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
        setError("");
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        setError("");
    };

    const handleAgreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(e.target.checked);
        setError("");
    };

    const isFormFilled =
        phone.length === 12 && 
        firstName.length > 0 &&
        lastName.length > 0 &&
        password.length >= 6 && 
        status !== "" &&
        isAgreed; 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormFilled) {
            setError(
                "Пожалуйста, заполните все поля корректно (пароль должен содержать минимум 6 символов, выберите статус и согласитесь с условиями)"
            );
            return;
        }

        setError("");
        console.log("Registration data:", { phone, firstName, lastName, password, status, isSubscribed, isAgreed });
        setShowSuccess(true);
        setTimeout(() => {
            router.push("/");
        }, 2000);
    };

    if (showSuccess) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center">
                <div className="bg-white px-6 rounded-[32px] w-full max-w-md text-center py-15">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Успешно!</h2>
                    <p className="text-sm text-gray-600">Перейти на главную</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <div className="bg-white p-6 rounded-[32px] w-full max-w-md">
                <h1 className="text-[24px] font-bold mb-6 text-center font-mono mon">ПомощьРядом</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text" // Исправил type="string" на type="text"
                            placeholder="Номер телефона"
                            value={phone}
                            onChange={handlePhoneChange}
                            className="w-full p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            placeholder="Имя"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            className="w-full p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Фамилия"
                            value={lastName}
                            onChange={handleLastNameChange}
                            className="w-full p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Придумайте пароль"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <div className="flex bg-[#F8F8F8] rounded-[16px] p-1 text-black">
                            <div
                                className={`flex-1 p-3 rounded-[12px] text-center cursor-pointer transition-colors duration-300 ${
                                    status === "volonter" ? "bg-[#FFFFFF]" : "bg-transparent"
                                } ${!status && error ? "border-2 border-red-500" : ""}`}
                                onClick={() => toggleStatus("volonter")}
                            >
                                Волонтер
                            </div>
                            <div
                                className={`flex-1 p-3 rounded-[12px] text-center cursor-pointer transition-colors duration-300 ${
                                    status === "veteran" ? "bg-[#FFFFFF]" : "bg-transparent"
                                } ${!status && error ? "border-2 border-red-500" : ""}`}
                                onClick={() => toggleStatus("veteran")}
                            >
                                Ветеран/Родственник
                            </div>
                        </div>
                        {/* Подсказка об обязательности */}
                        <p className="text-xs text-gray-500 mt-1">* Выбор статуса обязателен</p>
                    </div>
                    {/* Сообщение об ошибке */}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className={`w-full p-3 rounded-[16px] transition-all duration-300 transform ${
                                isFormFilled
                                    ? "bg-[#5DBA32] text-white hover:bg-green-600"
                                    : "bg-[#F8F8F8] text-[#999DA6] hover:bg-gray-200"
                            }`}
                            aria-disabled={!isFormFilled}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isSubscribed}
                            onChange={(e) => setIsSubscribed(e.target.checked)}
                            className="custom-checkbox"
                            required
                        />
                        <label className="text-sm text-gray-600 flex items-center">
                            Согласен на обработку персональных данных
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={handleAgreedChange}
                            className="custom-checkbox"
                            required
                        />
                        <label className="text-sm text-gray-600 flex items-center">
                            Согласен с условиями пользовательского соглашения
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;