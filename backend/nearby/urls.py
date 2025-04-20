from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from .views import (
    RegisterView, LoginView, UserProfileView, VolunteerProfileView,
    HelpRequestListCreateView, HelpRequestDetailView, VolunteerAssignmentView,
    KnowledgeArticleListView, MedicalInstitutionListView, EventListView
)

urlpatterns = [
    # Аутентификация
    path('auth/', include([
        path('register/', RegisterView.as_view(), name='register'),
        path('login/', LoginView.as_view(), name='login'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    ])),
    
    # Профили
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('volunteer-profile/', VolunteerProfileView.as_view(), name='volunteer-profile'),
    
    # Запросы помощи
    path('help-requests/', include([
        path('', HelpRequestListCreateView.as_view(), name='help-request-list'),
        path('<uuid:pk>/', HelpRequestDetailView.as_view(), name='help-request-detail'),
    ])),
    
    # Назначения
    path('assignments/', VolunteerAssignmentView.as_view(), name='assignment-list'),
    
    # Дополнительные данные
    path('knowledge-base/', KnowledgeArticleListView.as_view(), name='knowledge-base'),
    path('medical-institutions/', MedicalInstitutionListView.as_view(), name='medical-institutions'),
    path('events/', EventListView.as_view(), name='events'),
]