-- Creating a general view of all possible outcomes per year
CREATE VIEW yearly_outcome_totals AS
SELECT date_trunc('year', COALESCE("Outcome Date", CURRENT_DATE)) AS year, 
    SUM(CASE WHEN "Outcome Type" = 'ADOPTION' THEN 1 ELSE 0 END) AS adoption, 
    SUM(CASE WHEN "Outcome Type" = 'DIED' THEN 1 ELSE 0 END) AS died, 
    SUM(CASE WHEN "Outcome Type" = 'DISPOSAL' THEN 1 ELSE 0 END) AS disposal, 
    SUM(CASE WHEN "Outcome Type" = 'ESCAPED/STOLEN' THEN 1 ELSE 0 END) AS escaped_stolen, 
    SUM(CASE WHEN "Outcome Type" = 'EUTHANIZE' THEN 1 ELSE 0 END) AS euthanize, 
    SUM(CASE WHEN "Outcome Type" = 'RETURN TO OWNER' THEN 1 ELSE 0 END) AS return_to_owner, 
    SUM(CASE WHEN "Outcome Type" = 'RTOS' THEN 1 ELSE 0 END) AS rtp, 
    SUM(CASE WHEN "Outcome Type" = 'TRANSFER' THEN 1 ELSE 0 END) AS transfer, 
    SUM(CASE WHEN "Outcome Type" IS NULL THEN 1 ELSE 0 END) AS still_in_shelter
FROM pets
WHERE "Type" = 'DOG' 
GROUP BY date_trunc('year', COALESCE("Outcome Date", CURRENT_DATE))
HAVING date_trunc('year', COALESCE("Outcome Date", CURRENT_DATE)) < date_trunc('year', now())
ORDER BY year;

-- Creating a general view of all possible outcomes per month
CREATE VIEW monthly_outcome_totals AS
SELECT date_trunc('month', COALESCE("Outcome Date", CURRENT_DATE)) AS month, 
    SUM(CASE WHEN "Outcome Type" = 'ADOPTION' THEN 1 ELSE 0 END) AS adoption, 
    SUM(CASE WHEN "Outcome Type" = 'DIED' THEN 1 ELSE 0 END) AS died, 
    SUM(CASE WHEN "Outcome Type" = 'DISPOSAL' THEN 1 ELSE 0 END) AS disposal, 
    SUM(CASE WHEN "Outcome Type" = 'ESCAPED/STOLEN' THEN 1 ELSE 0 END) AS escaped_stolen, 
    SUM(CASE WHEN "Outcome Type" = 'EUTHANIZE' THEN 1 ELSE 0 END) AS euthanize, 
    SUM(CASE WHEN "Outcome Type" = 'RETURN TO OWNER' THEN 1 ELSE 0 END) AS return_to_owner, 
    SUM(CASE WHEN "Outcome Type" = 'RTOS' THEN 1 ELSE 0 END) AS rto, 
    SUM(CASE WHEN "Outcome Type" = 'TRANSFER' THEN 1 ELSE 0 END) AS transfer, 
    SUM(CASE WHEN "Outcome Type" IS NULL THEN 1 ELSE 0 END) AS still_in_shelter
FROM pets
WHERE "Type" = 'DOG' 
GROUP BY date_trunc('month', COALESCE("Outcome Date", CURRENT_DATE))
HAVING date_trunc('month', COALESCE("Outcome Date", CURRENT_DATE)) < date_trunc('month', now())
ORDER BY month;

-- Create a view of monthly intake totals
CREATE VIEW monthly_intake_totals AS
SELECT date_trunc('month', COALESCE("Intake Date", CURRENT_DATE)) AS month,
    COUNT(*) AS intake_count
FROM pets
GROUP BY date_trunc('month', COALESCE("Intake Date", CURRENT_DATE))
HAVING date_trunc('month', COALESCE("Intake Date", CURRENT_DATE)) < date_trunc('month', now())
ORDER BY month;

-- Create a view of yearly intake totals
CREATE VIEW yearly_intake_totals AS
SELECT date_trunc('year', COALESCE("Intake Date", CURRENT_DATE)) AS year,
    COUNT(*) AS intake_count
FROM pets
GROUP BY date_trunc('year', COALESCE("Intake Date", CURRENT_DATE))
HAVING date_trunc('year', COALESCE("Intake Date", CURRENT_DATE)) < date_trunc('year', now())
ORDER BY year;

-- Creating a view of intake totals per year by type
CREATE VIEW yearly_intake_totals AS
SELECT date_trunc('year', COALESCE("Intake Date", CURRENT_DATE)) AS year,
    SUM(CASE WHEN "Intake Type" = 'ADOPTION RETURN' THEN 1 ELSE 0 END) AS adoption_return,
    SUM(CASE WHEN "Intake Type" = 'BORN HERE' THEN 1 ELSE 0 END) AS born_here,
    SUM(CASE WHEN "Intake Type" = 'CONFISCATE' THEN 1 ELSE 0 END) AS confiscate,
    SUM(CASE WHEN "Intake Type" = 'OS APPT' THEN 1 ELSE 0 END) AS os_appt,
    SUM(CASE WHEN "Intake Type" = 'OWNER SURRENDER' THEN 1 ELSE 0 END) AS owner_surrender,
    SUM(CASE WHEN "Intake Type" = 'QUARANTINE' THEN 1 ELSE 0 END) AS quarantine,
    SUM(CASE WHEN "Intake Type" = 'STRAY' THEN 1 ELSE 0 END) AS stray,
    SUM(CASE WHEN "Intake Type" = 'TRANSFER' THEN 1 ELSE 0 END) AS transfer
FROM pets
GROUP BY date_trunc('year', COALESCE("Intake Date", CURRENT_DATE))
HAVING date_trunc('year', COALESCE("Intake Date", CURRENT_DATE)) < date_trunc('year', now())
ORDER BY year;

-- Creating a view of intake totals per month by type
CREATE VIEW monthly_intake_totals AS
SELECT date_trunc('month', COALESCE("Intake Date", CURRENT_DATE)) AS month,
    SUM(CASE WHEN "Intake Type" = 'ADOPTION RETURN' THEN 1 ELSE 0 END) AS adoption_return,
    SUM(CASE WHEN "Intake Type" = 'BORN HERE' THEN 1 ELSE 0 END) AS born_here,
    SUM(CASE WHEN "Intake Type" = 'CONFISCATE' THEN 1 ELSE 0 END) AS confiscate,
    SUM(CASE WHEN "Intake Type" = 'OS APPT' THEN 1 ELSE 0 END) AS os_appt,
    SUM(CASE WHEN "Intake Type" = 'OWNER SURRENDER' THEN 1 ELSE 0 END) AS owner_surrender,
    SUM(CASE WHEN "Intake Type" = 'QUARANTINE' THEN 1 ELSE 0 END) AS quarantine,
    SUM(CASE WHEN "Intake Type" = 'STRAY' THEN 1 ELSE 0 END) AS stray,
    SUM(CASE WHEN "Intake Type" = 'TRANSFER' THEN 1 ELSE 0 END) AS transfer
FROM pets
GROUP BY date_trunc('month', COALESCE("Intake Date", CURRENT_DATE))
HAVING date_trunc('month', COALESCE("Intake Date", CURRENT_DATE)) < date_trunc('month', now())
ORDER BY month;
