# Deployment Guide for Plaid Councillor Resources

## 🎉 Current Deployment Status

**✅ Already Deployed via Vercel Web Interface!**

Your application is currently deployed using the simplest and most reliable method:
- **GitHub Repository** → **Vercel Automatic Deployment**
- No local Vercel CLI required
- Automatic deployments on every `git push`

## 🔄 Update Workflow (Recommended)

### How to Make Updates

Since you're already using the optimal GitHub → Vercel workflow, here's how to make future updates:

1. **Make changes locally**:
   ```bash
   cd plaid-councillor-app
   # Edit files as needed
   ```

2. **Test locally**:
   ```bash
   npm run dev
   # Test at http://localhost:3000
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin main
   ```

4. **Vercel automatically deploys**:
   - Vercel detects the GitHub push
   - Runs `npm run build` automatically
   - Deploys to your live URL
   - Typically completes in 1-2 minutes

### Step 1: Create GitHub Repository

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name: `plaid-councillor-resources`
   - Description: "Interactive web app for Plaid Cymru councillor resources"
   - Public/Private: Private (recommended)
   - Click "Create repository"

2. **Push your code**:
   ```bash
   cd plaid-councillor-app
   git remote add origin https://github.com/your-username/plaid-councillor-resources.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Sign up/login to Vercel**: https://vercel.com/signup
2. **Create new project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository you just created
3. **Configure project**:
   - Project Name: `plaid-councillor-resources`
   - Framework Preset: Next.js
   - Root Directory: (leave blank)
   - Build Command: `npm run build`
   - Output Directory: (leave blank)
   - Development Command: `npm run dev`
4. **Environment Variables**: None needed
5. **Click "Deploy"**

### Step 3: Configure Domain (Optional)

1. Go to project settings
2. Add custom domain if needed (e.g., councillors.plaid.cymru)
3. Configure DNS settings

## 📋 When You Might Need Vercel CLI

While your current workflow is perfect for most updates, you might want to install Vercel CLI for:

### Advanced Use Cases:
- **Local production preview**: Test exact production build locally
- **Complex routing**: Advanced Next.js routing rules
- **Environment variables**: Local management of secrets
- **Rollback testing**: Test rollbacks before deploying

### Install Vercel CLI (Optional):
```bash
npm install -g vercel
# or use npx for one-time use:
npx vercel
```

### Common CLI Commands:
```bash
vercel              # Deploy current branch
vercel --prod       # Force production deployment
vercel pull         # Pull latest deployment config
vercel logs         # View deployment logs
vercel list         # List all deployments
```

**For now, you don't need this!** Your current GitHub → Vercel workflow handles 95% of use cases.

## 🔄 Alternative: Netlify Deployment

### Alternative if you prefer Netlify

1. Push code to GitHub (same as above)
2. Go to https://app.netlify.com/start
3. Connect GitHub account
4. Select repository
5. Configure build:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

## 🎯 Current Deployment Checklist

### ✅ Your Deployment is Already Live!

Since you've deployed via Vercel's web interface, your site should already have:

**Automatic Features:**
- [x] HTTPS security (automatic)
- [x] Global CDN distribution
- [x] Automatic builds on push
- [x] Rollback capability
- [x] Performance monitoring

**What to Verify:**
- [ ] Main page loads: https://your-app.vercel.app/
- [ ] 100 Tips page works: https://your-app.vercel.app/100tips
- [ ] PDF viewer displays images correctly
- [ ] Search functionality works
- [ ] Navigation between pages works
- [ ] Mobile responsiveness works

## Post-Deployment Checklist

### ✅ Verify Deployment
- [ ] Main page loads: https://your-app.vercel.app/
- [ ] 100 Tips page works: https://your-app.vercel.app/100tips
- [ ] PDF viewer displays images correctly
- [ ] Search functionality works
- [ ] Navigation between pages works
- [ ] Mobile responsiveness works

### ✅ Performance Optimization
- [ ] Check Lighthouse score (should be 90+)
- [ ] Verify image optimization
- [ ] Test on mobile devices

### ✅ Security
- [ ] Set up HTTPS (automatic on Vercel)
- [ ] Add basic authentication if needed
- [ ] Configure proper CORS headers

### ✅ Monitoring
- [ ] Set up Vercel analytics
- [ ] Add error monitoring (Sentry or similar)
- [ ] Configure uptime alerts

## Troubleshooting

### Common Issues

**1. Images not loading:**
- Check file paths in `public/ocr_output/`
- Verify case sensitivity
- Ensure files are included in git

**2. Search not working:**
- Verify `search-index.json` exists
- Check browser console for errors
- Ensure JSON is valid

**3. Build failures:**
- Run `npm install` before deploy
- Check Node.js version (v18+ recommended)
- Clear cache and retry

## 🔧 Maintenance & Updates

### Your Update Workflow (Simple!)

Since you're using **GitHub → Vercel automatic deployment**, updates are easy:

1. **Make content changes**:
   ```bash
   # Edit files in plaid-councillor-app/
   # Test with: npm run dev
   ```

2. **Update PDFs (if needed)**:
   ```bash
   # Place new PDFs in public/
   # Run OCR scripts if text extraction needed
   cd scripts
   node improved-tips-extraction.js  # Update tips
   node create-search-index.js        # Update search
   ```

3. **Deploy updates**:
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```
   
   **Vercel automatically:**
   - Detects the push
   - Runs `npm run build`
   - Deploys to production
   - Shows deployment status in Vercel dashboard

### Update Scenarios:

**Adding new tips:**
- Edit `scripts/improved-tips-extraction.js`
- Add new tips to the `manualTips` array
- Run script to regenerate JSON

**Updating PDFs:**
- Replace files in `public/`
- Run OCR scripts if needed
- Test locally first

**Fixing bugs:**
- Edit the React components
- Test with `npm run dev`
- Push to GitHub

## 🚀 Advanced Maintenance

## 🆘 Support & Troubleshooting

### Your Current Setup Support:

**Vercel Web Interface Issues:**
- Deployment settings: Check Vercel dashboard
- Build logs: Available in Vercel project settings
- Domain configuration: Vercel → Settings → Domains

**GitHub Issues:**
- Push failures: Check git status and permissions
- Branch issues: Ensure you're on `main` branch
- Large files: Check `.gitignore` for proper exclusions

### Common Solutions:

**Deployment not triggering:**
- Check Vercel project is connected to correct GitHub repo
- Verify branch settings (should be `main`)
- Check for build errors in Vercel dashboard

**Changes not appearing:**
- Hard refresh browser (Ctrl+F5)
- Clear cache or use incognito mode
- Check Vercel deployment completed successfully

### Resources:
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Help**: https://docs.github.com

## ✅ Success Criteria

**Your Deployment is Successful When:**

**Basic Functionality:**
- ✅ Site loads without errors
- ✅ Both PDF viewer and 100 Tips pages work
- ✅ Search functionality returns results
- ✅ Navigation works smoothly
- ✅ Images display correctly

**Performance:**
- ✅ Page load time < 2 seconds
- ✅ Mobile responsiveness works
- ✅ Search is instant

**Deployment:**
- ✅ Automatic deployments on push
- ✅ Build completes successfully
- ✅ No console errors

**Your Current Setup:**
- **Deployment Time:** ~1 minute (automatic)
- **Cost:** $0 (Vercel free tier)
- **Traffic Capacity:** 10,000+ visits/month
- **Reliability:** 99.9% uptime (Vercel SLA)

## 🎉 You're All Set!

Your application is deployed using the **optimal workflow**:
```
Local Changes → GitHub Push → Vercel Auto-Deploy → Live Site
```

This is the simplest, most reliable method for maintaining your web app. No complex tools needed!