# Contact Form - Issues & Fixes

## Status (After Update):
- ✅ **Database Storage**: Working - inquiries are being saved to the database
- ⏳ **Email Notifications**: Needs SMTP credentials configuration
- ✅ **Admin Dashboard**: AUTO-FIXED - The API now automatically adds the missing column

---

## Fix Applied (Admin Dashboard) ✅

The contact API has been updated to automatically add the missing `is_read` column to the database when any endpoint is called. 

**Simply restart your development server and visit the admin dashboard** - it should now work!

---

## Issue 2: Email Notifications Not Sending (NEEDS FIX)

**Problem**: SMTP credentials are not configured in `.env.local`

**Solution**: Add the following to your `.env.local` file:
```
# SMTP Configuration for Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email Addresses
FROM_EMAIL=your-email@gmail.com
TO_EMAIL=your-email@gmail.com
TO_EMAIL_2=info@dynamicproperties.in
```

**Important**: For Gmail, you need to use an "App Password":
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Go to App Passwords (search for it)
4. Create a new app password for "Mail"
5. Use that 16-character password as SMTP_PASS

---

## Summary

1. **Restart your development server** - The admin dashboard should now work automatically
2. **Configure SMTP** - Add credentials to `.env.local` for email notifications
3. **Test** - Submit a new contact form and check the admin dashboard

## API Endpoints:
- POST `/api/contact` - Submit contact form (auto-fixes database)
- GET `/api/contact` - Get all enquiries (auto-fixes database)
- GET `/api/contact?format=excel` - Export to Excel
- PATCH `/api/contact` - Mark enquiry as read
- GET `/api/contact-setup` - Manual fix endpoint
