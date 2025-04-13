from django.urls import path
from department import views

urlpatterns = [
    path('department/', views.DepartmentList.as_view()),
]