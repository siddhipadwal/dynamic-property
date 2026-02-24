# Changes Summary

## Database Configuration Fix

This update makes the database name configurable through environment variables instead of being hardcoded.

### Files Modified:
- `frontend/src/lib/db.js`
- `frontend/src/app/api/contact/route.js`
- `frontend/src/app/api/contact-setup/route.js`

### New Files Added:
- `HOSTINGER_SETUP.md` - Setup guide for Hostinger deployment
- `frontend/.env.example` - Environment variables template
- `frontend/.env.local` - Local development configuration
