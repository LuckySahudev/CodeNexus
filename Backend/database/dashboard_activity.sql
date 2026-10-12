-- Run once to store one activity record per user per calendar day.
-- users.num_id is the user key used by this backend's auth and solved_questions tables.
CREATE TABLE IF NOT EXISTS user_daily_activity (
    user_id INT NOT NULL REFERENCES users(num_id) ON DELETE CASCADE,
    activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (user_id, activity_date)
);

-- Backfill days already recorded by solved_questions so existing users keep their history.
INSERT INTO user_daily_activity (user_id, activity_date)
SELECT user_num_id, solved_at::date
FROM solved_questions
WHERE solved_at IS NOT NULL
ON CONFLICT (user_id, activity_date) DO NOTHING;

CREATE OR REPLACE FUNCTION track_daily_activity()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_daily_activity (user_id, activity_date)
    VALUES (NEW.user_num_id, CURRENT_DATE)
    ON CONFLICT (user_id, activity_date) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_track_daily_activity ON solved_questions;
CREATE TRIGGER trg_track_daily_activity
AFTER INSERT ON solved_questions
FOR EACH ROW
EXECUTE FUNCTION track_daily_activity();
