from django.urls import path
from posts import views

"""
URL patterns for the Post (Recognition Story) app.
Includes list, create, retrieve, update, and delete views.
"""

urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
]
