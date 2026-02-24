# TODO: Update Headers for Properties Pages

## Task: Add same header as Property Details page to Properties, Ready to Move, and Under Construction pages

### Files to Edit:
1. [x] frontend/src/app/properties/[id]/PropertyDetailClient.jsx - (Reference - already has the header)
2. [ ] frontend/src/app/properties/page.jsx - Update hero section to match Property Details header
3. [ ] frontend/src/app/properties/ready-to-move/page.jsx - Update hero section to match Property Details header
4. [ ] frontend/src/app/properties/under-construction/page.jsx - Update hero section to match Property Details header

### Changes Required for Each Page:
- Change background from geometric-pattern to #03333B with animated floating circles
- Keep the existing title and description but apply same styling
- Add appropriate status badges (For Sale + status type)
- Change wave divider fill from #F5F9F8 to white
- Keep the breadcrumb bar at the bottom

### Implementation Order:
1. Properties page (page.jsx)
2. Ready to Move page
3. Under Construction page
