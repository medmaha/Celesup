#Celesup

Celesup is a social media platform that allows celebrities and supporters to connect and interact with each other. It features a variety of tools and features that make it easy for users to share content, follow their favorite celebrities, and stay up-to-date on the latest events and happenings.

## Prerequisites

Before you can start using Celesup, you'll need to have the following software installed on your machine:

-   Node.js 16.17 or higher
-   Python 3.8 or higher

## Installation

To get started with Celesup, follow these steps:

-   Clone the repository from GitHub:

```
    $ git clone https://github.com/medmaha/Celesup.git
    $ cd Celesup
```

### Development Configuration

To configure the development environment for Celesup, follow these steps:

## Backend

-   From the root directory (Celesup):
-   Open a terminal window:
-   Run the following commands

```
    $ cd backend

    # Create a virtual env
    $ python -m venv venv

    # activate the virtual env
    $ venv/scripts/activate.bat

    # install the requirements
    (venv) $ pip install -r requirement.txt

    # migrate to the database
    $ python manage.py migrate

    # run the development server
    $ python manage.py runserver

```

## Frontend

-   From the root directory (Celesup):
-   Open a new terminal window:
-   Run the following commands:

```
    $ cd frontend

    # install the dependencies
    $ npm install

    # start the development server
    $ npm start

```

## Contributors

1. Mahamed Toure (author)

## Usage

To use Celesup, simply visit http://localhost:3000 in your web browser. From there, you can create a new account or log in to an existing account and start interacting with celebrities and supporters.
License

Celesup is licensed under the MIT License. See the LICENSE file for more details.
