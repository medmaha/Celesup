import os
import numpy
from PIL import Image


def create_image(width=550, height=480, num_of_images=100):

    # print(relative_path)
    dirname = "IMAGES__"
    # os.mkdir(dir)
    for n in range(num_of_images):
        filename = f"{dirname}/pic_{n}.jpg"
        rgb_array = numpy.random.rand(height, width, 3) * 255
        image = Image.fromarray(rgb_array.astype("uint8")).convert("RGB")
        image.save(filename)


def main():
    create_image()
    return 0


if __name__ == "__main__":
    status = main()
