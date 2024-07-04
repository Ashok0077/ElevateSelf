# Elevate Self Blog Website

### Live Demo[https://elevate-self.vercel.app]

## Overview

Elevate Self is a feature-rich blog website designed to empower users to create, read, edit, and delete posts. Users can also add images to their posts, comment on posts, and like posts. The website features both a user interface and an admin dashboard. The admin dashboard provides analytics for the website.

## Features

- **User Authentication**: Users can sign up, sign in, and sign out securely using Google OAuth.
- **Authorization**: Different levels of access are provided based on user roles. Regular users can create, read, edit, and delete their own posts. Admin users have access to additional features, such as analytics.
- **Create, Read, Update, Delete (CRUD) Operations**: Users can perform CRUD operations on blog posts. They can create new posts, read existing posts, edit their own posts, and delete their posts.
- **Image Upload**: Firebase is used for image upload functionality. Users can upload images to accompany their blog posts.
- **Comments**: Users can comment on blog posts to share their thoughts and engage in discussions.
- **Likes**: Users can like posts to show their appreciation for the content.
- **Tech Stack**: The website is built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Tailwind CSS is used for styling.

## Usage

1. **Sign Up/Login**: Users can sign up or log in to the website using their Google account.
2. **Create Post**: After logging in, users can create new blog posts by providing a title, content, and optional image.
3. **Read Post**: Users can view existing blog posts on the homepage and navigate to individual post pages to read more.
4. **Edit Post**: Users can edit their own posts by accessing the post's edit page.
5. **Delete Post**: Users can delete their own posts from the post's edit page.
6. **Comment**: Users can comment on blog posts to share their thoughts and engage with other users.
7. **Like**: Users can like posts to show their appreciation for the content.


## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Image Upload**: Firebase


## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies using `npm install`.
3. Set up environment variables for MongoDB connection, Firebase configuration, and Google OAuth credentials.
4. Start the backend server using `npm start`.
5. Navigate to the `client` directory and start the frontend server using `npm run dev`.
6. Access the website in your browser at `http://localhost:3000`.

## Contributing

Contributions to the Elevate Self blog website are welcome! If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request on the GitHub repository.