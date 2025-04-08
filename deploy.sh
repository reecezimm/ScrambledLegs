#!/bin/bash

# Exit if any command fails
set -e

# Display commands as they're executed
set -x

# Add timestamp to manifest.json for cache busting
TIMESTAMP=$(date +%s)
echo "Adding build timestamp: $TIMESTAMP"
sed -i "s/\${timestamp}/$TIMESTAMP/g" public/manifest.json

# Generate sw-timestamp.js for service worker cache busting
echo "// This file forces service worker reloading" > public/sw-timestamp.js
echo "// Version: $TIMESTAMP" >> public/sw-timestamp.js
echo "const SW_TIMESTAMP = '$TIMESTAMP';" >> public/sw-timestamp.js

# Build the React app
echo "Building the React app..."
npm run build

# Update timestamp in the built manifest.json file
sed -i "s/\${timestamp}/$TIMESTAMP/g" build/manifest.json

# Update the timestamp in the built service worker file
echo "// This file forces service worker reloading" > build/sw-timestamp.js
echo "// Version: $TIMESTAMP" >> build/sw-timestamp.js
echo "const SW_TIMESTAMP = '$TIMESTAMP';" >> build/sw-timestamp.js

# Make sure firebase-messaging-sw.js is at the root level (required for FCM)
echo "Ensuring firebase-messaging-sw.js is properly placed..."

# Create an updated version of firebase-messaging-sw.js with the current timestamp
echo "// Firebase Service Worker for background notifications" > build/firebase-messaging-sw.js
echo "// Version: 1.3.0 - Updated: $(date)" >> build/firebase-messaging-sw.js
echo "// This file must be at the root of the domain to receive push notifications properly" >> build/firebase-messaging-sw.js
echo "" >> build/firebase-messaging-sw.js

# Copy the rest of the file but skip the first 3 lines
tail -n +4 public/firebase-messaging-sw.js >> build/firebase-messaging-sw.js

echo "firebase-messaging-sw.js updated and copied to build directory"

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