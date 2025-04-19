import Header from "./Header";
import { User } from "../lib/types";

interface LendingProps {
    currentUser: User | null;
}

const Lending: React.FC<LendingProps> = ({ currentUser }) => {
    const stats = [
        { value: ">100", label: "Волонтеров" },
        { value: ">100", label: "Заявок" },
        { value: ">100", label: "Получили помощь" },
    ];

    const requests = [
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
    ];

    const question = [
        { questions: "Вопрос" },
        { questions: "Вопрос" },
        { questions: "Вопрос" },
        { questions: "Вопрос" },
    ];

    return (
        <div className="min-h-screen bg-[#F8F8F8]">
            {/* Header */}
            <Header currentUser={currentUser} />

            {/* Hero Section */}
            <section className="py-2 flex flex-col md:flex-row">
                <div className="bg-[#D9D9D9] h-[428px] md:h-[855px] flex items-center w-full md:w-[50%]">
                    <button className="bg-[#088B64] text-white px-4 py-2 md:px-6 md:py-4 rounded-[16px] text-base md:text-[18px] hover:bg-green-600 mx-auto">
                        Мне нужна помощь
                    </button>
                </div>
                <div className="bg-[#F5F5F5] h-[428px] md:h-[855px] flex items-center w-full md:w-[50%]">
                    <button className="bg-[#088B64] text-white px-4 py-2 md:px-6 md:py-4 rounded-[16px] text-base md:text-[18px] hover:bg-green-600 mx-auto">
                        Я помогу
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-4 md:py-48 md:px-24">
                <div className="mx-auto">
                    <h2 className="text-2xl md:text-[36px] font-bold text-center mb-12 md:mb-24 mon">
                        На нашей платформе
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white h-[200px] md:h-[300px] rounded-lg text-center">
                                <p className="text-5xl md:text-[96px] font-bold mb-2 mt-6 md:mt-10">{stat.value}</p>
                                <p className="text-lg md:text-[24px]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requests Section */}
            <section className="py-12 px-4 md:px-24">
                <div className="mx-auto">
                    <h2 className="text-2xl md:text-[36px] font-bold text-center mb-12 md:mb-24 mon">Заявки</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {requests.map((request, index) => (
                            <div key={index} className="bg-white rounded-[32px]">
                                <div className="bg-gray-200 h-[200px] md:h-[312px] rounded-t-[32px] mb-4"></div>
                                <div className="p-4 md:p-5 text-base md:text-[18px]">
                                    <p className="mb-2 text-lg md:text-[24px] font-medium">Помощь с переездом</p>
                                    <p className="mb-2">{request.date}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <p className="text-[#606278] mb-4 bg-[#D6FFE1] py-1 px-3 rounded-[8px] flex items-center">
                                            <div className="h-4 w-4 md:h-5 md:w-5 my-auto rounded-full bg-gray-200 mr-2"></div>
                                            {request.status}
                                        </p>
                                        <p className="text-[#606278] mb-4 bg-[#D6FFE1] py-1 px-3 rounded-[8px] flex items-center">
                                            <div className="h-4 w-4 md:h-5 md:w-5 my-auto rounded-full bg-gray-200 mr-2"></div>
                                            {request.status2}
                                        </p>
                                    </div>
                                    <button className="bg-[#5DBA32] w-full md:w-[45%] text-white px-4 py-2 md:py-3 rounded-[12px] hover:bg-green-600">
                                        {request.action}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex py-12 md:py-24">
                        <button className="bg-[#5DBA32] w-[50%] md:w-[13%] text-white px-4 py-2 md:py-3 text-base md:text-[18px] mx-auto rounded-[12px] hover:bg-green-600">
                            Все заявки
                        </button>
                    </div>
                </div>
            </section>

            {/* Questions Section */}
            <section className="py-12 px-4 md:px-24">
                <div className="mx-auto">
                    <h2 className="text-2xl md:text-[36px] font-bold text-center mb-12 md:mb-24 mon">
                        Часто задаваемые вопросы
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {question.map((question, index) => (
                            <div key={index} className="bg-white rounded-[32px] mt-2">
                                <div className="p-4 md:p-5 text-base md:text-[18px]">
                                    <p className="mb-2 text-lg md:text-[24px] my-auto font-medium">
                                        {question.questions}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Lending;