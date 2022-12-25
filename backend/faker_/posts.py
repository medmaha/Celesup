import random
from faker import Faker
from users.models import User
from post.models import Post
from PIL import Image

fake = Faker()

i = 0


class FakePosts:
    def __init__(self) -> None:
        self.author = self.get_author()
        self.caption = fake.text()[: random.choice([20, 50, 100])]
        self.excerpt = fake.text()[: random.randrange(50, 350, 50)]

    @property
    def hashtags(self):
        if not fake.boolean():
            return ""
        h = ""
        for _ in range(random.randrange(1, 5)):
            h += " #" + fake.text().split(" ")[0].lower()

        return h

    def get_author(self):
        return random.choice([*User.objects.all()])

    def makeImage(self):
        i = fake.boolean()
        if not i:
            return
        import os

        dirname = "IMAGES_"
        if not os.path.exists(dirname):
            os.mkdir(dirname)

        w = random.randrange(100, 500, 50)
        h = random.randrange(100, 500, 50)

        r = "red"
        g = "green"
        b = "blue"
        y = "yellow"
        p = "pink"

        mode = random.choice([r, g, b, y, p])

        img = Image.new("RGB", (w, h), mode)
        i += 1
        filePath = dirname + f"/pic_{i}.jpg"
        img.save(filePath)

        file = open(filePath, "r")
        file.close()


def createPost(count=100):
    for i in range(count):
        post = FakePosts()
        p = Post(
            caption=post.caption,
            excerpt=post.excerpt,
            hashtags=post.hashtags,
            author=post.author,
        )
        # image = post.makeImage()
        # if image:
        # p.picture = image
        p.save()
