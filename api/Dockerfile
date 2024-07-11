# Use official Golang image
FROM golang:1.16.3-alpine3.13 AS builder

# Set working directory
WORKDIR /app

# Copy the source code
COPY . .

# Download dependencies using Go modules
RUN go mod download

# Build the Go app
RUN go build -o api .

# Final stage: use smaller base image for runtime
FROM alpine:3.13

# Set working directory in the final image
WORKDIR /app

# Copy the built executable from the builder stage
COPY --from=builder /app/api .

# Expose port 8000
EXPOSE 8000

# Command to run the executable
CMD ["./api"]
