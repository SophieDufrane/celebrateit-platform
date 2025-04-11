# CelebrateIt

CelebrateIt is a mock social media platform inspired by the solutions offered by [Workhuman](https://www.workhuman.com). It allows employees to create accounts, log in, and share recognition stories with each other. Users can browse the latest stories, follow colleagues or teams, and engage with content through likes and comments.

Built using **React** and the **Django Rest Framework**, this project serves as a learning and portfolio exercise, demonstrating advanced front-end capabilities and API integration, showcasing full-stack development skills in designing a functional and user-friendly web application.

  <details>

    <summary>ERD</summary>

    <img src="documentation/ERD_CelebrateIt.png">

  </details>

## 2. **User Experience - UX**

### **2.1. Scope and Structure**

#### **Scope**

### 2.2. User Stories

CelebrateIt is designed to make it easy and meaningful for employees to share and celebrate recognition stories within their workplace community. The user experience is shaped by real-world needs and grouped into EPICs in a typical user journey. Stories are prioritised using the MoSCoW method.

---

#### **EPIC - Getting Started & Joining the Platform**

1. **Account Registration** _(must have)_  
   New employees can create an account with basic credentials to join the CelebrateIt platform.

2. **Login to Account** _(must have)_  
   Returning users can securely log into their existing profile to access all features.

3. **Log out of Account** _(must have)_  
   Users can securely log out of their account to ensure their information remains protected when they are not using the platform.

4. **Navigation Menu** _(must have)_  
   Users can access the main navigation menu from anywhere in the app to move between sections easily.

5. **Conditional Menu Options** _(must have)_  
   The menu adapts based on login status — showing login/signup when logged out, and profile/logout when logged in.

---

#### **EPIC - Exploring the Community**

1. **Discover the Latest Stories** _(must have)_  
   Users can browse the feed to see the most recent stories shared by others across the platform.

2. **Search Stories and People** _(must have)_  
   A search tool allows users to find specific stories, colleagues, or teams by keyword.

3. **Follow People or Teams** _(should have)_  
   Users can follow specific individuals or teams to tailor their feed to what matters most.

4. **Browse Teams and Departments** _(could have)_  
   Users can explore stories and profiles grouped by teams, departments, or roles within the company to find stories from colleagues they work closely with or want to learn more about.

---

#### **EPIC - Sharing & Celebrating Stories**

1. **Create a Recognition Story** _(must have)_  
   Users can share a story that highlights a colleague, team, or moment worth celebrating, optionally including an image.

2. **View My Own Stories** _(should have)_  
   Users can see a list of the stories they’ve written from their own profile.

3. **Edit My Story** _(should have)_  
   Users can return to a story they’ve written and update or refine it as needed.

4. **Delete My Story** _(should have)_  
   Users can delete a story they previously shared if they no longer want it to be visible on the platform.

---

#### **EPIC - Engaging with Stories**

1. **View Story Details** _(must have)_  
   Any user can click into a story to view it fully, including all associated recognition details and comments.

2. **Like a Story** _(must have)_  
   Logged-in users can show support by liking a story they connect with.

3. **Comment on a Story** _(must have)_  
   Users can join the conversation by commenting on recognition stories shared by others.

4. **Edit or Delete My Comments** _(should have)_  
   Users can update or remove comments they've written.

5. **View Liked Stories** _(should have)_  
   Users can revisit stories they’ve previously liked via their own profile or a dedicated view.

6. **Stories from Followed Profiles** _(should have)_  
   The feed can be filtered to show only stories shared by users or teams the person follows.

---

#### **EPIC - Managing My Profile & Network**

1. **View Public Profiles** _(must have)_  
   Users can view the public-facing profiles of other employees, including their bio and shared stories.

2. **Edit My Profile** _(should have)_  
   Logged-in users can edit their avatar and bio to personalize their presence on the platform.

3. **View Profile Stats** _(could have)_  
   Each profile includes stats like number of stories shared, followers, and followed users.

4. **Update My Credentials** _(could have)_  
   Users can change their username and password to stay secure and in control of their account.

---

#### **EPIC - Keeping the Experience Seamless**

1. **Stay Logged In** _(must have)_  
   The platform maintains the user’s session until they choose to log out, reducing unnecessary interruptions.

2. **Smooth Page Navigation** _(should have)_  
   Users can move between pages without full reloads, for a fast and fluid experience.

3. **Endless Story Scrolling** _(should have)_  
   Stories load automatically as users scroll, removing the need for pagination and keeping engagement flowing.

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
