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
        { date: "10.04.2025", status: "В разрезе темы", action: "Я помогу" },
        { date: "10.04.2025", status: "В разрезе темы", action: "Я помогу" },
        { date: "10.04.2025", status: "В разрезе темы", action: "Я помогу" },
        { date: "10.04.2025", status: "В разрезе темы", action: "Я помогу" },
        { date: "10.04.2025", status: "В разрезе темы", action: "Я помогу" },
        { date: "10.04.2025", status: "В разрезе темы", action: "Я помогу" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header currentUser={currentUser} />

            {/* Hero Section */}
            <section className="py-2 flex">
                <div className="bg-[#D9D9D9] h-[855px] flex items-center w-[50%]">
                    <button className="bg-[#088B64] text-white px-6 py-4 rounded-[16] text-[18px] hover:bg-green-600 mx-auto mt-[50%]">
                        Мне нужна помощь
                    </button>
                </div>
                <div className="bg-[#F5F5F5] h-[855px] flex items-center w-[50%]">
                    <button className="bg-[#088B64] text-white px-6 py-4 rounded-[16px] text-[18px] hover:bg-green-600 mx-auto mt-[50%]">
                        Я помогу
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-48 px-24">
                <div className="mx-auto">
                    <h2 className="text-[36px] font-bold text-center mb-24 mon">На нашей платформе</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white h-[328] rounded-lg shadow-md text-center">
                                <p className="text-[96px] font-bold mb-2">{stat.value}</p>
                                <p className="text-[24px] ">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requests Section */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 mon">Заявки</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {requests.map((request, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="bg-gray-200 h-40 rounded-lg mb-4"></div>
                                <p className="text-gray-600 mb-2">Помощь с переездом</p>
                                <p className="text-gray-600 mb-2">{request.date}</p>
                                <p className="text-gray-600 mb-4">{request.status}</p>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600">
                                    {request.action}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Lending;