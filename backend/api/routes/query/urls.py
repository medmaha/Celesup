from .search_query import query
from django.urls import path


query_url_patterns = [
    path('search_query', query)
]