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
    PostID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    userID INTEGER NOT NULL,
    information varchar(256) NOT NULL,
    title varchar(256) NOT NULL,
    likes INTEGER DEFAULT 0,
    FOREIGN KEY (userID) REFERENCES users(userID)
);

DROP TABLE IF EXISTS reply;
CREATE TABLE if not EXISTS reply(
    replyID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    userID INTEGER NOT NULL,
    Post_ID INTEGER NOT NULL,
    information varchar(256) NOT NULL,
    title varchar(256) NOT NULL,
    likes INTEGER DEFAULT 0,
    FOREIGN KEY (userID) REFERENCES users(userID)
    FOREIGN KEY (Post_ID) REFERENCES post(Post_ID)
);

INSERT INTO users (username, email, name, password, userType)
VALUES ('Tassarna', 'h19robhe@du.se', 'Robin Hellström', 12345, 'Super Admin');
INSERT INTO users (username, email, name, password, userType)
VALUES ('Hyena', 'h19davth@du.se', 'David Thiman', '12345', 'Super Admin');