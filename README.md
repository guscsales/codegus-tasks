# Codegus Tasks

Create tasks and milestones. This project is the result of a series of videos from my YouTube channel "Codegus" and uses the best practices and technologies for web development.

Videos: https://www.youtube.com/watch?v=lHdPA-CrGYk&list=PLFRnIPKyoBHh0V6iWjKd3UwDpk5eyndAW

## Installation

```bash
# Clone the repository
git clone https://github.com/guscsales/codegus-tasks.git

# Enter the directory
cd codegus-tasks

# Install dependencies with pnpm
pnpm install
```

## Configuration

Create a `.env` file with the following variable:

```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/database_name"
```

Run the command to create the database tables:

```bash
npx prisma migrate deploy
```

## Available Commands

### Run the development server

```bash
pnpm dev
```
