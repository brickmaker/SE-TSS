import datetime
from haystack import indexes
from . import models


class ThreadIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    post = indexes.IntegerField(model_attr='id')

    def get_model(self):
        return models.Thread

    def index_queryset(self, using=None):
        return self.get_model().objects.all()
        
class SectionIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    section = indexes.IntegerField(model_attr='id')

    def get_model(self):
        return models.Section

    def index_queryset(self, using=None):
        return self.get_model().objects.all()