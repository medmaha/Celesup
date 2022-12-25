import random
from faker import Faker
from users.models import User

fake = Faker()


class FakeUsers:
    def __init__(self) -> None:
        self.email = fake.unique.email()
        self.first_name = fake.first_name()
        self.last_name = fake.last_name()
        self.username = fake.unique.user_name()
        self.bio = fake.text()
        self.city = fake.address()
        self.gender = random.choice(["Male", "Female"])
        self.user_type = "Other"
        self.email_privacy = fake.boolean()
        self.password = fake.password()
        self.clean_data()

    def clean_data(self):
        while User.objects.filter(email=self.email).exists():
            self.email = fake.unique.email()
        while User.objects.filter(username=self.username).exists():
            self.username = fake.unique.user_name()


def createUsers(count=10):
    for i in range(count):
        user = FakeUsers()
        u = User(
            email=user.email,
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name,
            biography=user.bio,
            city=user.city,
            gender=user.gender,
            email_privacy=user.email_privacy,
            user_type=user.user_type,
        )
        u.set_password(user.password)
        u.save()
