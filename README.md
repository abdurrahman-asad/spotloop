# Spotloop

**Note**: This is a work in progress.

### The Main Idea

Instead of manually doing the same thing over and over again (like updating a spreadsheet, filling out reports, or checking multiple websites), you can teach Spotloop to do it for you. Later down the road, vision based serch can be used to quickly find the elements instead of parsing the DOM.

## How It Works

### 1. **Side Panel Interface**
When you open Spotloop, it appears as a side panel in your browser. This keeps it accessible without taking over your screen, so you can work with it alongside your regular browsing.

### 2. **Create Your Automations**
Building an automation is straightforward:
- Give it a name and description (so you remember what it does)
- Add the steps you want to automate
- For each step, specify the website URL and what action to perform (like clicking a button or entering text)

### 3. **Run and Manage**
Once you've created an automation:
- You can see all your saved automations on the home screen
- Run them with a single click
- Edit them anytime if something changes
- The extension will open the necessary tabs and execute your steps automatically

## Key Features

### Simple Automation Builder
No coding required. The interface guides you through creating automations step by step. You can see exactly what will happen before you run it.

### Step-by-Step Execution
Each automation consists of steps that run in sequence. The extension waits for each step to complete before moving to the next one, ensuring everything happens in the right order.

### Visual Feedback
The interface shows you:
- Which automations you have
- What each automation does
- Real-time status when an automation is running

## What You Can Automate

- **Data Entry**: Fill out forms across multiple websites
- **Reporting**: Update dashboards or tracking sheets
- **Monitoring**: Check websites for changes or updates
- **Multi-step Workflows**: Chain together actions across different pages
- **Routine Tasks**: Anything you find yourself doing repeatedly

## The Technology

### Frontend (The Part You See)
- Built as a modern browser extension that works in Chrome and similar browsers
- Uses a side panel design to stay out of your way
- Features a clean, intuitive interface that's easy to navigate
- Stores your automations locally in your browser, so they're always available


## Project Structure

```
spotloop/
├── frontend/           # Browser extension
│   ├── extension/      # Main extension code
│   ├── shared/         # Shared utilities (the ones that'll be shared between webapp and extension)
│   └── ui/            # Reusable interface components
└── backend/           # Server & API (very basic yet, most of the work has been done on the frontend)
```

## Development Setup

### PNPM Workspace
This project uses **PNPM** as the package manager. PNPM is faster and more efficient than traditional package managers because it saves disk space by linking packages instead of copying them multiple times. All the frontend packages (extension, shared utilities, and UI components) share dependencies through a single workspace, making installations quicker and keeping everything in sync.

### Turborepo
The project is organized with **Turborepo**, which helps manage the different parts of the application (frontend extension and backend) as one connected system. Turborepo makes development faster by:
- Running builds in parallel when possible
- Only rebuilding what actually changed
- Caching build results so you don't repeat work
- Coordinating tasks across the frontend and backend seamlessly

This setup means you can work on the extension and the server at the same time without conflicts, and everything stays organized.

## Future Vision

- Team collaboration (share automations with colleagues)
- More advanced actions and conditions
- Integration with popular tools
- Templates for common tasks


