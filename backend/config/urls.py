from django.contrib import admin
from django.urls import include, path, re_path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('learning_api.urls')),
    re_path(r'^(?!api/|admin/)(?P<asset_path>.*)$', views.frontend, name='frontend'),
]
