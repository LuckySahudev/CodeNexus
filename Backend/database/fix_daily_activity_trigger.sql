-- Replace the outdated trigger function: solved_questions uses user_num_id,
-- not user_id. Run this against the same database used by the backend.
CREATE OR REPLACE FUNCTION track_daily_activity()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_daily_activity (user_id, activity_date)
    VALUES (NEW.user_num_id, CURRENT_DATE)
    ON CONFLICT (user_id, activity_date) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
