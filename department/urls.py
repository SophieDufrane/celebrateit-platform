from django.urls import path
from department import views

"""
URL patterns for the Department app.
Includes a list view for all departments.
"""

urlpatterns = [
    path('department/', views.DepartmentList.as_view()),
]
