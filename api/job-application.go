package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"
)

type Application struct {
	ID              int       `json:"id"`
	Fullname        string    `json:"fullname"`
	Resume          string    `json:"resume"`
	Why             string    `json:"why"`
	Additional      string    `json:"additional"`
	GlassdoorAnswer string    `json:"glassdoor_answer"`
	Username        string    `json:"username"`
	CreatedAt       time.Time `json:"created_at"`
	Slug            string    `json:"slug"`
	Glassdoor       bool      `json:"glassdoor"`
	Application     string    `json:"application"`
	Author          string    `json:"author"`
	Status          string    `json:"status"`
}

func PostApplication(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var application Application
	err := json.NewDecoder(r.Body).Decode(&application)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Set createdAt field to current time
	application.CreatedAt = time.Now()

	// Generate slug
	application.Slug = generateSlug_app(application.Username)

	// Insert application into the database
	insertApplicationQuery := `
		INSERT INTO applications (fullname, resume, why, additional, glassdoor_answer, username, created_at, slug, glassdoor, application, author, status)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
		RETURNING id
	`

	var applicationID int
	err = db.QueryRow(insertApplicationQuery, application.Fullname, application.Resume, application.Why, application.Additional, application.GlassdoorAnswer, application.Username, application.CreatedAt, application.Slug, application.Glassdoor, application.Application, application.Author, application.Status).Scan(&applicationID)
	if err != nil {
		log.Println("Failed to insert application:", err)
		http.Error(w, "Failed to insert application", http.StatusInternalServerError)
		return
	}

	fmt.Println("Inserted a single document with ID:", applicationID)
	json.NewEncoder(w).Encode(map[string]int{"application_id": applicationID})
}

func GetApplications(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	fullname := queryParams.Get("fullname")
	author := queryParams.Get("author")
	status := queryParams.Get("status")
	username := queryParams.Get("username")

	query := "SELECT id, fullname, resume, why, additional, glassdoor_answer, username, created_at, slug, glassdoor, application, author, status FROM applications WHERE 1=1"
	var args []interface{}
	argCounter := 1

	if author != "" {
		query += fmt.Sprintf(" AND author = $%d", argCounter)
		args = append(args, author)
		argCounter++
	}
	if fullname != "" {
		query += fmt.Sprintf(" AND fullname = $%d", argCounter)
		args = append(args, fullname)
		argCounter++
	}
	if status != "" {
		query += fmt.Sprintf(" AND status = $%d", argCounter)
		args = append(args, status)
		argCounter++
	}
	if username != "" {
		query += fmt.Sprintf(" AND username = $%d", argCounter)
		args = append(args, username)
		argCounter++
	}

	rows, err := db.Query(query, args...)
	if err != nil {
		log.Println("Failed to retrieve applications:", err)
		http.Error(w, "Failed to retrieve applications", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var applications []Application
	for rows.Next() {
		var application Application
		err := rows.Scan(
			&application.ID,
			&application.Fullname,
			&application.Resume,
			&application.Why,
			&application.Additional,
			&application.GlassdoorAnswer,
			&application.Username,
			&application.CreatedAt,
			&application.Slug,
			&application.Glassdoor,
			&application.Application,
			&application.Author,
			&application.Status,
		)
		if err != nil {
			log.Println("Failed to scan application:", err)
			http.Error(w, "Failed to scan application", http.StatusInternalServerError)
			return
		}
		applications = append(applications, application)
	}

	if err = rows.Err(); err != nil {
		log.Println("Error iterating through applications:", err)
		http.Error(w, "Error iterating through applications", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(applications)
}


func generateSlug_app(username string) string {
	timestamp := strconv.FormatInt(time.Now().Unix(), 10)
	slug := fmt.Sprintf("%s-%s", username, timestamp)
	return slug
}






// UpdateApplicationStatus updates the status of an application
func UpdateApplicationStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var application Application
	err := json.NewDecoder(r.Body).Decode(&application)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	updateQuery := "UPDATE applications SET status = $1 WHERE id = $2"
	_, err = db.Exec(updateQuery, application.Status, application.ID)
	if err != nil {
		log.Println("Failed to update application status:", err)
		http.Error(w, "Failed to update application status", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Status updated successfully"})
}
