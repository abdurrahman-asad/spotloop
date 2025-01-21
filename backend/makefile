.PHONY: help oneshot venv install migrate clean create-env makemigrations

PYTHON = python3
VENV_NAME = venv
VENV_BIN = $(VENV_NAME)/bin
VENV_PYTHON = $(VENV_BIN)/python
ENV_FILE = .env

help:
	@echo "Available commands:"
	@echo "make oneshot   - Complete setup in one shot"
	@echo "make venv      - Create virtual environment"
	@echo "make install   - Install dependencies"
	@echo "make migrate   - Run database migrations"
	@echo "make makemigrations   - Make database migrations"
	@echo "make clean     - Remove virtual environment and cached files"
	@echo "make activate-venv - Activate virtual environment"
	@echo "make create-env - Create base .env file"

oneshot: create-env venv install migrate
	@echo "✨ Setup complete!"

create-env:
	@if [ ! -f $(ENV_FILE) ]; then \
		echo "Creating .env file..."; \
		echo "DEBUG=True" > $(ENV_FILE); \
		echo "SECRET_KEY=django-insecure-development-key-change-this" >> $(ENV_FILE); \
		echo "DATABASE_URL=sqlite:///db.sqlite3" >> $(ENV_FILE); \
		echo "ALLOWED_HOSTS=localhost,127.0.0.1" >> $(ENV_FILE); \
		echo ".env file created with default development values"; \
	else \
		echo ".env file already exists, skipping..."; \
	fi

venv:
	@echo "Creating virtual environment..."
	@$(PYTHON) -m venv $(VENV_NAME)
	@echo "Done!"

install:
	@echo "Installing dependencies..."
	@$(VENV_PYTHON) -m pip install --upgrade pip
	@$(VENV_PYTHON) -m pip install -r requirements.txt
	@echo "Done!"

migrate:
	@echo "Running migrations..."
	@$(VENV_PYTHON) manage.py migrate
	@echo "Done!"

makemigrations:
	@echo "Making migrations..."
	@$(VENV_PYTHON) manage.py makemigrations
	@echo "Done!"

clean:
	@echo "Cleaning up..."
	@rm -rf $(VENV_NAME)
	@find . -type d -name "__pycache__" -exec rm -rf {} +
	@find . -type f -name "*.pyc" -delete
	@echo "Done!"