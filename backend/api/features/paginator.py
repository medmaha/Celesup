from rest_framework import pagination
from rest_framework.response import Response


class CelesupPaginator(pagination.PageNumberPagination):
    class_name = None
        
    def paginate_queryset(self, queryset, request, view=None):
        for i in queryset:
            self.class_name = str(i.__class__.__name__).lower() + 's_'
            break
            
        return super().paginate_queryset(queryset, request, view)

    def get_paginated_response(self, data):
        if not self.class_name:
            self.class_name = ''

        return Response({
            'links': {
                'next': self.get_next_link(),
                'prev': self.get_previous_link()
            },
            f'{self.class_name}count': self.page.paginator.count,
            'data': data,
        })

