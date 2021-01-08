DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    username varchar(64) UNIQUE NOT NULL,
    email varchar(128) UNIQUE NOT NULL,
    name varchar(128) NOT NULL,
    password varchar(256) NOT NULL,
    status varchar(32) DEFAULT 'Active' check(status in ('Active', 'Suspended')),
    userType varchar(32) DEFAULT 'Consumer' CHECK(userType in ('Consumer', 'Contributor' ,'Super Admin')),
    userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
);

DROP TABLE IF EXISTS post;
CREATE TABLE if not EXISTS post(
    postID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username varchar(64) NOT NULL,
    title varchar(256) NOT NULL,
    body varchar(256) NOT NULL,
    category varchar(32) NOT NULL,
    likes INTEGER DEFAULT 0,
    isDuplicate INTEGER DEFAULT 0 CHECK (isDuplicate in (0, 1)),
    created DATETIME DEFAULT (datetime('now','localtime'))
);

DROP TABLE IF EXISTS reply;
CREATE TABLE if not EXISTS reply(
    replyID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    postID INTEGER NOT NULL,
    username varchar(64) NOT NULL,
    reply varchar(256) NOT NULL,
    likes INTEGER DEFAULT 0,
    created DATETIME DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (postID) REFERENCES post(postID)
);

DROP TABLE IF EXISTS likes;
CREATE TABLE if not EXISTS likes(
    likeID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    userID varchar(64) NOT NULL,
    postID varchar(256),
    replyID varchar(256),
    FOREIGN KEY (postID) REFERENCES post(postID),
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (replyID) REFERENCES post(replyID),
    UNIQUE(userID, postID) ON CONFLICT REPLACE,
    UNIQUE(userID, replyID) ON CONFLICT REPLACE
);

-- * AFTER RUNNING OUR PROJECT -- CREATE A USER AND SET THEIR ROLE TO ADMIN FROM DB. (-- IF IT'S NOT TRANSFERED IN THE UPLOAD
UPDATE users SET userType = 'Super Admin' WHERE username = 'Tass'
UPDATE users SET userType = 'Super Admin' WHERE username = 'Hyena'

UPDATE users SET userType = 'Contributor' WHERE username = 'ContributorLAD'
UPDATE users SET userType = 'Contributor' WHERE username = 'HelpzOut'

UPDATE users SET status = 'Suspended' WHERE username = 'Toxic'
