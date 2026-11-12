// ── DATA SYNC & STORAGE CONSTANTS ──
const STORAGE_KEY = "anithaPortfolioAdminData";

const DEFAULT_PORTFOLIO_DATA = {
  projects: [
    {
      name: "Aureva Brand Portfolio",
      category: "Web Development",
      description: "A premium portfolio website created for a modern brand.",
      link: "https://aureva-brand-portfolio.vercel.app/",
      tech: "HTML, CSS, JavaScript"
    },
    {
      name: "Anu Designs",
      category: "Web Design",
      description: "Creative website showcasing design work and services.",
      link: "",
      tech: "HTML, CSS, JavaScript"
    },
    {
      name: "Crochet Showcase",
      category: "E-Commerce",
      description: "Product showcase website with customization and WhatsApp ordering.",
      link: "https://crochet-showcase-demo.vercel.app/",
      tech: "HTML, CSS, JavaScript"
    }
  ],
  skills: [
    { name: "Python", category: "Programming", level: 85, icon: "🐍" },
    { name: "HTML5 & CSS3", category: "Web Development", level: 95, icon: "🌐" },
    { name: "JavaScript", category: "Web Development", level: 80, icon: "⚡" },
    { name: "Prompt Engineering", category: "AI", level: 92, icon: "🤖" },
    { name: "Generative AI & LLMs", category: "AI", level: 88, icon: "🧠" },
    { name: "React.js", category: "Web Development", level: 78, icon: "⚛️" },
    { name: "Git & GitHub", category: "Tools", level: 85, icon: "📦" },
    { name: "UI/UX Design", category: "Design", level: 82, icon: "🎨" }
  ],
  site: {
    title: "Anita Reddy — AI Creator & Prompt Engineer",
    announcement: "Prompt Engineer · AI Creator · Future-Focused Builder",
    tagline: "Hi, I’m Anita Reddy — a Prompt Engineer and AI creator transforming ideas into intelligent, useful digital experiences.",
    maintenance: false,
    showProjects: true,
    showSkills: true
  },
  resume: {
    url: "Updated_Resume_compress.pdf"
  },
  contact: {
    phone: "+91 21 00 2606",
    email: "anitha@example.com",
    location: "Vijayawada, India",
    linkedin: "https://www.linkedin.com/in/anitha-reddy-yerredla-07a387413?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    availability: "Available for internships"
  },
  jarvis: {
    name: "JARVIS",
    greeting: "Hello Ma'am Anita. I'm JARVIS, your personal AI assistant. How can I help you today?",
    enabled: true,
    voice: true
  }
};

function getPortfolioData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_DATA;
    const parsed = JSON.parse(raw);
    return {
      site: { ...DEFAULT_PORTFOLIO_DATA.site, ...(parsed.site || {}) },
      resume: { ...DEFAULT_PORTFOLIO_DATA.resume, ...(parsed.resume || {}) },
      contact: { ...DEFAULT_PORTFOLIO_DATA.contact, ...(parsed.contact || {}) },
      jarvis: { ...DEFAULT_PORTFOLIO_DATA.jarvis, ...(parsed.jarvis || {}) },
      projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : DEFAULT_PORTFOLIO_DATA.projects,
      skills: Array.isArray(parsed.skills) && parsed.skills.length > 0 ? parsed.skills : DEFAULT_PORTFOLIO_DATA.skills,
      messages: Array.isArray(parsed.messages) ? parsed.messages : []
    };
  } catch(e) {
    return DEFAULT_PORTFOLIO_DATA;
  }
}

function syncPortfolioData() {
  const data = getPortfolioData();
  if (!data) return;

  // Maintenance Check (Admin role bypasses maintenance)
  const urlParams = new URLSearchParams(window.location.search);
  const activeRole = urlParams.get('role') || localStorage.getItem('anithaActiveRole') || 'user';

  if (data.site && data.site.maintenance && activeRole !== 'admin') {
    document.body.innerHTML = `
      <div style="display:flex; height:100vh; align-items:center; justify-content:center; flex-direction:column; text-align:center; background:#020408; color:#f0ede8; padding: 2rem;">
        <h1 style="font-family:'Cormorant Garamond',serif; font-size:3rem; color:#c9a84c;">🔧 Site Under Maintenance</h1>
        <p style="color:#9ea8bc; margin-top:1rem;">We are updating the portfolio. Please check back shortly!</p>
        <a href="admin.html" style="margin-top:2rem; padding:0.8rem 1.8rem; background:#c9a84c; color:#020408; font-weight:700; text-decoration:none; border-radius:6px;">Admin Access</a>
      </div>
    `;
    return;
  }

  // Site Header & Titles
  if (data.site) {
    const titleEl = document.getElementById('publicTitle');
    const heroSubEl = document.getElementById('heroTaglineSub');
    const heroBadgeEl = document.getElementById('heroAnnouncementTag');

    if (titleEl && data.site.title) titleEl.innerText = data.site.title;
    if (heroSubEl && data.site.tagline) heroSubEl.innerText = data.site.tagline;
    if (heroBadgeEl && data.site.announcement) {
      heroBadgeEl.innerHTML = `<span class="badge-dot"></span>` + escapeHTML(data.site.announcement);
    }
  }

  // Resume Links
  if (data.resume && data.resume.url) {
    const url = data.resume.url;
    ['navResumeBtn', 'drawerResumeBtn', 'heroResumeBtn', 'contactResumeBtn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = url;
    });
  }

  // Contact Info
  if (data.contact) {
    const aboutPhoneEl = document.getElementById('aboutPhone');
    const contactPhoneEl = document.getElementById('contactDisplayPhone');
    const contactPhoneLink = document.getElementById('contactPhoneLink');
    const contactEmailEl = document.getElementById('contactDisplayEmail');
    const contactEmailLink = document.getElementById('contactEmailLink');
    const aboutLocEl = document.getElementById('aboutLocation');
    const aboutAvailEl = document.getElementById('aboutAvailability');

    if (data.contact.phone) {
      if (aboutPhoneEl) aboutPhoneEl.innerText = data.contact.phone;
      if (contactPhoneEl) contactPhoneEl.innerText = data.contact.phone;
      if (contactPhoneLink) contactPhoneLink.href = "tel:" + data.contact.phone.replace(/\s+/g, '');
    }
    if (data.contact.email) {
      if (contactEmailEl) contactEmailEl.innerText = data.contact.email;
      if (contactEmailLink) contactEmailLink.href = "mailto:" + data.contact.email;
    }
    if (aboutLocEl && data.contact.location) aboutLocEl.innerText = data.contact.location;
    if (aboutAvailEl && data.contact.availability) aboutAvailEl.innerText = data.contact.availability;

    if (data.contact.linkedin) {
      ['navLinkedin', 'heroLinkedinBtn', 'contactLinkedinBtn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.href = data.contact.linkedin;
      });
    }
  }

  // Projects Rendering
  if (data.projects && Array.isArray(data.projects)) {
    const statProjCount = document.getElementById('statProjectCount');
    if (statProjCount) statProjCount.innerText = String(data.projects.length).padStart(2, '0');

    const projGrid = document.getElementById('publicProjectsGrid');
    if (projGrid) {
      if (data.site && data.site.showProjects === false) {
        projGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:var(--text-muted); padding: 2rem;">Projects section is hidden by admin.</div>`;
      } else {
        projGrid.innerHTML = data.projects.map((p, idx) => `
          <div class="proj-card visible">
            <div class="proj-mock">
              <div class="mock-inner">
                <div class="mock-bar"><div class="md"></div><div class="md"></div><div class="md"></div></div>
                <div class="mock-sym">0${idx + 1}.</div>
              </div>
              <div class="proj-glow"></div>
            </div>
            <div class="proj-body">
              <div class="proj-num">Project 0${idx + 1}</div>
              <div class="proj-cat">${escapeHTML(p.category)}</div>
              <h3 class="proj-title">${escapeHTML(p.name)}</h3>
              <p class="proj-desc">${escapeHTML(p.description)}</p>
              <div class="proj-tags">
                ${(p.tech || '').split(',').map(t => `<span class="proj-tag">${escapeHTML(t.trim())}</span>`).join('')}
              </div>
              ${p.link ? `<a href="${safeURL(p.link)}" target="_blank" rel="noopener" class="proj-link">View Live Project &#x2197;</a>` : ''}
            </div>
          </div>
        `).join('');
      }
    }
  }

  // Skills Rendering
  if (data.skills && Array.isArray(data.skills)) {
    const statSkillCount = document.getElementById('statSkillCount');
    if (statSkillCount) statSkillCount.innerText = String(data.skills.length).padStart(2, '0') + '+';

    const skillsGrid = document.getElementById('publicSkillsGrid');
    const skillStrip = document.getElementById('publicSkillStrip');

    if (skillsGrid) {
      if (data.site && data.site.showSkills === false) {
        skillsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:var(--text-muted); padding: 2rem;">Skills section is hidden by admin.</div>`;
      } else {
        skillsGrid.innerHTML = data.skills.map(s => `
          <div class="sk-card visible">
            <div class="sk-icon ic-gold">${s.icon || '✦'}</div>
            <h3>${escapeHTML(s.name)}</h3>
            <p>Proficiency Level: ${s.level}% | ${escapeHTML(s.category)}</p>
            <div class="sk-tags"><span class="sk-tag">${escapeHTML(s.category)}</span><span class="sk-tag">${s.level}% Mastered</span></div>
          </div>
        `).join('');
      }
    }

    if (skillStrip && data.skills.length > 0) {
      const pills = data.skills.map(s => `<div class="tech-pill"><span class="t-dot"></span>${escapeHTML(s.name)}</div>`).join('');
      skillStrip.innerHTML = pills + pills; // duplicate for infinite loop animation
    }
  }

  // JARVIS Config Sync
  if (data.jarvis) {
    const jarvisNameEl = document.getElementById('jarvisDisplayName');
    const jarvisGreetingEl = document.getElementById('jarvisDisplayGreeting');
    if (jarvisNameEl && data.jarvis.name) jarvisNameEl.innerText = data.jarvis.name;
    if (jarvisGreetingEl && data.jarvis.greeting) jarvisGreetingEl.innerText = data.jarvis.greeting;
  }
}

function escapeHTML(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function safeURL(url) {
  const u = String(url || '').trim();
  return (u.startsWith('http://') || u.startsWith('https://')) ? u : '#';
}

window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) syncPortfolioData();
});

document.addEventListener('DOMContentLoaded', () => {
  syncPortfolioData();
  injectBossQuestionButton();
});

// ── NAVBAR ──
const nb = document.getElementById('navbar');
if (nb) {
  window.addEventListener('scroll', () => {
    nb.classList.toggle('scrolled', window.scrollY > 60);
    updateActive();
  });
}

function updateActive() {
  const s = window.scrollY + 120;
  document.querySelectorAll('section[id]').forEach(sec => {
    const lnk = document.querySelector('.nav-links a[href="#'+sec.id+'"]');
    if (lnk) lnk.classList.toggle('active', s >= sec.offsetTop && s < sec.offsetTop + sec.offsetHeight);
  });
}

// ── HAMBURGER & DRAWER ──
const ham = document.getElementById('ham'), drawer = document.getElementById('drawer'), dc = document.getElementById('dc');
if (ham && drawer) ham.addEventListener('click', () => drawer.classList.add('open'));
if (dc && drawer) dc.addEventListener('click', () => drawer.classList.remove('open'));
document.querySelectorAll('.dl').forEach(l => l.addEventListener('click', () => drawer && drawer.classList.remove('open')));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href');
    if (targetId && targetId !== '#') {
      const t = document.querySelector(targetId);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth' }); }
    }
  });
});

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));

// ── HERO CANVAS ──
(function() {
  const c = document.getElementById('hero-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, pts = [], nodes = [];

  function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  function rnd(a,b) { return Math.random()*(b-a)+a; }
  function init() {
    pts = Array.from({length:Math.floor(W/18)}, () => ({
      x:rnd(0,W),y:rnd(0,H),vx:rnd(-.2,.2),vy:rnd(-.3,-.05),
      r:rnd(.5,1.8),o:rnd(.15,.5),
      col:['#c9a84c','#7c5cbf','#1a8fff'][Math.floor(Math.random()*3)]
    }));
    nodes = Array.from({length:Math.floor(W/120)}, () => ({
      x:rnd(0,W),y:rnd(0,H),vx:rnd(-.1,.1),vy:rnd(-.1,.1)
    }));
  }
  function hexRGBA(hex,a) {
    return 'rgba('+parseInt(hex.slice(1,3),16)+','+parseInt(hex.slice(3,5),16)+','+parseInt(hex.slice(5,7),16)+','+a+')';
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    ctx.lineWidth=.5;
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<200){ctx.strokeStyle='rgba(201,168,76,'+(1-d/200)*.08+')';ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();}
      }
      const n=nodes[i]; n.x+=n.vx; n.y+=n.vy;
      if(n.x<0||n.x>W) n.vx*=-1;
      if(n.y<0||n.y>H) n.vy*=-1;
      ctx.beginPath();ctx.arc(n.x,n.y,1.5,0,Math.PI*2);ctx.fillStyle='rgba(201,168,76,.2)';ctx.fill();
    }
    pts.forEach(p => {
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=hexRGBA(p.col,p.o);ctx.fill();
      p.x+=p.vx;p.y+=p.vy;
      if(p.y<-10){p.y=H+10;p.x=rnd(0,W);}
      if(p.x<0||p.x>W) p.vx*=-1;
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', () => { resize(); init(); });
  resize(); init(); draw();
})();

// ── JARVIS OS ──
const jos = document.getElementById('jos'), jmsg = document.getElementById('jmsg');
const DEFAULT_WELCOME = "Hello Ma'am Anita. I'm JARVIS, your personal AI assistant. How can I help you today?";
let ti = null, ttsActive = false;

function injectBossQuestionButton() {
  const btnContainer = document.querySelector('.jos-btns');
  if (btnContainer && !document.getElementById('jbBossBtn')) {
    const bossBtn = document.createElement('button');
    bossBtn.id = 'jbBossBtn';
    bossBtn.className = 'jos-btn jb-g';
    bossBtn.innerText = 'Who is Anita?';
    bossBtn.onclick = () => jPanel('anita');
    btnContainer.insertBefore(bossBtn, btnContainer.firstChild);
  }
}

function openJOS() {
  if (!jos) return;
  let jarvisConfig = {};
  try { jarvisConfig = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').jarvis || {}; } catch (error) {}
  if (jarvisConfig.enabled === false) return;

  const greeting = jarvisConfig.greeting || DEFAULT_WELCOME;
  jos.classList.add('active');
  document.body.style.overflow = 'hidden';
  typeMsg('"' + greeting + '"');

  if ('speechSynthesis' in window && jarvisConfig.voice !== false && !ttsActive) {
    ttsActive = true;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(greeting);
    u.rate = .92; u.pitch = .9; u.volume = .85;
    u.onend = () => { ttsActive = false; };
    speechSynthesis.speak(u);
  }
}

function closeJOS() {
  if (!jos) return;
  jos.classList.remove('active');
  document.body.style.overflow = '';
  speechSynthesis.cancel();
  ttsActive = false;
  if (ti) clearInterval(ti);
}

function typeMsg(msg) {
  if (!jmsg) return;
  if (ti) clearInterval(ti);
  jmsg.innerHTML = '';
  let i = 0;
  ti = setInterval(() => {
    if (i < msg.length) {
      jmsg.innerHTML = msg.slice(0, i + 1) + '<span class="cursor"></span>';
      i++;
    } else {
      jmsg.innerHTML = msg;
      clearInterval(ti);
    }
  }, 30);
}

function jPanel(p) {
  speechSynthesis.cancel();
  let speechText = "";

  if (p === 'anita') {
    speechText = "Anita Reddy is my boss and creator — an ambitious AI creator and Prompt Engineer transforming innovative ideas into reality!";
    typeMsg('"Anita Reddy is my boss and creator — an ambitious AI creator and Prompt Engineer transforming innovative ideas into reality."');
  } else if (p === 'about') {
    speechText = "JARVIS is an evolving personal AI assistant built by Anita Reddy, designed to make technology feel personal and effortless. It understands screens, speaks naturally, and assists with daily tasks.";
    typeMsg('"JARVIS is an evolving personal AI assistant built by Anita Reddy, designed to make technology feel personal and effortless. It understands screens, speaks naturally, and assists with daily tasks."');
  } else if (p === 'caps') {
    speechText = "My capabilities include: Screen Understanding, Natural Voice Interaction, Persistent Memory, System Assistance, and I am being developed into a full real-world AI application.";
    typeMsg('"My capabilities include: Screen Understanding, Natural Voice Interaction, Persistent Memory, System Assistance, and I am being developed into a full real-world AI application."');
  }

  let jarvisConfig = {};
  try { jarvisConfig = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').jarvis || {}; } catch(e) {}
  if ('speechSynthesis' in window && jarvisConfig.voice !== false && speechText) {
    ttsActive = true;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(speechText);
    u.rate = .92; u.pitch = .9; u.volume = .85;
    u.onend = () => { ttsActive = false; };
    speechSynthesis.speak(u);
  }
}

function toggleNote() {
  const n = document.getElementById('dn');
  if (n) n.style.display = (n.style.display === 'none' || n.style.display === '') ? 'block' : 'none';
}

if (jos) {
  jos.addEventListener('click', e => { if (e.target === jos) closeJOS(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && jos.classList.contains('active')) closeJOS(); });
}

// ── CONTACT FORM WITH STORAGE SAVE ──
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('fsub');
  if (btn) {
    btn.textContent = 'Sending\u2026';
    btn.disabled = true;
  }

  const nameInput = document.getElementById('fname');
  const emailInput = document.getElementById('femail');
  const msgInput = document.getElementById('fmsg');

  const nameVal = nameInput ? nameInput.value.trim() : '';
  const emailVal = emailInput ? emailInput.value.trim() : '';
  const msgVal = msgInput ? msgInput.value.trim() : '';

  try {
    let db = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    if (!db.messages) db.messages = [];
    db.messages.unshift({
      id: Date.now().toString(),
      name: nameVal,
      email: emailVal,
      message: msgVal,
      date: new Date().toLocaleString(),
      read: false
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch(err) {
    console.error("Could not save submitted message:", err);
  }

  setTimeout(() => {
    const cf = document.getElementById('cf');
    const fsucc = document.getElementById('fsucc');
    if (cf) cf.style.display = 'none';
    if (fsucc) fsucc.style.display = 'block';
  }, 1000);
}
