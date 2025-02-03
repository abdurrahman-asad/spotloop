from django.contrib import admin
from api.models.company import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "created_on", "updated_on")
    search_fields = ("name",)
    readonly_fields = ("id", "created_on", "updated_on")
