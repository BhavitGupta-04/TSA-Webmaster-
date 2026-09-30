from django.db import models


class AIChallenge(models.Model):
    topic = models.CharField(max_length=80)
    title = models.CharField(max_length=120)
    prompt = models.TextField()
    hint = models.TextField()
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['id']
        verbose_name = 'AI field challenge'
        verbose_name_plural = 'AI field challenges'

    def __str__(self):
        return self.title
