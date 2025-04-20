import { useState } from "react";
import { useRouter } from "next/router";

const HelpRequestForm: React.FC = () => {
    const router = useRouter();
    const [title, setTitle] = useState(""); // Название помощи
    const [details, setDetails] = useState(""); // Подробности помощи
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");

    // Обработчики изменения полей с очисткой ошибки
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setError("");
    };

    const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetails(e.target.value);
        setError("");
    };

    // Проверка заполненности всех обязательных полей
    const isFormFilled = title.length > 0 && details.length > 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormFilled) {
            setError("Пожалуйста, заполните все поля (название и подробности помощи)");
            return;
        }

        setError("");
        console.log("Help request data:", { title, details });
        setShowSuccess(true);
        setTimeout(() => {
            router.push("/"); // Перенаправление на главную страницу
        }, 2000);
    };

    if (showSuccess) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <div className="bg-white px-4 sm:px-6 rounded-[32px] w-full max-w-xs sm:max-w-sm md:max-w-md text-center py-10 sm:py-15">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Успешно!</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Заявка отправлена, вы будете перенаправлены на главную страницу</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
            <div className="bg-white p-4 sm:p-6 rounded-[32px] w-full max-w-xs sm:max-w-sm md:max-w-md">
                <h1 className="text-lg sm:text-xl md:text-[24px] font-bold mb-4 sm:mb-6 text-center font-mono mon">
                    Подача заявки на помощь
                </h1>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Название помощи"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full p-2 sm:p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                            required
                            aria-label="Название помощи"
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Подробности помощи"
                            value={details}
                            onChange={handleDetailsChange}
                            className="w-full p-2 sm:p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500 h-[100px] sm:h-[150px] text-sm sm:text-base resize-none"
                            required
                            aria-label="Подробности помощи"
                        />
                    </div>
                    {/* Сообщение об ошибке */}
                    {error && (
                        <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>
                    )}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className={`w-full p-2 sm:p-3 rounded-[16px] transition-all duration-300 transform text-sm sm:text-base ${
                                isFormFilled
                                    ? "bg-[#5DBA32] text-white hover:bg-green-600"
                                    : "bg-[#F8F8F8] text-[#999DA6] hover:bg-gray-200"
                            }`}
                            aria-disabled={!isFormFilled}
                        >
                            Подать помощь
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HelpRequestForm;