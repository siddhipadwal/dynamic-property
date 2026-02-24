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

**Database Variables:**
   - `DB_HOST` = `localhost`
   - `DB_USER` = `u812564579_Shivank`
   - `DB_PASSWORD` = `Bless@Shivank#321`
   - `DB_NAME` = `u812564579_Shivank`

**SMTP Email Variables:**
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `dynamicpropertiesseo@gmail.com`
   - `SMTP_PASS` = `your_app_password_here` (See Step 6 below)
   - `FROM_EMAIL` = `dynamicpropertiesseo@gmail.com`
   - `TO_EMAIL` = `dynamicpropertiesseo@gmail.com`
   - `TO_EMAIL_2` = `info@dynamicproperties.in`

4. Save changes

### Option B: Using .htaccess
Add this to your `.htaccess` file in public_html:
```
SetEnv DB_HOST localhost
SetEnv DB_USER u812564579_Shivank
SetEnv DB_PASSWORD Bless@Shivank#321
SetEnv DB_NAME u812564579_Shivank
SetEnv SMTP_HOST smtp.gmail.com
SetEnv SMTP_PORT 587
SetEnv SMTP_USER dynamicpropertiesseo@gmail.com
SetEnv SMTP_PASS your_app_password_here
SetEnv FROM_EMAIL dynamicpropertiesseo@gmail.com
SetEnv TO_EMAIL dynamicpropertiesseo@gmail.com
SetEnv TO_EMAIL_2 info@dynamicproperties.in
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

## Step 6: Gmail App Password Setup (Required for SMTP)
Since your website uses Gmail, you need an **App Password** instead of your regular Gmail password:

1. Go to your **Google Account** (myaccount.google.com)
2. Click **Security** on the left menu
3. Under "How you sign in to Google", enable **2-Step Verification** (if not already on)
4. After enabling 2-Step Verification, search for "App Passwords" in the search bar
5. Create a new App Password:
   - Name: "Dynamic Properties Website"
6. Copy the 16-character password shown
7. Use this password for `SMTP_PASS` in your environment variables

**Important:** Replace `your_app_password_here` in the .env.local or Hostinger settings with this App Password.

---
If you need more help, check Hostinger's Knowledge Base or contact their support.
