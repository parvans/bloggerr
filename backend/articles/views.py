from django.shortcuts import render
from rest_framework import generics, filters
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.

class ArticleListAPIView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'body', 'author']
    parser_classes = [MultiPartParser, FormParser]
    def get_queryset(self):
        if self.request.method == 'GET':
            return Article.objects.order_by("-published_at")
        
        return Article.objects.all()

        
    
class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializer
    parser_classes = [MultiPartParser, FormParser]
    lookup_field = "slug"
    

    def get_queryset(self):
        if self.request.method == 'GET':
            return Article.objects
        
        return Article.objects.all()