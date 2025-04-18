from django.urls import path
from tags import views

"""
URL patterns for the Tag app.
Includes list view for all tags.
"""

urlpatterns = [
    path('tags/', views.TagList.as_view()),
]
