# CelebrateIt

## Table of Contents

1. [Project Overview](#1-project-overview)

2. [User Experience (UX)](#2-user-experience-ux)
   - [2.1 Strategy](#21-strategy)
   - [2.2 Scope](#22-scope)
   - [2.3 System Architecture](#23-system-architecture)
   - [2.4 Skeleton](#24-skeleton)
   - [2.5 Surface](#25-surface)

3. [Features](#3-features)
   - [Implemented Features](#implemented-features)
   - [Potential Future Enhancements](#potential-future-enhancements)

4. [Technologies Used](#4-technologies-used)
   - [4.1 Backend](#41-backend)
   - [4.2 Frontend](#42-frontend)
   - [4.3 Deployment & Tools](#43-deployment--tools)

5. [Development & Project Planning](#5-development--project-planning)
   - [5.1 Frontend Evolution of Component Structure](#51-frontend-evolution-of-component-structure)
   - [5.2 Code Structure (Backend)](#52-code-structure-backend)
   - [Pages & Containers Overview](#pages--containers-overview)
   - [Component Tree](#component-tree)
   - [Key Planning Decisions](#key-planning-decisions)

6. [Testing](#6-testing)
   - [6.1 Back-End Application Testing](#61-back-end-application-testing)
   - [6.2 Front-End Application Testing](#62-front-end-application-testing)
   - [6.3 Validators](#63-validators)
   - [6.3 Bugs and Fixes](#63-bugs-and-fixes)

7. [Deployment](#7-deployment)
   - [7.1 Heroku](#71-heroku)
   - [7.2 Forking and Cloning](#72-forking-and-cloning)

8. [Credits](#8-credit)
   - [Content & Resources](#content--resources)
   - [Acknowledgements](#acknowledgements)

---

## 1. Project Overview

### Brief Description

[CelebrateIt](https://celebrateit-866641373084.herokuapp.com/) is a mock employee recognition platform inspired by the solutions offered by [Workhuman](https://www.workhuman.com). It allows employees to share recognition stories, nominate colleagues for their achievements, and engage with content through likes and comments. By fostering a sense of appreciation and collaboration, CelebrateIt mirrors the functionality and purpose of modern social recognition platforms.

Built using Django REST for the backend and React for the frontend, this project serves as a learning and portfolio exercise, demonstrating full-stack development skills in designing a scalable, functional, and user-friendly web application.

### Target Audience

CelebrateIt is designed for:

- **Employees**: To feel valued and connected by sharing their achievements and recognizing contributions from their colleagues.

- **HR Teams**: To track and analyze recognition trends, fostering a more engaged workforce while identifying top performers and recognizing outstanding contributions.

- **Team Leaders and Managers**: To build a positive team culture by facilitating recognition and appreciation among their team.

- **Companies**: That wish to improve employee satisfaction and retention by integrating a sense of community into their workplace culture.

---

## 2. User Experience (UX)

### 2.1 Strategy

To plan the project development, I adopted an Agile methodology centered on user experience. By using user stories grouped into EPICs, the project is broken down into smaller, manageable pieces, ensuring a structured and user-focused approach.

---

#### **EPIC – Getting Started & Joining the Platform**

| **ID**                                                          | **Theme**                | **User Story**                                                                       | **Prioritisation** |
| --------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------ | ------------------ |
| [#1](https://github.com/SophieDufrane/PP5-celebrateit/issues/1) | Account Registration     | Users can create an account with basic credentials to join the CelebrateIt platform. | Must Have          |
| [#2](https://github.com/SophieDufrane/PP5-celebrateit/issues/2) | Login to Account         | Users can securely log into their account to access features.                        | Must Have          |
| [#4](https://github.com/SophieDufrane/PP5-celebrateit/issues/4) | Log out of Account       | Users can securely log out to protect their account.                                 | Must Have          |
| [#6](https://github.com/SophieDufrane/PP5-celebrateit/issues/6) | Conditional Menu Options | The menu adapts to login status, showing relevant options.                           | Should Have        |

---

#### **EPIC – Recognition & Nomination CRUD**

| **ID**                                                            | **Theme**               | **User Story**                                                         | **Prioritisation** |
| ----------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------- | ------------------ |
| [#11](https://github.com/SophieDufrane/PP5-celebrateit/issues/11) | Create a Recognition    | Users can submit a recognition story to celebrate someone.             | Must Have          |
| [#13](https://github.com/SophieDufrane/PP5-celebrateit/issues/13) | Edit Recognition        | Users can edit a previously shared recognition.                        | Must Have          |
| [#14](https://github.com/SophieDufrane/PP5-celebrateit/issues/14) | Delete Recognition      | Users can delete their recognition story.                              | Must Have          |
| [#15](https://github.com/SophieDufrane/PP5-celebrateit/issues/15) | View Recognition Detail | Users can view the full content of a recognition story.                | Should Have        |
| [#28](https://github.com/SophieDufrane/PP5-celebrateit/issues/28) | View Recognition Feed   | Users can browse all recognitions in the feed.                         | Must Have          |
| [#27](https://github.com/SophieDufrane/PP5-celebrateit/issues/27) | Create a Nomination     | Users can nominate a colleague for recognition using tags.             | Must Have          |
| [#29](https://github.com/SophieDufrane/PP5-celebrateit/issues/29) | Edit Nomination         | Users can update nomination content and tags.                          | Must Have          |
| [#30](https://github.com/SophieDufrane/PP5-celebrateit/issues/30) | Delete Nomination       | Users can remove a nomination they previously made.                    | Must Have          |
| [#31](https://github.com/SophieDufrane/PP5-celebrateit/issues/31) | View Nomination Detail  | Users can view full details of a nomination.                           | Should Have        |
| [#32](https://github.com/SophieDufrane/PP5-celebrateit/issues/32) | View Nomination Feed    | Users can browse all nominations in the feed.                          | Must Have          |
| [#12](https://github.com/SophieDufrane/PP5-celebrateit/issues/12) | View Own Posts          | Users can view a list of recognitions and nominations they’ve created. | Could Have         |

---

#### **EPIC – Engaging with People & Posts**

| **ID**                                                            | **Theme**             | **User Story**                                     | **Prioritisation** |
| ----------------------------------------------------------------- | --------------------- | -------------------------------------------------- | ------------------ |
| [#16](https://github.com/SophieDufrane/PP5-celebrateit/issues/16) | Like a recognition           | Users can like a recognition to show appreciation.        | Should Have        |
| [#17](https://github.com/SophieDufrane/PP5-celebrateit/issues/17) | Comment on a recognition     | Users can comment on recognitions to engage with content. | Must Have          |
| [#33](https://github.com/SophieDufrane/PP5-celebrateit/issues/33) | Edit/Delete Comments  | Users can edit or remove their own comments.       | Should Have        |
| [#8](https://github.com/SophieDufrane/PP5-celebrateit/issues/8)   | Search for Colleagues | Users can search for other people by name.         | Should Have        |

---

#### **EPIC – Managing My Profile & Network**

| **ID**                                                            | **Theme**            | **User Story**                                                      | **Prioritisation** |
| ----------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------- | ------------------ |
| [#22](https://github.com/SophieDufrane/PP5-celebrateit/issues/22) | Edit My Profile      | Users can update their avatar and bio to personalise their profile. | Could Have         |
| [#21](https://github.com/SophieDufrane/PP5-celebrateit/issues/21) | View Public Profiles | Users can view other users’ bios and shared posts.                  | Must Have          |

---

### 2.2 Scope

All features listed above are prioritised using the **MoSCoW Framework** to guide development focus and ensure a successful MVP.

The current breakdown is:

- **Must Have** (13 / 21 → 62%): Core functionality required for project success.

- **Should Have** (6 / 21 → 28%): Enhancements that improve usability and experience.

- **Could Have** (2 / 21 → 10%): Nice-to-have features if time allows.

- **Won’t Have**: Explicitly removed from scope.

This distribution ensures alignment with project constraints and focus, while still allowing space for polish and stretch goals where appropriate.

### Entity Relationship Diagram (ERD)

The ERD provides a high-level overview of the database structure, including the relationships between key models such as users, profiles, recognitions, nominations, tags, comments, and likes. It was designed early in the planning phase to ensure consistent field usage and API compatibility.

![ERD](documentation/erd_celebrateit.png)

#### Flowchart for User Navigation

This section provides a visual representation of the user navigation flow within CelebrateIt. The flowchart captures how users interact with the platform, including key actions such as logging in, browsing stories, creating recognition posts, and navigating between profile pages.

![Flowchart](documentation/flowchart_celebrateit.png)

---

### 2.3 System Architecture

CelebrateIt follows a decoupled architecture, separating the backend and frontend into two distinct layers:

- **Backend**: Built with Django REST Framework (DRF), the backend exposes a RESTful API. It handles authentication, user profiles, nominations, recognitions, comments, likes, tag/category and department logic. The API returns JSON responses that can be consumed by any client.
- **Frontend**: Developed using React, the frontend interacts with the API via `axios`. It handles routing with React Router, manages state locally (with hooks), and presents a dynamic interface to the user.
- **Data Flow**: React fetches data from DRF endpoints and displays it based on the user's interactions. Forms (e.g. create/edit nomination) submit data back to the API to update the database.
- **Authentication**: User sessions and permissions are managed via Django Allauth and token-based headers on the frontend.
- **Media and Hosting**:
  - User-uploaded images are stored on **Cloudinary**
  - Both frontend and backend are deployed via **Heroku** using a single monorepo setup, ensuring a unified deployment pipeline and simplified maintenance.

This architecture supports scalability and flexibility, allowing future iterations such as mobile apps or third-party integrations to use the same backend API.

---

### 2.4 Skeleton

#### Wireframes for Key Screens or Pages

The following wireframes outline the structure and layout of the main screens in CelebrateIt:

- **Secure Authentication**
  - Employees register, log in and out securely using **Django Allauth**.

      <details>
      <summary> Register an Account </summary>

    ![Register](documentation/frontend/skeleton/register_form.png)

      </details>

      <details>
      <summary> Log in to an existing Account </summary>

    ![Log in](documentation/frontend/skeleton/login_form.png)

      </details>

- **Home Feed**
  - Users land on a clean feed displaying recognition stories and nominations with toggle option.

    <details>
    <summary>Feed Layout</summary>

    ![Feed](documentation/frontend/skeleton/feed.png)

    </details>

- **Create Post / Nomination**
  - Users can create a recognition story or nominate a colleague with a simple form.

    <details>
    <summary>Create Recognition Form</summary>

    ![Create Post](documentation/frontend/skeleton/recognition_create.png)

    </details>

    <details>
    <summary>Create Nomination Form</summary>

    ![Create Nomination](documentation/frontend/skeleton/nomination_create.png)

    </details>

- **Recognition / Nomination Detail View**
  - Users can read full stories, like, and comment on recognitions.

    <details>
    <summary>Recognition Detail</summary>

    ![Recognition Detail](documentation/frontend/skeleton/recognition_detail.png)

    </details>

    <details>
    <summary>Nomination Detail</summary>

    ![Nomination Detail](documentation/frontend/skeleton/nomination_detail.png)

    </details>

- **User Profile Page**
  - Displays user's info with avatar, name, bio, department and user's contributions.

    <details>
    <summary>Profile</summary>

    ![Profile](documentation/frontend/skeleton/profile.png)

    </details>

---

### 2.5 Surface

#### Typography & Colour Scheme

CelebrateIt builds on the visual identity of the previous Rewards Platform (PP4 - RedeemIt), maintaining a clean, user-friendly interface with a more social and collaborative tone.

The colour palette echoes tech industry trends while adding warmth to reflect human connection in the workplace. Fonts were chosen for readability and a modern feel.

#### Colour Palette

| **Colour** | **Name**         |
| ---------- | ---------------- |
| `#300E82`  | Persian Indigo   |
| `#586BBE`  | Savoy Blue       |
| `#9B6B82`  | Mountbatten Pink |
| `#DECD62`  | Citron           |
| `#484848`  | Davy's Grey      |

![Colour Inspiration](documentation/color_scheme.png)

<details>
  <summary>Click to view inspiration from Workhuman</summary>
  <img src="documentation/colours_inspiration_from_workhuman.png">
</details>

### Typography

- **Primary Font**: _Poppins_ – main body text
- **Secondary Font**: _Quicksand_ – used for highlights and UI accents

---

## 3. Features

### Implemented Features

- Secure user registration and login via Django Allauth
- Conditional navigation menu that adapts to auth state
- Create, edit, delete, and view **Recognition** stories
- Create, edit, delete, and view **Nominations** with required tags
- Combined feed with toggle to switch between Recognition and Nominations
- Detail pages for each recognition and nomination
- Real-time **like** system for recognitions
- **Comment** system with edit and delete options for authors
- Public profile pages showing user's info and contributions
- Logged-in users can **edit their avatar and bio**
- **Search bar** to find colleagues from the feed by name

### Potential Future Enhancements

- Profile feed: view your own recognitions and nominations
- ....
- ....
- ....

---

## 4. Technologies Used

### 4.1. Backend

The backend API was developed using Django and the Django REST Framework:

- **Django** – Python-based web framework for rapid development and clean architecture.
- **Django REST Framework** – Used to build RESTful APIs consumed by the frontend.
- **Django Allauth** – Manages user registration, login, logout, and authentication endpoints.
- **PostgreSQL** – Relational database hosted on Heroku via automatic provisioning.
- **Cloudinary** – Handles media uploads and delivery, especially for user-submitted images.

---

### 4.2 Frontend

The frontend of CelebrateIt was built using the following technologies:

- **React** – Core library for building user interfaces with reusable components.
- **React Router DOM** – Enables dynamic client-side routing and navigation.
- **Axios** – Handles HTTP requests to the Django REST API.
- **Bootstrap** – Provides a responsive layout foundation and base UI components.
- **CSS Modules** – Used for scoped styling of components and to prevent class name collisions.

---

### 4.3 Deployment & Tools

- **Heroku** – Hosting and deployment of the Django REST API backend.
- **GitHub** – Version control and repository management.
- **GitHub Pages** *(optional)* – Considered for frontend deployment (not used in final setup).
- **Git** – Local version control with atomic commits and branching.
- **VS Code** – Primary code editor with integrated terminal and extensions for React/Django.
- **Browser-based API testing** – API endpoints were tested directly via browser during development using Django’s built-in dev server.
- **Chrome DevTools & Lighthouse** – Used for inspecting layout, debugging responsiveness, and running accessibility/performance audits.

---

## 5. Development & Project Planning

### 5.1 Frontend Evolution of Component Structure

#### Initial Structure

CelebrateIt was built with a focus on reusability and clean structure from the start (DRY):

- A shared layout wrapper, `PostLayoutShell`, was created to handle common elements between recognitions and nominations (avatar, title, content, dropdown, etc.) as well as children for specific elements.
- This shell was initially used inside a single component: `PostCard`, which handled both recognitions and nominations in the feed.
- Nomination-specific logic (e.g. nominee name and tag) was conditionally rendered inside `PostCard`.

As development progressed:
- Conditional rendering became harder to manage.
- Post and Nomination diverged in layout (image for Post only; nominee/tag for Nominations).
- Code readability and maintainability suffered.

**Decision:** Refactor into two separate components.

#### Refactor Outcome
- `PostLayoutShell`: the shared layout wrapper for both Post and Nomination cards was cleaned of any specific elements.
- `PostHeader`: The header portion with avatar, name, time stamp, and dropdown menu, was extracted into its own component for even greater clarity and reuse.
- `PostCard`: Now focused solely on recognition posts, includes image and likes/comments.
- `NominationCard`: A dedicated component for nominations was created, injecting nominee and tag via `extraContent` prop.
- `extraContent` prop: Enables layout flexibility without bloating shared structure.

This refactor improved clarity, maintainability, and scalability.

---

#### Pages & Containers Overview

| Page (File) | Purpose |
|------|---------|
| `SignInForm` / `SignUpForm` | Handles login and registration forms |
| `LoggedInHomePage` | Displays recognition + nomination feed snippets and people sidebar |
| `PostDetailPage` | Renders a full recognition story with comments  |
| `NominationDetailPage` | Renders a full nomination with nominee and tag  |
| `CreatePostPage` | Form to submit a new recognition post |
| `UpdatePostPage` | Form to edit an existing recognition post |
| `CreateNominationPage` | Form to submit a new nomination (with nominee and tag) |
| `UpdateNominationPage`  | Form to edit an existing nomination (content and tag-not nominee) |
| `ProfilePage` | Displays user profile, recognitions, and nominations |

---

#### Component Tree

```

Navbar (component)
├── NavLinks (Home, Recognise, Nominate, Profile, Logout)

LoggedInHomePage (container)
├── FeedSection
│     ├── FeedToggleButtons
│     ├── FeedList
│     │     ├── PostCard → PostLayoutShell
│     │     └── NominationCard → PostLayoutShell
├── PeopleSidebar
│     ├── SearchField
│     └── PeopleList
│           └── PersonCard → NominateButton

PostLayoutShell
├── PostHeader (shared header)
│     ├── Avatar placeholder
│     ├── Display name
│     └── Created at + Dropdown
├── metaTop (optional – nominee + tag)
├── Title
├── Content
├── extraContent (optional – e.g. 'View full post' or tag block)
└── children (optional – image, comments, etc.)

PostDetailPage (container)
├── PostLayoutShell
│     └── children
│           ├── PostImage (optional)
│           ├── CommentForm
│           └── CommentList
├── ConfirmDeleteModal

NominationDetailPage (container)
├── PostLayoutShell
│     └── metaTop (nominee info + tag badge)
├── ConfirmDeleteModal

CreatePostPage / UpdatePostPage (container)
└── PostForm
      └── Image upload (optional)

CreateNominationPage / UpdateNominationPage (container)
└── NominationForm
      ├── Nominee selector
      └── Tag field

ProfilePage (container)
├── Profile Header
|     ├── Profile Image
|     ├── Username (First and Last name)
|     ├── Department
|     └── Bio / Presentation text
├── ProfileFeedSection (container)

```

#### Key Planning Decisions

- **Start DRY, then refactor:** Initially reused `PostCard` for both types.
- **Split when complexity grew:** Introduced `NominationCard` to separate logic and layout.
- **Centralised layout wrapper:** Used `PostLayoutShell` with `extraContent` prop for flexibility.
- **Deadline-first logic:** Skipped advanced filters to stay on track.
- **Backend alignment:** Ensured API compatibility throughout (fields, validation).
- **Embedded comment sections:** Avoided separate routes for commenting for simplicity.

---

- Agile methodology, Kanban, or other approaches used

### 5.2 Code Structure (Backend)

The backend is organised into feature-based Django apps:

- `posts/` – Recognition stories and related logic
- `nominations/` – Peer nominations with required tag selection
- `profiles/` – User profile extensions with department links
- `likes/` and `comments/` – Interactions for recognition stories
- `tags/` – Used to categorize nominations
- `department/` – Departments available for user filtering and classification

Each app follows the same structure: `models.py`, `serializers.py`, `views.py`, and `urls.py`. Common permissions are stored in the main `celebrateit_api/permissions.py`.

---

## 6. Testing

### 6.1 Back-End Application Testing

The following tests were conducted manually to verify the functionality, permissions, and expected behavior of the back-end API endpoints. All tests were performed using the Django REST Framework browsable API interface through the browser.

Each section below corresponds to a model and includes the tested endpoint, HTTP method, required authentication, expected behavior, actual results, and screenshots where relevant.

#### **User Profiles**

| Endpoint                           | Action                     | Method | Auth | Expected                                         | Actual | Screenshot |
| ---------------------------------- | -------------------------- | ------ | ---- | ------------------------------------------------ | ------ | ---------- |
| `/user-profiles/`                  | List all user profiles     | GET    | ❌   | HTTP 200 OK                                      | ✅     | 1          |
| `/user-profiles/10/`               | View profile detail        | GET    | ❌   | HTTP 200 OK                                      | ✅     | 2          |
| `/user-profiles/9/`                | Update profile (owner)     | PUT    | ✅   | HTTP 200 OK / Profile updated                    | ✅     | 3          |
| `/user-profiles/10/`               | Update profile (not owner) | PUT    | ✅   | HTTP 403 Forbidden / Profile should be read-only | ✅     | 4          |
| `/user-profiles/?department=SALES` | Filter by department       | GET    | ❌   | HTTP 200 OK / Only SALES users                   | ✅     | 5          |
| `/user-profiles/?search=raymond`   | Search by name             | GET    | ❌   | HTTP 200 OK / Only Profiles with \"raymond\"     | ✅     | 6          |

<details>
<summary> 1/ List all user profiles </summary>

![1](documentation/api/profiles/profile_list.png)

</details>

<details>
<summary> 2/ View profile detail </summary>

![2](documentation/api/profiles/profile_not_auth.png)

</details>

<details>
<summary> 3/ Update profile (owner) </summary>

![3](documentation/api/profiles/profile_update_owner.png)

</details>

<details>
<summary> 4/ Update profile (not owner) </summary>

![4](documentation/api/profiles/profile_update_not_owner.png)

</details>

<details>
<summary> 5/ Filter by department </summary>

![5](documentation/api/profiles/profile_list_filter_department.png)

</details>

<details>
<summary> 6/ Search by name </summary>

![6](documentation/api/profiles/profile_list_search_name.png)

</details>

#### **Posts**

| Endpoint                   | Action                    | Method | Auth | Expected                                                  | Actual | Screenshot |
| -------------------------- | ------------------------- | ------ | ---- | --------------------------------------------------------- | ------ | ---------- |
| `/posts/`                  | List all the posts        | GET    | ❌   | HTTP 200 OK                                               | ✅     | 1          |
| `/posts/4/`                | View a post detail        | GET    | ❌   | HTTP 200 OK                                               | ✅     | 2          |
| `/posts/`                  | Create a post             | POST   | ✅   | HTTP 201 Created                                          | ✅     | 3          |
| `/posts/5/`                | Update a post (owner)     | PUT    | ✅   | HTTP 200 OK / Post updated successfully                   | ✅     | 4          |
| `/posts/1/`                | Update a post (not owner) | GET    | ✅   | HTTP 403 Forbidden / Post should be read-only             | ✅     | 5          |
| `/posts/2/`                | Delete a post (owner)     | DELETE | ✅   | HTTP 204 No Content                                       | ✅     | 6          |
| `/posts/1/`                | Delete a post (not owner) | DELETE | ✅   | HTTP 403 Forbidden / Post should be read-only             | ✅     | 7          |
| `/posts/?search=raymond`   | Search by name            | GET    | ❌   | HTTP 200 OK / Only posts with \"raymond\"                 | ✅     | 8          |
| `/posts/?department=SALES` | Filter by department      | GET    | ❌   | HTTP 200 OK / Only posts from users in department "SALES" | ✅     | 9          |

<details>
<summary> 1/ List all the posts </summary>

![1](documentation/api/posts/posts_list.png)

</details>

<details>
<summary> 2/ View a post detail </summary>

![2](documentation/api/posts/posts_detail_not_auth.png)

</details>

<details>
<summary> 3/ Create a post </summary>

![3](documentation/api/posts/posts_create.png)

</details>

<details>
<summary> 4/ Update a post (owner) </summary>

![4](documentation/api/posts/posts_update_owner.png)

</details>

<details>
<summary> 5/ Update a post (not owner) </summary>

![5](documentation/api/posts/posts_update_not_owner.png)

</details>

<details>
<summary> 6/ Delete a post (owner) </summary>

![6](documentation/api/posts/posts_delete.png)

</details>

<details>
<summary> 7/ Delete a post (not owner) </summary>

![7](documentation/api/posts/posts_delete_not_owner.png)

</details>

<details>
<summary> 8/ Search by name </summary>

![8](documentation/api/posts/posts_search_name.png)

</details>

<details>
<summary> 9/ Search by department </summary>

![9](documentation/api/posts/posts_search_department.png)

</details>

#### **Nominations**

| Endpoint                                             | Action                           | Method | Auth | Expected                                                       | Actual | Screenshot |
| ---------------------------------------------------- | -------------------------------- | ------ | ---- | -------------------------------------------------------------- | ------ | ---------- |
| `/nominations/`                                      | List all the nominations         | GET    | ❌   | HTTP 200 OK                                                    | ✅     | 1          |
| `/nominations/1/`                                    | View a nomination detail         | GET    | ❌   | HTTP 200 OK                                                    | ✅     | 2          |
| `/nominations/`                                      | Create a nomination              | POST   | ✅   | HTTP 201 Created                                               | ✅     | 3          |
| `/nominations/7/`                                    | Update a nomination (owner)      | PUT    | ✅   | HTTP 200 OK / Nomination updated successfully                  | ✅     | 4          |
| `/nominations/1/`                                    | Update a nomination (not owner)  | GET    | ✅   | HTTP 403 Forbidden / Nomination should be read-only            | ✅     | 5          |
| `/nominations/7/`                                    | Delete a nomination (owner)      | DELETE | ✅   | HTTP 204 No Content                                            | ✅     | 6          |
| `/nominations/1/`                                    | Delete a nomination (not owner)  | DELETE | ✅   | HTTP 403 Forbidden / Nomination should be read-only            | ✅     | 7          |
| `/nominations/?search=raymond`                       | Search by nominee/nominator      | GET    | ❌   | HTTP 200 OK / Only nominations involving "raymond"             | ✅     | 8          |
| `/nominations/?nominator__profile__department=SALES` | Filter by department (nominator) | GET    | ❌   | HTTP 200 OK / Only nominations from "SALES" nominator profiles | ✅     | 9          |
| `/nominations/?tag=3`                                | Filter by tag                    | GET    | ❌   | HTTP 200 OK / Only nominations with "Innovation" tag (ID=3)    | ✅     | 10         |
| `/nominations/?nominee=2`                            | Filter by nominee                | GET    | ❌   | HTTP 200 OK / Only nominee "steph" (ID=2)                      | ✅     | 11         |

<details>
<summary> 1/ List all the nominations </summary>

![1](documentation/api/nominations/nomin_list.png)

</details>

<details>
<summary> 2/ View a nomination detail </summary>

![2](documentation/api/nominations/nomin_detail_not_auth.png)

</details>

<details>
<summary> 3/ Create a nomination </summary>

![3](documentation/api/nominations/nomin_create.png)

</details>

<details>
<summary> 4/ Update a nomination (owner) </summary>

![4](documentation/api/nominations/nomin_update_owner.png)

</details>

<details>
<summary> 5/ Update a nomination (not owner) </summary>

![5](documentation/api/nominations/nomin_update_not_owner.png)

</details>

<details>
<summary> 6/ Delete a nomination (owner) </summary>

![6](documentation/api/nominations/nomin_delete_owner.png)

</details>

<details>
<summary> 7/ Delete a nomination (not owner) </summary>

![7](documentation/api/nominations/nomin_delete_not_owner.png)

</details>

<details>
<summary> 8/ Search by nominee/nominator </summary>

![8](documentation/api/nominations/nomin_search_name.png)

</details>

<details>
<summary> 9/ Filter by department (nominator) </summary>

![9](documentation/api/nominations/nomin_nominator_department.png)

</details>

<details>
<summary> 10/ Filter by tag </summary>

![10](documentation/api/nominations/nomin_tag.png)

</details>

<details>
<summary> 11/ Filter by nominee </summary>

![11](documentation/api/nominations/nomin_nominee.png)

</details>

#### **Comments**

| Endpoint                  | Action                              | Method | Auth | Expected                                    | Actual | Screenshot |
| ------------------------- | ----------------------------------- | ------ | ---- | ------------------------------------------- | ------ | ---------- |
| `/comments/`              | List all the comments               | GET    | ❌   | HTTP 200 OK                                 | ✅     | 1          |
| `/comments/`              | Create a comment on post/nomination | POST   | ✅   | HTTP 201 Created                            | ✅     | 2          |
| `/comments/4/`            | Update a comment (owner)            | PUT    | ✅   | HTTP 200 OK / Comment updated successfully  | ✅     | 3          |
| `/comments/4/`            | Delete a comment (owner)            | DELETE | ✅   | HTTP 204 No Content                         | ✅     | 4          |
| `/comments/?post=4`       | Filter by post                      | GET    | ❌   | HTTP 200 OK / Only comments on post 4       | ✅     | 5          |
| `/comments/?nomination=3` | Filter by nomination                | GET    | ❌   | HTTP 200 OK / Only comments on nomination 3 | ✅     | 6          |

<details>
<summary> 1/ List all the comments </summary>

![1](documentation/api/comments/comments_list.png)

</details>

<details>
<summary> 2/ Create a comment </summary>

![2](documentation/api/comments/comments_create.png)

</details>

<details>
<summary> 3/ Update a comment (owner) </summary>

![3](documentation/api/comments/comments_update_owner.png)

</details>

<details>
<summary> 4/ Delete a comment (owner) </summary>

![4](documentation/api/comments/comments_delete_owner.png)

</details>

<details>
<summary> 5/ Filter by post </summary>

![5](documentation/api/comments/comments_filter_posts.png)

</details>

<details>
<summary> 6/ Filter by nomination </summary>

![6](documentation/api/comments/comments_filter_nominations.png)

</details>

#### **Likes**

| Endpoint    | Action                               | Method | Auth | Expected                               | Actual | Screenshot |
| ----------- | ------------------------------------ | ------ | ---- | -------------------------------------- | ------ | ---------- |
| `/likes/`   | Create a like on post/nomination     | POST   | ✅   | HTTP 201 Created                       | ✅     | 1          |
| `/likes/`   | Invalid: like both post & nomination | POST   | ✅   | HTTP 400 Bad Request / Can’t like both | ✅     | 2          |
| `/likes/`   | Invalid: like same thing twice       | POST   | ✅   | HTTP 400 Bad Request / Already liked   | ✅     | 3          |
| `/likes/5/` | Delete a like (owner)                | DELETE | ✅   | HTTP 204 No Content                    | ✅     | 4          |

<details>
<summary> 1/ Create a like on post/nomination </summary>

![1](documentation/api/likes/likes_create.png)

</details>

<details>
<summary> 2/ Invalid: like both post & nomination </summary>

![2](documentation/api/likes/likes_post_or_nomin_validation.png)

</details>

<details>
<summary> 3/ Invalid: like same thing twice </summary>

![3](documentation/api/likes/likes_same_twice_validation.png)

</details>

<details>
<summary> 4/ Delete a like (owner) </summary>

![4](documentation/api/likes/likes_delete_owner.png)

</details>

#### **Departments (via Profiles, Posts, Nominations)**

| Endpoint                                           | Action                                      | Method | Auth | Expected                                                 | Actual | Screenshot |
| -------------------------------------------------- | ------------------------------------------- | ------ | ---- | -------------------------------------------------------- | ------ | ---------- |
| `/user-profiles/`                                  | List profiles with department field visible | GET    | ❌   | HTTP 200 OK / Department value shown per profile         | ✅     | 1          |
| `/user-profiles/10`                                | Profile detail with department field        | GET    | ❌   | HTTP 200 OK / Department is correct for the user         | ✅     | 2          |
| `/posts/?user__profile__department=OPS`            | Filter posts by user department             | GET    | ❌   | HTTP 200 OK / Only posts from users in Operation         | ✅     | 3          |
| `/nominations/?nominator__profile__department=OPS` | Filter nominations by nominator department  | GET    | ❌   | HTTP 200 OK / Only nominations from Operation nominators | ✅     | 4          |

<details>
<summary> 1/ List profiles with department field visible </summary>

![1](documentation/api/department/department_profile_list.png)

</details>

<details>
<summary> 2/ Profile detail with department field </summary>

![2](documentation/api/department/department_profile_detail.png)

</details>

<details>
<summary> 3/ Filter posts by user department </summary>

![3](documentation/api/department/department_filter_posts.png)

</details>

<details>
<summary> 4/ Filter nominations by nominator department </summary>

![4](documentation/api/department/department_filter_nominations.png)

</details>

#### **Tags**

| Endpoint               | Action                     | Method | Auth | Expected                                                  | Actual | Screenshot |
| ---------------------- | -------------------------- | ------ | ---- | --------------------------------------------------------- | ------ | ---------- |
| `/tags/`               | List all tags              | GET    | ❌   | HTTP 200 OK / All available tags listed                   | ✅     | 1          |
| `/nominations/`        | Create nomination with tag | POST   | ✅   | HTTP 201 Created / Nomination includes correct tag        | ✅     | 2          |
| `//nominations/?tag=3` | Filter nominations by tag  | GET    | ❌   | HTTP 200 OK / Only nominations with tag Innovation (ID=3) | ✅     | 3          |

<details>
<summary> 1/ List all tags </summary>

![1](documentation/api/tags/tags_list.png)

</details>

<details>
<summary> 2/ Create nomination with tag </summary>

![2](documentation/api/tags/tags_nomination_create.png)

</details>

<details>
<summary> 3/ Filter nominations by tag </summary>

![3](documentation/api/tags/tags_nomination_filter.png)

</details>

### 6.2 Front-End Application Testing

All manual testing was performed on the deployed frontend using a real user account. Each user story was tested with expected interactions and outcomes, covering both positive and negative cases.

Testing included:

- Auth flows (register, login, logout)
- Recognition and nomination CRUD
- Feed behaviour and toggling
- Detail page rendering
- Like and comment functionality
- User profile views and editing
- Search bar and sidebar interactions

#### **Getting Started & Joining the Platform**

| **Priority** | **User Story**           | **Page(s)**       | **Test Scenario / Action**                      | **Expected Result**                                                                | Actual | **Screenshot** |
| ------------ | ------------------------ | ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------- | ------ | -------------- |
| Must Have    | Register an Account      | Register Page     | Fill out form with valid inputs and submit      | Redirected to login, message confirms successful registration                      | ✅     | 1 - 2          |
| Must Have    | Login to Account         | Login Page        | Enter valid credentials and submit              | Redirected to feed with user menu visible                                          | ✅     | 3              |
| Must Have    | Logout                   | Any Page (Navbar) | Click logout                                    | User is logged out and redirected to login, message confirms successful logged out | ✅     | 4              |
| Must Have    | Conditional Menu Options | All Pages         | Login and check navbar / Logout and check again | Menu adapts based on login status                                                  | ✅     | 5 - 6          |

<details>
<summary> 1/ Register – Validation Errors Display </summary>

![1](documentation/frontend/testing/auth/register_form_messages.png)

</details>

<details>
<summary> 2/ Register - Successful message </summary>

![2](documentation/frontend/testing/auth/registration_successful.png)

</details>

<details>
<summary> 3/ Log In - Validation Errors Display </summary>

![3](documentation/frontend/testing/auth/login_wrong_credentials.png)

</details>

<details>
<summary> 4/ Logged out - Successful message </summary>

![4](documentation/frontend/testing/auth/logged_out_successful.png)

</details>

<details>
<summary> 5/ Conditional Menu Options when logged out </summary>

![5](documentation/frontend/testing/auth/navbar_logged_out.png)

</details>

<details>
<summary> 6/ Conditional Menu Options when logged in </summary>

![6](documentation/frontend/testing/auth/navbar_logged_in.png)

</details>

---

#### **Recognition CRUD**

| **Priority** | **User Story**          | **Page(s)**            | **Test Scenario / Action**            | **Expected Result**                                 | Actual | **Screenshot** |
| ------------ | ----------------------- | ---------------------- | ------------------------------------- | --------------------------------------------------- | ------ | -------------- |
| Must Have    | Create Recognition      | Post Create Page       | Fill out form with content and submit | Redirected to detail, new post shows in feed        | ✅     | 1              |
| Must Have    | Edit Recognition        | Feed > Edit Dropdown   | Change title or content and save      | Updated post appears in feed and detail             | ✅     | 2 - 3 - 4      |
| Must Have    | Delete Recognition      | Feed > Delete Dropdown | Click delete and confirm              | Post is removed from feed and not accessible by URL | ✅     | 5 - 6          |
| Must Have    | View Recognition Detail | Feed > Click Card      | Click post preview in feed            | Full post loads with correct data                   | ✅     |                |
| Must Have    | View Recognition Feed   | Homepage               | Open homepage                         | Feed shows latest recognitions, ordered by date     | ✅     |                |

<details>
<summary> 1/ Create Recognition – Successful message </summary>

![1](documentation/frontend/testing/recognition/recognition_create_successful.png)

</details>

<details>
<summary> 2/ Edit Recognition – Dropdown feed </summary>

![2](documentation/frontend/testing/recognition/dropdown_feed.png)

</details>

<details>
<summary> 3/ Edit Recognition – Form pre-filled </summary>

![3](documentation/frontend/testing/recognition/recognition_edit.png)

</details>

<details>
<summary> 4/ Edit Recognition – Successful message </summary>

![4](documentation/frontend/testing/recognition/recognition_edit_successful.png)

</details>

<details>
<summary> 5/ Delete Recognition - Confirmation prompt </summary>

![5](documentation/frontend/testing/recognition/recognition_delete_prompt.png)

</details>

<details>
<summary> 6/ Delete Recognition > Successful message </summary>

![6](documentation/frontend/testing/recognition/recognition_delete_successful.png)

</details>

---

#### **Nomination CRUD**

| **Priority** | **User Story**         | **Page(s)**            | **Test Scenario / Action**             | **Expected Result**                                 | Actual | **Screenshot** |
| ------------ | ---------------------- | ---------------------- | -------------------------------------- | --------------------------------------------------- | ------ | -------------- |
| Must Have    | Create Nomination      | Nomination Create Page | Submit valid form with nominee and tag | Redirect to detail, nomination shows in feed        | ✅     | 1 - 2 - 3 - 4  |
| Must Have    | Edit Nomination        | Feed > Edit Dropdown   | Update text or tags                    | Updated nomination shown in feed and detail         | ✅     | 5 - 6          |
| Must Have    | Delete Nomination      | Feed > Delete Dropdown | Delete a nomination and confirm        | Nomination disappears from feed and is inaccessible | ✅     | 7 - 8          |
| Must Have    | View Nomination Detail | Feed > Click Card      | Click on nomination preview            | Full nomination loads with correct data             | ✅     |                |
| Must Have    | View Nomination Feed   | Toggle in Homepage     | Use toggle to switch feed type         | Feed updates to show only nominations               | ✅     |                |

<details>
<summary> 1/ Create Nomination – Successful message </summary>

![1](documentation/frontend/testing/nomination/nomination_create_successful.png)

</details>

<details>
<summary> 2/ Create Nomination – tag dropdwon </summary>

![2](documentation/frontend/testing/nomination/nomination_create_tag.png)

</details>

<details>
<summary> 3/ Create Nomination – search people by name </summary>

![3](documentation/frontend/testing/nomination/nomination_create_name.png)

</details>

<details>
<summary> 4/ Create Nomination – tag mandatory </summary>

![4](documentation/frontend/testing/nomination/nomination_create_tag_mandatory.png)

</details>

<details>
<summary> 5/ Edit Nomination – Dropdown feed </summary>

![5](documentation/frontend/testing/nomination/nomination_edit_feed.png)

</details>

<details>
<summary> 6/ Edit Nomination – Successful message </summary>

![6](documentation/frontend/testing/nomination/nomination_edit_successful.png)

</details>

<details>
<summary> 7/ Delete Nomination - Confirmation prompt </summary>

![7](documentation/frontend/testing/nomination/nomination_delete_prompt.png)

</details>

<details>
<summary> 8/ Delete Nomination > Successful message </summary>

![8](documentation/frontend/testing/nomination/nomination_delete_successful.png)

</details>

---

#### **Engaging with People & Posts**

| **Priority** | **User Story**         | **Page(s)**     | **Test Scenario / Action**            | **Expected Result**                                   | Actual | **Screenshot** |
| ------------ | ---------------------- | --------------- | ------------------------------------- | ----------------------------------------------------- | ------ | -------------- |
| Must Have    | Comment on Recognition        | Detail Page     | Submit valid comment                  | Comment appears below post                            |        |1|
| Should Have  | Like a Recognition            | Feed / Detail   | Click like and unlike                 | Count updates and button toggles correctly            |        |2 - 3|
| Should Have  | Edit/Delete My Comment | Detail Page     | Click edit or delete on owned comment | Comment updates or disappears as expected             |        ||
| Should Have  | Search for Colleagues  | Feed Search Bar | Type partial name                     | Matching users show with avatar + \"Nominate\" button |        ||

<details>
<summary> 1/ Comment on Recognition </summary>

![1](documentation/frontend/testing/comment/.png)

</details>

<details>
<summary> 2/ Like/Unlike on Recognition from the feed </summary>

![2](documentation/frontend/testing/like_feed/.png)

</details>

<details>
<summary> 3/ Like/Unlike on Recognition from the detail page </summary>

![3](documentation/frontend/testing/like_detail_page/.png)

</details>

#### **Managing My Profile & Network**

| **Priority** | **User Story**       | **Page(s)**            | **Test Scenario / Action**                          | **Expected Result**                           | Actual | **Screenshot** |
| ------------ | -------------------- | ---------------------- | --------------------------------------------------- | --------------------------------------------- | ------ | -------------- |
| Should Have  | Edit My Profile      | Profile Edit Page      | Change avatar or bio and save                       | Profile updates and info reflects new data    |        |
| Must Have    | View Public Profiles | Feed / Detail > Author | Click username/avatar of another user               | Public profile loads with bio + list of posts |        |
| Could Have   | View My Own Posts    | My Profile Page        | Visit profile and review recognitions + nominations | All user-created posts appear with preview    |        |

### 6.3 Validators

- **CSS - HTML**

- **JavaScript**

- **Python**

- **Lighthouse Performance & Best Practices Testing**

### 6.3 Bugs and Fixes

- List known bugs

- Unresolved issues

---

## 7. Deployment

### 7.1 Heroku

The site was deployed successfully to [Heroku](https://celebrateit-866641373084.herokuapp.com/) following the steps below:

1. In _Gitpod_, create a list of dependencies in `requirements.txt` file:
   - Run `pip3 freeze > requirements.txt` in the terminal.
   - Create _Procfile_
2. In _Heroku_ account, create the new App:
   - Select `New` and `Create a new app`.
   - Name the App (name must be unique) and choose a region: `Europe`
   - Click `Create App`.
3. In the new App page, access to the `Settings` section.
4. In `Config Var` add :
   - `DATABASE_URL` and its value.
   - `SECRET_KEY` and its value.
   - `CLOUDINARY_URL` and its value.
   - Click `Add`.
5. Access to the `Deploy` section.
6. Select the deployment method:
   - Select `GitHub`
   - Search for the repository by taping the name in the search barre.
   - Click on `Connect`
7. Click `Deploy Branch`.
8. Once App deployed, the message _Your app was successfully deployed._

The live link can be found here: [CelebrateIt](https://celebrateit-866641373084.herokuapp.com/)

### 7.1 Forking and Cloning

Forking the repository creates a copy of this project, allowing modifications without affecting the original code. Once the repository is forked, it can be cloned to a local machine for development.</br>
Follow these steps to fork, clone, and work on the project:

- **Fork the repository**

  - Go to the repository you want to fork on [GitHub](https://github.com/).
  - In the top-right corner of the page, click `Fork`.
  - Name the new forked repository, then click `Create Fork`.
  - This creates a copy of the repository under your own GitHub account.

- **Clone the forked repository**
  - In the forked repository on GitHub, above the list of files, click `Code`.
  - Copy the URL for the repository (either HTTPS or SSH).
  - Open a terminal (or Git Bash).
  - Type `git clone`, then paste the copied URL.
  - Press `Enter`.
  - Navigate to the newly cloned repository directory: `cd` and the repository name.

## 8. Credit

### **Content & Resources**

### **Acknowledgements**
