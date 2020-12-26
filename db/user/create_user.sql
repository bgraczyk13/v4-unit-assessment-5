INSERT INTO helo_users
( username, hash )
VALUES
($1, $2, $3)
returning *;