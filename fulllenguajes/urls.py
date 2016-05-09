from django.conf.urls import url, include
from rest_framework import routers
from .views import LenguajeViewSet
from .views import index

router = routers.SimpleRouter()
router.register(r'Lenguaje', LenguajeViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^$', index )
]