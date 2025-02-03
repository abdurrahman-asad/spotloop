import os


if os.environ.get("prod"):  # update var name when deployed
    from .prod import *
else:
    from .dev import *
