

ALTER TABLE stats
ADD CONSTRAINT chk_stats_positive
CHECK (PTS >= 0 AND TRB >= 0 AND AST >= 0 AND G >= 0);

INSERT INTO stats
    (playerid,PTS, TRB, AST, G)
VALUES
    (15000, -1, -1, -1, -1);



DROP PROCEDURE IF EXISTS RegisterUser;
DELIMITER $
$

CREATE PROCEDURE RegisterUser(IN p_UserName VARCHAR
(100), IN p_EmailAddress VARCHAR
(255), IN p_Password VARCHAR
(255))
BEGIN
    -- Check if username, email, or password is blank
    IF TRIM(p_UserName) = '' OR TRIM(p_EmailAddress) = '' OR TRIM(p_Password) = '' THEN
        SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT
    = 'Username, email, or password cannot be blank';
END
IF;

    -- Insert new user
    INSERT INTO User
    (UserName, EmailAddress, Password)
VALUES
    (p_UserName, p_EmailAddress, p_Password);
END$$

DELIMITER ;
DELIMITER $
$

CREATE TRIGGER BeforeInsertUser
BEFORE
INSERT ON User
FOR
EACH
ROW
BEGIN
    -- Declare a variable to count existing emails
    DECLARE email_count INT;

-- Check if the email already exists in the database
SELECT COUNT(*)
INTO email_count
FROM User
WHERE EmailAddress = NEW.EmailAddress;

-- If the count is greater than 0, then the email already exists
IF email_count > 0 THEN
        SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT
= 'This email address is already registered.';
END
IF;
END$$

DELIMITER ;
