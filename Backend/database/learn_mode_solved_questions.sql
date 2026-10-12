CREATE TABLE IF NOT EXISTS learn_ds_solved_questions (
    user_num_id INT NOT NULL
        REFERENCES users(num_id) ON DELETE CASCADE,
    question_id INT NOT NULL
        REFERENCES questions(question_id) ON DELETE CASCADE,
    solved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_num_id, question_id)
);

CREATE TABLE IF NOT EXISTS learn_algo_solved_questions (
    user_num_id INT NOT NULL
        REFERENCES users(num_id) ON DELETE CASCADE,
    question_id INT NOT NULL
        REFERENCES questions(question_id) ON DELETE CASCADE,
    solved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_num_id, question_id)
);

CREATE OR REPLACE FUNCTION sync_learn_solved_question()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO solved_questions (user_num_id, question_id)
    SELECT NEW.user_num_id, NEW.question_id
    WHERE NOT EXISTS (
        SELECT 1
        FROM solved_questions
        WHERE user_num_id = NEW.user_num_id
          AND question_id = NEW.question_id
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_learn_ds_solved ON learn_ds_solved_questions;
CREATE TRIGGER trg_learn_ds_solved
AFTER INSERT ON learn_ds_solved_questions
FOR EACH ROW
EXECUTE FUNCTION sync_learn_solved_question();

DROP TRIGGER IF EXISTS trg_learn_algo_solved ON learn_algo_solved_questions;
CREATE TRIGGER trg_learn_algo_solved
AFTER INSERT ON learn_algo_solved_questions
FOR EACH ROW
EXECUTE FUNCTION sync_learn_solved_question();
