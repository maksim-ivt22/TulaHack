import { useRouter } from "next/router";

const Footer = () => {
    const router = useRouter();

    const handleLinkClick = (path: string) => {
        router.push(path);
    };

    const links = [
        { name: "Заявки", path: "/requests" },
        { name: "Обсуждения", path: "/discussions" },
        { name: "Пожертвования", path: "/donations" },
        { name: "О платформе", path: "/about" },
        { name: "База знаний", path: "/knowledge-base" },
    ];

    return (
        <footer className="bg-[#FFFFFF] text-black py-4 md:py-6">
            <div className="px-4 md:px-24 mx-auto flex flex-col 2xl:flex-row justify-between items-start 2xl:items-center space-y-4 2xl:space-y-0">
                {/* Логотип */}
                <div className="text-lg lg:text-[24px] font-bold mon cursor-pointer" onClick={() => router.push("/")}>
                    ПомощьРядом
                </div>

                {/* Ссылки */}
                <div className="flex flex-col 2xl:flex-row space-y-2 2xl:space-y-0 2xl:space-x-4">
                    {links.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleLinkClick(link.path)}
                            className="text-sm md:text-base text-black hover:text-[#9E9E9E]"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Контакты */}
                <div className="flex flex-col 2xl:flex-row space-y-2 2xl:space-y-0 2xl:space-x-4 text-sm 2xl:text-base">
                    <div className="flex items-center space-x-1">
                        <div className="mop md:h-5 md:w-5 h-2 w-2"></div>
                        <a href="mailto:info@pomochryadom.io" className="text-black hover:text-[#9E9E9E] ml-2">
                            info@pomochryadom.io
                        </a>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="moi md:h-5 md:w-5 h-2 w-2"></div>
                        <a href="tel:+79143006162" className="text-black hover:text-[#9E9E9E] ml-2">
                            +7 (914) 300-61-62
                        </a>
                    </div>
                </div>
            </div>

            {/* Копирайт */}
            <div className="container mx-auto text-center mt-4 text-sm md:text-base text-gray-500">
                Все права защищены © 2025 ПомощьРядом
            </div>
        </footer>
    );
};

export default Footer;