from django.contrib import admin

from .models import AIChallenge


@admin.register(AIChallenge)
class AIChallengeAdmin(admin.ModelAdmin):
    list_display = ('title', 'topic', 'is_active')
    list_filter = ('is_active', 'topic')
    search_fields = ('title', 'prompt', 'hint')
    list_editable = ('is_active',)
