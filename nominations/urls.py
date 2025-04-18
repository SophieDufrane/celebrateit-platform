from django.urls import path
from nominations import views

"""
URL patterns for the Nomination app.
Includes list, create, retrieve, update, and delete views.
"""

urlpatterns = [
    path('nominations/', views.NominationList.as_view()),
    path('nominations/<int:pk>/', views.NominationDetail.as_view()),
]
