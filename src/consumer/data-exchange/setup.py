# coding: utf-8

from setuptools import setup, find_packages

NAME = "swagger_server"
VERSION = "4.0.0"
# To install the library, run the following
#
# python setup.py install
#
# prerequisite: setuptools
# http://pypi.python.org/pypi/setuptools

REQUIRES = ["connexion"]

setup(
    name=NAME,
    version=VERSION,
    description="CADDE v4 Specification 利用者 データ交換I/F",
    author_email="",
    url="",
    keywords=["Swagger", "CADDE v4 Specification 利用者 データ交換I/F"],
    install_requires=REQUIRES,
    packages=find_packages(),
    package_data={'': ['swagger/swagger.yaml']},
    include_package_data=True,
    entry_points={
        'console_scripts': ['swagger_server=swagger_server.__main__:main']},
    long_description="""\
    No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
    """
)
