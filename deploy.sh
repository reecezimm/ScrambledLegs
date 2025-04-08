#!/bin/bash

# Exit if any command fails
set -e

# Display commands as they're executed
set -x

# Build the React app
echo "Building the React app..."
npm run build

# Save the current branch name
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Create a .nojekyll file to prevent Jekyll processing
touch build/.nojekyll

# Copy CNAME file if it exists
if [ -f "CNAME" ]; then
    cp CNAME build/
fi

# Stash any current changes
git stash -u

# Check if gh-pages branch exists
if git rev-parse --verify gh-pages >/dev/null 2>&1; then
    # If it exists, checkout the branch
    git checkout gh-pages
else
    # If it doesn't exist, create it
    git checkout --orphan gh-pages
    git rm -rf .
fi

# Remove all files, preserving .git
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} \;

# Copy the build contents
cp -r build/* .
cp build/.nojekyll .

# Add all files
git add .

# Commit the changes
git commit -m "Deploy: $(date)" || echo "No changes to commit"

# Push to GitHub
git push origin gh-pages

# Go back to the original branch
git checkout $current_branch

# Apply any stashed changes
git stash pop 2>/dev/null || true

echo "Deployment complete! Your site should be available at the GitHub Pages URL."