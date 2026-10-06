import os
import subprocess

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Personal Portfolio Website Presentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #030712;
      color: #F8FAFC;
      font-family: 'Plus Jakarta Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .slide {
      width: 1920px;
      height: 1080px;
      position: relative;
      overflow: hidden;
      background: radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.12) 0%, transparent 40%),
                  radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 45%),
                  linear-gradient(135deg, #060C17 0%, #030712 100%);
      padding: 70px 90px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
    }

    /* Grid overlay effect */
    .slide::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
    }

    /* Top bar */
    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 18px;
      background: rgba(56, 189, 248, 0.08);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 30px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #38BDF8;
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #38BDF8;
      box-shadow: 0 0 10px #38BDF8;
    }
    .univ-tag {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #94A3B8;
      letter-spacing: 1px;
    }

    /* Content Area */
    .slide-body {
      position: relative;
      z-index: 10;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 30px 0;
    }

    /* Titles */
    .slide-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 52px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -1px;
      line-height: 1.15;
      margin-bottom: 12px;
    }
    .slide-title em {
      font-style: normal;
      background: linear-gradient(135deg, #38BDF8 0%, #818CF8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .slide-subtitle {
      font-size: 20px;
      color: #94A3B8;
      max-width: 900px;
      line-height: 1.6;
    }

    /* Bottom Footer */
    .slide-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 20px;
      font-size: 14px;
      color: #64748B;
    }
    .footer-left {
      font-weight: 600;
      color: #94A3B8;
    }
    .footer-right {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      color: #38BDF8;
    }

    /* Cards & Glassmorphism */
    .glass-card {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 30px;
      backdrop-filter: blur(12px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      position: relative;
    }
    .glass-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), transparent);
    }

    /* Browser Mockup Frame */
    .browser-frame {
      background: #0B132B;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.15);
    }
    .browser-header {
      background: #0F172A;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .browser-dots {
      display: flex;
      gap: 8px;
    }
    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .dot-red { background: #EF4444; }
    .dot-yellow { background: #F59E0B; }
    .dot-green { background: #10B981; }
    .browser-url {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 6px;
      padding: 4px 16px;
      font-size: 13px;
      color: #94A3B8;
      flex: 1;
      font-family: monospace;
      text-align: center;
    }
    .browser-content img {
      width: 100%;
      height: auto;
      display: block;
    }

    /* Device frames */
    .tablet-frame {
      border: 8px solid #1E293B;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      background: #000;
    }
    .mobile-frame {
      border: 8px solid #1E293B;
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      background: #000;
    }

    /* Icons SVG helper */
    .icon-box {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #38BDF8;
      margin-bottom: 18px;
    }
  </style>
</head>
<body>

  <!-- SLIDE 1: INTRODUCTION -->
  <div class="slide" id="slide1">
    <div class="slide-header">
      <div class="badge"><span class="badge-dot"></span> B.Tech CSE Project Review</div>
      <div class="univ-tag">KL UNIVERSITY</div>
    </div>
    <div class="slide-body" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
      <div>
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 700; color: #38BDF8; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 16px;">
          Student Project Review Presentation
        </div>
        <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 58px; font-weight: 800; color: #FFF; line-height: 1.1; margin-bottom: 20px;">
          PERSONAL PORTFOLIO <br><span style="background: linear-gradient(135deg, #38BDF8, #818CF8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">WEBSITE</span>
        </h1>
        <p style="font-size: 20px; color: #94A3B8; line-height: 1.6; margin-bottom: 40px;">
          A Professional Digital Identity for Showcasing Skills, Projects & Academic Achievements
        </p>

        <div class="glass-card" style="padding: 24px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
          <div>
            <div style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 4px;">Student Name</div>
            <div style="font-size: 18px; font-weight: 700; color: #F8FAFC;">Anitha Reddy Yerredla</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 4px;">Degree & Branch</div>
            <div style="font-size: 18px; font-weight: 700; color: #38BDF8;">B.Tech CSE</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 4px;">Institution</div>
            <div style="font-size: 16px; font-weight: 600; color: #CBD5E1;">KL University</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 4px;">Evaluation</div>
            <div style="font-size: 16px; font-weight: 600; color: #818CF8;">Project Review / Viva</div>
          </div>
        </div>
      </div>

      <div>
        <div class="browser-frame">
          <div class="browser-header">
            <div class="browser-dots">
              <div class="dot dot-red"></div>
              <div class="dot dot-yellow"></div>
              <div class="dot dot-green"></div>
            </div>
            <div class="browser-url">https://anithareddy.dev</div>
          </div>
          <div class="browser-content" style="height: 480px; overflow: hidden;">
            <img src="desktop.png" alt="Portfolio Preview">
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">Personal Portfolio Website — B.Tech CSE Project</div>
      <div class="footer-right">01 / 10</div>
    </div>
  </div>

  <!-- SLIDE 2: PROJECT OVERVIEW -->
  <div class="slide" id="slide2">
    <div class="slide-header">
      <div class="badge"><span class="badge-dot"></span> Executive Summary</div>
      <div class="univ-tag">PROJECT OVERVIEW</div>
    </div>
    <div class="slide-body">
      <h2 class="slide-title">Project <em>Overview</em></h2>
      <p class="slide-subtitle" style="margin-bottom: 40px;">
        A centralized digital platform designed to represent a developer's professional identity, unifying technical skills, project portfolio, education, and direct contact channels into a single interactive web application.
      </p>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
        <div class="glass-card">
          <div class="icon-box">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h3 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 10px;">Profile</h3>
          <p style="font-size: 15px; color: #94A3B8; line-height: 1.6;">Professional introduction, personal branding statement, and career vision tailored for recruiters.</p>
        </div>

        <div class="glass-card">
          <div class="icon-box" style="background: rgba(129, 140, 248, 0.12); border-color: rgba(129, 140, 248, 0.25); color: #818CF8;">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
          </div>
          <h3 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 10px;">Skills</h3>
          <p style="font-size: 15px; color: #94A3B8; line-height: 1.6;">Structured matrix of programming languages, web frameworks, AI tools, and technical competencies.</p>
        </div>

        <div class="glass-card">
          <div class="icon-box" style="background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.25); color: #F59E0B;">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h3 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 10px;">Projects</h3>
          <p style="font-size: 15px; color: #94A3B8; line-height: 1.6;">Interactive showcase of practical software implementations, code architecture, and live project demos.</p>
        </div>

        <div class="glass-card">
          <div class="icon-box" style="background: rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.25); color: #10B981;">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <h3 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 10px;">Contact</h3>
          <p style="font-size: 15px; color: #94A3B8; line-height: 1.6;">Direct communication portal connecting recruiters, clients, and collaborators via social networks & email.</p>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">Personal Portfolio Website — B.Tech CSE Project</div>
      <div class="footer-right">02 / 10</div>
    </div>
  </div>

  <!-- SLIDE 3: PROBLEM STATEMENT -->
  <div class="slide" id="slide3">
    <div class="slide-header">
      <div class="badge"><span class="badge-dot"></span> The Challenge</div>
      <div class="univ-tag">PROBLEM STATEMENT</div>
    </div>
    <div class="slide-body">
      <h2 class="slide-title">Problem <em>Statement</em></h2>
      <p class="slide-subtitle" style="margin-bottom: 35px;">
        Addressing the limitations of traditional resumes and fragmented digital footprints for computer science students.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; margin-bottom: 35px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="glass-card" style="padding: 20px 24px; display: flex; align-items: center; gap: 20px;">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: #EF4444;">01</div>
            <div>
              <div style="font-size: 17px; font-weight: 700; color: #FFF;">Static Resume Limitations</div>
              <div style="font-size: 14px; color: #94A3B8;">Traditional 1-page paper resumes cannot demonstrate interactive software projects or dynamic UI design skills.</div>
            </div>
          </div>

          <div class="glass-card" style="padding: 20px 24px; display: flex; align-items: center; gap: 20px;">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: #EF4444;">02</div>
            <div>
              <div style="font-size: 17px; font-weight: 700; color: #FFF;">Information Fragmentation</div>
              <div style="font-size: 14px; color: #94A3B8;">Certifications, code repositories, and credentials scattered across multiple platforms without central management.</div>
            </div>
          </div>

          <div class="glass-card" style="padding: 20px 24px; display: flex; align-items: center; gap: 20px;">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: #EF4444;">03</div>
            <div>
              <div style="font-size: 17px; font-weight: 700; color: #FFF;">Poor Recruiter Engagement</div>
              <div style="font-size: 14px; color: #94A3B8;">Recruiters spend less than 10 seconds on paper resumes and lack immediate access to live software demonstrations.</div>
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="glass-card" style="padding: 20px 24px; display: flex; align-items: center; gap: 20px;">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: #EF4444;">04</div>
            <div>
              <div style="font-size: 17px; font-weight: 700; color: #FFF;">Lack of Personal Branding</div>
              <div style="font-size: 14px; color: #94A3B8;">Students miss the opportunity to stand out with a distinct professional identity and modern tech image.</div>
            </div>
          </div>

          <div class="glass-card" style="padding: 20px 24px; display: flex; align-items: center; gap: 20px;">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: #EF4444;">05</div>
            <div>
              <div style="font-size: 17px; font-weight: 700; color: #FFF;">Low Visibility for Technical Work</div>
              <div style="font-size: 14px; color: #94A3B8;">Practical engineering projects and AI builds remain hidden inside local repositories without public hosting.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Process Flow Diagram -->
      <div class="glass-card" style="padding: 24px; background: rgba(15, 23, 42, 0.85); border-color: rgba(56, 189, 248, 0.3);">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 700; color: #38BDF8; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; text-align: center;">
          Problem Transformation Workflow
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="text-align: center; flex: 1;">
            <div style="font-size: 16px; font-weight: 700; color: #EF4444;">Traditional Resume</div>
            <div style="font-size: 13px; color: #64748B;">Static & Limited</div>
          </div>
          <div style="font-size: 24px; color: #64748B;">➔</div>
          <div style="text-align: center; flex: 1;">
            <div style="font-size: 16px; font-weight: 700; color: #F59E0B;">Information Fragmentation</div>
            <div style="font-size: 13px; color: #64748B;">Scattered Platforms</div>
          </div>
          <div style="font-size: 24px; color: #64748B;">➔</div>
          <div style="text-align: center; flex: 1;">
            <div style="font-size: 16px; font-weight: 700; color: #818CF8;">Limited Project Visibility</div>
            <div style="font-size: 13px; color: #64748B;">Low Engagement</div>
          </div>
          <div style="font-size: 24px; color: #38BDF8;">➔</div>
          <div style="text-align: center; flex: 1; background: rgba(56, 189, 248, 0.15); padding: 12px; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.4);">
            <div style="font-size: 16px; font-weight: 700; color: #38BDF8;">Need for Digital Portfolio</div>
            <div style="font-size: 13px; color: #E2E8F0;">Centralized Web Portal</div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">Personal Portfolio Website — B.Tech CSE Project</div>
      <div class="footer-right">03 / 10</div>
    </div>
  </div>

  <!-- SLIDE 4: OBJECTIVES -->
  <div class="slide" id="slide4">
    <div class="slide-header">
      <div class="badge"><span class="badge-dot"></span> Core Goals</div>
      <div class="univ-tag">PROJECT OBJECTIVES</div>
    </div>
    <div class="slide-body">
      <h2 class="slide-title">Project <em>Objectives</em></h2>
      <p class="slide-subtitle" style="margin-bottom: 35px;">
        Key engineering goals established to deliver a high-impact, professional digital portfolio.
      </p>

      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; margin-bottom: 35px;">
        <div class="glass-card" style="padding: 24px 18px;">
          <div style="font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 800; color: #38BDF8; margin-bottom: 12px;">01</div>
          <h3 style="font-size: 17px; font-weight: 700; color: #FFF; margin-bottom: 8px;">Digital Identity</h3>
          <p style="font-size: 13px; color: #94A3B8; line-height: 1.5;">Build a professional personal online presence establishing strong personal branding.</p>
        </div>

        <div class="glass-card" style="padding: 24px 18px;">
          <div style="font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 800; color: #818CF8; margin-bottom: 12px;">02</div>
          <h3 style="font-size: 17px; font-weight: 700; color: #FFF; margin-bottom: 8px;">Technical Showcase</h3>
          <p style="font-size: 13px; color: #94A3B8; line-height: 1.5;">Showcase technical skills, web engineering proficiency, and practical code implementations.</p>
        </div>

        <div class="glass-card" style="padding: 24px 18px;">
          <div style="font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 800; color: #F59E0B; margin-bottom: 12px;">03</div>
          <h3 style="font-size: 17px; font-weight: 700; color: #FFF; margin-bottom: 8px;">Credentials</h3>
          <p style="font-size: 13px; color: #94A3B8; line-height: 1.5;">Present education background, certifications, and university achievements clearly.</p>
        </div>

        <div class="glass-card" style="padding: 24px 18px;">
          <div style="font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 800; color: #10B981; margin-bottom: 12px;">04</div>
          <h3 style="font-size: 17px; font-weight: 700; color: #FFF; margin-bottom: 8px;">Recruiter Access</h3>
          <p style="font-size: 13px; color: #94A3B8; line-height: 1.5;">Provide recruiters with quick 1-click access to resume, repositories, and contact info.</p>
        </div>

        <div class="glass-card" style="padding: 24px 18px;">
          <div style="font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 800; color: #EC4899; margin-bottom: 12px;">05</div>
          <h3 style="font-size: 17px; font-weight: 700; color: #FFF; margin-bottom: 8px;">Responsive UX</h3>
          <p style="font-size: 13px; color: #94A3B8; line-height: 1.5;">Ensure seamless cross-device compatibility, fast load times, and intuitive navigation.</p>
        </div>
      </div>

      <!-- Progression Stepper -->
      <div class="glass-card" style="padding: 20px 30px; background: rgba(15, 23, 42, 0.9);">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(56,189,248,0.2); color: #38BDF8; display: flex; align-items: center; justify-content: center; font-weight: 700;">1</div>
            <span style="font-size: 16px; font-weight: 700; color: #FFF;">Identity</span>
          </div>
          <span style="color: #64748B;">➔</span>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(129,140,248,0.2); color: #818CF8; display: flex; align-items: center; justify-content: center; font-weight: 700;">2</div>
            <span style="font-size: 16px; font-weight: 700; color: #FFF;">Skills</span>
          </div>
          <span style="color: #64748B;">➔</span>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(245,158,11,0.2); color: #F59E0B; display: flex; align-items: center; justify-content: center; font-weight: 700;">3</div>
            <span style="font-size: 16px; font-weight: 700; color: #FFF;">Projects</span>
          </div>
          <span style="color: #64748B;">➔</span>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(16,185,129,0.2); color: #10B981; display: flex; align-items: center; justify-content: center; font-weight: 700;">4</div>
            <span style="font-size: 16px; font-weight: 700; color: #FFF;">Achievements</span>
          </div>
          <span style="color: #38BDF8;">➔</span>
          <div style="display: flex; align-items: center; gap: 12px; background: rgba(56,189,248,0.15); padding: 8px 16px; border-radius: 20px; border: 1px solid rgba(56,189,248,0.3);">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: #38BDF8; color: #030712; display: flex; align-items: center; justify-content: center; font-weight: 800;">5</div>
            <span style="font-size: 16px; font-weight: 800; color: #38BDF8;">Opportunities</span>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">Personal Portfolio Website — B.Tech CSE Project</div>
      <div class="footer-right">04 / 10</div>
    </div>
  </div>

  <!-- SLIDE 5: TECHNOLOGIES USED -->
  <div class="slide" id="slide5">
    <div class="slide-header">
      <div class="badge"><span class="badge-dot"></span> Architecture & Stack</div>
      <div class="univ-tag">TECHNOLOGY STACK</div>
    </div>
    <div class="slide-body">
      <h2 class="slide-title">Technology <em>Stack</em></h2>
      <p class="slide-subtitle" style="margin-bottom: 35px;">
        A modern, layered technical architecture utilizing web standards, UI design principles, and cloud deployment.
      </p>

      <div style="display: flex; flex-direction: column; gap: 18px;">
        <!-- Layer 1 -->
        <div class="glass-card" style="padding: 20px 30px; display: grid; grid-template-columns: 240px 1fr; align-items: center;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); color: #38BDF8; display: flex; align-items: center; justify-content: center; font-weight: 800;">L1</div>
            <div>
              <div style="font-size: 18px; font-weight: 700; color: #FFF;">Frontend</div>
              <div style="font-size: 12px; color: #64748B; uppercase; letter-spacing: 1px;">Core Web Stack</div>
            </div>
          </div>
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 10px;">
              <span style="color: #E44D26; font-weight: 800;">&lt;&gt;</span> <span style="font-size: 15px; font-weight: 600;">HTML5</span> <span style="font-size: 12px; color: #64748B;">Semantic Structure</span>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 10px;">
              <span style="color: #264DE4; font-weight: 800;">#</span> <span style="font-size: 15px; font-weight: 600;">CSS3</span> <span style="font-size: 12px; color: #64748B;">Flexbox / Grid / Glassmorphism</span>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 10px;">
              <span style="color: #F7DF1E; font-weight: 800;">{ }</span> <span style="font-size: 15px; font-weight: 600;">JavaScript ES6+</span> <span style="font-size: 12px; color: #64748B;">Dynamic Interactivity</span>
            </div>
          </div>
        </div>

        <!-- Layer 2 -->
        <div class="glass-card" style="padding: 20px 30px; display: grid; grid-template-columns: 240px 1fr; align-items: center;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(129, 140, 248, 0.15); color: #818CF8; display: flex; align-items: center; justify-content: center; font-weight: 800;">L2</div>
            <div>
              <div style="font-size: 18px; font-weight: 700; color: #FFF;">Design & UI/UX</div>
              <div style="font-size: 12px; color: #64748B; uppercase; letter-spacing: 1px;">User Experience</div>
            </div>
          </div>
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
              <span style="font-size: 15px; font-weight: 600;">Responsive Web Design</span> <span style="font-size: 12px; color: #64748B;">Mobile-First Breakpoints</span>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
              <span style="font-size: 15px; font-weight: 600;">Glassmorphism UI</span> <span style="font-size: 12px; color: #64748B;">Translucent Layers & Glows</span>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
              <span style="font-size: 15px; font-weight: 600;">Typography & Spacing</span> <span style="font-size: 12px; color: #64748B;">Visual Hierarchy</span>
            </div>
          </div>
        </div>

        <!-- Layer 3 -->
        <div class="glass-card" style="padding: 20px 30px; display: grid; grid-template-columns: 240px 1fr; align-items: center;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(245, 158, 11, 0.15); color: #F59E0B; display: flex; align-items: center; justify-content: center; font-weight: 800;">L3</div>
            <div>
              <div style="font-size: 18px; font-weight: 700; color: #FFF;">Development Tools</div>
              <div style="font-size: 12px; color: #64748B; uppercase; letter-spacing: 1px;">Tooling & VCS</div>
            </div>
          </div>
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
              <span style="color: #007ACC; font-weight: 800;">VS</span> <span style="font-size: 15px; font-weight: 600;">VS Code</span> <span style="font-size: 12px; color: #64748B;">Development Environment</span>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
              <span style="color: #F05032; font-weight: 800;">Git</span> <span style="font-size: 15px; font-weight: 600;">Git</span> <span style="font-size: 12px; color: #64748B;">Version Control System</span>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
              <span style="color: #FFF; font-weight: 800;">GH</span> <span style="font-size: 15px; font-weight: 600;">GitHub</span> <span style="font-size: 12px; color: #64748B;">Cloud Repository</span>
            </div>
          </div>
        </div>

        <!-- Layer 4 -->
        <div class="glass-card" style="padding: 20px 30px; display: grid; grid-template-columns: 240px 1fr; align-items: center;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); color: #10B981; display: flex; align-items: center; justify-content: center; font-weight: 800;">L4</div>
            <div>
              <div style="font-size: 18px; font-weight: 700; color: #FFF;">Deployment</div>
              <div style="font-size: 12px; color: #64748B; uppercase; letter-spacing: 1px;">Hosting & CI/CD</div>
            </div>
          </div>
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px 24px; border-radius: 10px; border: 1px solid rgba(16, 185, 129, 0.3);">
              <span style="font-size: 15px; font-weight: 700; color: #10B981;">GitHub Pages</span> <span style="font-size: 12px; color: #94A3B8;">Continuous Cloud Hosting & Automated Deployment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">Personal Portfolio Website — B.Tech CSE Project</div>
      <div class="footer-right">05 / 10</div>
    </div>
  </div>

  <!-- SLIDE 6: WEBSITE FEATURES -->
  <div class="slide" id="slide6">
    <div class="slide-header">
      <div class="badge"><span class="badge-dot"></span> Functional Architecture</div>
      <div class="univ-tag">KEY FEATURES</div>
    </div>
    <div class="slide-body" style="position: relative;">
      <h2 class="slide-title">Key <em>Features</em></h2>
      <p class="slide-subtitle" style="margin-bottom: 25px;">
        Comprehensive breakdown of the portfolio's core functional sections and interactive UI components.
      </p>

      <div style="display: grid; grid-template-columns: 280px 1fr 280px; gap: 30px; align-items: center;">
        <!-- Left Callouts -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="glass-card" style="padding: 14px 18px; border-left: 3px solid #38BDF8;">
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">01. Home / Hero Section</div>
            <div style="font-size: 12px; color: #94A3B8;">Animated particle orb & quick CTA buttons</div>
          </div>
          <div class="glass-card" style="padding: 14px 18px; border-left: 3px solid #818CF8;">
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">02. About Me</div>
            <div style="font-size: 12px; color: #94A3B8;">Personal branding, bio & core values</div>
          </div>
          <div class="glass-card" style="padding: 14px 18px; border-left: 3px solid #F59E0B;">
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">03. Skills Matrix</div>
            <div style="font-size: 12px; color: #94A3B8;">Categorized skill cards & tech marquee</div>
          </div>
          <div class="glass-card" style="padding: 14px 18px; border-left: 3px solid #10B981;">
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">04. Projects Showcase</div>
            <div style="font-size: 12px; color: #94A3B8;">Featured project cards & code links</div>
          </div>
          <div class="glass-card" style="padding: 14px 18px; border-left: 3px solid #EC4899;">
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">05. Education</div>
            <div style="font-size: 12px; color: #94A3B8;">Academic timeline & university details</div>
          </div>
        </div>

        <!-- Center Browser Frame -->
        <div>
          <div class="browser-frame" style="box-shadow: 0 0 50px rgba(56, 189, 248, 0.25);">
            <div class="browser-header">
              <div class="browser-dots">
                <div class="dot dot-red"></div>
                <div class="dot dot-yellow"></div>
                <div class="dot dot-green"></div>
              </div>
              <div class="browser-url">https://anithareddy.dev/#features</div>
            </div>
            <div class="browser-content" style="height: 420px; overflow: hidden;">
              <img src="desktop.png" alt="Website Sections Preview">
            </div>
          </div>
        </div>

        <!-- Right Callouts -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="glass-card" style="padding: 14px 18px; border-right: 3px solid #38BDF8; text-align: right;">
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">06. Certifications</div>
            <div style="font-size: 12px; color: #94A3B8;">Verified course credentials & badges</div>
          </div>
          <div class="glass-card" style="padding: 14px 18px; border-right: 3px solid #818CF8; text-align: right;">
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">07. Achievements</div>
            <div style="font-size: 12px; color: #94A3B8;">Honors, hackathons & recognitions</div>
          </div>
          <div class="glass-card" style="padding: 14px 18px; border-right: 3px solid #F59E0B; text-align: right;">
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">08. Contact Section</div>
            <div style="font-size: 12px; color: #94A3B8;">Direct message form & email links</div>
          </div>
          <div class="glass-card" style="padding: 14px 18px; border-right: 3px solid #10B981; text-align: right;">
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">09. Responsive Design</div>
            <div style="font-size: 12px; color: #94A3B8;">Fluid adaptation to mobile & desktop</div>
          </div>
          <div class="glass-card" style="padding: 14px 18px; border-right: 3px solid #EC4899; text-align: right;">
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">10. Social Links</div>
            <div style="font-size: 12px; color: #94A3B8;">LinkedIn & GitHub quick integrations</div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">Personal Portfolio Website — B.Tech CSE Project</div>
      <div class="footer-right">06 / 10</div>
    </div>
  </div>

  <!-- SLIDE 7: WEBSITE UI / USER EXPERIENCE -->
  <div class="slide" id="slide7">
    <div class="slide-header">
      <div class="badge"><span class="badge-dot"></span> Responsive Interface</div>
      <div class="univ-tag">UI / UX DESIGN</div>
    </div>
    <div class="slide-body">
      <h2 class="slide-title">UI / UX <em>Design</em></h2>
      <p class="slide-subtitle" style="margin-bottom: 30px;">
        Designed with modern web UI principles, dark mode visual appeal, and seamless cross-device responsiveness.
      </p>

      <div style="display: grid; grid-template-columns: 480px 1fr; gap: 40px; align-items: center;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="glass-card" style="padding: 20px;">
            <div style="font-size: 16px; font-weight: 700; color: #38BDF8; margin-bottom: 6px;">Clean & Minimal Interface</div>
            <div style="font-size: 14px; color: #94A3B8;">Dark obsidian color theme with subtle electric blue accents and glassmorphic translucent card containers.</div>
          </div>

          <div class="glass-card" style="padding: 20px;">
            <div style="font-size: 16px; font-weight: 700; color: #818CF8; margin-bottom: 6px;">Consistent Typography</div>
            <div style="font-size: 14px; color: #94A3B8;">Paired Space Grotesk display headings with Inter/Plus Jakarta body fonts for optimal readability.</div>
          </div>

          <div class="glass-card" style="padding: 20px;">
            <div style="font-size: 16px; font-weight: 700; color: #F59E0B; margin-bottom: 6px;">Fluid Responsive Layout</div>
            <div style="font-size: 14px; color: #94A3B8;">CSS Grid & Flexbox layouts adapting automatically from widescreen 4K monitors down to mobile screens.</div>
          </div>

          <div class="glass-card" style="padding: 20px;">
            <div style="font-size: 16px; font-weight: 700; color: #10B981; margin-bottom: 6px;">Intuitive Navigation</div>
            <div style="font-size: 14px; color: #94A3B8;">Sticky top glass navigation bar with smooth section scrolling and instant resume download CTA.</div>
          </div>
        </div>

        <!-- Devices Showcase -->
        <div style="display: flex; gap: 20px; align-items: flex-end; justify-content: center;">
          <!-- Desktop -->
          <div style="width: 580px;">
            <div style="font-size: 13px; font-weight: 700; color: #38BDF8; text-align: center; margin-bottom: 8px;">DESKTOP VIEW (1440px)</div>
            <div class="browser-frame">
              <div class="browser-header" style="padding: 8px 12px;">
                <div class="browser-dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
                <div class="browser-url" style="font-size: 11px;">Desktop Layout</div>
              </div>
              <div class="browser-content" style="height: 330px; overflow: hidden;">
                <img src="desktop.png" alt="Desktop View">
              </div>
            </div>
          </div>

          <!-- Tablet -->
          <div style="width: 320px;">
            <div style="font-size: 13px; font-weight: 700; color: #818CF8; text-align: center; margin-bottom: 8px;">TABLET (810px)</div>
            <div class="tablet-frame">
              <div style="height: 320px; overflow: hidden;">
                <img src="tablet.png" style="width: 100%; display: block;" alt="Tablet View">
              </div>
            </div>
          </div>

          <!-- Mobile -->
          <div style="width: 180px;">
            <div style="font-size: 13px; font-weight: 700; color: #F59E0B; text-align: center; margin-bottom: 8px;">MOBILE (390px)</div>
            <div class="mobile-frame">
              <div style="height: 310px; overflow: hidden;">
                <img src="mobile.png" style="width: 100%; display: block;" alt="Mobile View">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">Personal Portfolio Website — B.Tech CSE Project</div>
      <div class="footer-right">07 / 10</div>
    </div>
  </div>

  <!-- SLIDE 8: DEVELOPMENT & WORKFLOW -->
  <div class="slide" id="slide8">
    <div class="slide-header">
      <div class="badge"><span class="badge-dot"></span> Engineering Lifecycle</div>
      <div class="univ-tag">DEVELOPMENT WORKFLOW</div>
    </div>
    <div class="slide-body">
      <h2 class="slide-title">Development <em>Workflow</em></h2>
      <p class="slide-subtitle" style="margin-bottom: 35px;">
        A systematic 6-stage software engineering pipeline from initial planning to automated cloud deployment.
      </p>

      <!-- 6 Step Pipeline -->
      <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 40px;">
        <div class="glass-card" style="padding: 20px 16px; text-align: center;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(56,189,248,0.2); color: #38BDF8; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">1</div>
          <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">Planning</div>
          <div style="font-size: 12px; color: #94A3B8;">Wireframing & content structure</div>
        </div>

        <div class="glass-card" style="padding: 20px 16px; text-align: center;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(129,140,248,0.2); color: #818CF8; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">2</div>
          <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">UI Design</div>
          <div style="font-size: 12px; color: #94A3B8;">Color palette & font hierarchy</div>
        </div>

        <div class="glass-card" style="padding: 20px 16px; text-align: center;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(245,158,11,0.2); color: #F59E0B; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">3</div>
          <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">Frontend Dev</div>
          <div style="font-size: 12px; color: #94A3B8;">HTML, CSS & JS implementation</div>
        </div>

        <div class="glass-card" style="padding: 20px 16px; text-align: center;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(16,185,129,0.2); color: #10B981; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">4</div>
          <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">Integration</div>
          <div style="font-size: 12px; color: #94A3B8;">Assets, resume & project data</div>
        </div>

        <div class="glass-card" style="padding: 20px 16px; text-align: center;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(236,72,153,0.2); color: #EC4899; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">5</div>
          <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">Testing</div>
          <div style="font-size: 12px; color: #94A3B8;">Cross-screen responsiveness</div>
        </div>

        <div class="glass-card" style="padding: 20px 16px; text-align: center; border-color: rgba(56,189,248,0.4); background: rgba(56,189,248,0.1);">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: #38BDF8; color: #030712; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">6</div>
          <div style="font-size: 16px; font-weight: 800; color: #38BDF8; margin-bottom: 6px;">Deployment</div>
          <div style="font-size: 12px; color: #CBD5E1;">GitHub Pages hosting</div>
        </div>
      </div>

      <!-- Git to GitHub to Deployment Visual -->
      <div class="glass-card" style="padding: 28px 40px; background: rgba(15, 23, 42, 0.9);">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 700; color: #38BDF8; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; text-align: center;">
          Version Control & Deployment Pipeline
        </div>
        <div style="display: flex; align-items: center; justify-content: space-around;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(240, 80, 50, 0.15); border: 1px solid rgba(240, 80, 50, 0.3); color: #F05032; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px;">Git</div>
            <div>
              <div style="font-size: 17px; font-weight: 700; color: #FFF;">Local Development</div>
              <div style="font-size: 13px; color: #94A3B8;">VS Code & Git Commits</div>
            </div>
          </div>

          <div style="font-size: 28px; color: #64748B;">➔</div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px;">GH</div>
            <div>
              <div style="font-size: 17px; font-weight: 700; color: #FFF;">GitHub Remote</div>
              <div style="font-size: 13px; color: #94A3B8;">Repository Push & Version Control</div>
            </div>
          </div>

          <div style="font-size: 28px; color: #38BDF8;">➔</div>

          <div style="display: flex; align-items: center; gap: 16px; background: rgba(16, 185, 129, 0.12); padding: 12px 24px; border-radius: 14px; border: 1px solid rgba(16, 185, 129, 0.3);">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: #10B981; color: #030712; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px;">Live</div>
            <div>
              <div style="font-size: 17px; font-weight: 800; color: #10B981;">GitHub Pages Deployment</div>
              <div style="font-size: 13px; color: #E2E8F0;">Global Live Web Access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">Personal Portfolio Website — B.Tech CSE Project</div>
      <div class="footer-right">08 / 10</div>
    </div>
  </div>

  <!-- SLIDE 9: OUTCOME & FUTURE ENHANCEMENTS -->
  <div class="slide" id="slide9">
    <div class="slide-header">
      <div class="badge"><span class="badge-dot"></span> Deliverables & Roadmap</div>
      <div class="univ-tag">OUTCOME & FUTURE SCOPE</div>
    </div>
    <div class="slide-body">
      <h2 class="slide-title">Project Outcome & <em>Future Scope</em></h2>
      <p class="slide-subtitle" style="margin-bottom: 30px;">
        Comparing the current project deliverables against planned future software enhancements.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
        <!-- Current Outcome -->
        <div class="glass-card" style="border-color: rgba(16, 185, 129, 0.3); background: rgba(15, 23, 42, 0.75);">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #10B981; box-shadow: 0 0 10px #10B981;"></div>
            <h3 style="font-size: 22px; font-weight: 700; color: #10B981;">Current Project Outcome</h3>
          </div>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 15px; color: #E2E8F0;">
            <li style="display: flex; align-items: center; gap: 10px;"><span style="color: #10B981;">✓</span> Fully functional personal portfolio live on the web</li>
            <li style="display: flex; align-items: center; gap: 10px;"><span style="color: #10B981;">✓</span> Professional presentation of technical skills & projects</li>
            <li style="display: flex; align-items: center; gap: 10px;"><span style="color: #10B981;">✓</span> Responsive interface tested across mobile, tablet, desktop</li>
            <li style="display: flex; align-items: center; gap: 10px;"><span style="color: #10B981;">✓</span> Centralized academic credentials, certifications & resume</li>
            <li style="display: flex; align-items: center; gap: 10px;"><span style="color: #10B981;">✓</span> Recruiter-ready online presence for instant sharing</li>
          </ul>
        </div>

        <!-- Future Enhancements -->
        <div class="glass-card" style="border-color: rgba(129, 140, 248, 0.3); background: rgba(15, 23, 42, 0.75);">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #818CF8; box-shadow: 0 0 10px #818CF8;"></div>
            <h3 style="font-size: 22px; font-weight: 700; color: #818CF8;">Future Enhancements</h3>
          </div>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 15px; color: #E2E8F0;">
            <li style="display: flex; align-items: center; gap: 10px;"><span style="color: #818CF8;">➔</span> Admin dashboard for dynamic content management</li>
            <li style="display: flex; align-items: center; gap: 10px;"><span style="color: #818CF8;">➔</span> Node.js / Express backend with database integration</li>
            <li style="display: flex; align-items: center; gap: 10px;"><span style="color: #818CF8;">➔</span> Automated contact form email dispatch via SendGrid API</li>
            <li style="display: flex; align-items: center; gap: 10px;"><span style="color: #818CF8;">➔</span> Technical blog section & Google Analytics integration</li>
            <li style="display: flex; align-items: center; gap: 10px;"><span style="color: #818CF8;">➔</span> Dark/Light theme toggle & custom AI assistant widget</li>
          </ul>
        </div>
      </div>

      <!-- Progression Footer -->
      <div class="glass-card" style="padding: 18px 30px; text-align: center; background: rgba(15, 23, 42, 0.9);">
        <div style="display: flex; align-items: center; justify-content: center; gap: 30px;">
          <div style="font-weight: 700; color: #10B981; font-size: 16px;">Current Portfolio MVP</div>
          <div style="font-size: 20px; color: #38BDF8;">➔ ➔ ➔</div>
          <div style="font-weight: 700; color: #818CF8; font-size: 16px;">Full-Stack Dynamic Web Application</div>
        </div>
      </div>
    </div>
    <div class="slide-footer">
      <div class="footer-left">Personal Portfolio Website — B.Tech CSE Project</div>
      <div class="footer-right">09 / 10</div>
    </div>
  </div>

  <!-- SLIDE 10: THANK YOU -->
  <div class="slide" id="slide10" style="justify-content: space-between; align-items: center; text-align: center;">
    <div class="slide-header" style="width: 100%;">
      <div class="badge"><span class="badge-dot"></span> B.Tech CSE Project Review</div>
      <div class="univ-tag">KL UNIVERSITY</div>
    </div>

    <!-- Center Content -->
    <div style="position: relative; z-index: 10; margin: auto 0;">
      <div class="browser-frame" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 900px; height: 420px; opacity: 0.15; pointer-events: none; z-index: -1;">
        <div class="browser-header">
          <div class="browser-dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
          <div class="browser-url">https://anithareddy.dev</div>
        </div>
        <div class="browser-content"><img src="desktop.png"></div>
      </div>

      <div style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: #38BDF8; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 20px;">
        Presentation Concluded
      </div>

      <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 88px; font-weight: 800; color: #FFFFFF; letter-spacing: -2px; line-height: 1; margin-bottom: 20px;">
        THANK YOU
      </h1>

      <div style="font-size: 26px; color: #94A3B8; font-weight: 500; margin-bottom: 45px;">
        Questions &amp; Discussion
      </div>

      <div class="glass-card" style="display: inline-block; padding: 24px 50px; background: rgba(15, 23, 42, 0.85); border-color: rgba(56, 189, 248, 0.3);">
        <div style="font-size: 22px; font-weight: 800; color: #FFF; margin-bottom: 6px;">Anitha Reddy Yerredla</div>
        <div style="font-size: 16px; font-weight: 600; color: #38BDF8;">B.Tech CSE | KL University</div>
      </div>
    </div>

    <div class="slide-footer" style="width: 100%;">
      <div class="footer-left">Personal Portfolio Website — B.Tech CSE Project Review</div>
      <div class="footer-right">10 / 10</div>
    </div>
  </div>

</body>
</html>
"""

with open("slides.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Created slides.html successfully.")
