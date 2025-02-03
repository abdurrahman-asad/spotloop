from django.contrib import admin
from api.models.team import Team, TeamMembership


class TeamMembershipInline(admin.TabularInline):
    model = TeamMembership
    extra = 1


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("name", "get_company_name", "get_members_count")
    list_filter = ("company",)
    search_fields = ("name", "company__name")
    readonly_fields = ("id", "created_on", "updated_on")
    inlines = [TeamMembershipInline]

    def get_company_name(self, obj):
        return obj.company.name

    get_company_name.short_description = "Company"

    def get_members_count(self, obj):
        return obj.members.count()

    get_members_count.short_description = "Members"
