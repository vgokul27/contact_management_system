# Deployment Guide - Contact Management System

## 📦 Deployment Overview

- **Backend**: Render (Free Tier)
- **Frontend**: Vercel (Free Tier)
- **Database**: MongoDB Atlas (Already configured)

---

## 🚀 Part 1: Deploy Backend to Render

### Step 1: Push Code to GitHub

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Sign Up for Render

1. Go to [render.com](https://render.com)
2. Click **"Get Started"**
3. Sign up with **GitHub** (recommended)
4. Authorize Render to access your repositories

### Step 3: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `ContactManager`
3. Configure the service:

   **Basic Settings:**
   - Name: `contact-manager-api` (or any name you prefer)
   - Region: Choose closest to you
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

   **Instance Type:**
   - Select **"Free"** tier

### Step 4: Add Environment Variables

Scroll down to **"Environment Variables"** section and add:

```
NODE_ENV = production
MONGODB_URI = mongodb+srv://gokuldivya:vgokul@nodepractice.f9dfcn8.mongodb.net/Contact_Management?appName=NodePractice
FRONTEND_URL = (leave empty for now, will update after Vercel deployment)
```

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Once deployed, you'll see: ✅ **"Live"**
4. **Copy your backend URL**: `https://contact-manager-api-xxxx.onrender.com`

### Step 6: Test Backend

Visit: `https://your-backend-url.onrender.com`

You should see:
```json
{
  "message": "Contact Management API",
  "version": "1.0.0",
  "endpoints": {
    "contacts": "/api/contacts"
  }
}
```

---

## 🌐 Part 2: Deploy Frontend to Vercel

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

Or deploy via Vercel Dashboard (easier).

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with **GitHub** (recommended)

### Step 3: Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository: `ContactManager`
3. Configure the project:

   **Project Settings:**
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Step 4: Add Environment Variable

Click **"Environment Variables"** and add:

```
VITE_API_URL = https://your-backend-url.onrender.com/api/contacts
```

Replace `your-backend-url` with your actual Render URL from Part 1.

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. Once deployed, you'll get a URL like: `https://contact-manager-xxxx.vercel.app`

### Step 6: Update Backend CORS

Now that you have your Vercel URL, go back to Render:

1. Go to your Render dashboard
2. Select your backend service
3. Click **"Environment"** tab
4. Update `FRONTEND_URL` variable:
   ```
   FRONTEND_URL = https://contact-manager-xxxx.vercel.app
   ```
5. Click **"Save Changes"**
6. Service will automatically redeploy

---

## ✅ Verify Deployment

### Test Your Live App

1. Visit your Vercel URL: `https://contact-manager-xxxx.vercel.app`
2. Try adding a contact
3. Verify it appears in the list
4. Try deleting a contact
5. Test sorting functionality

### Check Backend API

Visit: `https://your-backend-url.onrender.com/api/contacts`

Should return an array of contacts (empty array if no contacts yet).

---

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend

**Issue**: CORS errors or network errors

**Solution**:
1. Verify `VITE_API_URL` in Vercel environment variables is correct
2. Make sure it includes `/api/contacts` at the end
3. Check `FRONTEND_URL` in Render matches your Vercel URL exactly
4. Redeploy both services

### Backend Not Connecting to MongoDB

**Issue**: MongoDB connection errors

**Solution**:
1. Verify `MONGODB_URI` in Render is correct (copy from your `.env` file)
2. Check MongoDB Atlas network access allows all IPs (`0.0.0.0/0`)
3. Verify database user credentials are correct

### Render Service Sleeping

**Issue**: First request takes 30+ seconds

**Note**: Free tier services sleep after inactivity. First request wakes them up (takes ~30 seconds). Subsequent requests are fast.

**Solution**: Upgrade to paid tier for always-on service, or accept the cold start delay.

### Environment Variables Not Working

**Solution**:
- For Vercel: Make sure env variables start with `VITE_`
- Redeploy after adding/changing environment variables
- Clear cache: Settings → General → Clear cache

---

## 🔄 Redeployment

### Redeploy Backend (Render)

Render automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Or manually redeploy from Render dashboard.

### Redeploy Frontend (Vercel)

Vercel automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

Or manually redeploy from Vercel dashboard.

---

## 📝 Important Notes

### Render Free Tier Limitations
- Service sleeps after 15 minutes of inactivity
- 750 hours/month free
- Slower cold starts (~30 seconds)

### Vercel Free Tier Limitations
- 100 GB bandwidth/month
- 100 deployments/day
- Serverless function execution time: 10 seconds

### MongoDB Atlas Free Tier
- 512 MB storage
- Shared CPU
- Perfect for small projects

---

## 🎉 Success!

Your MERN stack app is now live!

- **Frontend**: `https://contact-manager-xxxx.vercel.app`
- **Backend**: `https://contact-manager-api-xxxx.onrender.com`
- **Database**: MongoDB Atlas (Cloud)

Share your live URL with anyone! 🚀

---

## 📚 Next Steps

1. Add a custom domain (Vercel Settings → Domains)
2. Set up automatic deployments from GitHub
3. Monitor usage in Render and Vercel dashboards
4. Add analytics (Google Analytics, Vercel Analytics)
5. Set up error monitoring (Sentry)

---

## 🔗 Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com

---

**Need Help?** Check the troubleshooting section above or create an issue on GitHub.
