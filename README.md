# CelebrateIt

## Table of Contents

1. [Project Overview](#1-project-overview)

2. [User Experience (UX)](#2-user-experience-ux)

   - 2.1 [Strategy](#21-strategy)

   - 2.2 [Scope](#22-scope)

   - 2.3 [Structure](#23-structure)

   - 2.4 [Skeleton](#24-skeleton)

   - 2.5 [Surface](#25-surface)

3. [Features](#3-features)

4. [Technologies Used](#4-technologies-used)

5. [Development](#5-development)

   - 5.1 [Project Planning](#51-project-planning)

   - 5.2 [Architecture](#52-architecture)

   - 5.3 [Code Structure](#53-code-structure)

6. [Testing](#6-testing)

   - 6.1 [Automated Tests](#61-automated-tests)

   - 6.2 [Manual Testing](#62-manual-testing)

   - 6.3 [Bugs and Fixes](#63-bugs-and-fixes)

7. [Deployment](#7-deployment)

8. [Future Enhancements](#8-future-enhancements)

9. [Credits](#9-credits)

10. [License](#10-license)

---

## 1. Project Overview

### Brief Description

CelebrateIt is a mock employee recognition platform inspired by the solutions offered by Workhuman. It allows employees to share recognition stories, nominate colleagues for their achievements, and engage with content through likes and comments. By fostering a sense of appreciation and collaboration, CelebrateIt mirrors the functionality and purpose of modern social recognition platforms.

Built using Django REST for the backend and React for the frontend, this project serves as a learning and portfolio exercise, demonstrating full-stack development skills in designing a scalable, functional, and user-friendly web application.

### Purpose and Goals

The purpose of CelebrateIt is to create a platform that promotes a positive and engaging work culture. By enabling peer-to-peer recognition and celebrating achievements, the platform aims to:

- Build a culture of appreciation within organizations.

- Encourage collaboration and cross-departmental interactions through shared recognition.

- Provide a place for employees to share their stories and celebrate milestones, ensuring their contributions are visible and valued by their peers and leaders.

- Deliver actionable insights for HR teams to track recognition trends and identify outstanding contributions within teams.

- Ensure scalability and ease of use to accommodate growing organizational needs.

### Target Audience

CelebrateIt is designed for:

- **Employees**: To feel valued and connected by sharing their achievements and recognizing contributions from their colleagues.

- **HR Teams**: To track and analyze recognition trends, fostering a more engaged workforce while identifying top performers and recognizing outstanding contributions.

- **Team Leaders and Managers**: To build a positive team culture by facilitating recognition and appreciation among their team.

- **Companies**: That wish to improve employee satisfaction and retention by integrating a sense of community into their workplace culture.

---

## 2. User Experience (UX)

### 2.1 Strategy

#### **EPIC - Getting Started & Joining the Platform**

| **ID**                                                         | **Theme**                | **User Story**                                                                                                                  | **Prioritization** |
| -------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/1) | Account Registration     | New employees can create an account with basic credentials to join the CelebrateIt platform.                                    | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/2) | Login to Account         | Returning users can securely log into their existing profile to access all features.                                            | _must have_        |
| [3](https://github.com/SophieDufrane/PP5-celebrateit/issues/4) | Log out of Account       | Users can securely log out of their account to ensure their information remains protected when they are not using the platform. | _must have_        |
| [4](https://github.com/SophieDufrane/PP5-celebrateit/issues/5) | Navigation Menu          | Users can access the main navigation menu from anywhere in the app to move between sections easily.                             | _must have_        |
| [5](https://github.com/SophieDufrane/PP5-celebrateit/issues/6) | Conditional Menu Options | The menu adapts based on login status — showing login/signup when logged out, and profile/logout when logged in.                | _must have_        |

#### **EPIC - Exploring the Community**

| **ID**                                                          | **Theme**                                 | **User Story**                                                                                                 | **Prioritization** |
| --------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/7)  | Discover the Latest Stories & Nominations | Users can browse the feed to see the most recent stories and nominations shared by others across the platform. | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/8)  | Search Stories, Nominations & People      | A search tool allows users to find specific stories, nominations and colleagues by keyword.                    | _should have_      |
| [3](https://github.com/SophieDufrane/PP5-celebrateit/issues/10) | Browse Departments                        | Users can explore stories, nominations and profiles grouped by departments.                                    | _should have_      |

#### **EPIC - Sharing Stories and Nominations.**

| **ID**                                                          | **Theme**                         | **User Story**                                                                                                                                                | **Prioritization** |
| --------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/11) | Create a Recognition Story        | Users can share a story that highlights a colleague, team, or moment worth celebrating, optionally including an image and tags.                               | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/27) | Create a Nomination               | Users can create a nomination to recognize a colleague for their achievements.                                                                                | _must have_        |
| [3](https://github.com/SophieDufrane/PP5-celebrateit/issues/12) | View My Own Stories & Nominations | Users can view all their content, including stories and nominations, with the ability to filter by type (stories, nominations sent, or nominations received). | _should have_      |
| [4](https://github.com/SophieDufrane/PP5-celebrateit/issues/13) | Edit My Story & Nomination        | Users can return to a story or a nomination they’ve written and update or refine it as needed.                                                                | _should have_      |
| [5](https://github.com/SophieDufrane/PP5-celebrateit/issues/14) | Delete My Story                   | Users can delete a story they previously shared if they no longer want it to be visible on the platform.                                                      | _should have_      |

#### **EPIC - Engaging with Stories & Nominations**

| **ID**                                                          | **Theme**                                     | **User Story**                                                                                             | **Prioritization** |
| --------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/15) | View Story & Nominations Details              | Any user can click into a story or a nomination to view it fully, including all details.                   | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/16) | Like a Story or Nomination                    | Logged-in users can show support by liking a story or a nomination they connect with.                      | _could have_       |
| [3](https://github.com/SophieDufrane/PP5-celebrateit/issues/17) | Comment on a Story or Nomination              | Users can join the conversation by commenting on recognition stories or nominations shared by others.      | _could have_       |
| [4](https://github.com/SophieDufrane/PP5-celebrateit/issues/18) | Edit or Delete My Comments                    | Users can update or remove comments they've written.                                                       | _could have_       |
| [5](https://github.com/SophieDufrane/PP5-celebrateit/issues/20) | Stories or Nominations from Followed Profiles | The feed can be filtered to show only stories and nominations shared by users or teams the person follows. | _could have_       |

#### **EPIC - Managing My Profile & Network**

| **ID**                                                          | **Theme**            | **User Story**                                                                                                              | **Prioritization** |
| --------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/21) | View Public Profiles | Users can view the public-facing profiles of other employees, including their presentation, department, and shared stories. | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/22) | Edit My Profile      | Logged-in users can edit their avatar, presentation, and department to personalize their presence on the platform.          | _must have_        |

#### **EPIC - Keeping the Experience Seamless**

| **ID**                                                          | **Theme**               | **User Story**                                                                                               | **Prioritization** |
| --------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/24) | Stay Logged In          | The platform maintains the user’s session until they choose to log out, reducing unnecessary interruptions.  | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/25) | Smooth Page Navigation  | Users can move between pages without full reloads, for a fast and fluid experience.                          | _should have_      |
| [3](https://github.com/SophieDufrane/PP5-celebrateit/issues/26) | Endless Story Scrolling | Stories load automatically as users scroll, removing the need for pagination and keeping engagement flowing. | _could have_       |

---

#### Business goals

1. **Promote a Positive Work Culture:**

   - Foster a culture of recognition and appreciation within the organization.

   - Encourage employees to share positive stories and celebrate their colleagues' achievements.

2. **Boost Employee Engagement:**

   - Provide a platform where employees feel valued and connected.

   - Increase participation and interaction through features like stories, comments, and nominations.

3. **Support Peer-to-Peer Recognition:**

   - Enable employees to nominate colleagues for recognition.

   - Empower teams to celebrate each other's contributions.

4. **Enhance Team Collaboration:**

   - Strengthen team dynamics by creating a space for meaningful interactions.

   - Encourage cross-departmental acknowledgment and collaboration.

5. **Data-Driven Insights for HR:**

   - Collect and analyze recognition data to understand employee engagement trends.

   - Provide HR with actionable insights to reward top-performing employees.

6. **Retention and Morale:**

   - Improve employee retention rates by creating a supportive and rewarding environment.

   - Boost morale by recognizing and celebrating achievements.

7. **Ease of Use and Scalability:**

   - Ensure the platform is user-friendly and intuitive to maximize adoption.

   - Build a scalable architecture using Django REST and React to support organizational growth.

8. **Alignment with Organizational Values:**

   - Reflect and reinforce the company's core values through recognition stories.

   - Build a tool that integrates seamlessly with the existing culture and values.

---

### 2.2 Scope

This section outlines the features and functionalities planned for CelebrateIt, categorized using the **MoSCoW Prioritization Framework**. This framework identifies features as:

- **Must Have**: Essential features that are critical for the platform's core functionality.

- **Should Have**: High-priority features that enhance the user experience but are not essential for the platform's operation.

- **Could Have**: Nice-to-have features that provide additional value but are not critical to the platform's success.

- **Won't Have**: Features explicitly excluded from the current scope.

#### Planned Features

| **Feature**                                   | **MoSCoW Prioritization** |
| --------------------------------------------- | ------------------------- |
| Account Registration                          | Must Have                 |
| Login to Account                              | Must Have                 |
| Log out of Account                            | Must Have                 |
| Navigation Menu                               | Must Have                 |
| Conditional Menu Options                      | Should Have               |
| Discover the Latest Stories & Nominations     | Must Have                 |
| Search Stories, Nominations & People          | Should Have               |
| Browse Departments                            | Could Have                |
| Create a Recognition Story                    | Must Have                 |
| Create a Nomination                           | Must Have                 |
| View My Own Stories & Nominations             | Must Have                 |
| Edit My Story & Nomination                    | Should Have               |
| Delete My Story                               | Should Have               |
| View Story & Nominations Details              | Must Have                 |
| Like a Story or Nomination                    | Should Have               |
| Comment on a Story or Nomination              | Should Have               |
| Edit or Delete My Comments                    | Could Have                |
| Stories or Nominations from Followed Profiles | Could Have                |
| View Public Profiles                          | Should Have               |
| Edit My Profile                               | Should Have               |
| Stay Logged In                                | Must Have                 |
| Smooth Page Navigation                        | Should Have               |
| Endless Story Scrolling                       | Could Have                |

#### Key Considerations:

1. **Must Have Features**: These features form the foundation of the platform. For example:

   - **Account Registration** and **Login to Account** ensure users can securely access the platform.

   - **Create a Recognition Story** and **Create a Nomination** deliver the core functionality of sharing achievements and recognizing colleagues.

   - **Discover the Latest Stories & Nominations** and **View Story & Nominations Details** ensure users can engage with content.

2. **Should Have Features**: These features improve usability and engagement. For example:

   - **Search Stories, Nominations & People** allows users to easily find relevant content.

   - **Smooth Page Navigation** provides a seamless experience when browsing the platform.

   - **Like a Story or Nomination** and **Comment on a Story or Nomination** add social engagement elements.

3. **Could Have Features**: These features provide additional value but are not essential for the platform's initial release. For example:

   - **Browse Departments** allows users to explore stories and nominations grouped by departments.

   - **Stories or Nominations from Followed Profiles** enables personalized content based on user preferences.

   - **Endless Story Scrolling** enhances usability for users who want to consume large amounts of content.

4. **Won't Have Features**: Features that are explicitly excluded from the current scope will be documented in the "Future Enhancements" section if considered for later development.

By focusing on these prioritized features, CelebrateIt ensures that core functionality is delivered while leaving room for future improvements in subsequent releases.

---

### 2.3 Structure

#### Information Architecture

The information architecture of CelebrateIt is organized into the following sections:

1. **Homepage/Dashboard**: Displays the latest recognition stories and nominations, offering users easy access to trending and recent content.

2. **User Profile**: Allows users to:

   - View their own recognition stories and nominations.

   - Edit or delete their stories.

   - Update profile details.

3. **Create Story/Nomination**: Dedicated forms for users to:

   - Share a recognition story.

   - Nominate a colleague for recognition.

4. **Search & Discover**: Provides search functionality to find stories, nominations, or user profiles.

5. **Admin Panel (Optional)**: A section for administrators to manage users, stories, or nominations.

The relationships between the main data entities are as follows:

- **Users** can create multiple **Stories** and **Nominations**.

- **Stories** and **Nominations** can have multiple **Comments** and **Likes**, which are tied to specific users.

ERD

#### Flowchart for User Navigation

This section provides a visual representation of the user navigation flow within CelebrateIt. The flowchart captures how users interact with the platform, including key actions such as logging in, browsing stories, creating recognition posts, and navigating between profile pages.

Flowchart

---

### 2.4 Skeleton

#### Wireframes for Key Screens or Pages

The following wireframes outline the structure and layout of the main screens in CelebrateIt:

Wireframes

---

### 2.5 Surface

#### Color Scheme

The visual design of CelebrateIt uses a clean and modern color palette:

- **Primary Colors**:

  - **Blue (#1E90FF):** Represents trust, professionalism, and positivity.

  - **White (#FFFFFF):** Used as the background color for clean and modern aesthetics.

- **Accent Colors**:

  - **Green (#28A745):** Denotes success, recognition, and positive actions like "Create" or "Submit."

  - **Yellow (#FFC107):** Highlights important messages or sections.

- **Text Colors**:

  - **Dark Gray (#333333):** Used for primary text for readability.

  - **Light Gray (#888888):** Used for secondary text or placeholders.

#### Typography

CelebrateIt uses the following typography for consistency and readability:

- **Font Family**: "Roboto," sans-serif.

- **Font Weights**:

  - **Bold (700):** Used for headings and titles.

  - **Regular (400):** Used for body text.

  - **Light (300):** Used for secondary information or fine print.

- **Font Sizes**:

  - Headings: H1 (32px), H2 (24px), H3 (20px)

  - Body Text: 16px

  - Secondary Text: 14px

#### Design Elements

CelebrateIt features a modern and user-friendly design:

- **Buttons**: Rounded corners with hover, active, and disabled states for better interactivity.

- **Cards**: Recognition stories and nominations are displayed in card-style containers with spacing and shadows for separation.

- **Icons**: Minimalist icons are used for navigation and actions like "Like," "Comment," or "Edit."

- **Spacing**: Consistent padding and margins ensure clean and readable layouts.

#### Mockups or High-Fidelity Designs

The following mockups showcase the key screens of CelebrateIt:

1. **Homepage/Dashboard**: Displays the feed of recognition stories and nominations.

2. **Create Story/Nomination Page**: A form design with input fields and buttons.

3. **User Profile Page**: Displays user details and a list of their stories/nominations.

4. **Story/Nomination Details Page**: A detailed view of a specific story or nomination with options to like, comment, or share.

---

## 3. Features

This section is meant to highlight the implemented features and focus on execution. It should:

Showcase the actual features that are part of the final product.
Highlight unique or innovative aspects of the application.
Include screenshots, GIFs, or visuals to demonstrate the features (if applicable).
Provide brief descriptions of how each feature works.
This section is backward-looking, documenting what was delivered in the final product.

---

## 4. Technologies Used

- List programming languages, frameworks, libraries, and tools used

- Mention any third-party APIs or integrations

---

## 5. Development

### 5.1 Project Planning

- Agile methodology, Kanban, or other approaches used

- Tools (e.g., Trello, Jira, GitHub Projects)

### 5.2 Architecture

- Overview of the application architecture

- Diagram of the system (if applicable)

### 5.3 Code Structure

- Folder and file organization

- Explanation of the main components

---

## 6. Testing

### 6.1 Automated Tests

- Unit tests, integration tests, or end-to-end tests

- Tools used (e.g., Jest, Selenium, etc.)

### 6.2 Manual Testing

- Test cases executed

- Devices and browsers tested

### 6.3 Bugs and Fixes

- List known bugs and how they were resolved

- Unresolved issues (if any)

---

## 7. Deployment

- Deployment steps or pipeline (e.g., CI/CD)

- Hosting platform (e.g., GitHub Pages, AWS, Heroku)

- Links to the live application
