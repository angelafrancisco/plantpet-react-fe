# React + Django Full-Stack App

**Week 10: April 2022. Project #4 for General Assembly.**

_(Note: This project is a continuation of my previous MERN full-stack app, utilizing React + Python/Django instead of React + Node/Express.)_

![languages-used](https://img.shields.io/github/languages/count/angelafrancisco/plantpet-react-fe)
![languages-top-count](https://img.shields.io/github/languages/top/angelafrancisco/plantpet-react-fe?color=brightgreen)

PlantPet - A full-stack web application for the plant obsessed, plant newbies, and aspiring plant parents. Track individual plant watering, add photos, and personalized plant care!


## Deployed Website

Hosted via Heroku: https://plantpet.herokuapp.com/


## Technology

- HTML | CSS | Javascript
- React
- Python | Django
- PostgreSQL


## Repositories

- PlantPet React + Django full-stack app:
    - Front-End: https://github.com/angelafrancisco/plantpet-react-fe
    - Back-End: https://github.com/angelafrancisco/plantpet-django-be

- _Previous version: PlantPet MERN full-stack app: [Front-End Repo](https://github.com/angelafrancisco/plant-front-end) | [Back-End Repo](https://github.com/angelafrancisco/plant-back-end)_


## User Stories

- Homepage shows app features and links to login or register an account.
    - _(Note: Currently user register/login not in production. Register/Login buttons will take you to the user dashboard.)_
- User can navigate to register or login pages.
- User can add plants to their "My Plants" section, creating a name, adding plant type, image url, room name, window direction, and notes about plant.
- Once a plant is added, user can edit or delete plant.
- User can complete watering tasks in their "My Tasks" section, as they are auto-generated after creating a new plant.
- User can add a new status to their "Plant Status" section, creating a health status update for any current plant, adding status date, plant health (poor/good/excellent), and notes.


## Wireframing

- Homepage
![Wireframe-Home](/public/images/PlantPet%20App%20Wireframming_Home.png "Homepage")

- Login/Register
![Wireframe-Register](/public/images/PlantPet%20App%20Wireframming_register.png "User Register Page")

- User Home Dashboard
![Wireframe-User-Dashboard](/public/images/PlantPet%20App%20Wireframming_dashboard.png "User Dashboard")


## GA Project Requirements (MVP)

- A full-stack application (React + Python/Django)
- MVC file structure: Models, Views, Controllers (Note: React is views)
- At least one new model with full CRUD
    - First model: Plant
    - Second model: Status
- At least three react components, besides App.js
- Deployed online and accessible to the public via Heroku
- Two git repositories, one for backend and one for frontend
- A `README.md` file with explanations of the technologies used, the approach taken, unsolved problems, user stories, and notes
- Links to hosted and working apps


## Project Stretch Goals

- Wireframing (created via Figma)
- Favicon/Logo
- Plant modal display (for add new plant/status or edit plant/status)
- Plant default image, if no image url given
    - Default images for task and status
- Form dropdown menus (plant: window direction, status: plant name)
- React routing:
    - Homepage: `'/'`
    - Login: `'/login'`
    - Register: `'/register'`
    - User Dashboard: `'/dashboard'`


## Future Goals

These are additions I wasn't able to get to within project timeframe, but want to implement in the future:

- Responsive Design
- API: It was difficult to find a public plant API that worked for my project. Hoping to expand on this later on.
- Model Updates:
    - Plant:
        - `pet_friendly = models.BooleanField` (possibly based on toxicity level)
        - `maintenance = ? ` (possibly based on hardiness)
    - Task (Water):
        - `schedule = ? ` (possibly based on drought/humidity resistance)
- Additional CRUD for User model:
    - Create new user
    - Update/Delete user account
    - User login/logout (username/password authentication)
- Search functionality for plants
- Sort plants and tasks by room name or alphabetical
- Toggle between tasks of "Today" and "Upcoming Tasks"
- Plant image upload via Cloudinary

## Other Notes

- Status Model: 
    - Originally I wanted to make a secondary page (via React Router) that displayed one plant, and all status for that plant. I found this to be a much more difficult approach as it prevented the new page and components from being related to Dashboard and I was unable to pass props to an unrelated component sucessfully. I ended up duplicating api fetch calls and it felt overly redundant, so I ended up manually migrating all my new code to be similarly formatted on the Dashboard as the plant model.
- Other Issues: 
    - Because I took a previous project and translated the backend from Node/Express to Python/Django, I ran into several issues with translating React/JavaScript on the frontend. I was able to successfully send CRUD to the database but had to do a lot of testing, debugging and console logging to isolate where the issue was. As it turned out I still had a specific conditional statement that was specific to Express, but was rendering as undefined with Django.


## Credits

- Favicon and Logo: [Favicon.io](https://favicon.io/emoji-favicons/potted-plant)
- Icons: [FontAwesome](https://fontawesome.com/icons), [Flaticon](https://www.flaticon.com/) via [Freepik](https://www.freepik.com) 
- Photos:
    - [Rainier Ridao](https://unsplash.com/@rainierridao?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
    - [Angèle Kamp](https://unsplash.com/@angelekamp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/plants?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)