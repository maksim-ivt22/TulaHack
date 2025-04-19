from django.urls import path
from .views import (
    RegisterView, LoginView, UserProfileView, VolunteerProfileView,
    HelpRequestListCreateView, HelpRequestDetailView, VolunteerAssignmentView,
    KnowledgeArticleListView, MedicalInstitutionListView, EventListView
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('volunteer-profile/', VolunteerProfileView.as_view(), name='volunteer-profile'),
    path('help-requests/', HelpRequestListCreateView.as_view(), name='help-request-list'),
    path('help-requests/<uuid:pk>/', HelpRequestDetailView.as_view(), name='help-request-detail'),
    path('assignments/', VolunteerAssignmentView.as_view(), name='assignment-list'),
    
    # bruh
    path('knowledge-base/', KnowledgeArticleListView.as_view(), name='knowledge-base'),
    path('medical-institutions/', MedicalInstitutionListView.as_view(), name='medical-institutions'),
    path('events/', EventListView.as_view(), name='events'),
]