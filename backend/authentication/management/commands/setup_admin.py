from django.core.management.base import BaseCommand
from django.db import transaction
from authentication.models.user import User
from api.models.company import Company
from api.models.team import Team, TeamRole


class Command(BaseCommand):
    help = "Creates initial superuser with company and team"

    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                # Create superuser
                admin = User.objects.create_superuser(
                    email="admin@example.com", username="admin", password="admin"
                )

                # Create company
                company = Company.objects.create(name="Admin Company")

                # Create team
                team = Team.objects.create(name="Admin Team", company=company)

                # Add user to team with OWNER role using the through model
                team.members.add(admin, through_defaults={"role": TeamRole.OWNER})

                self.stdout.write(
                    self.style.SUCCESS(
                        "Successfully created admin user with company and team"
                    )
                )

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"Failed to create admin setup: {str(e)}")
            )
