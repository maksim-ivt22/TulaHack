import { useState } from "react";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    // сделай логику ну тут самое главное 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Login data:", { phone, password });
        setShowSuccess(true);

        setTimeout(() => {
            router.push("/welcome");
        }, 2000);
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
            }
        } else {
            setPhone("+7");
        }
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
                    <p className="text-sm text-gray-600\">Перейти на главную</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <div className="bg-white p-6 rounded-[32px] w-full max-w-md">
                <h1 className="text-[24px] font-bold text-gray-800 mb-6 text-center font-mono mon">ПомощьРядом</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="string"
                            placeholder="Номер телефона"
                            value={phone}
                            onChange={handlePhoneChange}
                            className="w-full p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-[#F8F8F8] text-[#999DA6] rounded-[16px] hover:bg-gray-200"
                    >
                        Войти
                    </button>
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => router.push("/register")}
                            className="w-1/2 p-3 text-green-500 rounded-[16px]"
                        >
                            Восстановить пароль
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 p-3 text-green-500 rounded-[16px]"
                        >
                            Регистрация
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;