package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
    "strconv"
	_ "github.com/lib/pq" // Import PostgreSQL driver
    "github.com/gorilla/mux"
)

type Job struct {
	ID            int       `json:"id"`
	Post          string    `json:"post"`
	Title         string    `json:"title"`
	Logo          string    `json:"logo"`
	Address       string    `json:"address"`
	Glassdoor     bool      `json:"glassdoor"`
	Company       string    `json:"company"`
	Author        string    `json:"author"`
	Type          string    `json:"type"`
	Glassdoortext string    `json:"glassdoortext"`
	Description   string    `json:"description"`
	Skills        string    `json:"skills"`
	CreatedAt     time.Time `json:"created_at"`
    Slug          string    `json:"slug"`
    Salary        string    `json:"salary"`
    Experience    string    `json:"experience"`
}

func PostJob(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    var job Job
    err := json.NewDecoder(r.Body).Decode(&job)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Set createdAt field to current time
    job.CreatedAt = time.Now()

    // Generate slug
    job.Slug = generateSlug(job.Title)

    // Insert job into the database
    insertJobQuery := `
        INSERT INTO jobs (post, title, logo, address, glassdoor, company, author, type, glassdoortext, description, skills, created_at, slug, salary, experience)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING id
    `

    var jobID int
    err = db.QueryRow(insertJobQuery, job.Post, job.Title, job.Logo, job.Address, job.Glassdoor, job.Company, job.Author, job.Type, job.Glassdoortext, job.Description, job.Skills, job.CreatedAt, job.Slug, job.Salary, job.Experience).Scan(&jobID)
    if err != nil {
        log.Println("Failed to insert job:", err)
        http.Error(w, "Failed to insert job", http.StatusInternalServerError)
        return
    }

    fmt.Println("Inserted a single document with ID:", jobID)
    json.NewEncoder(w).Encode(map[string]int{"job_id": jobID})
}


func GetJobs(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    queryParams := r.URL.Query()
    title := queryParams.Get("title")
    post := queryParams.Get("post")
    company := queryParams.Get("company")
    username := queryParams.Get("username")
    id := queryParams.Get("id")
    slug := queryParams.Get("slug")
    salary := queryParams.Get("salary")
    experience := queryParams.Get("experience")

    query := "SELECT id, post, title, logo, address, glassdoor, company, author, type, glassdoortext, description, skills, created_at, slug, salary, experience FROM jobs WHERE 1=1"
    var args []interface{}
    argCounter := 1

    if title != "" {
        query += fmt.Sprintf(" AND title = $%d", argCounter)
        args = append(args, title)
        argCounter++
    }
    if post != "" {
        query += fmt.Sprintf(" AND post = $%d", argCounter)
        args = append(args, post)
        argCounter++
    }
    if company != "" {
        query += fmt.Sprintf(" AND company = $%d", argCounter)
        args = append(args, company)
        argCounter++
    }
    if username != "" {
        query += fmt.Sprintf(" AND author = $%d", argCounter)
        args = append(args, username)
        argCounter++
    }
    if slug != "" {
        query += fmt.Sprintf(" AND slug = $%d", argCounter)
        args = append(args, slug)
        argCounter++
    }
    if salary != "" {
        query += fmt.Sprintf(" AND salary = $%d", argCounter)
        args = append(args, salary)
        argCounter++
    }
    if experience != "" {
        query += fmt.Sprintf(" AND experience = $%d", argCounter)
        args = append(args, experience)
        argCounter++
    }
    if id != "" && id != "undefined" {
        idInt, err := strconv.Atoi(id)
        if err != nil {
            log.Println("Invalid id parameter:", id)
            http.Error(w, "Invalid id parameter", http.StatusBadRequest)
            return
        }
        query += fmt.Sprintf(" AND id = $%d", argCounter)
        args = append(args, idInt)
        argCounter++
    }

    rows, err := db.Query(query, args...)
    if err != nil {
        log.Println("Failed to retrieve jobs:", err)
        http.Error(w, "Failed to retrieve jobs", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var jobs []Job
    for rows.Next() {
        var job Job
        err := rows.Scan(
            &job.ID,
            &job.Post,
            &job.Title,
            &job.Logo,
            &job.Address,
            &job.Glassdoor,
            &job.Company,
            &job.Author,
            &job.Type,
            &job.Glassdoortext,
            &job.Description,
            &job.Skills,
            &job.CreatedAt,
            &job.Slug,
            &job.Salary,
            &job.Experience,
        )
        if err != nil {
            log.Println("Failed to scan job:", err)
            http.Error(w, "Failed to scan job", http.StatusInternalServerError)
            return
        }
        jobs = append(jobs, job)
    }

    if err = rows.Err(); err != nil {
        log.Println("Error iterating through jobs:", err)
        http.Error(w, "Error iterating through jobs", http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(jobs)
}


func generateSlug(title string) string {
    timestamp := strconv.FormatInt(time.Now().Unix(), 10)
    slug := fmt.Sprintf("%s-%s", title, timestamp)
    return slug
}

// delete user

func deletePost(w http.ResponseWriter, r *http.Request) {
	
		vars := mux.Vars(r)
		id := vars["id"]

		// Convert id to int
		jobID, err := strconv.Atoi(id)
		if err != nil {
			log.Println("Invalid job ID:", id)
			http.Error(w, "Invalid job ID", http.StatusBadRequest)
			return
		}

		// Check if job exists
		var job Job
		err = db.QueryRow("SELECT * FROM jobs WHERE id = $1", jobID).Scan(
			&job.ID, &job.Post, &job.Title, &job.Logo, &job.Address, &job.Glassdoor,
			&job.Company, &job.Author, &job.Type, &job.Glassdoortext, &job.Description,
			&job.Skills, &job.CreatedAt, &job.Slug, &job.Salary, &job.Experience,
		)
		if err != nil {
			log.Println("Job not found:", err)
			http.Error(w, "Job not found", http.StatusNotFound)
			return
		}

		// Delete job
		_, err = db.Exec("DELETE FROM jobs WHERE id = $1", jobID)
		if err != nil {
			log.Println("Failed to delete job:", err)
			http.Error(w, "Failed to delete job", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Job deleted successfully"})
	}
