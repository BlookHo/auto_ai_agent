# Auto AI Agent

AI-powered automotive diagnostic assistant for experts.

## Features

- AI-powered vehicle diagnostics
- Multi-step diagnosis workflow
- Real-time collaboration
- Document management
- Multi-language support

## Prerequisites

- Ruby 3.2.2
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- Yarn

## Getting Started

### 1. Clone the repository

```bash
git clone git@gitlab.com:your-username/auto-ai-agent.git
cd auto-ai-agent
```

### 2. Install dependencies

```bash
# Install Ruby dependencies
bundle install

# Install JavaScript dependencies
yarn install

# Install client dependencies
cd client && yarn install && cd ..
```

### 3. Database Setup

```bash
# Create and setup the database
bin/rails db:create db:migrate db:seed
```

### 4. Environment Variables

Create `.env` file in the root directory:

```
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
REDIS_URL=redis://localhost:6379/1
SECRET_KEY_BASE=generate_with_rails_secret
```

### 5. Start the Application

```bash
# Start Rails server
bin/rails s

# In a new terminal, start the client
cd client && yarn start
```

Visit `http://localhost:3000` in your browser.

## Development

### Running Tests

```bash
# Run Ruby tests
bundle exec rspec

# Run JavaScript tests
cd client && yarn test
```

### Linting

```bash
# Ruby
bundle exec rubocop

# JavaScript
yarn eslint .
```

## Deployment

### Staging

Merge to `develop` branch to deploy to staging.

### Production

Merge to `main` branch to deploy to production.

## CI/CD

This project uses GitLab CI/CD. The pipeline includes:

- Linting (Rubocop, ESLint)
- Testing (RSpec, Jest)
- Security scanning
- Deployment to staging/production

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Merge Request

* Deployment instructions

* ...
