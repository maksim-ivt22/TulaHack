# Backend проекта "Поддержка защитника"

## Описание

Backend часть платформы для помощи ветеранам, реализованная на Django REST Framework. Включает систему аутентификации, управление заявками на помощь, профилями пользователей и справочными данными.

## Технологии

- Python 3.10+
- Django 4.2
- Django REST Framework 3.14
- PostgreSQL 14
- SimpleJWT для аутентификации

## Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/maksim-ivt22/TulaHack.git
cd backend
```

## 2. Настройка виртуального окружения

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate    # Windows
```

## 3. Установка зависимостей

```bash
pip install -r requirements.txt
```

## 4. Настройка базы данных

# 1. Установите PostgreSQL

# 2. Создайте файл .env в корне папки backend:

```.env
DB_NAME=nearby_db
DB_USER=nearby_user
DB_PASSWORD=nearby1411
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=secretkey
```

# 3. Создайте БД и пользователя:

```bash
psql -U postgres -c "CREATE USER defender_user WITH PASSWORD 'your_strong_password';"
psql -U postgres -c "CREATE DATABASE defender_support_db OWNER defender_user;"
```

## 5. Применение миграций

```bash
python manage.py makemigrations
python manage.py migrate
```

## 5. Запуск

```bash
python manage.py runserver
```

## API Endpoints

Аутентификация

- POST /api/auth/register/ - Регистрация

- POST /api/auth/login/ - Вход (получение JWT)

- GET /api/profile/ - Профиль пользователя

Запросы на помощь

- GET /api/help-requests/ - Список заявок

- POST /api/help-requests/ - Создание заявки

- GET /api/help-requests/<uuid>/ - Детали заявки

Волонтеры

- GET /api/assignments/ - Назначения волонтеров

- POST /api/assignments/ - Создание назначения

Справочные данные

- GET /api/knowledge-base/ - База знаний

- GET /api/medical-institutions/ - Мед. учреждения

- GET /api/events/ - Мероприятия

## Команда

| ФИО                                 | Роль                 |
| ----------------------------------- | -------------------- |
| Иванов Максим Максимович            | Backend-разработчик  |
| Голиков Александр Алексеевич        | Frontend-разработчик |
| Ефимова Валерия Афанасьевна         | Дизайнер             |
| Черноградская Александра Семеновна  | Тимлид               |
| Ядрихинский Александр Александрович | Менеджер             |
