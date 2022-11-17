import os
import sqlite3
from cryptography.fernet import Fernet

from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent


class Database:
    """
    A utility module for storing user data for validation process to take place,
    before finally storing the user data into the USER model.
    """

    hash_information = Fernet(
        bytes("smPULPNmPEuDudDdjvCNkKAAi3az7FFxLgNUTsEfLOY==", "utf-8")
    )

    connection = sqlite3.connect(
        os.path.join(BASE_DIR, "api/routes/authentication/register/DUMMYUSERS.db"),
        check_same_thread=False,
    )

    db_query = connection.cursor()

    def __init__(self, table_name=None):
        self.table = table_name

        self.get_table()

    def validate_table_name(func):
        """a designed decorator for verifying table_name
        argument in kwargs param and the self.table attribute
        return none if both are none
        """

        def wrapper(self, *args, **kwargs):
            if not self.table and not kwargs.get("table_name"):
                print("\nprovide a table name\n")
                return

            if kwargs.get("table_name"):
                self.table = kwargs["table_name"]
            return func(self, *args, **kwargs)

        return wrapper

    @validate_table_name
    def get_table(self):
        try:
            with self.connection:
                self.db_query.execute(f""" Select * FROM {self.table}""")
            return True
        except:
            created = self.add_table()
            if created:
                return True

    @validate_table_name
    def add_table(self, **kwargs):
        """Specifically design to create a database table.
        For a temporal record storage of signing up clients,
        with the intention to delete record after validation process.
        """
        self.table = self.table.lower()
        try:
            with self.connection:
                self.db_query.execute(
                    f""" Create Table {self.table} (
                        id INTEGER NOT NULL PRIMARY KEY,
                        email TEXT,
                        username VARCHAR(50),
                        password TEXT,
                        user_type TEXT,
                        code TEXT
                    ) """
                )
            return True
        except:
            return

    @validate_table_name
    def drop_table(self, **kwargs):
        """Drops database table if table_name is valid"""
        try:
            with self.connection:
                self.db_query.execute(f"DROP TABLE {self.table}")
            self.table = None
            return True
        except:
            return

    @validate_table_name
    def add_record(self, **kwargs):
        """Adds a temporally record to the database for validation process, password and email are encrypted"""

        # encrypting client password password
        password = kwargs["password"]
        encrypted_password = self.hash_information.encrypt(password.encode())
        kwargs["password"] = encrypted_password

        # encrypting client email
        email = kwargs["email"]
        encrypted_email = self.hash_information.encrypt(email.encode())
        kwargs["email"] = encrypted_email

        try:
            with self.connection:
                self.db_query.execute(
                    f""" INSERT INTO {self.table} (code) values({kwargs['code']}) """
                )

            code = kwargs["code"]
            del kwargs["code"]

            for column in kwargs:
                with self.connection:
                    self.db_query.execute(
                        f""" UPDATE {self.table} SET {column}=:value WHERE code=:code""",
                        {"value": kwargs[column], "code": code},
                    )
            return True

        except:
            return

    @validate_table_name
    def get_record(self, **kwargs):
        """Gets a single record from the given database table_name with the password and email is encrypted"""
        try:
            with self.connection:
                self.db_query.execute(
                    f""" SELECT * FROM {self.table} WHERE code=:code""",
                    {"code": kwargs["code"]},
                )
                data = self.db_query.fetchone()

                resp = {
                    "email": data[1],
                    "username": data[2],
                    "password": data[3],
                    "user_type": data[4],
                    "code": data[5],
                }
            return resp
        except:
            return

    @validate_table_name
    def delete_record(self, **kwargs):
        "Deletes a single record from the giving db table \n Expecting a (email and code) arguments"
        try:
            with self.connection:
                self.db_query.execute(
                    f""" DELETE FROM {self.table} WHERE  code=:code""",
                    {"code": kwargs["code"]},
                )
            return True
        except:
            return None

    @validate_table_name
    def retrieve_record_for_django(self, **kwargs):
        """GET raw for data submitted by the user. To create a new user model"""
        record = self.get_record(**kwargs)

        if record:
            # decrypting client password
            password = record["password"]
            decrypted_password = self.hash_information.decrypt(password).decode()
            record["password"] = decrypted_password

            # decrypting client address
            email = record["email"]
            decrypted_email = self.hash_information.decrypt(email).decode()
            record["email"] = decrypted_email

            return record

    def create_unique_validation_code(self) -> str:
        """Create a random 7 (seven) digit numbers\n * Returns the stringified version"""
        import random

        return str(random.randrange(1000000, 9000000))
