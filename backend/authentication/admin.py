from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models.user import User
from api.models.team import TeamMembership


class TeamListFilter(admin.SimpleListFilter):
    title = _("team")
    parameter_name = "teams"

    def lookups(self, request, model_admin):
        teams = set()
        for user in model_admin.model.objects.all():
            for team in user.teams.all():
                teams.add((str(team.id), team.name))
        return sorted(teams, key=lambda x: x[1])

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(teams__id=self.value())
        return queryset


class TeamMembershipInline(admin.TabularInline):
    model = TeamMembership
    extra = 1
    verbose_name = "Team Membership"
    verbose_name_plural = "Team Memberships"


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = (
        "email",
        "username",
        "is_active",
        "is_staff",
        "get_teams",
        "date_joined",
    )
    list_filter = ("is_active", "is_staff", TeamListFilter)
    search_fields = ("email", "username", "teams__name")
    ordering = ("-date_joined",)

    readonly_fields = ("date_joined", "last_login")
    inlines = [TeamMembershipInline]

    def get_teams(self, obj):
        return ", ".join(
            [
                f"{t.name} ({obj.teammembership_set.get(team=t).role})"
                for t in obj.teams.all()
            ]
        )

    get_teams.short_description = "Teams (Role)"

    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "username",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )
