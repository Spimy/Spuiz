from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

ADDITIONAL_USER_FIELDS = (
    ('Profile', {'fields': ('avatar', 'biography')}),
)


class CustomUserAdmin(UserAdmin):
    """ Add extra user fields to default user admin """
    add_fieldsets = UserAdmin.add_fieldsets + ADDITIONAL_USER_FIELDS
    fieldsets = UserAdmin.fieldsets + ADDITIONAL_USER_FIELDS


admin.site.register(get_user_model(), CustomUserAdmin)
