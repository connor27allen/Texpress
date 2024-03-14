# Texpress 

## Description

This is a MVC-style blog site where developers can publish articles, blog posts, and share their thoughts and opinions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To install the project locally, follow these steps:
1. Clone the repository.
2. Install the necessary dependencies by running `npm install`.
3. Set up the database by executing the provided SQL files.
    - Access the Database Management Tool: You can use tools like MySQL Workbench, pgAdmin for PostgreSQL, or the command-line interface to access your database.
    - Connect to the Database: Use the appropriate credentials to connect to your database server.
    - Select the Database: If the database you want to use already exists, select it using the command USE database_name;. If not, create a new database with CREATE DATABASE database_name; and then switch to it.
    - Execute SQL Files:
        - For MySQL: Use the command source file_path; in the MySQL command-line interface to execute the SQL file. For example, source schema.sql;.
        - For PostgreSQL: Use the command \i file_path in the PostgreSQL command-line interface to execute the SQL file. For example, \i schema.sql.
4. Configure the environment variables for authentication.

## Usage

- Upon visiting the site for the first time, you will be presented with the homepage containing existing blog posts, navigation links for the homepage and dashboard, and the option to log in.
- Clicking on the homepage option will take you to the homepage.
- Clicking on any other links in the navigation will prompt you to sign up or sign in.
- When signing up, you will be asked to create a username and password.
- After signing up, your user credentials will be saved, and you will be logged into the site.
- Upon revisiting the site and signing in, you will see navigation links for the homepage, dashboard, and the option to log out.
- Clicking on the homepage option will take you to the homepage with existing blog posts.
- Clicking on an existing blog post will show you the post title, contents, post creator's username, and date created, with the option to leave a comment.
- Entering a comment and submitting it while signed in will save the comment and update the post to display the comment, the comment creator's username, and the date created.
- Clicking on the dashboard option in the navigation will take you to the dashboard with existing blog posts and the option to add a new blog post.
- Clicking on the button to add a new blog post will prompt you to enter a title and contents for your post.
- Clicking on the button to create a new blog post will save the title and contents of your post and take you back to an updated dashboard with your new blog post.
- Clicking on one of your existing posts in the dashboard will allow you to delete or update the post and be taken back to an updated dashboard.
- Clicking on the logout option in the navigation will sign you out of the site.
- If idle on the site for more than a set time, you will be able to view posts and comments but will be prompted to log in again before adding, updating, or deleting posts.

## License

This project is licensed under the MIT license.

## Tests

To run tests for this project, use the following command: `npm test`.

## Questions

If you have any questions or need support, please contact Connor Allen via https://github.com/connor27allen or email at connor27allen@gmail.com.
