import React from "react";

const About: React.FC = () => {
  return (
    <div className="h-[80vh]">
      <div className="">
        <h2 className="text-2xl md:text-[36px] font-bold text-center mon bg-[#CDFFB5] py-12 md:py-20">
        О платформе
        </h2>
      </div>
      <section className="py-5 px-4 md:px-24">
        <div className="bg-white p-4 sm:p-6 rounded-[32px] mx-auto w-full max-w-[90%] sm:max-w-[80%] md:max-w-[40%]">
            {/* Заголовочный блок с иконкой */}
            <div className="flex justify-between items-start mb-4">
            <h1 className="text-base sm:text-lg md:text-[24px] font-medium mon">
                О платформе
            </h1>
            {/* Место для иконки */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {/* Здесь можно добавить иконку, например, через <img> или SVG */}
                <span className="text-sm sm:text-base text-gray-500">🌟</span>
            </div>
            </div>

            {/* Контент */}
            <div className="text-sm sm:text-base">
            <p className="mb-2 text-xs sm:text-sm md:text-base flex">
                ПомощьРядом - это цифровая платформа поддержки ветеранов и их семей через силу человеческой связи
            </p>
            <p className="mb-2 text-xs sm:text-sm md:text-base">
            Ветераны, участники спецопераций и их семьи часто сталкиваются с тяжелыми жизненными проблемами, для которых либо вовсе нет централизованных решений, либо существующие способы получения помощи слишком медленные, запутанные или "невидимые" для нуждающихся
            </p>
            <p className="mb-2 text-xs sm:text-sm md:text-base">
            Платформа для подачи и обработки заявок на помощь, автоматического подбора волонтёров и создания сообщества доверия и участия.
            </p>
            <p className="mb-4 text-xs sm:text-sm md:text-base">
            Мы соединяем тех, кто может помочь — с теми, кому это нужно
            </p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;