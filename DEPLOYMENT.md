# Vercel Deployment Guide

This guide will help you deploy the Louise & Kim wedding invitation website to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Git repository (GitHub, GitLab, or Bitbucket)
3. All project files committed to your repository

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to Git repository**

   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect it's a static site

3. **Configure deployment**

   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (not needed for static sites)
   - **Output Directory**: Leave empty (not needed for static sites)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be available at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy from project directory**

   ```bash
   cd /path/to/your/project
   vercel
   ```

4. **Follow the prompts**

   - Link to existing project or create new one
   - Set project name
   - Configure settings (use defaults)

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Configuration Files

The project includes the following Vercel configuration files:

- `vercel.json` - Main configuration with routing and headers
- `package.json` - Project metadata and scripts
- `api/rsvp.js` - API endpoint for RSVP form submissions

## Environment Variables

Currently, no environment variables are required. The RSVP form uses a simple API endpoint that logs submissions to the console.

## Custom Domain (Optional)

1. **Add domain in Vercel dashboard**

   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain

2. **Configure DNS**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to Vercel's IP addresses

## Monitoring and Analytics

- **Vercel Analytics**: Available in the dashboard
- **Function Logs**: Check API function logs in the Vercel dashboard
- **Performance**: Monitor Core Web Vitals in the dashboard

## Troubleshooting

### Common Issues

1. **Build fails**

   - Check that all files are committed to Git
   - Verify `vercel.json` syntax is correct
   - Check for any missing dependencies

2. **RSVP form not working**

   - Verify the API route is deployed correctly
   - Check function logs in Vercel dashboard
   - Test the API endpoint directly

3. **Images not loading**
   - Ensure all image files are in the repository
   - Check file paths are correct
   - Verify image file permissions

### Debug Commands

```bash
# Check Vercel CLI version
vercel --version

# View deployment logs
vercel logs

# Test local development
vercel dev
```

## Performance Optimization

The project is already optimized for Vercel with:

- Static file caching headers
- Optimized images
- Minimal JavaScript bundle
- Efficient CSS
- Lazy loading for images

## Security Features

- CORS headers configured
- XSS protection headers
- Content type validation
- Input sanitization in API route

## Support

For Vercel-specific issues:

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

For project-specific issues:

- Check the main README.md file
- Review code comments in the source files
