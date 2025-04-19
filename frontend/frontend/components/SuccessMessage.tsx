import { useEffect } from "react";
import { useRouter } from "next/router";

const SuccessMessage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // Перенаправление на главную через 2 секунды
        const timer = setTimeout(() => {
            router.push("/");
        }, 2000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Успешно!</h2>
            <p className="text-sm text-gray-600">Перейти на главную</p>
        </div>
    );
};

export default SuccessMessage;