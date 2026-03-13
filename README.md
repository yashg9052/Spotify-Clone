Spotify Clone

Spotify Clone is a full-stack music streaming application built using a microservices architecture. The platform allows users to browse albums, play songs, and manage playlists, while administrators can upload and manage music content.

TECH STACK

Frontend
React 19 with TypeScript
Vite
Tailwind CSS
React Router
Axios
React Icons
React Hot Toast

Backend Services

User Service (Port 5000)
The user service is responsible for authentication and authorization. It manages user registration, login, and profile data. Passwords are securely hashed using bcrypt and authentication is handled using JWT tokens.

Song Service (Port 8000)
The song service manages song and album metadata. It retrieves album information, song lists, and individual song details. Redis is used as a caching layer to improve performance.

Admin Service (Port 7000)
The admin service provides functionality for administrators to manage the music library. Admins can create albums, upload songs, add thumbnails, and delete albums or songs. File uploads are handled through Cloudinary.

DATABASES AND SERVICES

MongoDB is used for storing user data.
PostgreSQL (Neon) is used for storing album and song metadata.
Redis is used for caching frequently accessed data.
Cloudinary is used for storing images and audio files.
JWT tokens are used for authentication with a 7 day expiry.

APPLICATION FEATURES

User Features
Users can register and log in using their email and password. After authentication they can browse albums, view songs within albums, play songs using the built-in music player, and create personal playlists. Playlist access is protected and only available to authenticated users.

Admin Features
Administrators can create new albums with thumbnails, upload songs with audio files, add thumbnails to songs, and delete albums or songs from the platform.

Music Player
The application includes a music player that allows users to play and pause songs, move to the next or previous song, and stream audio files directly from cloud storage. The player uses global state management to keep track of the currently playing song.

SECURITY

Authentication is implemented using JWT tokens.
Passwords are securely hashed using bcrypt.
Role based access control ensures that only administrators can access admin endpoints.
CORS is enabled to allow communication between services.

PERFORMANCE OPTIMIZATIONS

Redis caching is used to reduce database queries and improve performance.
Cloudinary CDN is used for faster image and audio delivery.
React Context API is used to manage global state without prop drilling.
Pagination and lazy loading are used when fetching large datasets.

DEVELOPMENT WORKFLOW

The project follows a monorepo structure where the frontend and all backend services exist in the same repository. TypeScript is used across the entire project for better type safety. During development Nodemon is used to automatically restart backend services and TypeScript is compiled in watch mode to ensure smooth development.
