import pytest
from django.urls import reverse
from nearby.models import HelpRequest

class TestHelpRequestAPI:
    def test_create_help_request(self, auth_client):
        client = auth_client()
        url = reverse('help-request-list')
        data = {
            'type': 'material',
            'description': 'Need food supplies',
            'urgency_level': 'high',
            'location': 'Yakutsk'
        }
        response = client.post(url, data)
        assert response.status_code == 201
        assert HelpRequest.objects.count() == 1
        assert HelpRequest.objects.get().description == data['description']

    def test_get_help_requests(self, auth_client):
        client = auth_client()
        url = reverse('help-request-list')
        response = client.get(url)
        assert response.status_code == 200
        assert isinstance(response.data, list)