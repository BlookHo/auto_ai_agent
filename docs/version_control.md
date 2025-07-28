# Version Control Strategy

## Recommended: GitLab
- **Why GitLab?**
  - Free private repositories
  - Built-in CI/CD (400 free minutes/month)
  - Integrated container registry
  - Advanced security features
  - 10GB storage (free tier)

## Git Workflow
- **Branching**: Git Flow
  - `main`: Production
  - `develop`: Development
  - `feature/`: New features
  - `bugfix/`: Bug fixes
  - `hotfix/`: Urgent fixes

## Best Practices
1. **Commits**:
   - Use conventional commits
   - Keep commits atomic
   - Reference issues

2. **Security**:
   - No secrets in code
   - Use environment variables
   - Enable branch protection
   - Require code reviews

## Initial Setup
```bash
git init
git remote add origin git@gitlab.com:your-username/auto-ai-agent.git
git checkout -b develop
git add .
git commit -m "chore: initial commit"
git push -u origin develop
```
