import React, { useState } from "react";

const Money: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<string>(""); // Состояние для суммы
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false); // Состояние для сообщения "Успешно"
  const [error, setError] = useState<string>(""); // Состояние для ошибки

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      setError("Пожалуйста, согласитесь с условиями!");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Пожалуйста, введите корректную сумму!");
      return;
    }
    setError("");
    console.log("Данные формы:", { fullName, email, amount });
    setShowSuccess(true);
    // Сбрасываем форму
    setFullName("");
    setEmail("");
    setAmount("");
    setIsChecked(false);
    // Скрываем сообщение через 2 секунды
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Проверка заполненности суммы
  const isAmountValid = amount.length > 0 && parseFloat(amount) > 0;

  if (showSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white px-4 sm:px-6 rounded-[32px] w-full max-w-xs sm:max-w-sm md:max-w-md text-center py-10 sm:py-15">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Успешно!</h2>
          <p className="text-xs sm:text-sm text-gray-600">Ваша поддержка принята</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="bg-white p-4 sm:p-6 rounded-[32px] w-full max-w-xs sm:max-w-sm md:max-w-md">
        {/* Заголовок */}
        <h2 className="text-lg sm:text-xl md:text-[24px] font-bold mb-4 sm:mb-6 text-center mon">
          Мы очень благодарим вас за поддержку нашей платформы!
        </h2>
        <p className="mb-4 text-sm sm:text-base md:text-[18px] font-medium text-center text-[#999DA6]">
          Ещё текст
        </p>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Поле ФИО */}
          <div>
            <input
              type="text"
              placeholder="ФИО (по желанию)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 sm:p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              aria-label="ФИО"
            />
          </div>

          {/* Поле Email */}
          <div>
            <input
              type="email"
              placeholder="Ваш email (по желанию)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 sm:p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              aria-label="Email"
            />
          </div>

          {/* Поле "Ваша сумма" */}
          <div>
            <input
              type="number"
              placeholder="Ваша сумма"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 sm:p-3 bg-[#F8F8F8] rounded-[16px] text-[#999DA6] focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              aria-label="Сумма"
              min="0"
              step="0.01"
            />
          </div>

          {/* Чекбокс */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="h-4 w-4 sm:h-5 sm:w-5 rounded mr-2 text-green-500 focus:ring-green-500"
            />
            <label className="text-xs sm:text-sm text-[#999DA6]">
              Принимаю договор-оферту и политику конфиденциальности
            </label>
          </div>

          {/* Сообщение об ошибке */}
          {error && (
            <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>
          )}

          {/* Кнопка "Поддержать" */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className={`w-full p-2 sm:p-3 rounded-[16px] transition-all duration-300 transform text-sm sm:text-base ${
                isAmountValid
                  ? "bg-[#5DBA32] text-white hover:bg-green-600"
                  : "bg-[#F8F8F8] text-[#999DA6] hover:bg-gray-200"
              }`}
              aria-disabled={!isAmountValid}
            >
              Поддержать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Money;