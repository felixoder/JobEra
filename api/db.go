package main

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

func initDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL environment variable not set")
	}
	db, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Failed to open database:", err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal("Failed to ping database:", err)
	}
	log.Println("Database connection established")
	createTables()
}

func createTables() {
	usersTable := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		fullname VARCHAR(100),
		username VARCHAR(100) NOT NULL UNIQUE,
		email VARCHAR(100) NOT NULL ,
		password TEXT NOT NULL,
		is_recruiter BOOLEAN DEFAULT FALSE,
		resume TEXT,
		profile_image TEXT ,
		portfolio TEXT,
		skills TEXT,
		is_premium BOOLEAN DEFAULT FALSE,
		position TEXT,
		address TEXT,
		bio TEXT,
		description TEXT
	);
	`
	jobsTable :=`
	CREATE TABLE IF NOT EXISTS jobs (
		id SERIAL PRIMARY KEY,
		post TEXT,
		title TEXT,
		logo TEXT,
		address TEXT,
		glassdoor BOOLEAN DEFAULT FALSE,
		company TEXT,
		author TEXT,
		type TEXT,
		glassdoortext TEXT,
		description TEXT,
		skills TEXT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		slug TEXT,
		salary TEXT,
		experience TEXT
	
	)
	
	`
	applicationsTable := `
	CREATE TABLE IF NOT EXISTS applications (
	id SERIAL PRIMARY KEY,
	fullname TEXT,
	resume TEXT,
	why TEXT,
	additional TEXT,
	glassdoor_answer TEXT,
	username TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	slug TEXT,
	glassdoor BOOLEAN DEFAULT FALSE,
	application TEXT,
	author TEXT,
	status TEXT 
	)
	
	`



	// jobs table handling

	_,err := db.Exec(jobsTable)
	if err != nil {
		log.Fatal("Failed to create jobs table",err)

	}
	log.Println("jobs table created or already exists")

	// users table handeling


	_, err1 := db.Exec(usersTable)
	if err != nil {
		log.Fatal("Failed to create users table:", err1)
	}
	log.Println("Users table created or already exists")

	// application table handeling

	_,err2 := db.Exec(applicationsTable)
	if err != nil {
		log.Fatal("Failed to create applications table",err2)

	}
	log.Println("Applications table created or already exists")


	
}
