# Etch a Sketch
[![Watch the Video!] (https://i9.ytimg.com/vi/dIkxsVDmdOY/mqdefault.jpg?sqp=CJDkj8UG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCMgGih_MA8=&rs=AOn4CLDAEyvtz0Tv4FbEauWY6qJB_Uu6yw)](https://www.youtube.com/watch?v=dIkxsVDmdOY)
---

## Project Concept and Purpose

### Website Purpose

The purpose of the website is a fun interactive pixel art/etch a stetch type
progam that users can use to save their creations and view a gallary of them, 
and download them as png files.

The project will consist of a main page with the pixel art/etch a stetch program,
and an second view to view the gallery. When image on the gallery are clicked
the user will have the option to download the file locally, or to delete it 
from local storage.

The etch a sketch will have options for color, eraser, grid size, reset and save.

### Main Features

* **Etch a Sketch**
  * This is the main feature, that users will interact with
  * It will be a grid, and when the mouse click and hover events occur, the color
    of the grid square will change, allowing users to create an image
* **Save button**
  * This button is for the images created. When the user has completed their masterpiece,
    they will be able to press a button that will call a function to create a png
    from the div, and save it to local storage.
* **Download button**
  * For the images there will also be a feature, they will query the local
    storage for the saved png, and transfer the file to the users storage.
* **Project Gallery**
  * The web page will feature a project gallery based on the saved images from
    the user.

---

## Technologies and Tools

**Frontend**: HTML, CSS, JavaScript.

**Optional Libraries**: html2canvas.

**Deployment**: GitHub Pages.

---

## Project Roles and Team Responsibilities

* **Lukas**
* **Princess**

* **Frontend Developer: Princess**
  * Responsible for building the structure of the Etch a Sketch interface.
  * Must create the HTML layout for the:
    * Drawing grid
    * Options panel
    * Gallery section
    * Must style with CSS for clean, user-friendly look.
      
* **JavaScript Developer: Lukas**
  * Implement drawing functionality
  * Build features including:
    * Colour picking logic
    * Eraser mode
    * Clear grid
    * Save, download, and delete buttons
    * Gallery display from local storage
    * Using html2canvas to export drawings as PNGs
  * Optimize code for performance and usability!

* **Shared**
  * Project organization
  * Github management
  * Code review
 
---

## Detailed Feature Breakdown

### Feature: Etch a Sketch Drawing Area

* **Function:** This is the main feature of the website, this feature is used to
  to create the drawings, this is done by the mouse down event and hover.
* **Tasks:**
  * Implement grid logic and listeners for the mouse down an hover, to change
  background color of each square when these criteria are met.

### Feature: Etch a Sketch Options Panel

* **Function:** This is an option bar for the user to change aspects of how the 
etch a sketch will function.
* **Task:**
  * **Color Selector:**
    * Add a hex input to change the varaible that the background color will change to.
  * **Eraser:**
    * Set variable for background color change to none
  * **Clear Grid:**
    * Set all grid tiles background image to none
  * **Grid Size Adjustment:**
    * Change the number of tiles in the grid, update the grid css rows and columns

### Feature: Etch a Sketch Save Button

* **Function:** This button enables users to save their completed drawings.
* **Tasks:**
  * convert current grid to png with html2canvas
  * Use local storage to save png to it. Possibly convert to blob???

### Feature: Etch a Sketch Delete Button

* **Function:** This button allows users to remove a saved drawing from their gallery.
* **Tasks:**
  * delete a png saved to local storage
  * refresh the image gallery

### Feature: Etch a Sketch Download Button

* **Function:** This button allows for  the transfer of a saved drawing from 
  the web browser to the user's local computer storage.
* **Tasks:**
  * Initiate the file transfer to local computer

### Feature: Etch a Sketch Gallery

* **Function:** This feature of the website displays all drawings previously 
  saved by the user to local storage
* **Tasks:**
  * query local storage for any saved pngs
  * display in grid
  * add hover event to display download or delete of png

---

## Project Workflow and Github Setup

### Commit Message Rules
Use descriptive prefixes for commit messages:
* `feat:` for new features.
* `task:` for general tasks or sub-features.
* `chore:` for routine maintenance or build changes.
* `fix:` for bug fixes.
* `bug:` (alternative to `fix`, for specific bug tracking).

### Branches
* **`main`**: The stable, deployable production branch.
* **`feature/<name>`**: For new features (e.g., `feature/color-picker`).
* **`bugfix/<description>`**: For bug fixes (e.g., `bugfix/gallery-load-error`).

### Merges
* All merges into `main` **require a Pull Request (PR)**.
* All PRs **require at least one review** from a teammate.

### Small Reminders
* **Always `git pull origin main`** before creating a new branch or starting work to ensure you have the latest code.
* **Never commit directly to `main`**.
* **Create a new branch for every task/feature/bugfix.**
* **Push frequently** to your feature branch (`git push origin <branch-name>`).
* **Delete feature/bugfix branches** after they are merged.
* Use **GitHub Issues** for task tracking and assign them.
* Use the **Project Board** to visualize task progress (To Do, In Progress, Done).

---

## Timeline and Milestones

**Week 1:** Complete the project plan and initial setup of the GitHub repository and Project Board.

**Week 2:** Develop basic layout and styling for the main pages.

**Week 3:** Implement core features and interactive elements.

**Week 4:** Finalize functionality, fix bugs, complete code reviews, and prepare for deployment.

---

## Final Presentation Outline

### Introduction
* **Project:** Etch a Sketch - an interactive pixel art tool.
* **Purpose:** Create, save, view, and download pixel art.
* **Audience:** For fun users, make simple art

### Demo
* Show Etch a Sketch drawing: grid interaction, color, eraser, clear, grid size.
* Demonstrate **Save** button.
* Show **Gallery**: viewing saved images.
* Show **Download** and **Delete** actions from the gallery.

### Reflection
* **Collaboration:** How GitHub Issues and Project Board helped manage tasks.
* **Code Management:** Our GitHub Flow (branching, commit rules, PRs, code reviews).
* **Challenges & Learnings:** Key difficulties, how we overcame them, and what we learned about teamwork and development.
