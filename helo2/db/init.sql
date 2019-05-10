create table users(
    id serial primary key,
    username varchar(20),
    password varchar(20),
    profile_pic text
)

create table posts(
    id serial primary KEY,
    title VARCHAR(45),
    img text,
    content text,
    author_id integer references users (id)
)