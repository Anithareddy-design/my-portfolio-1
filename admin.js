/* =========================================================
   ANITHA REDDY PORTFOLIO ADMIN PANEL
   FRONTEND DEMO ONLY

   Demo Login:
   Username: admin
   Password: admin123

   NOTE:
   This uses LocalStorage because the portfolio is currently
   a frontend/GitHub Pages project. This is NOT secure
   production authentication.
========================================================= */


/* ================= CONFIG ================= */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const STORAGE_KEY = "anithaPortfolioAdminData";
const SESSION_KEY = "anithaAdminSession";


/* ================= DEFAULT DATA ================= */

const defaultData = {

  projects: [
    {
      id: generateId(),
      name: "Aureva Brand Portfolio",
      category: "Web Development",
      description: "A premium portfolio website created for a modern brand.",
      link: "https://aureva-brand-portfolio.vercel.app/",
      github: "",
      tech: "HTML, CSS, JavaScript",
      featured: true
    },

    {
      id: generateId(),
      name: "Anu Designs",
      category: "Web Design",
      description: "Creative website showcasing design work and services.",
      link: "",
      github: "",
      tech: "HTML, CSS, JavaScript",
      featured: false
    },

    {
      id: generateId(),
      name: "Crochet Showcase",
      category: "E-Commerce",
      description: "Product showcase website with customization and WhatsApp ordering.",
      link: "https://crochet-showcase-demo.vercel.app/",
      github: "",
      tech: "HTML, CSS, JavaScript",
      featured: true
    }
  ],


  skills: [
    {
      id: generateId(),
      name: "Python",
      category: "Programming",
      level: 85,
      icon: "🐍"
    },

    {
      id: generateId(),
      name: "C",
      category: "Programming",
      level: 75,
      icon: "💻"
    },

    {
      id: generateId(),
      name: "DSA",
      category: "Programming",
      level: 70,
      icon: "🧠"
    },

    {
      id: generateId(),
      name: "HTML",
      category: "Web Development",
      level: 90,
      icon: "🌐"
    },

    {
      id: generateId(),
      name: "CSS",
      category: "Web Development",
      level: 90,
      icon: "🎨"
    },

    {
      id: generateId(),
      name: "JavaScript",
      category: "Web Development",
      level: 80,
      icon: "⚡"
    },

    {
      id: generateId(),
      name: "Prompt Engineering",
      category: "AI & Tools",
      level: 85,
      icon: "🤖"
    },

    {
      id: generateId(),
      name: "AI Tools",
      category: "AI & Tools",
      level: 90,
      icon: "✨"
    },

    {
      id: generateId(),
      name: "Canva",
      category: "Design",
      level: 85,
      icon: "🖌️"
    },

    {
      id: generateId(),
      name: "WordPress",
      category: "Web Development",
      level: 65,
      icon: "🌍"
    }
  ],


  resume: {
    title: "Anitha Reddy Resume",
    url: "Updated_Resume.pdf"
  },


  contact: {
    email: "",
    phone: "",
    location: "Vijayawada, Andhra Pradesh",
    linkedin: "",
    github: "https://github.com/Anithareddy-design",
    instagram: "",
    availability: "Available for internships"
  },


  jarvis: {
    enabled: true,
    name: "JARVIS",
    language: "English + Telugu",
    wakePhrases: [
      "Jarvis wakeup",
      "hey Jarvis"
    ],
    voice: true,
    navigation: true,
    jokes: true,
    greeting: "Good morning, Ma'am. How can I help you?"
  },


  site: {
    title: "Anitha Reddy | Portfolio",
    tagline: "CSE Student • Developer • AI Enthusiast",
    announcement: "Currently open for internships and opportunities.",
    showProjects: true,
    showSkills: true,
    showJarvis: true,
    maintenance: false
  },


  messages: [],


  activity: [
    {
      text: "Admin panel initialized",
      time: getDateTime()
    },

    {
      text: "Portfolio management system ready",
      time: getDateTime()
    }
  ]

};


/* ================= DATA ================= */

let data = loadData();


function generateId() {

  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return Date.now().toString() +
    Math.random().toString(16).slice(2);

}


function loadData() {

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultData)
    );

    return structuredClone(defaultData);
  }

  try {

    const parsed = JSON.parse(saved);

    return {
      ...structuredClone(defaultData),
      ...parsed
    };

  } catch {

    return structuredClone(defaultData);

  }

}


function saveData() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );

}


function getDateTime() {

  return new Date().toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }
  );

}


/* ================= LOGIN ================= */

document.addEventListener("DOMContentLoaded", () => {

  const loginPage = document.getElementById("loginPage");
  const dashboard = document.getElementById("dashboard");

  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    showDashboard();
  }

  document
    .getElementById("loginForm")
    .addEventListener("submit", login);

  document
    .getElementById("projectForm")
    .addEventListener("submit", saveProject);

  document
    .getElementById("skillForm")
    .addEventListener("submit", saveSkill);

  document
    .getElementById("resumeForm")
    .addEventListener("submit", saveResume);

  document
    .getElementById("contactForm")
    .addEventListener("submit", saveContact);

  document
    .getElementById("jarvisForm")
    .addEventListener("submit", saveJarvis);

  document
    .getElementById("settingsForm")
    .addEventListener("submit", saveSettings);

  document
    .getElementById("skillLevel")
    .addEventListener("input", function () {

      document.getElementById("skillLevelValue").textContent =
        this.value;

    });

  document
    .getElementById("importFile")
    .addEventListener("change", importData);

  document.querySelectorAll(".nav-item").forEach(button => {

    button.addEventListener("click", () => {

      showSection(button.dataset.section);

    });

  });

  renderEverything();

});


function login(event) {

  event.preventDefault();

  const username =
    document.getElementById("username").value.trim();

  const password =
    document.getElementById("password").value;

  const error =
    document.getElementById("loginError");


  if (
    username === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD
  ) {

    sessionStorage.setItem(
      SESSION_KEY,
      "true"
    );

    error.textContent = "";

    addActivity("Admin logged into dashboard");

    showDashboard();

  } else {

    error.textContent =
      "Invalid username or password.";

  }

}


function showDashboard() {

  document
    .getElementById("loginPage")
    .style.display = "none";

  document
    .getElementById("dashboard")
    .classList.add("show");

  renderEverything();

}


function logout() {

  sessionStorage.removeItem(SESSION_KEY);

  document
    .getElementById("dashboard")
    .classList.remove("show");

  document
    .getElementById("loginPage")
    .style.display = "flex";

  document
    .getElementById("password")
    .value = "";

}


/* ================= NAVIGATION ================= */

function showSection(sectionId) {

  document
    .querySelectorAll(".page-section")
    .forEach(section => {

      section.classList.remove("active");

    });


  const section =
    document.getElementById(sectionId);

  if (!section) return;

  section.classList.add("active");


  document
    .querySelectorAll(".nav-item")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.section === sectionId
      );

    });


  const titles = {

    dashboardSection: "Dashboard",
    projectsSection: "Projects",
    skillsSection: "Skills",
    resumeSection: "Resume",
    contactSection: "Contact",
    jarvisSection: "JARVIS",
    messagesSection: "Messages",
    settingsSection: "Site Settings"

  };


  document.getElementById("pageTitle").textContent =
    titles[sectionId] || "Dashboard";


  renderEverything();

}


/* ================= RENDER ALL ================= */

function renderEverything() {

  renderProjects();
  renderSkills();
  renderResume();
  renderContact();
  renderJarvis();
  renderMessages();
  renderSettings();
  renderActivity();
  updateStats();

}


/* ================= STATS ================= */

function updateStats() {

  document.getElementById("projectCount").textContent =
    data.projects.length;

  document.getElementById("skillCount").textContent =
    data.skills.length;

  document.getElementById("jarvisStatus").textContent =
    data.jarvis.enabled ? "ON" : "OFF";

}


/* ================= PROJECTS ================= */

function renderProjects() {

  const container =
    document.getElementById("projectList");

  if (!container) return;


  if (data.projects.length === 0) {

    container.innerHTML = `
      <div class="empty-state">
        No projects found.<br>
        Click "Add Project" to create one.
      </div>
    `;

    return;

  }


  container.innerHTML =
    data.projects.map(project => `

      <div class="project-card">

        <div class="project-top">

          <div>

            <span class="category">
              ${escapeHTML(project.category)}
            </span>

            <h3>
              ${escapeHTML(project.name)}
            </h3>

          </div>

          ${
            project.featured
              ? `<span class="featured">★ FEATURED</span>`
              : ""
          }

        </div>


        <p>
          ${escapeHTML(project.description)}
        </p>


        <div class="tech-list">
          ${escapeHTML(project.tech || "No technologies added")}
        </div>


        <div class="card-actions">

          <button
            class="edit-btn"
            onclick="editProject('${project.id}')"
          >
            Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteProject('${project.id}')"
          >
            Delete
          </button>

          ${
            project.link
              ? `
                <a
                  href="${safeURL(project.link)}"
                  target="_blank"
                  class="secondary-btn"
                >
                  View
                </a>
              `
              : ""
          }

        </div>

      </div>

    `).join("");

}


function openProjectModal() {

  document.getElementById("projectModalTitle").textContent =
    "Add New Project";

  document.getElementById("editProjectId").value = "";

  document.getElementById("projectForm").reset();

  document.getElementById("projectModal").classList.add("show");

}


function closeProjectModal() {

  document
    .getElementById("projectModal")
    .classList.remove("show");

}


function editProject(id) {

  const project =
    data.projects.find(item => item.id === id);

  if (!project) return;


  document.getElementById("projectModalTitle").textContent =
    "Edit Project";

  document.getElementById("editProjectId").value =
    project.id;

  document.getElementById("projectName").value =
    project.name;

  document.getElementById("projectCategory").value =
    project.category;

  document.getElementById("projectDescription").value =
    project.description;

  document.getElementById("projectLink").value =
    project.link || "";

  document.getElementById("projectGithub").value =
    project.github || "";

  document.getElementById("projectTech").value =
    project.tech || "";

  document.getElementById("projectFeatured").checked =
    Boolean(project.featured);


  document
    .getElementById("projectModal")
    .classList.add("show");

}


function saveProject(event) {

  event.preventDefault();


  const id =
    document.getElementById("editProjectId").value;


  const project = {

    id: id || generateId(),

    name:
      document.getElementById("projectName").value.trim(),

    category:
      document.getElementById("projectCategory").value.trim(),

    description:
      document.getElementById("projectDescription").value.trim(),

    link:
      document.getElementById("projectLink").value.trim(),

    github:
      document.getElementById("projectGithub").value.trim(),

    tech:
      document.getElementById("projectTech").value.trim(),

    featured:
      document.getElementById("projectFeatured").checked

  };


  if (id) {

    const index =
      data.projects.findIndex(item => item.id === id);

    if (index !== -1) {
      data.projects[index] = project;
    }

    addActivity(`Updated project: ${project.name}`);

    showToast("Project updated successfully.");

  } else {

    data.projects.push(project);

    addActivity(`Added project: ${project.name}`);

    showToast("Project added successfully.");

  }


  saveData();
  renderEverything();
  closeProjectModal();

}


function deleteProject(id) {

  const project =
    data.projects.find(item => item.id === id);

  if (!project) return;


  if (
    !confirm(
      `Delete "${project.name}" from your portfolio?`
    )
  ) return;


  data.projects =
    data.projects.filter(item => item.id !== id);


  addActivity(`Deleted project: ${project.name}`);

  saveData();
  renderEverything();

  showToast("Project deleted.");

}


/* ================= SKILLS ================= */

function renderSkills() {

  const container =
    document.getElementById("skillsList");

  if (!container) return;


  if (data.skills.length === 0) {

    container.innerHTML = `
      <div class="empty-state">
        No skills added yet.
      </div>
    `;

    return;

  }


  container.innerHTML =
    data.skills.map(skill => `

      <div class="skill-card">

        <div class="skill-header">

          <div class="skill-title">

            <div class="skill-icon">
              ${escapeHTML(skill.icon || "✦")}
            </div>

            <div>

              <strong>
                ${escapeHTML(skill.name)}
              </strong>

              <div class="skill-category">
                ${escapeHTML(skill.category)}
              </div>

            </div>

          </div>

          <span class="skill-level">
            ${skill.level}%
          </span>

        </div>


        <div class="progress">
          <div
            class="progress-bar"
            style="width:${skill.level}%"
          ></div>
        </div>


        <div class="card-actions">

          <button
            class="edit-btn"
            onclick="editSkill('${skill.id}')"
          >
            Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteSkill('${skill.id}')"
          >
            Delete
          </button>

        </div>

      </div>

    `).join("");

}


function openSkillModal() {

  document.getElementById("skillModalTitle").textContent =
    "Add New Skill";

  document.getElementById("editSkillId").value = "";

  document.getElementById("skillForm").reset();

  document.getElementById("skillLevel").value = 80;

  document.getElementById("skillLevelValue").textContent = 80;

  document
    .getElementById("skillModal")
    .classList.add("show");

}


function closeSkillModal() {

  document
    .getElementById("skillModal")
    .classList.remove("show");

}


function editSkill(id) {

  const skill =
    data.skills.find(item => item.id === id);

  if (!skill) return;


  document.getElementById("skillModalTitle").textContent =
    "Edit Skill";

  document.getElementById("editSkillId").value =
    skill.id;

  document.getElementById("skillName").value =
    skill.name;

  document.getElementById("skillCategory").value =
    skill.category;

  document.getElementById("skillLevel").value =
    skill.level;

  document.getElementById("skillLevelValue").textContent =
    skill.level;

  document.getElementById("skillIcon").value =
    skill.icon || "";


  document
    .getElementById("skillModal")
    .classList.add("show");

}


function saveSkill(event) {

  event.preventDefault();


  const id =
    document.getElementById("editSkillId").value;


  const skill = {

    id: id || generateId(),

    name:
      document.getElementById("skillName").value.trim(),

    category:
      document.getElementById("skillCategory").value,

    level:
      Number(document.getElementById("skillLevel").value),

    icon:
      document.getElementById("skillIcon").value.trim() || "✦"

  };


  if (id) {

    const index =
      data.skills.findIndex(item => item.id === id);

    if (index !== -1) {
      data.skills[index] = skill;
    }

    addActivity(`Updated skill: ${skill.name}`);

    showToast("Skill updated.");

  } else {

    data.skills.push(skill);

    addActivity(`Added skill: ${skill.name}`);

    showToast("Skill added.");

  }


  saveData();
  renderEverything();
  closeSkillModal();

}


function deleteSkill(id) {

  const skill =
    data.skills.find(item => item.id === id);

  if (!skill) return;


  if (
    !confirm(
      `Delete "${skill.name}" from your skills?`
    )
  ) return;


  data.skills =
    data.skills.filter(item => item.id !== id);


  addActivity(`Deleted skill: ${skill.name}`);

  saveData();
  renderEverything();

  showToast("Skill deleted.");

}


/* ================= RESUME ================= */

function renderResume() {

  const title =
    document.getElementById("resumeTitle");

  const url =
    document.getElementById("resumeUrl");

  const preview =
    document.getElementById("resumePreview");


  if (!title) return;


  title.value =
    data.resume.title || "";

  url.value =
    data.resume.url || "";


  if (data.resume.url) {

    preview.href =
      data.resume.url;

  } else {

    preview.href = "#";

  }

}


function saveResume(event) {

  event.preventDefault();


  data.resume.title =
    document.getElementById("resumeTitle").value.trim();

  data.resume.url =
    document.getElementById("resumeUrl").value.trim();


  addActivity("Updated resume information");

  saveData();

  showToast("Resume updated.");

  renderEverything();

}


/* ================= CONTACT ================= */

function renderContact() {

  const fields = {

    contactEmail: data.contact.email,
    contactPhone: data.contact.phone,
    contactLocation: data.contact.location,
    contactLinkedin: data.contact.linkedin,
    contactGithub: data.contact.github,
    contactInstagram: data.contact.instagram,
    contactAvailability: data.contact.availability

  };


  Object.entries(fields).forEach(
    ([id,value]) => {

      const element =
        document.getElementById(id);

      if (element) {
        element.value = value || "";
      }

    }
  );

}


function saveContact(event) {

  event.preventDefault();


  data.contact = {

    email:
      document.getElementById("contactEmail").value.trim(),

    phone:
      document.getElementById("contactPhone").value.trim(),

    location:
      document.getElementById("contactLocation").value.trim(),

    linkedin:
      document.getElementById("contactLinkedin").value.trim(),

    github:
      document.getElementById("contactGithub").value.trim(),

    instagram:
      document.getElementById("contactInstagram").value.trim(),

    availability:
      document.getElementById("contactAvailability").value

  };


  addActivity("Updated contact information");

  saveData();

  showToast("Contact information saved.");

}


function clearContact() {

  if (
    !confirm(
      "Are you sure you want to clear all contact information?"
    )
  ) return;


  data.contact = {

    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    instagram: "",
    availability: "Currently unavailable"

  };


  addActivity("Cleared contact information");

  saveData();
  renderContact();

  showToast("Contact information cleared.");

}


/* ================= JARVIS ================= */

function renderJarvis() {

  document.getElementById("jarvisName").value =
    data.jarvis.name;

  document.getElementById("jarvisLanguage").value =
    data.jarvis.language;

  document.getElementById("jarvisWake").value =
    data.jarvis.wakePhrases.join(", ");

  document.getElementById("jarvisGreeting").value =
    data.jarvis.greeting;

  document.getElementById("jarvisEnabled").checked =
    data.jarvis.enabled;

  document.getElementById("jarvisVoice").checked =
    data.jarvis.voice;

  document.getElementById("jarvisNavigation").checked =
    data.jarvis.navigation;

  document.getElementById("jarvisJokes").checked =
    data.jarvis.jokes;


  const liveText =
    document.getElementById("jarvisLiveText");

  if (data.jarvis.enabled) {

    liveText.textContent = "ONLINE";
    liveText.style.color = "var(--success)";

  } else {

    liveText.textContent = "OFFLINE";
    liveText.style.color = "var(--danger)";

  }

}


function saveJarvis(event) {

  event.preventDefault();


  data.jarvis = {

    enabled:
      document.getElementById("jarvisEnabled").checked,

    name:
      document.getElementById("jarvisName").value.trim(),

    language:
      document.getElementById("jarvisLanguage").value,

    wakePhrases:
      document
        .getElementById("jarvisWake")
        .value
        .split(",")
        .map(item => item.trim())
        .filter(Boolean),

    voice:
      document.getElementById("jarvisVoice").checked,

    navigation:
      document.getElementById("jarvisNavigation").checked,

    jokes:
      document.getElementById("jarvisJokes").checked,

    greeting:
      document.getElementById("jarvisGreeting").value.trim()

  };


  addActivity("Updated JARVIS configuration");

  saveData();
  renderJarvis();
  updateStats();

  showToast("JARVIS settings saved.");

}


function testJarvis() {

  if (!data.jarvis.enabled) {

    showToast("JARVIS is currently disabled.");

    return;

  }


  const message =
    data.jarvis.greeting ||
    "Hello Ma'am. JARVIS is online.";


  if (
    "speechSynthesis" in window &&
    data.jarvis.voice
  ) {

    const speech =
      new SpeechSynthesisUtterance(message);

    speech.lang =
      data.jarvis.language === "Telugu"
        ? "te-IN"
        : "en-IN";

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);

  }


  showToast("JARVIS test completed ⚡");

}


/* ================= MESSAGES ================= */

function renderMessages() {

  const container =
    document.getElementById("messagesList");

  if (!container) return;


  if (!data.messages.length) {

    container.innerHTML = `
      <div class="empty-state">
        ✉<br><br>
        No contact messages yet.
      </div>
    `;

    return;

  }


  container.innerHTML =
    data.messages.map(message => `

      <div class="message-card ${
        message.read ? "" : "unread"
      }">

        <h3>
          ${escapeHTML(message.name || "Unknown")}
        </h3>

        <div class="message-meta">

          ${escapeHTML(message.email || "")}
          •
          ${escapeHTML(message.date || "")}

        </div>

        <div class="message-body">
          ${escapeHTML(message.message || "")}
        </div>

        <div class="message-actions">

          <button
            class="edit-btn"
            onclick="toggleMessageRead('${message.id}')"
          >
            ${message.read ? "Mark Unread" : "Mark Read"}
          </button>

          ${
            message.email
              ? `
                <a
                  class="secondary-btn"
                  href="mailto:${safeMail(message.email)}"
                >
                  Reply
                </a>
              `
              : ""
          }

          <button
            class="delete-btn"
            onclick="deleteMessage('${message.id}')"
          >
            Delete
          </button>

        </div>

      </div>

    `).join("");

}


function toggleMessageRead(id) {

  const message =
    data.messages.find(item => item.id === id);

  if (!message) return;

  message.read = !message.read;

  saveData();
  renderMessages();

}


function deleteMessage(id) {

  if (!confirm("Delete this message?")) return;

  data.messages =
    data.messages.filter(item => item.id !== id);

  addActivity("Deleted a contact message");

  saveData();
  renderMessages();

  showToast("Message deleted.");

}


/* ================= SETTINGS ================= */

function renderSettings() {

  document.getElementById("siteTitle").value =
    data.site.title || "";

  document.getElementById("siteTagline").value =
    data.site.tagline || "";

  document.getElementById("siteAnnouncement").value =
    data.site.announcement || "";

  document.getElementById("showProjects").checked =
    data.site.showProjects;

  document.getElementById("showSkills").checked =
    data.site.showSkills;

  document.getElementById("showJarvis").checked =
    data.site.showJarvis;

  document.getElementById("maintenanceMode").checked =
    data.site.maintenance;

}


function saveSettings(event) {

  event.preventDefault();


  data.site = {

    title:
      document.getElementById("siteTitle").value.trim(),

    tagline:
      document.getElementById("siteTagline").value.trim(),

    announcement:
      document.getElementById("siteAnnouncement").value.trim(),

    showProjects:
      document.getElementById("showProjects").checked,

    showSkills:
      document.getElementById("showSkills").checked,

    showJarvis:
      document.getElementById("showJarvis").checked,

    maintenance:
      document.getElementById("maintenanceMode").checked

  };


  addActivity("Updated site settings");

  saveData();

  showToast("Site settings saved.");

}


/* ================= ACTIVITY ================= */

function addActivity(text) {

  if (!data.activity) {
    data.activity = [];
  }


  data.activity.unshift({

    text,
    time: getDateTime()

  });


  data.activity =
    data.activity.slice(0, 10);

  saveData();

}


function renderActivity() {

  const container =
    document.getElementById("activityList");

  if (!container) return;


  if (!data.activity.length) {

    container.innerHTML = `
      <div class="empty-state">
        No recent activity.
      </div>
    `;

    return;

  }


  container.innerHTML =
    data.activity.slice(0, 8).map(item => `

      <div class="activity-item">

        <div class="activity-icon">
          ✦
        </div>

        <div>

          <strong>
            ${escapeHTML(item.text)}
          </strong>

          <small>
            ${escapeHTML(item.time)}
          </small>

        </div>

      </div>

    `).join("");

}


/* ================= BACKUP ================= */

function exportData() {

  const json =
    JSON.stringify(data, null, 2);

  const blob =
    new Blob(
      [json],
      { type: "application/json" }
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "anitha-portfolio-admin-backup.json";

  link.click();

  URL.revokeObjectURL(url);

  addActivity("Exported admin data");

  showToast("Backup exported successfully.");

}


function importData(event) {

  const file =
    event.target.files[0];

  if (!file) return;


  const reader =
    new FileReader();


  reader.onload = function () {

    try {

      const imported =
        JSON.parse(reader.result);


      if (
        !imported.projects ||
        !imported.skills ||
        !imported.contact
      ) {

        throw new Error(
          "Invalid admin backup."
        );

      }


      data = {

        ...structuredClone(defaultData),
        ...imported

      };


      saveData();

      renderEverything();

      addActivity("Imported admin backup");

      showToast("Data imported successfully.");

    } catch {

      showToast(
        "Invalid backup file."
      );

    }

  };


  reader.readAsText(file);

  event.target.value = "";

}


function resetData() {

  if (
    !confirm(
      "This will delete your current admin data and restore demo data. Continue?"
    )
  ) return;


  data =
    structuredClone(defaultData);

  saveData();

  renderEverything();

  showToast("Demo data restored.");

}


/* ================= HELPERS ================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function safeURL(value) {

  const url =
    String(value || "").trim();

  if (
    url.startsWith("https://") ||
    url.startsWith("http://")
  ) {
    return url;
  }

  return "#";

}


function safeMail(value) {

  return encodeURIComponent(
    String(value || "")
  );

}


function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.textContent =
    message;

  toast.classList.add("show");


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2500);

}


/* ================= CLOSE MODALS ================= */

window.addEventListener("click", event => {

  if (
    event.target.id === "projectModal"
  ) {
    closeProjectModal();
  }

  if (
    event.target.id === "skillModal"
  ) {
    closeSkillModal();
  }

});


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeProjectModal();
    closeSkillModal();

  }

});


/* ================= PORTFOLIO INTEGRATION =================

   Your main portfolio can read:

   localStorage.getItem("anithaPortfolioAdminData")

   and use:
   data.projects
   data.skills
   data.contact
   data.jarvis
   data.site

   IMPORTANT:
   LocalStorage changes are only available in the
   same browser/device. GitHub Pages does not provide
   a backend database.
========================================================= */