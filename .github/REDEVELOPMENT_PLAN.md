# Redevelopment: Migrate from Google Drive + Express/React to GitHub Markdown CMS

**Issue Status:** Open  
**Created:** 2024  
**Priority:** High  
**Labels:** enhancement, migration  

---

## Summary
Migrate Book of Gloop from a full-stack Node.js/Express + React application with Google Drive storage to a simplified **two-repository markdown CMS architecture** using Next.js and GitHub.

**Current State:**
- Full-stack app with Express backend and React frontend
- Recipes stored as JSON files in Google Drive
- Google OAuth 2.0 authentication
- Hosted on Railway
- ~1000+ lines of code across 50+ files

**Target State:**
- Public Next.js frontend app (static site with server-side rendering)
- Private GitHub repository for markdown recipe storage
- GitHub OAuth via NextAuth.js
- Hosted on Vercel (free tier)
- ~200-300 lines of code

---

## Goals

### Primary Goals
- [ ] Eliminate Railway hosting dependency
- [ ] Simplify codebase by ~70-80%
- [ ] Maintain all existing functionality (view, create, edit, delete recipes)
- [ ] **Maintain authentication requirement (users must be authenticated to see data)**
- [ ] Preserve all existing recipe data

### Secondary Goals
- [ ] Add version history for recipes (via Git)
- [ ] Enable collaboration via pull requests
- [ ] Improve SEO with server-side rendering
- [ ] Reduce dependencies from 50+ to ~10-15

---

## Architecture

### Two-Repository Model

```
book-of-gloop-app          (PUBLIC - Next.js frontend)
   |
   +-- pages/
   |   +-- index.js           # Recipe list
   |   +-- recipes/
   |   |   +-- [slug].js      # Single recipe view
   |   +-- admin/
   |   |   +-- new.js         # Create new recipe
   |   |   +-- edit/
   |   |       +-- [slug].js  # Edit existing recipe
   |   +-- api/
   |       +-- auth/          # NextAuth.js
   |       |   +-- [...nextauth].js
   |       +-- recipes/       # Recipe API routes
   |           +-- [...slug].js
   |
   +-- components/
   |   +-- Recipe.js
   |   +-- RecipeList.js
   |   +-- RecipeForm.js
   |   +-- NavBar.js
   |
   +-- lib/
   |   +-- github-api.js      # GitHub API client
   |   +-- markdown-utils.js  # Markdown helpers
   |
   +-- styles/
   |   +-- globals.css
   |
   +-- package.json
   +-- vercel.json

book-of-gloop-data         (PRIVATE - Recipe storage)
   |
   +-- recipes/
   |   +-- chocolate-cake.md
   |   +-- beef-stew.md
   |   +-- ...
   |
   +-- images/
   |   +-- chocolate-cake.jpg
   |   +-- ...
   |
   +-- README.md
```

### Data Flow

```
User -> Next.js App (Public) -> GitHub OAuth -> GitHub API -> Private Data Repo
                                    |
                              Access Token (server-side only)
                                    |
                              Fetch/Commit Recipes
```

**Key Security Note:** Access tokens are used **server-side only** and are never exposed to the client browser. This ensures that users must be authenticated to see any recipe data, matching the security requirement of the current Google Drive setup.

---

## Migration Plan

### Phase 1: Setup & Preparation (1-2 days)
- [ ] Create new GitHub repository: `book-of-gloop-app` (public)
- [ ] Create new GitHub repository: `book-of-gloop-data` (private)
- [ ] Set up Next.js project in `book-of-gloop-app`
- [ ] Configure NextAuth.js with GitHub provider
- [ ] Create GitHub OAuth app for authentication
- [ ] Set up Vercel project and connect to `book-of-gloop-app`
- [ ] Configure environment variables in Vercel:
  - `GITHUB_ID` - GitHub OAuth client ID
  - `GITHUB_SECRET` - GitHub OAuth client secret
  - `DATA_REPO` - Private data repository (e.g., "Ahhj/book-of-gloop-data")
  - `NEXTAUTH_SECRET` - NextAuth.js secret
  - `NEXTAUTH_URL` - App URL (e.g., "https://book-of-gloop.vercel.app")

### Phase 2: Core App Development (2-3 days)
- [ ] Implement base Next.js pages:
  - [ ] Home page with recipe list
  - [ ] Single recipe page
  - [ ] Navigation
- [ ] Create GitHub API client (`lib/github-api.js`):
  - [ ] `getRecipes()` - List all recipes from private repo
  - [ ] `getRecipe(slug)` - Get single recipe content
  - [ ] `createRecipe(filename, content)` - Create new recipe
  - [ ] `updateRecipe(slug, content, sha)` - Update existing recipe
  - [ ] `deleteRecipe(slug, sha)` - Delete recipe
- [ ] Implement API routes:
  - [ ] `pages/api/recipes/[...slug].js` - CRUD operations
  - [ ] `pages/api/auth/[...nextauth].js` - Authentication
- [ ] Add authentication middleware to protect all recipe routes
- [ ] Implement server-side rendering for recipe pages

### Phase 3: Recipe Display (1 day)
- [ ] Create `Recipe.js` component to render markdown recipes
- [ ] Parse frontmatter (title, tags, serves, duration, etc.)
- [ ] Render ingredients and steps as markdown
- [ ] Add styling for recipe display
- [ ] Implement recipe list with search/filter

### Phase 4: Recipe Editing (1-2 days)
- [ ] Create admin interface:
  - [ ] `pages/admin/new.js` - New recipe form
  - [ ] `pages/admin/edit/[slug].js` - Edit existing recipe
- [ ] Choose and integrate markdown editor:
  - [ ] Option: `react-simplemde-editor` (simple)
  - [ ] Option: `@uiw/react-md-editor` (richer features)
  - [ ] Option: Custom form-based editor (user-friendly)
- [ ] Implement image upload functionality
- [ ] Add validation for recipe metadata

### Phase 5: Data Migration (1 day)
- [ ] Export all recipes from Google Drive as JSON
- [ ] Create migration script to convert JSON to markdown format
- [ ] Map existing fields to new markdown frontmatter:
    ```markdown
    ---
    title: "Chocolate Cake"
    tags: [dessert, chocolate]
    serves: 8
    duration:
      prep: "20 minutes"
      cook: "40 minutes"
    image: "/images/chocolate-cake.jpg"
    ---
    
    ## Ingredients
    
    - 200g flour
    - 100g sugar
    
    ## Steps
    
    1. Mix ingredients
    2. Bake at 180C
    ```
- [ ] Handle special cases:
  - [ ] Recipes with array-based ingredients/steps (convert to markdown lists)
  - [ ] Recipes with images (download and upload to new repo)
  - [ ] Recipes with missing fields
- [ ] Commit all migrated recipes to `book-of-gloop-data`
- [ ] Verify data integrity

### Phase 6: Testing & Polish (1-2 days)
- [ ] Test all CRUD operations:
  - [ ] Create recipe
  - [ ] Read recipe
  - [ ] Update recipe
  - [ ] Delete recipe
- [ ] Test authentication flow:
  - [ ] Login/logout
  - [ ] **Unauthenticated access blocking**
  - [ ] Session persistence
- [ ] Test on mobile devices
- [ ] Add error handling and user feedback
- [ ] Add loading states
- [ ] Implement 404 pages

### Phase 7: Deployment & Cutover (1 day)
- [ ] Deploy app to Vercel
- [ ] Test production deployment
- [ ] Set up custom domain (if desired)
- [ ] Configure GitHub collaborators for private data repo
- [ ] Document new contribution workflow
- [ ] Archive old Railway deployment
- [ ] Update README with new setup instructions

---

## Technical Specifications

### Recipe Markdown Format

All recipes will be stored as markdown files with YAML frontmatter:

```markdown
---
title: "Recipe Title"
tags:
  - tag1
  - tag2
serves: 4
duration:
  prep: "15 minutes"
  cook: "30 minutes"
image: "/images/recipe-image.jpg"
remarks: "Optional notes about the recipe"
intro: "Optional introduction"
---

## Ingredients

- 200g flour
- 100g sugar
- 2 eggs

## Steps

1. Preheat oven to 180C
2. Mix dry ingredients
3. Add wet ingredients
4. Bake for 30 minutes
```

### File Structure in Data Repo

```
book-of-gloop-data/
+-- recipes/
|   +-- chocolate-cake.md
|   +-- beef-stew.md
|   +-- ...
+-- images/
|   +-- chocolate-cake.jpg
|   +-- ...
+-- README.md
```

### Authentication

- **Provider:** GitHub OAuth via NextAuth.js
- **Access Control:** Users must have access to the private data repository
- **Session Management:** JWT tokens stored in HTTP-only cookies
- **Token Usage:** Server-side only (never exposed to client)
- **Security:** All recipe API endpoints require authentication

### API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/recipes` | List all recipes | Yes |
| GET | `/api/recipes/{slug}` | Get single recipe | Yes |
| POST | `/api/recipes` | Create new recipe | Yes |
| PUT | `/api/recipes/{slug}` | Update recipe | Yes |
| DELETE | `/api/recipes/{slug}` | Delete recipe | Yes |

### Dependencies

**Frontend (book-of-gloop-app):**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next-auth": "^5.0.0-beta",
    "@octokit/rest": "^20.0.0",
    "gray-matter": "^4.0.3",
    "react-markdown": "^9.0.1",
    "react-simplemde-editor": "^5.2.0",
    "styled-components": "^6.0.0"
  }
}
```

**No backend dependencies needed** - everything runs in Next.js API routes.

---

## Required GitHub Setup

### 1. OAuth App
- Go to: https://github.com/settings/developers
- Click "New OAuth App"
- **Application name:** Book of Gloop
- **Homepage URL:** `https://book-of-gloop.vercel.app` (or your custom domain)
- **Authorization callback URL:** `https://book-of-gloop.vercel.app/api/auth/callback/github`
- Copy **Client ID** and **Client Secret** to Vercel environment variables

### 2. Private Data Repository
- Create new repository: `book-of-gloop-data`
- Set visibility to **Private**
- Add collaborators who should have access to recipes

### 3. Personal Access Token (Optional - for server-side operations)
- Go to: https://github.com/settings/tokens
- Generate new token with `repo` scope
- Add to Vercel environment variables as `GITHUB_PAT` (for fallback)

---

## Rollback Plan

If migration fails or issues arise:
1. Keep Railway deployment running until new app is verified
2. Maintain Google Drive data until migration is complete
3. Test new app thoroughly before DNS cutover
4. Can revert by pointing DNS back to Railway

---

## Success Criteria

- [ ] All existing recipes are migrated with data integrity
- [ ] All existing functionality is preserved:
  - [ ] View recipe list
  - [ ] View single recipe
  - [ ] Search/filter recipes
  - [ ] Create new recipe
  - [ ] Edit existing recipe
  - [ ] Delete recipe
  - [ ] Upload images
- [ ] **Users must authenticate to access any recipe data**
- [ ] App is hosted on Vercel (not Railway)
- [ ] Codebase is significantly simplified
- [ ] New version history feature works (via Git)

---

## Estimated Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Setup | 1-2 days | Not Started |
| Phase 2: Core App | 2-3 days | Not Started |
| Phase 3: Display | 1 day | Not Started |
| Phase 4: Editing | 1-2 days | Not Started |
| Phase 5: Migration | 1 day | Not Started |
| Phase 6: Testing | 1-2 days | Not Started |
| Phase 7: Deployment | 1 day | Not Started |
| **Total** | **8-11 days** | Not Started |

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [GitHub REST API](https://docs.github.com/en/rest)
- [Octokit (GitHub API Client)](https://github.com/octokit/octokit.js)
- [Vercel Deployment](https://vercel.com/docs)

---

## Notes

- This migration maintains the security requirement that **users must be authenticated to see any recipe data**
- The two-repo architecture separates public code from private data
- GitHub handles authentication and authorization
- Version history is automatically provided by Git
- Collaboration is enabled via GitHub's pull request workflow
- The new architecture eliminates the need for any backend server (Railway)

---

## Questions & Decisions Needed

1. **Markdown Editor Choice:** Which editor library should we use?
   - [ ] `react-simplemde-editor` (simple, familiar)
   - [ ] `@uiw/react-md-editor` (richer features)
   - [ ] Custom form-based editor (most user-friendly)

2. **Image Handling:** How should we handle recipe images?
   - [ ] Upload to GitHub (simple, versioned)
   - [ ] Use external service (Cloudinary, Imgur)
   - [ ] Base64 embedding (no external deps, but bloats files)

3. **Search Functionality:** How should search work?
   - [ ] Client-side filtering (simple, fast for small datasets)
   - [ ] GitHub API search (more accurate, but rate limited)
   - [ ] External search service (Algolia, etc.)

4. **Deployment:**
   - [ ] Use Vercel (recommended, free tier)
   - [ ] Use Netlify
   - [ ] Use GitHub Pages (limited, no server-side features)

5. **Custom Domain:**
   - [ ] Keep existing domain
   - [ ] Use Vercel's *.vercel.app domain
   - [ ] Set up new custom domain

---

## Next Steps

1. Review this plan and provide feedback
2. Make decisions on the open questions above
3. I can then begin implementation following this step-by-step plan
