# Backend Setup Instructions

## Prerequisites

- Python 3.x

## Complete Setup

To set up the backend environment in one shot, run:

```sh
make oneshot
```

This will execute the following steps:
1. Create a `.env` file with default development values.
2. Create a virtual environment in the `venv` directory.
3. Install all the required dependencies.
4. Apply all the database migrations.
5. Create an admin user (username: admin, password: admin)

## Individual Setup Steps

If you prefer to run each step individually, follow these instructions:

1. **Create .env file:**

   ```sh
   make create-env
   ```

   This will create a `.env` file with default development values.

2. **Create virtual environment:**

   ```sh
   make venv
   ```

   This will create a virtual environment in the `venv` directory.

3. **Install dependencies:**

   ```sh
   make install
   ```

   This will install all the required dependencies.

4. **Run database migrations:**

   ```sh
   make migrate
   ```

   This will apply all the database migrations.

## Additional Commands

- **Make database migrations:**

  ```sh
  make makemigrations
  ```

- **Create a Django superuser:**

  ```sh
  make superuser
  ```
  This creates an admin user with company and team setup.
  Use username: admin and password: admin to login.

- **Clean up virtual environment and cached files:**

  ```sh
  make clean
  ```

## Activating the Virtual Environment

To activate the virtual environment, run the following command in the backend folder:

```sh
source ./venv/bin/activate
```

## Setting Up VSCode for Correct IntelliSense

To ensure correct IntelliSense in VSCode, set the Python interpreter to the virtual environment's Python executable:

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Type `Python: Select Interpreter` and select it.
3. Choose `./backend/venv/bin/python` from the list.

This will configure VSCode to use the virtual environment's Python interpreter, providing accurate IntelliSense and linting.

