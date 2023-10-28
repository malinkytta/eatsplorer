# FED22 JavaScript 2
## Submission Assignment 3

## Restaurant/Café Map (I Require Sustenance)

### Description
You are tasked with creating an app that functions as a food guide for when you're hangry and don't know where to eat, or when you just need a coffee/snack (like after this lecture). You should be able to view restaurants/cafés from various categories around your location. All data should be fetched/created/modified using Firebase. Google Maps should only display the food establishments that are in the Firebase Firestore database. The assignment should be completed in groups of three, where you will work with two classmates you have not previously collaborated with.

### Hygiene Requirements
The following hygiene requirements should be met regardless of the grade level:
- Responsive (mobile-first, of course)
- Version-controlled (with clear, descriptive commit messages from all group members)
- All code should be written by yourselves, and unused code should be cleaned up (meaning, you should create an entirely new, empty app and code it from scratch, not just modify one of my examples!)
- Properly indented and commented source code (you should easily be able to understand each other's code)
- Deployed to Netlify (or Firebase Hosting as an alternative)

### Technical Specification
- Component-based
- Uses React Router
- Utilizes Firebase Firestore, Auth, and Storage
- Uses React Table
- Uses React Hook Form
- Uses Google Maps (or OpenStreetMap, but Google Maps is strongly recommended)
- Communication with the API should occur via an intermediary (components rendering content should not contain data retrieval logic, only call a hook to fetch data)
- Of course, you are allowed to use additional libraries if needed. You can choose your own layout framework, but I recommend using Bootstrap and focusing on the code.

### Requirements
#### Users (Visitors) should be able to:
- View food establishments in their vicinity on a map and in a list
- Click on a food establishment to get more information about it (address, city, description, category, offerings, phone, email, website, Facebook, Instagram)
- Filter the list and map markers by category and offerings
- Look up a city based on the user's location
- Specify a city to view food establishments in (if GPS location is unavailable or if they want to search in a different city)
- Sort the list by name
- View their own position on the map
- Specify a city to search for food establishments in (with autocomplete)
- Get directions to the selected food establishment (via a Google Maps link)
- Submit suggestions for new food establishments

#### Administrators should be able to:
- Create, view, update, and delete restaurants
- Create, view, update, and delete tips submitted by users
- View all other administrators and users (including their profile pictures if available) in a table
- Update their own profile with name, image URL, email, and password
- Searches for restaurants should only be within the selected city
- User lists and food establishments, etc., are displayed in the admin as tables using React Table (they should be able to sort appropriate columns like name, street address, city, and type)
- The browser's back/forward buttons should work for navigation, and when reloading the page, it should return to the same view.

### VG (Higher Grade) Requirements
- Display the distance (as the crow flies) from the user's location to each restaurant and sort the list by distance
- Users should be able to register and upload photos for a food establishment (admin must approve/delete, admin's images should be approved instantly)
- Uploaded (and approved) photos should be displayed when the user clicks on a food establishment
- Users should be able to create restaurants that must be approved by admin (replacing the "tips" function)
- Admins can designate users as admins
