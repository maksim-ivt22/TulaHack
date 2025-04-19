from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
import uuid

class User(AbstractUser):
    class Role(models.TextChoices):
        VOLUNTEER = 'volunteer', 'Волонтер'
        REQUESTER = 'requester', 'Нуждающийся'
        ADMIN = 'admin', 'Администратор'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    role = models.CharField(max_length=10, choices=Role.choices)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name="nearby_user_groups",
        related_query_name="nearby_user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="nearby_user_permissions",
        related_query_name="nearby_user",
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    def __str__(self):
        return f"{self.full_name} ({self.get_role_display()})"

class VolunteerProfile(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        primary_key=True,
        related_name='volunteer_profile',
        limit_choices_to={'role': User.Role.VOLUNTEER}
    )
    skills = models.TextField(blank=True)
    availability = models.CharField(max_length=100, blank=True)
    experience_description = models.TextField(blank=True)
    rating = models.FloatField(default=0.0)
    location = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Профиль волонтера: {self.user.full_name}"

class HelpRequest(models.Model):
    class RequestType(models.TextChoices):
        MATERIAL = 'material', 'Материальная'
        LEGAL = 'legal', 'Юридическая'
        PSYCHOLOGICAL = 'psychological', 'Психологическая'
        DAILY = 'daily', 'Бытовая'

    class UrgencyLevel(models.TextChoices):
        LOW = 'low', 'Низкий'
        MEDIUM = 'medium', 'Средний'
        HIGH = 'high', 'Высокий'

    class Status(models.TextChoices):
        OPEN = 'open', 'Открыта'
        IN_PROGRESS = 'in_progress', 'В работе'
        COMPLETED = 'completed', 'Завершена'
        CANCELLED = 'cancelled', 'Отменена'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='help_requests',
        limit_choices_to={'role': User.Role.REQUESTER}
    )
    type = models.CharField(max_length=15, choices=RequestType.choices)
    description = models.TextField()
    urgency_level = models.CharField(max_length=10, choices=UrgencyLevel.choices)
    location = models.CharField(max_length=100)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.OPEN)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Запрос #{self.id} ({self.get_type_display()})"

class VolunteerAssignment(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Ожидает'
        ACCEPTED = 'accepted', 'Принято'
        DECLINED = 'declined', 'Отклонено'
        COMPLETED = 'completed', 'Завершено'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    volunteer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='assignments',
        limit_choices_to={'role': User.Role.VOLUNTEER}
    )
    request = models.ForeignKey(
        HelpRequest, 
        on_delete=models.CASCADE, 
        related_name='assignments'
    )
    assigned_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=10, 
        choices=Status.choices, 
        default=Status.PENDING
    )

    class Meta:
        unique_together = ('volunteer', 'request')

    def __str__(self):
        return f"Назначение #{self.id} ({self.get_status_display()})"
    
class KnowledgeArticle(models.Model):
    class Category(models.TextChoices):
        LEGAL = 'legal', 'Юридическая'
        MEDICAL = 'medical', 'Медицинская'
        SOCIAL = 'social', 'Социальная'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=10, choices=Category.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class MedicalInstitution(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)
    address = models.CharField(max_length=200)
    contact_info = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150)
    description = models.TextField()
    event_date = models.DateField()
    location = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.title} ({self.event_date})"
