from django.db import models
from rest_framework import serializers
from nearby.models import User, VolunteerProfile, HelpRequest, VolunteerAssignment, KnowledgeArticle, MedicalInstitution, Event
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
import re
from nearby.models import User


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'phone', 'role', 'is_verified', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'required': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    phone = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        phone = attrs.get('phone', '').strip()
        password = attrs.get('password', '').strip()
        
        # Нормализация телефона
        phone = re.sub(r'[^\d]', '', phone)
        
        # Используем filter().first() вместо get()
        user = User.objects.filter(phone=phone).first()
        
        if not user:
            raise serializers.ValidationError({
                "non_field_errors": ["Пользователь с таким телефоном не найден"]
            })
            
        if not user.check_password(password):
            raise serializers.ValidationError({
                "non_field_errors": ["Неверный пароль"]
            })
            
        if not user.is_active:
            raise serializers.ValidationError({
                "non_field_errors": ["Аккаунт неактивен"]
            })

        refresh = self.get_token(user)
        
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }
# Остальные сериализаторы должны быть после UserSerializer
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