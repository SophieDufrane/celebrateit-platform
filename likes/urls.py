from django.urls import path
from likes import views

"""
URL patterns for the Like app.
Includes list, create, retrieve, and delete views.
"""

urlpatterns = [
    path('likes/', views.LikeList.as_view()),
    path('likes/<int:pk>/', views.LikeDetail.as_view()),
]
