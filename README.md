# CelebrateIt

CelebrateIt is a mock social media platform inspired by the solutions offered by [Workhuman](https://www.workhuman.com). It allows employees to create accounts, log in, and share recognition stories with each other. Users can browse the latest stories, follow colleagues or teams, and engage with content through likes and comments.

Built using **React** and the **Django Rest Framework**, this project serves as a learning and portfolio exercise, demonstrating advanced front-end capabilities and API integration, showcasing full-stack development skills in designing a functional and user-friendly web application.

<details>
  <summary>ERD</summary>

![ERD Diagram](documentation/ERD_CelebrateIt.png)

</details>

## 2. **User Experience - UX**

### **2.1. Scope and Structure**

#### **Scope**

### 2.2. User Stories

CelebrateIt is designed to make it easy and meaningful for employees to share and celebrate recognition stories within their workplace community. The user experience is shaped by real-world needs and grouped into EPICs in a typical user journey. Stories are prioritised using the MoSCoW method.

---

#### **EPIC - Getting Started & Joining the Platform**

| **ID**                                                         | **Theme**                | **User Story**                                                                                                                  | **Prioritization** |
| -------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/1) | Account Registration     | New employees can create an account with basic credentials to join the CelebrateIt platform.                                    | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/2) | Login to Account         | Returning users can securely log into their existing profile to access all features.                                            | _must have_        |
| [3](https://github.com/SophieDufrane/PP5-celebrateit/issues/4) | Log out of Account       | Users can securely log out of their account to ensure their information remains protected when they are not using the platform. | _must have_        |
| [4](https://github.com/SophieDufrane/PP5-celebrateit/issues/5) | Navigation Menu          | Users can access the main navigation menu from anywhere in the app to move between sections easily.                             | _must have_        |
| [5](https://github.com/SophieDufrane/PP5-celebrateit/issues/6) | Conditional Menu Options | The menu adapts based on login status — showing login/signup when logged out, and profile/logout when logged in.                | _must have_        |

---

#### **EPIC - Exploring the Community**

| **ID**                                                          | **Theme**                                 | **User Story**                                                                                                 | **Prioritization** |
| --------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/7)  | Discover the Latest Stories & Nominations | Users can browse the feed to see the most recent stories and nominations shared by others across the platform. | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/8)  | Search Stories, Nominations & People      | A search tool allows users to find specific stories, nominations and colleagues by keyword.                    | _should have_      |
| [3](https://github.com/SophieDufrane/PP5-celebrateit/issues/10) | Browse Departments                        | Users can explore stories, nominations and profiles grouped by departments.                                    | _should have_      |

---

#### **EPIC - Sharing Stories and Nominations.**

| **ID**                                                          | **Theme**                         | **User Story**                                                                                                                                                | **Prioritization** |
| --------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/11) | Create a Recognition Story        | Users can share a story that highlights a colleague, team, or moment worth celebrating, optionally including an image and tags.                               | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/27) | Create a Nomination               | Users can create a nomination to recognize a colleague for their achievements.                                                                                | _must have_        |
| [3](https://github.com/SophieDufrane/PP5-celebrateit/issues/12) | View My Own Stories & Nominations | Users can view all their content, including stories and nominations, with the ability to filter by type (stories, nominations sent, or nominations received). | _should have_      |
| [4](https://github.com/SophieDufrane/PP5-celebrateit/issues/13) | Edit My Story & Nomination        | Users can return to a story or a nomination they’ve written and update or refine it as needed.                                                                | _should have_      |
| [5](https://github.com/SophieDufrane/PP5-celebrateit/issues/14) | Delete My Story                   | Users can delete a story they previously shared if they no longer want it to be visible on the platform.                                                      | _should have_      |

---

#### **EPIC - Engaging with Stories & Nominations**

| **ID**                                                          | **Theme**                                     | **User Story**                                                                                             | **Prioritization** |
| --------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/15) | View Story & Nominations Details              | Any user can click into a story or a nomination to view it fully, including all details.                   | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/16) | Like a Story or Nomination                    | Logged-in users can show support by liking a story or a nomination they connect with.                      | _could have_       |
| [3](https://github.com/SophieDufrane/PP5-celebrateit/issues/17) | Comment on a Story or Nomination              | Users can join the conversation by commenting on recognition stories or nominations shared by others.      | _could have_       |
| [4](https://github.com/SophieDufrane/PP5-celebrateit/issues/18) | Edit or Delete My Comments                    | Users can update or remove comments they've written.                                                       | _could have_       |
| [5](https://github.com/SophieDufrane/PP5-celebrateit/issues/20) | Stories or Nominations from Followed Profiles | The feed can be filtered to show only stories and nominations shared by users or teams the person follows. | _could have_       |

---

#### **EPIC - Managing My Profile & Network**

| **ID**                                                          | **Theme**            | **User Story**                                                                                                              | **Prioritization** |
| --------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/21) | View Public Profiles | Users can view the public-facing profiles of other employees, including their presentation, department, and shared stories. | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/22) | Edit My Profile      | Logged-in users can edit their avatar, presentation, and department to personalize their presence on the platform.          | _must have_        |

---

#### **EPIC - Keeping the Experience Seamless**

| **ID**                                                          | **Theme**               | **User Story**                                                                                               | **Prioritization** |
| --------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------ |
| [1](https://github.com/SophieDufrane/PP5-celebrateit/issues/24) | Stay Logged In          | The platform maintains the user’s session until they choose to log out, reducing unnecessary interruptions.  | _must have_        |
| [2](https://github.com/SophieDufrane/PP5-celebrateit/issues/25) | Smooth Page Navigation  | Users can move between pages without full reloads, for a fast and fluid experience.                          | _should have_      |
| [3](https://github.com/SophieDufrane/PP5-celebrateit/issues/26) | Endless Story Scrolling | Stories load automatically as users scroll, removing the need for pagination and keeping engagement flowing. | _could have_       |

---

### **2.4. Visual Design**

#### **Wireframes**

Wireframes were designed to outline the layout and functionality of each page and to help visualise the user flow. This ensures the platform’s structure is logical, responsive, and user-friendly.

[Balsamiq](https://balsamiq.com/?gad_source=1&gclid=CjwKCAiAm-67BhBlEiwAEVftNlJTamA65VQDctZEK7owZeyEq-JZFKrhXC3gEYcO3MafEUiVCTYcwBoCwXQQAvD_BwE) was utilised to craft the detailed wireframes. These initial sketches served as the foundation for the app’s final structure and layout.

  <details>

    <summary>Login Page Wireframe</summary>

    <img src="images-documentation/wireframes/log-in_page.png">

  </details>

#### **UI Design Approach**

The platform follows a **modern, clean design** with an emphasis on usability and accessibility.

- **Mobile-First Approach** – Optimised for all screen sizes.

- **Workhuman-Inspired Colour Palette** – Uses corporate colours for branding consistency.

- **Typography Choices** – Ensures readability and modern aesthetics.

---

#### **Typography & Colours**
