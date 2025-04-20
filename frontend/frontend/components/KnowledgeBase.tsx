import React from "react";

const KnowledgeBase: React.FC = () => {
  const knowledgeItems = [
    { title: "Доступ к аккаунту", articles: "3 статьи", icon: "🔑" },
    { title: "Настройки профиля", articles: "7 статей", icon: "👤" },
    { title: "Настройки приватности", articles: "5 статей", icon: "🔒" },
    { title: "Личная электронная книжка волонтера", articles: "6 статей", icon: "📚" },
    { title: "Работай как волонтер", articles: "7 статей", icon: "💻" },
    { title: "Что такое волонтерство?", articles: "6 статей", icon: "💡" },
    { title: "Компенсации", articles: "3 статьи", icon: "💰" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Заголовок */}
      <div className="">
        <h2 className="text-2xl md:text-[36px] font-bold text-center mon bg-[#CDFFB5] py-12 md:py-20">
          Волонтерам
        </h2>
      </div>

      {/* Секция базы знаний */}
      <section className="py-5 px-4 md:px-24">
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {knowledgeItems.map((item, index) => (
              <div key={index} className="bg-white rounded-[32px]">
                {/* Иконка */}
                <div className="bg-gray-200 h-[100px] md:h-[212px] rounded-t-[32px] mb-4 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl">{item.icon}</span>
                </div>
                {/* Контент */}
                <div className="p-4 md:p-5 text-base md:text-[18px]">
                  <p className="mb-2 text-lg md:text-[24px] font-medium">{item.title}</p>
                  <p className="mb-2 text-[#606278]">{item.articles}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KnowledgeBase;