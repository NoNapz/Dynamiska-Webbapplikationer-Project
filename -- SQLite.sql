DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    username varchar(64) UNIQUE NOT NULL,
    email varchar(128) UNIQUE NOT NULL,
    name varchar(128) NOT NULL,
    password varchar(256) NOT NULL,
    userType varchar(32) DEFAULT 'Consumer' CHECK(userType in ('Consumer', 'Contributor' ,'Super Admin')),
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
);

DROP TABLE IF EXISTS post;
CREATE TABLE if not EXISTS post(
    postID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username varchar(64) NOT NULL,
    title varchar(256) NOT NULL,
    body varchar(256) NOT NULL,
    likes INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS reply;
CREATE TABLE if not EXISTS reply(
    replyID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    postID INTEGER NOT NULL,
    username varchar(64) NOT NULL,
    reply varchar(256) NOT NULL,
    likes INTEGER DEFAULT 0,
    FOREIGN KEY (postID) REFERENCES post(postID)
);

DROP TABLE IF EXISTS likePost;
CREATE TABLE if not EXISTS likePost(
    likeID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username varchar(64) NOT NULL,
    postID varchar(256),
    replyID varchar(256),
    FOREIGN KEY (postID) REFERENCES post(postID),
    FOREIGN KEY (replyID) REFERENCES post(replyID),
    UNIQUE(username, postID) ON CONFLICT REPLACE
    UNIQUE(username, replyID) ON CONFLICT REPLACE
);

INSERT INTO users (username, email, name, password, userType)
VALUES ('Tassarna', 'h19robhe@du.se', 'Robin Hellström', 12345, 'Super Admin');
INSERT INTO users (username, email, name, password, userType)
VALUES ('Hyena', 'h19davth@du.se', 'David Thiman', '12345', 'Super Admin');