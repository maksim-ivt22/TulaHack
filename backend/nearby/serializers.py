from rest_framework import serializers
from nearby.models import User, VolunteerProfile, HelpRequest, VolunteerAssignment, KnowledgeArticle, MedicalInstitution, Event
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'phone', 'role', 'is_verified']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            phone=validated_data['phone'],
            role=validated_data['role'],
            password=validated_data['password']
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['full_name'] = user.full_name
        return token

class VolunteerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = VolunteerProfile
        fields = '__all__'

class HelpRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpRequest
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

class VolunteerAssignmentSerializer(serializers.ModelSerializer):
    volunteer = UserSerializer(read_only=True)
    request = HelpRequestSerializer(read_only=True)
    
    class Meta:
        model = VolunteerAssignment
        fields = '__all__'

class KnowledgeArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeArticle
        fields = '__all__'

class MedicalInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalInstitution
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'