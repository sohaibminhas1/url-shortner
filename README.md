URL Shortener with User Authentication
A full-stack Node.js + Express application that allows users to shorten URLs, track analytics, and manage links securely with authentication.
Inspired by services like Bit.ly, this project implements JWT-based authentication and stores data in MongoDB.

//Project Structure
URL-Shortener

Controllers/

url.js – Handles URL generation, redirection, and analytics

user.js – Handles user signup and login logic

Middleware/

auth.js – JWT authentication middleware

Models/

url.js – Mongoose schema for shortened URLs

user.js – Mongoose schema for users

Routes/

url.js – Endpoints for URL operations

user.js – Endpoints for user authentication

staticRouter.js – Routes for rendering EJS views

Services/

auth.js – JWT helper functions (sign & verify tokens)

Views/

home.ejs – Homepage view

login.ejs – Login page view

signup.ejs – Signup page view

index.js – Application entry point

.env – Environment variables (API keys, secrets, etc.)

.gitignore – Ignored files/folders for Git

package.json – Project metadata & dependencies



//Features
URL Shortening
Generate unique short IDs for long URLs using nanoid.

Redirect visitors to the original link when accessing the shortened URL.

Track visit history with timestamps for analytics.

User Authentication
Sign up / Login with email, name, and password.

Uses JWT tokens (stored in cookies) for session management.

Protects routes so only logged-in users can create and manage short URLs.

Analytics
Track total clicks for each short URL.

View detailed visit history (timestamps of each access).

Database (MongoDB via Mongoose)
Users: name, email, password.

URLs: shortId, redirectURL, visitHistory, createdBy.

//Frontend
Server-side rendered with EJS templates for:

Homepage

Login

Signup


//Tech Stack
Backend: Node.js, Express

Database: MongoDB, Mongoose

Templating Engine: EJS

Authentication: JWT + Cookies

Other: nanoid, cookie-parser, dotenv

