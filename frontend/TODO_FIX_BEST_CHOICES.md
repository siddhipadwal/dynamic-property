# TODO: Fix Best Choices Filter Issue

## Issues Found:
1. API doesn't save `isBestChoice` value to database
2. BestChoices component doesn't filter by `isBestChoice`

## Plan:
- [ ] Fix the API (`/api/properties/route.js`) to save `isBestChoice`
- [ ] Fix the BestChoices component (`BestChoices.jsx`) to filter by `isBestChoice`
- [ ] Test the changes
