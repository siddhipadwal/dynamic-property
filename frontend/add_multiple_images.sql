-- Add columns for multiple images and video
ALTER TABLE properties ADD COLUMN images JSON NULL;
ALTER TABLE properties ADD COLUMN video VARCHAR(500) NULL;
