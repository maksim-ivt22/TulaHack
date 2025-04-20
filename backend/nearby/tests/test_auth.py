from django.urls import reverse
import pytest

class TestAuthAPI:
    register_url = reverse('register')
    login_url = reverse('login')
    
    def test_register_user(self, api_client):
        data = {
            'email': 'new@user.com',
            'full_name': 'New User',
            'phone': '+79991112233',
            'role': 'requester',
            'password': 'testpass123'
        }
        response = api_client.post(self.register_url, data)
        assert response.status_code == 201
        assert 'email' in response.data
        assert response.data['email'] == data['email']

    def test_login_user(self, api_client, create_user, test_password):
        user = create_user(
            email='login@test.com',
            full_name='Login Test'
        )
        data = {
            'email': user.email,
            'password': test_password
        }
        response = api_client.post(self.login_url, data)
        assert response.status_code == 200
        assert 'access' in response.data
        assert 'refresh' in response.data