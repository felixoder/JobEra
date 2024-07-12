package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
	"bytes"
	"strconv"
	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/checkout/session"
	"os"
	
	
)

type user struct {
	FullName     string `json:"fullname"`
	UserName     string `json:"username"`
	Email        string `json:"email"`
	Password     string `json:"password"`
	IsRecruiter  bool   `json:"is_recruiter"`
	Resume       string `json:"resume"`
	ProfileImage string `json:"profile_image"`
	Address      string `json:"address"`
	Bio          string `json:"bio"`
	Description  string `json:"description"`
	Position     string `json:"position"`
	Skills       string `json:"skills"`
	IsPremium    bool   `json:"is_premium"`
	Portfolio    string `json:"portfolio"`
	
}



func Register_Recruiter(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var person user
	err := json.NewDecoder(r.Body).Decode(&person)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Ensure IsRecruiter is set to true
	person.IsRecruiter = true
	person.IsPremium = false

	fmt.Printf("User to be inserted: %+v\n", person) // Debug print

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(person.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}
	person.Password = string(hashedPassword)

	// Generate a unique username
	person.UserName = generateUniqueUsername(person.FullName, "-recruiter")

	// Insert user into the database
	insertUserQuery := `
		INSERT INTO users (fullname, username, email, password, is_recruiter, resume, profile_image, address, bio, description, position, portfolio, is_premium, skills)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
		RETURNING id
	`

	var userID int
	err = db.QueryRow(insertUserQuery, person.FullName, person.UserName, person.Email, person.Password, person.IsRecruiter, person.Resume, person.ProfileImage, person.Address, person.Bio, person.Description, person.Position, person.Portfolio, person.IsPremium, person.Skills).Scan(&userID)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to insert recruiter", http.StatusInternalServerError)
		return
	}

	fmt.Println("Inserted a single document with ID: ", userID)
	json.NewEncoder(w).Encode(map[string]int{"user_id": userID})
}

func Register_Normal(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var person user
	err := json.NewDecoder(r.Body).Decode(&person)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Ensure IsRecruiter is set to true
	person.IsRecruiter = false
	person.IsPremium = false

	fmt.Printf("User to be inserted: %+v\n", person) // Debug print

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(person.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}
	person.Password = string(hashedPassword)

	// Generate a unique username
	person.UserName = generateUniqueUsername(person.FullName, "-user")

	// Insert user into the database
	insertUserQuery := `
		INSERT INTO users (fullname, username, email, password, is_recruiter, resume, profile_image, address, bio, description, position, portfolio, is_premium, skills)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
		RETURNING id
	`

	var userID int
	err = db.QueryRow(insertUserQuery, person.FullName, person.UserName, person.Email, person.Password, person.IsRecruiter, person.Resume, person.ProfileImage, person.Address, person.Bio, person.Description, person.Position, person.Portfolio, person.IsPremium, person.Skills).Scan(&userID)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to insert user", http.StatusInternalServerError)
		return
	}

	fmt.Println("Inserted a single document with ID: ", userID)
	json.NewEncoder(w).Encode(map[string]int{"user_id": userID})
}

func generateUniqueUsername(fullName string, suffix string) string {
	if len(fullName) > 4 {
		fullName = fullName[:4]
	}
	return fmt.Sprintf("%s_%d%s", fullName, time.Now().Unix(), suffix)
}

// Get all users
func getUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	queryParams := r.URL.Query()
	username := queryParams.Get("username")
	address := queryParams.Get("address")
	fullname := queryParams.Get("fullname")
	email := queryParams.Get("email")

	query := "SELECT fullname, username, email, is_recruiter, resume, profile_image, address, bio, description, is_premium, skills, portfolio, position FROM users WHERE 1=1"
	var args []interface{}
	argCounter := 1

	if username != "" {
		query += fmt.Sprintf(" AND username = $%d", argCounter)
		args = append(args, username)
		argCounter++
	}
	if address != "" {
		query += fmt.Sprintf(" AND address = $%d", argCounter)
		args = append(args, address)
		argCounter++
	}
	if fullname != "" {
		query += fmt.Sprintf(" AND fullname = $%d", argCounter)
		args = append(args, fullname)
		argCounter++
	}
	if email != "" {
		query += fmt.Sprintf(" AND email = $%d", argCounter)
		args = append(args, email)
		argCounter++
	}

	var person user
	err := db.QueryRow(query, args...).Scan(
		&person.FullName,
		&person.UserName,
		&person.Email,
		&person.IsRecruiter,
		&person.Resume,
		&person.ProfileImage,
		&person.Address,
		&person.Bio,
		&person.Description,
		&person.IsPremium,
		&person.Skills,
		&person.Portfolio,
		&person.Position,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, "Failed to get user", http.StatusInternalServerError)
		}
		return
	}

	json.NewEncoder(w).Encode(person)
}

func getAllUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    query := `
        SELECT email, password, is_recruiter, fullname, username, resume, description, profile_image, bio, address, is_premium, portfolio, skills, position 
        FROM users
    `
    rows, err := db.Query(query)
    if err != nil {
        log.Println("Failed to retrieve users:", err)
        http.Error(w, "Failed to retrieve users", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var users []user
    for rows.Next() {
        var person user
        err := rows.Scan(
            &person.Email,
            &person.Password,
            &person.IsRecruiter,
            &person.FullName,
            &person.UserName,
            &person.Resume,
            &person.Description,
            &person.ProfileImage,
            &person.Bio,
            &person.Address,
            &person.IsPremium,
            &person.Portfolio,
            &person.Skills,
            &person.Position,
        )
        if err != nil {
            log.Println("Failed to scan user:", err)
            http.Error(w, "Failed to scan user", http.StatusInternalServerError)
            return
        }
        users = append(users, person)
    }

    if err = rows.Err(); err != nil {
        log.Println("Error iterating through users:", err)
        http.Error(w, "Error iterating through users", http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(users)
}
func getAllPremiumUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    query := `
        SELECT email, is_recruiter, fullname, username, resume, description, profile_image, bio, address, is_premium, portfolio, skills, position 
        FROM users
        WHERE is_premium = true
    `
    rows, err := db.Query(query)
    if err != nil {
        log.Println("Failed to retrieve premium users:", err)
        http.Error(w, "Failed to retrieve premium users", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var users []user
    for rows.Next() {
        var person user
        err := rows.Scan(
            &person.Email,
            &person.IsRecruiter,
            &person.FullName,
            &person.UserName,
            &person.Resume,
            &person.Description,
            &person.ProfileImage,
            &person.Bio,
            &person.Address,
            &person.IsPremium,
            &person.Portfolio,
            &person.Skills,
            &person.Position,
        )
        if err != nil {
            log.Println("Failed to scan user:", err)
            http.Error(w, "Failed to scan user", http.StatusInternalServerError)
            return
        }
        users = append(users, person)
    }

    if err = rows.Err(); err != nil {
        log.Println("Error iterating through users:", err)
        http.Error(w, "Error iterating through users", http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(users)
}


func signIn(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var input user
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Find user by email
	var result user
	query := `
		SELECT email, password, is_recruiter, fullname, username, resume, description, profile_image, bio, address, is_premium, portfolio, skills, position
		FROM users
		WHERE email = $1
	`
	err = db.QueryRow(query, input.Email).Scan(&result.Email, &result.Password, &result.IsRecruiter, &result.FullName, &result.UserName, &result.Resume, &result.Description, &result.ProfileImage, &result.Bio, &result.Address, &result.IsPremium, &result.Portfolio, &result.Skills, &result.Position)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		} else {
			http.Error(w, "Failed to retrieve user", http.StatusInternalServerError)
		}
		return
	}

	// Compare hashed password with input password
	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(input.Password))
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Passwords match, set a cookie
	expiration := time.Now().Add(24 * time.Hour) // Cookie valid for 1 day
	cookie := http.Cookie{
		Name:     "session",
		Value:    "authenticated",
		Expires:  expiration,
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
	}
	http.SetCookie(w, &cookie)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"email":         result.Email,
		"is_recruiter":  result.IsRecruiter,
		"fullname":      result.FullName,
		"username":      result.UserName,
		"resume":        result.Resume,
		"description":   result.Description,
		"profile_image": result.ProfileImage,
		"bio":           result.Bio,
		"address":       result.Address,
		"skills":        result.Skills,
		"position":      result.Position,
		"portfolio":     result.Portfolio,
		"is_premium":    result.IsPremium,
	})
}

func editProfile(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    // Extract username from URL parameter
    params := mux.Vars(r)
    username := params["username"]

    var input user
    err := json.NewDecoder(r.Body).Decode(&input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Fetch the current profile from the database
    currentProfile, err := fetchProfileByUsername(username)
    if err != nil {
        http.Error(w, "Failed to fetch current profile", http.StatusInternalServerError)
        return
    }

    // Prepare the update query
    var updateQuery bytes.Buffer
    updateQuery.WriteString("UPDATE users SET ")

    var queryParams []interface{}
    var paramIndex = 1

    // Function to append conditionally to query and parameters
    appendQueryParam := func(fieldName string, value interface{}) {
        if paramIndex > 1 {
            updateQuery.WriteString(", ")
        }
        updateQuery.WriteString(fieldName)
        updateQuery.WriteString(" = $")
        updateQuery.WriteString(strconv.Itoa(paramIndex))
        queryParams = append(queryParams, value)
        paramIndex++
    }

    // Handle each field conditionally
    if input.FullName != "" {
        appendQueryParam("fullname", input.FullName)
    }
    if input.Address != "" {
        appendQueryParam("address", input.Address)
    }
    if input.Skills != "" {
        appendQueryParam("skills", input.Skills)
    }
    if input.Position != "" {
        appendQueryParam("position", input.Position)
    }
    if input.Resume != "" {
        appendQueryParam("resume", input.Resume)
    }
    if input.ProfileImage != "" {
        appendQueryParam("profile_image", input.ProfileImage)
    }
    if input.Portfolio != "" {
        appendQueryParam("portfolio", input.Portfolio)
    }
    if input.Bio != "" {
        appendQueryParam("bio", input.Bio)
    }
    if input.Description != "" {
        appendQueryParam("description", input.Description)
    }

    // Handle is_premium field
    if input.IsPremium || !currentProfile.IsPremium {
        appendQueryParam("is_premium", input.IsPremium)
    }

    // Append the WHERE clause
    updateQuery.WriteString(" WHERE username = $")
    updateQuery.WriteString(strconv.Itoa(paramIndex))
    queryParams = append(queryParams, username)

    // Execute the update query
    _, err = db.Exec(updateQuery.String(), queryParams...)
    if err != nil {
        log.Fatal(err)
        http.Error(w, "Failed to update profile", http.StatusInternalServerError)
        return
    }

    // Fetch the updated profile from the database
    updatedProfile, err := fetchProfileByUsername(username)
    if err != nil {
        http.Error(w, "Failed to fetch updated profile", http.StatusInternalServerError)
        return
    }

    // Construct the response JSON
    response := map[string]interface{}{
        "email":         updatedProfile.Email,
        "is_recruiter":  updatedProfile.IsRecruiter,
        "fullname":      updatedProfile.FullName,
        "username":      updatedProfile.UserName,
        "resume":        updatedProfile.Resume,
        "description":   updatedProfile.Description,
        "profile_image": updatedProfile.ProfileImage,
        "bio":           updatedProfile.Bio,
        "address":       updatedProfile.Address,
        "skills":        updatedProfile.Skills,
        "position":      updatedProfile.Position,
        "portfolio":     updatedProfile.Portfolio,
        "is_premium":    updatedProfile.IsPremium,
        "message":       "Profile updated successfully!",
    }

    // Encode response to JSON
    err = json.NewEncoder(w).Encode(response)
    if err != nil {
        log.Fatal(err)
        http.Error(w, "Failed to encode response", http.StatusInternalServerError)
        return
    }
}


func fetchProfileByUsername(username string) (user, error) {
    var person user

    query := "SELECT fullname, username, email, is_recruiter, resume, profile_image, address, bio, description, is_premium, skills, portfolio, position FROM users WHERE username = $1"

    err := db.QueryRow(query, username).Scan(
        &person.FullName,
        &person.UserName,
        &person.Email,
        &person.IsRecruiter,
        &person.Resume,
        &person.ProfileImage,
        &person.Address,
        &person.Bio,
        &person.Description,
        &person.IsPremium,
        &person.Skills,
        &person.Portfolio,
        &person.Position,
    )
    if err != nil {
        return person, err
    }

    return person, nil
}




func signOut(w http.ResponseWriter, r *http.Request) {
	cookie := http.Cookie{
		Name:     "session",
		Value:    "",
		Expires:  time.Now().Add(-1 * time.Hour),
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
	}
	http.SetCookie(w, &cookie)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Logged out successfully"})
}

func BuyPremium(w http.ResponseWriter, r *http.Request) {
	// Set your Stripe secret key
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

	// Extract username from request body or query parameter
	var params struct {
		Username string `json:"username"`
	}
	if err := json.NewDecoder(r.Body).Decode(&params); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Replace with logic to fetch user details from your database based on the username
	// Example:
	// user, err := getUserByUsername(params.Username)
	// if err != nil {
	//   http.Error(w, "User not found", http.StatusNotFound)
	//   return
	// }

	// Create a new Checkout Session with Stripe
	stripeParams := &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
					Currency: stripe.String("usd"),
					ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
						Name: stripe.String("Premium Access"),
					},
					UnitAmount: stripe.Int64(1000), // Amount in cents (10 USD)
				},
				Quantity: stripe.Int64(1),
			},
		},
		Mode:       stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL: stripe.String("https://jobera-go.vercel.app/confirm"), // Redirect to success URL after payment
		CancelURL:  stripe.String("https://jobera-go.vercel.app//cancel"),  // Redirect to cancel URL if payment fails
	}

	session, err := session.New(stripeParams)
	if err != nil {
		http.Error(w, "Failed to create checkout session", http.StatusInternalServerError)
		return
	}

	// Return the session ID to frontend
	json.NewEncoder(w).Encode(map[string]string{"sessionId": session.ID})
}