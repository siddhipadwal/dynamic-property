# TODO - Fix Best Choices Feature

## Issues Identified:
1. Edit Property Form missing `isBestChoice` field
2. PUT API doesn't update `isBestChoice` in database
3. MySQL BOOLEAN returns as 1/0 instead of true/false causing filter issues

## Fixes to Implement:
- [ ] 1. Update EditPropertyClient.jsx - Add isBestChoice to form state, load from property, add checkbox UI, send in PUT request
- [ ] 2. Update PUT API Route - Add isBestChoice to UPDATE SQL query
- [ ] 3. Update BestChoices.jsx - Handle both boolean and integer (1/0) types in filter
