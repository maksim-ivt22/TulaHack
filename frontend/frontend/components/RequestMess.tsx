import { useState } from "react";
import { useRouter } from "next/router";

const RequestMess: React.FC = () => {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const requests = [
        {
            date: "10 апреля, 12:00",
            status: "в радиусе 1км",
            status2: "в радиусе 1км",
            action: "Я помогу",
            information:
                "Надо перенести вещи с дома №2 в дом №1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus veniam autem quod sint doloremque doloribus quis aliquid blanditiis ab maxime nostrum laboriosam facilis perspiciatis exercitationem optio reiciendis laborum, nihil molestiae.",
        },
    ];

    const handleButton2Click = () => {
        router.push("/RequestMess");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
            <div className="bg-white p-4 sm:p-6 rounded-[32px] w-full max-w-[90%] sm:max-w-[80%] md:max-w-[40%]">
                {requests.map((request, index) => (
                    <div key={index} className="bg-white rounded-[32px]">
                        {/* Картинка/Заголовочный блок */}
                        <div className="bg-gray-200 h-[100px] sm:h-[150px] md:h-[212px] rounded-t-[32px] mb-4 flex">
                            <div className="mt-[6%] ml-[4%] sm:mt-[8%] sm:ml-[6%] h-[30%] sm:h-[25%] md:h-[15%] w-[25%] sm:w-[20%] md:w-[30%] bg-[#FFD5D5] rounded-[8px] flex">
                                <p className="text-[#DF2121] text-sm sm:text-base md:text-[18px] my-auto mx-auto">
                                    Срочно
                                </p>
                            </div>
                        </div>

                        {/* Контент */}
                        <div className="p-3 sm:p-4 md:p-5 text-sm sm:text-base">
                            <p className="mb-2 text-base sm:text-lg md:text-[24px] font-medium">
                                Помощь с переездом
                            </p>
                            <p className="mb-2 text-sm sm:text-base md:text-[18px] font-medium">
                                {request.information}
                            </p>
                            <p className="mb-2 text-xs sm:text-sm md:text-base">{request.date}</p>

                            {/* Статусы */}
                            <div className="flex flex-wrap gap-2">
                                <div className="text-[#606278] mb-2 sm:mb-4 bg-[#D6FFE1] py-1 px-2 sm:px-3 rounded-[8px] flex items-center">
                                    <div className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 my-auto rounded-full bg-gray-200 mr-1 sm:mr-2"></div>
                                    <span className="text-xs sm:text-sm md:text-base">{request.status}</span>
                                </div>
                                <div className="text-[#606278] mb-2 sm:mb-4 bg-[#D6FFE1] py-1 px-2 sm:px-3 rounded-[8px] flex items-center">
                                    <div className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 my-auto rounded-full bg-gray-200 mr-1 sm:mr-2"></div>
                                    <span className="text-xs sm:text-sm md:text-base">{request.status2}</span>
                                </div>
                            </div>

                            {/* Кнопка */}
                            <button
                                type="button"
                                onClick={handleButton2Click}
                                className="bg-[#5DBA32] w-full text-white px-3 py-1 sm:px-4 sm:py-2 md:py-3 rounded-[12px] hover:bg-green-600 text-sm sm:text-base md:text-lg"
                            >
                                {request.action}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RequestMess;