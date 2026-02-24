# Complete Guide to Connect Database on Hostinger

## Step 1: Upload Files to Hostinger
1. Go to Hostinger hPanel > Files > File Manager
2. Navigate to your domain's public_html folder
3. Upload all your project files (the frontend folder contents)
4. Make sure to include the `.env.local` file

## Step 2: Set Environment Variables in Hostinger
In Hostinger, you need to set environment variables so your Next.js app can access the database.

### Option A: Using hPanel (Recommended)
1. Go to **Settings** > **PHP** > **PHP Options**
2. Look for **Environment Variables** section
3. Add these variables:
   - `DB_HOST` = `localhost`
   - `DB_USER` = `u812564579_Shivank`
   - `DB_PASSWORD` = `Bless@Shivank#321`
   - `DB_NAME` = `u812564579_Shivank`
4. Save changes

### Option B: Using .htaccess
Add this to your `.htaccess` file in public_html:
```
SetEnv DB_HOST localhost
SetEnv DB_USER u812564579_Shivank
SetEnv DB_PASSWORD Bless@Shivank#321
SetEnv DB_NAME u812564579_Shivank
```

## Step 3: Import Database (If Not Already Done)
1. Go to **Databases** > **phpMyAdmin** in hPanel
2. Click on your database `u812564579_Shivank`
3. Click **Import** tab
4. Select and import the file `frontend/database.sql`
5. Also import `frontend/add_image_columns.sql` if needed

## Step 4: Important Note About .env.local
⚠️ The `.env.local` file contains your database password. When uploading to Hostinger:

**Option 1: Upload .env.local manually**
- After uploading all files via File Manager, upload `.env.local` separately to the root folder

**Option 2: Set variables via Hostinger PHP settings**
- Use Option A above (PHP Options > Environment Variables)
- Then you don't need to upload .env.local

## Step 5: Verify Connection
After setting up, test your website. If you see "Access denied" errors:
1. Double-check the credentials in Hostinger PHP settings
2. Make sure the database user has permission to access the database
3. Check that the database name is correct

## Troubleshooting
- **Error: "Access denied for user 'root'@'::1'"** - This means the environment variables are not being read. Make sure they're set in Hostinger PHP settings.
- **Error: "Unknown database"** - The database name might be wrong. Check in phpMyAdmin what the exact database name is.
- **Error: "Can't connect to MySQL server"** - The DB_HOST might be wrong. Try changing from `localhost` to `127.0.0.1`

## Database Credentials (For Reference)
- **Host:** localhost
- **Database:** u812564579_Shivank
- **User:** u812564579_Shivank
- **Password:** Bless@Shivank#321

---
If you need more help, check Hostinger's Knowledge Base or contact their support.
