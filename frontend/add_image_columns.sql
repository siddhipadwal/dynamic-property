-- Run this SQL to add the new image columns to your properties table
-- You can run this in phpMyAdmin or via MySQL command line

ALTER TABLE properties ADD COLUMN image2 VARCHAR(500) NULL;
ALTER TABLE properties ADD COLUMN image3 VARCHAR(500) NULL;
