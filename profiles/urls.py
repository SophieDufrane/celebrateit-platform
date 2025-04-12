from django.urls import path
from profiles import views

urlpatterns = [
    path('user-profiles/', views.UserProfileList.as_view()),
    path('user-profiles/<int:pk>/', views.UserProfileDetail.as_view()),
]