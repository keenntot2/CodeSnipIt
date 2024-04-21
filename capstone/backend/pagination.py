from rest_framework.pagination import PageNumberPagination

class LanguageResultsSetPagination(PageNumberPagination):
    page_size = 30
    page_query_param = 'page_size'