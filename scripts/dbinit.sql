CREATE USER taskuser with password 'password';
CREATE DATABASE taskdemo;
GRANT ALL PRIVILEGES ON DATABASE taskdemo TO taskuser;
ALTER DATABASE taskdemo OWNER TO taskuser;
