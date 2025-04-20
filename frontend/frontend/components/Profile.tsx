import { useRouter } from "next/router";
import { User } from "../lib/types";
import { logout } from "../lib/auth";

interface ProfileProps {
    currentUser: User | null;
}

// Интерфейс для заявления
interface Request {
    id: string;
    title: string;
    details: string;
    status: string;
    creatorId: string; 
    volunteerId?: string; 
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
    const router = useRouter();

    // Проверка авторизации
    // if (!currentUser) {
    //     router.push("/login");
    //     return null;
    // }

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    // Фиктивные данные о заявлениях (замените на реальный API-запрос)
    const requests: Request[] = [
        {
            id: "1",
            title: "Помощь с переездом",
            details: "Нужно помочь перенести мебель из квартиры в новую.",
            status: "Принято",
            creatorId: "veteran1",
            volunteerId: "volonter1",
        },
        {
            id: "2",
            title: "Доставка продуктов",
            details: "Купить и доставить продукты пожилому ветерану.",
            status: "В ожидании",
            creatorId: "veteran2",
            volunteerId: undefined,
        },
        {
            id: "3",
            title: "Ремонт техники",
            details: "Починить телевизор в доме ветерана.",
            status: "Принято",
            creatorId: "veteran1",
            volunteerId: "volonter1",
        },
    ];

    const filteredRequests = currentUser.role === "volonter"
        ? requests.filter((request) => request.volunteerId === "volonter1")
        : requests.filter((request) => request.creatorId === "veteran1");

    const handleRequestClick = (requestId: string) => {
        router.push(`/request/${requestId}`); 
    };

    return (
        <section className="pb-32">
            {/* Заголовок страницы */}
            <div className="">
                <h2 className="text-2xl md:text-[36px] font-bold text-center mon bg-[#CDFFB5] py-12 md:py-20">
                    Профиль
                </h2>
            </div>
            <div className="mx-auto py-12 px-4 md:px-24">
                <div className="grid grid-cols-1 gap-4 md:gap-8 mt-5">
                    {/* Карточка профиля */}
                    <div className="bg-white rounded-[32px] shadow-md mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                        {/* Заголовочный блок */}
                        <div className="bg-gray-200 h-[100px] md:h-[150px] rounded-t-[32px] mb-4 flex items-center justify-center">
                            <p className="text-lg md:text-[24px] font-medium text-gray-700 mon">
                                Персональная информация
                            </p>
                        </div>

                        {/* Контент профиля */}
                        <div className="p-4 md:p-5">
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex flex-col sm:flex-row sm:space-x-4">
                                    <div className="w-full sm:w-1/2">
                                        <p className="text-gray-400 text-sm sm:text-base md:text-xl">Имя:</p>
                                        <p className="text-sm sm:text-base md:text-xl">{currentUser.full_name}</p>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <p className="text-gray-400 text-sm sm:text-base md:text-xl">Фамилия:</p>
                                        <p className="text-sm sm:text-base md:text-xl">{currentUser.full_name}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:space-x-4">
                                    <div className="w-full sm:w-1/2">
                                        <p className="text-gray-400 text-sm sm:text-base md:text-xl">Номер телефона:</p>
                                        <p className="text-sm sm:text-base md:text-xl">{currentUser.phone_number || "N/A"}</p>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <p className="text-gray-400 text-sm sm:text-base md:text-xl">Email:</p>
                                        <p className="text-sm sm:text-base md:text-xl">{currentUser.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-5 text-center">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="bg-red-500 w-full text-white px-4 py-2 md:py-3 rounded-[12px] hover:bg-red-600 text-sm sm:text-base md:text-lg"
                                >
                                    Выйти
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Секция портфолио заявлений */}
                    <div className="mt-12">
                        <h3 className="text-xl md:text-2xl font-bold text-center mon mb-8">
                            {currentUser.role === "volonter" ? "Принятые заявления" : "Мои заявления"}
                        </h3>
                        {filteredRequests.length === 0 ? (
                            <p className="text-center text-gray-500 text-sm sm:text-base">
                                У вас пока нет {currentUser.role === "volonter" ? "принятых заявлений" : "поданных заявлений"}.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                {filteredRequests.map((request) => (
                                    <div key={request.id} className="bg-white rounded-[32px] shadow-md">
                                        {/* Заголовочный блок */}
                                        <div className="bg-gray-200 h-[100px] md:h-[150px] rounded-t-[32px] mb-4 flex items-center justify-center">
                                            <p className="text-lg md:text-[24px] font-medium text-gray-700">
                                                {request.title}
                                            </p>
                                        </div>

                                        {/* Контент */}
                                        <div className="p-4 md:p-5">
                                            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 line-clamp-3">
                                                {request.details}
                                            </p>
                                            <div className="text-[#606278] mb-4 bg-[#D6FFE1] py-1 px-3 rounded-[8px] flex items-center justify-center">
                                                <span className="text-xs sm:text-sm md:text-base">{request.status}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRequestClick(request.id)}
                                                className="bg-[#5DBA32] w-full text-white px-4 py-2 md:py-3 rounded-[12px] hover:bg-green-600 text-sm sm:text-base md:text-lg"
                                            >
                                                Подробнее
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;