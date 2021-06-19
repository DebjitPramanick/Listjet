from django.db import models

# Create your models here.

class ListItem(models.Model):
    title = models.CharField(max_length=150)
    date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.id}--{self.title}"
