package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func enableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("CORS middleware triggered for request to:", r.URL.Path)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	initDB()         // Initialize database connection
	defer db.Close() // Ensure database connection is closed when main function exits

	r := mux.NewRouter() // Create a new instance of Gorilla Mux router
	r.Use(enableCors)    // Apply CORS middleware to all routes

	api := r.PathPrefix("/api").Subrouter() // Create subrouter for API endpoints under /api
	api.HandleFunc("/register-recruiter", Register_Recruiter).Methods("POST", "OPTIONS")
	api.HandleFunc("/register-normal", Register_Normal).Methods("POST", "OPTIONS")
	api.HandleFunc("/get-user", getUser).Methods("GET", "OPTIONS")
	api.HandleFunc("/get-all-users", getAllUsers).Methods("GET", "OPTIONS")
	api.HandleFunc("/edit-profile/{username}", editProfile).Methods("PUT", "OPTIONS")
	api.HandleFunc("/sign-in", signIn).Methods("POST", "OPTIONS")
	api.HandleFunc("/sign-out",signOut).Methods("POST","OPTIONS")

	


	// for jobs

	api.HandleFunc("/post-jobs",PostJob).Methods("POST","OPTIONS")
	api.HandleFunc("/get-jobs",GetJobs).Methods("GET","OPTIONS")
	api.HandleFunc("/delete-jobs/{id}",deletePost).Methods("DELETE","OPTIONS")




	// premium purchase 
	api.HandleFunc("/buy-premium",BuyPremium).Methods("POST","OPTIONS")

	// premium users
	
	api.HandleFunc("/get-premium",getAllPremiumUsers).Methods("GET","OPTIONS")



	// for application

	api.HandleFunc("/apply-jobs",PostApplication).Methods("POST","OPTIONS")
	api.HandleFunc("/get-application",GetApplications).Methods("GET","OPTIONS")
	api.HandleFunc("/update-status",UpdateApplicationStatus).Methods("PUT","OPTIONS")


	//  for feedback


	port := ":8000" // Specify the port to listen on
	log.Printf("Server is listening on port %s", port)
	log.Fatal(http.ListenAndServe(port, r)) // Start the HTTP server
}


