import pytest
from django.urls import reverse
from nearby.models import VolunteerProfile, VolunteerAssignment

class TestVolunteerAPI:
    def test_create_volunteer_profile(self, auth_client, create_user):
        user = create_user(role='volunteer')
        client = auth_client(user=user)
        url = reverse('volunteer-profile')
        data = {
            'skills': 'First aid, counseling',
            'availability': 'weekends',
            'location': 'Yakutsk'
        }
        response = client.post(url, data)
        assert response.status_code == 201
        assert VolunteerProfile.objects.filter(user=user).exists()

    def test_assign_volunteer(self, auth_client, create_user):
        requester = create_user(role='requester')
        volunteer = create_user(role='volunteer')
        
        # Create request as requester
        client = auth_client(user=requester)
        request_data = {
            'type': 'psychological',
            'description': 'Need counseling',
            'urgency_level': 'medium'
        }
        request_response = client.post(reverse('help-request-list'), request_data)
        request_id = request_response.data['id']
        
        # Assign volunteer as admin
        admin = create_user(role='admin')
        client = auth_client(user=admin)
        assign_data = {
            'volunteer': volunteer.id,
            'request': request_id,
            'status': 'pending'
        }
        response = client.post(reverse('assignment-list'), assign_data)
        assert response.status_code == 201
        assert VolunteerAssignment.objects.count() == 1