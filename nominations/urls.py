from django.urls import path
from nominations import views

urlpatterns = [
    path('nominations/', views.NominationList.as_view()),
    path('nominations/<int:pk>/', views.NominationDetail.as_view()),
]
