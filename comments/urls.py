from django.urls import path
from comments import views

"""
URL patterns for the Comment app.
Includes list, create, retrieve, update, and delete views.
"""

urlpatterns = [
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>/', views.CommentDetail.as_view()),
]
