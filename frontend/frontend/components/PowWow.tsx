import { useRouter } from "next/router";

const PowWow: React.FC = () => {
    const router = useRouter();

    // Список чатов с их названиями и ссылками на Telegram
    const chats = [
        {
            title: "Чат для волонтёров",
            telegramLink: "https://t.me/volunteers_chat",
        },
        {
            title: "Чат для семей ветеранов",
            telegramLink: "https://t.me/veteran_families_chat",
        },
        {
            title: "Чат для участников СВО",
            telegramLink: "https://t.me/participants_chat",
        },
    ];

    // Функция для перенаправления на Telegram
    const handleJoinChat = (telegramLink: string) => {
        window.location.href = telegramLink;
    };

    return (
        
        <section className="pb-42">
            {/* Pow-Wow Name */}
            <div className="">
                <h2 className="text-2xl md:text-[36px] font-bold text-center mon bg-[#CDFFB5] py-12 md:py-20">Обсуждения</h2>
            </div>
            <div className="mx-auto py-12 px-4 md:px-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 mt-18">
                    {chats.map((chat, index) => (
                        <div key={index} className="bg-white rounded-[32px]">

                            {/* Заголовочный блок (без изображения, просто цветной фон) */}
                            <div className="bg-gray-200 h-[100px] md:h-[150px] rounded-t-[32px] mb-4 flex items-center justify-center">
                                <p className="text-lg md:text-[24px] font-medium text-gray-700">
                                    {chat.title}
                                </p>
                            </div>

                            {/* Контент */}
                            <div className="p-4 md:p-5 text-center">
                                <button
                                    type="button"
                                    onClick={() => handleJoinChat(chat.telegramLink)}
                                    className="bg-[#5DBA32] w-full text-white px-4 py-2 md:py-3 rounded-[12px] hover:bg-green-600 text-sm sm:text-base md:text-lg"
                                >
                                    Вступить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PowWow;