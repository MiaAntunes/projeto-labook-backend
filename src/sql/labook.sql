-- Active: 1690556535682@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT UNIQUE NOT NULL,
    likes TEXT NOT NULL,
    deslikes TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON UPDATE CASCADE
	    ON DELETE CASCADE
);

CREATE TABLE likes_deslikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE
	    ON DELETE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON UPDATE CASCADE
	    ON DELETE CASCADE
);

INSERT INTO users(id,name,email,password,role)
VALUES 
    ("u001", "Doctor Who", "doctor_who@hotmail.com","doctorWHO?1963", "ADMIN"),
    ("u002", "Sarah Jane", "sarahJS@hotmail.com","loveK9123!", "NORMAL"),
    ("u003", "miau", "miau@hotmail.com","doctorWHO?1963", "NORMAL"),
    ("u004", "maya", "maya@hotmail.com","doctorWHO?1963", "NORMAL");