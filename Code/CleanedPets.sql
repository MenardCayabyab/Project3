-- Creating CSV table for import

-- drop table if exists pets;

-- Create Table "pets" (
-- "Name" VARCHAR,
-- "Type" VARCHAR,
-- "Breed" VARCHAR,
-- "Color" VARCHAR,
-- "Sex" VARCHAR,
-- "Size" VARCHAR,
-- "Date Of Birth" DATE,
-- "Impound Number" VARCHAR,
-- "Kennel Number" VARCHAR,
-- "Animal ID" VARCHAR,
-- "Intake Date" DATE,
-- "Outcome Date" DATE,
-- "Days in Shelter" VARCHAR,
-- "Intake Type" VARCHAR,
-- "Intake Subtype" VARCHAR,
-- "Outcome Type" VARCHAR,
-- "Outcome Subtype" VARCHAR,
-- "Intake Condition" VARCHAR,
-- "Outcome Condition" VARCHAR,
-- "Intake Jurisdiction" VARCHAR,
-- "Outcome Jurisdiction" VARCHAR,
-- "Outcome Zip Code" VARCHAR,
-- "Location" VARCHAR,
-- "Count" INT
-- );

-- Data cleanup --

-- Updating days in shelter from string to numeric since there was a comma within the
-- numbers therfore making it not be considered numeric when importing/creating schema.
UPDATE pets
SET "Days in Shelter" = REPLACE("Days in Shelter", ',', '')
WHERE "Days in Shelter" LIKE '%,%';

ALTER TABLE pets
ALTER COLUMN "Days in Shelter" TYPE numeric USING ("Days in Shelter"::numeric);

SELECT * FROM pets;

-- Changing the formatting of the "Location" column since it includes ZIP code, latitude and longitude 
-- in one cell. We will then drop the zip code, extract the lat and long values and put them in a 
-- separate column.

ALTER TABLE pets
ADD COLUMN latitude FLOAT,
ADD COLUMN longitude FLOAT;

UPDATE pets
SET latitude = SUBSTRING("Location", POSITION('(' IN "Location")+1, POSITION(',' IN "Location")-POSITION('(' IN "Location")-1)::float,
longitude = SUBSTRING("Location", POSITION(',' IN "Location")+2, POSITION(')' IN "Location")-POSITION(',' IN "Location")-2)::float
WHERE "Location" LIKE '%(%' AND "Location" LIKE '%)%';

-- Dropping Location column
ALTER TABLE pets
DROP COLUMN Location;

SELECT * FROM pets;

-- Taking out asterix in the names of animals in Name column.
UPDATE pets
SET "Name" = REPLACE("Name", '*', '')
WHERE "Name" LIKE '*%';

SELECT * FROM pets;

-- Creating a new column called Age based on the Date of Birth column and current date. 
ALTER TABLE pets ADD COLUMN Age INT;
UPDATE pets SET Age = DATE_PART('year', CURRENT_DATE) - DATE_PART('year', "Date Of Birth");

SELECT * FROM pets;

-- Splitting the breed at "/" for better organization and visualization later on.

-- Add new columns for primary and secondary breed
ALTER TABLE pets ADD COLUMN "Primary Breed" VARCHAR;
ALTER TABLE pets ADD COLUMN "Secondary Breed" VARCHAR;

-- Split breed column into primary and secondary breed columns
UPDATE pets
SET "Primary Breed" = TRIM(SPLIT_PART("Breed", '/', 1)),
    "Secondary Breed" = TRIM(SPLIT_PART("Breed", '/', 2))
WHERE "Breed" LIKE '%/%';

-- Remove "/" from primary breed if there's only one breed
UPDATE pets
SET "Primary Breed" = REPLACE("Breed", '/', '')
WHERE "Breed" NOT LIKE '%/%';

-- Drop Breed column
ALTER TABLE pets
DROP COLUMN "Breed";

SELECT * FROM pets;