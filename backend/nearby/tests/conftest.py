import os
import pytest
import django
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

User = get_user_model()

@pytest.fixture(scope='session')
def django_db_setup():
    """Настройка тестовой базы данных"""
    from django.conf import settings
    settings.DATABASES['default'] = {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': ':memory:'
    }

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def test_password():
    return 'strong-test-pass123'

@pytest.fixture
def create_user(db, django_db_setup, test_password):
    def make_user(**kwargs):
        kwargs['password'] = test_password
        return User.objects.create_user(**kwargs)
    return make_user

@pytest.fixture
def auth_client(api_client, create_user, test_password):
    def client(user=None):
        if user is None:
            user = create_user(
                email='test@user.com',
                full_name='Test User',
                role='requester'
            )
        
        api_client.force_authenticate(user=user)
        return api_client
    return client