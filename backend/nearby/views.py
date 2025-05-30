from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from nearby.models import User, VolunteerProfile, HelpRequest, VolunteerAssignment, KnowledgeArticle, MedicalInstitution, Event
from .serializers import (
    UserSerializer, CustomTokenObtainPairSerializer, VolunteerProfileSerializer,
    HelpRequestSerializer, VolunteerAssignmentSerializer, KnowledgeArticleSerializer,
    MedicalInstitutionSerializer, EventSerializer
)
from rest_framework import serializers, status

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except serializers.ValidationError as e:
            return Response({
                'status': 'error',
                'errors': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class VolunteerProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = VolunteerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.volunteer_profile

class HelpRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = HelpRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == User.Role.VOLUNTEER:
            return HelpRequest.objects.filter(assignments__volunteer=self.request.user)
        return HelpRequest.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HelpRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HelpRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == User.Role.VOLUNTEER:
            return HelpRequest.objects.filter(assignments__volunteer=self.request.user)
        return HelpRequest.objects.filter(user=self.request.user)

class VolunteerAssignmentView(generics.ListCreateAPIView):
    serializer_class = VolunteerAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == User.Role.VOLUNTEER:
            return VolunteerAssignment.objects.filter(volunteer=self.request.user)
        return VolunteerAssignment.objects.filter(request__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(volunteer=self.request.user)

class KnowledgeArticleListView(generics.ListAPIView):
    queryset = KnowledgeArticle.objects.all()
    serializer_class = KnowledgeArticleSerializer
    permission_classes = [permissions.AllowAny]

class MedicalInstitutionListView(generics.ListAPIView):
    queryset = MedicalInstitution.objects.all()
    serializer_class = MedicalInstitutionSerializer
    permission_classes = [permissions.AllowAny]

class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny]