import { useRouter } from "next/router";
import { User } from "../lib/types";
import { logout } from "../lib/auth";
import { useState } from "react";

interface LendingProps {
    request: { action: string };
    currentUser: User | null;
}

const RequestsForm: React.FC<LendingProps> = ({ currentUser }) => {
    const router = useRouter();
    const requests = [
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
        { date: "10 апреля, 12:00", status: "в радиусе 1км", status2: "в радиусе 1км", action: "Я помогу" },
    ];

    const handleButtonClick = () => {
        // if (currentUser) {
            router.push("/requestm");
        // } else {
        //     router.push("/register");
        // }
    };
    
    return (
        <div className="min-h-screen bg-[#F8F8F8]">
            {/* Requests Name */}
            <div className="">
                <h2 className="text-2xl md:text-[36px] font-bold text-center mon bg-[#CDFFB5] py-12 md:py-20">Заявки</h2>
            </div>

            {/* Requests Filrets */}
            <div className="h-10 md:h-12 px-4 md:px-24 md:mt-10">
                <div className="h-10 md:h-12 w-10 md:w-12 mou"></div>
            </div>

            {/* Requests Section */}
            <section className="py-5 px-4 md:px-24">
                <div className="mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {requests.map((request, index) => (
                            <div key={index} className="bg-white rounded-[32px]">
                                <div className="bg-gray-200 h-[100px] md:h-[212px] rounded-t-[32px] mb-4 flex">
                                    <div className="mt-[8%] ml-[6%] md:h-[15%] w-[20%] h-[25%] md:w-[30%] bg-[#FFD5D5] rounded-[8px] flex">
                                        <p className="text-[#DF2121] text-lg md:text-[18px] my-auto mx-auto">Срочно</p>
                                    </div>
                                </div>
                                <div className="p-4 md:p-5 text-base md:text-[18px]">
                                    <p className="mb-2 text-lg md:text-[24px] font-medium">Помощь с переездом</p>
                                    <p className="mb-2">{request.date}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <div className="text-[#606278] mb-4 bg-[#D6FFE1] py-1 px-3 rounded-[8px] flex items-center">
                                            <div className="h-4 w-4 md:h-5 md:w-5 my-auto rounded-full bg-gray-200 mr-2"></div>
                                            <span>{request.status}</span>
                                        </div>
                                        <div className="text-[#606278] mb-4 bg-[#D6FFE1] py-1 px-3 rounded-[8px] flex items-center">
                                            <div className="h-4 w-4 md:h-5 md:w-5 my-auto rounded-full bg-gray-200 mr-2"></div>
                                            <span>{request.status2}</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleButtonClick}
                                        className="bg-[#5DBA32] w-full text-white px-4 py-2 md:py-3 rounded-[12px] hover:bg-green-600"
                                    >
                                        {request.action}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RequestsForm;