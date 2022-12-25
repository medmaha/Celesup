import random
from faker import Faker
from post.models import Post
from users.models import User
from comment.models import Comment

fake = Faker()


class FakeComment:
    def __init__(self) -> None:
        self.post = random.choice([*Post.objects.all()])
        self.author = random.choice([*User.objects.all()])
        self.content = fake.text()

    def has_child(self) -> bool:
        if not Comment.objects.all().count() > 1:
            return False
        return fake.boolean()


def createComment(count=100):
    for _ in range(count):
        parent = FakeComment()
        parent_comment = Comment(
            post=parent.post, author=parent.author, content=parent.content
        )

        parent_comment.save()
        if parent.has_child():
            parent = parent
            child = FakeComment()
            child_comment = Comment(
                post=parent.post,
                author=child.author,
                content=child.content,
                parent=parent_comment,
            )
            child_comment.save()
