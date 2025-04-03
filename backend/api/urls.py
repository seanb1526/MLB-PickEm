from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TournamentViewSet, GameViewSet, PickViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r'tournaments', TournamentViewSet)
router.register(r'games', GameViewSet)
router.register(r'picks', PickViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 