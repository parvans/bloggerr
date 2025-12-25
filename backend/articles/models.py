from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    body = models.TextField()

    author = models.CharField(max_length=100)
    is_published = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(null=True, blank=True)
    
    image = models.ImageField(
        upload_to="articles/",
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title
