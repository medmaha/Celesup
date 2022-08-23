

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b


def text_add(a, b):
    assert add(a, b) < 5
    return True

print(text_add(1, 2))