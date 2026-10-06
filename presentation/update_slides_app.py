import os

# Update slides.html to make it an interactive web presentation app with CSS keyframe animations, 
# smooth slide transitions, and keyboard navigation.

html_presentation = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Personal Portfolio Website — Interactive Presentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-color: #030712;
      color: #F8FAFC;
      font-family: 'Plus Jakarta Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* Presentation Container */
    #pres-container {
      width: 100vw;
      height: 100vh;
      position: relative;
      overflow: hidden;
    }

    .slide {
      width: 1920px;
      height: 1080px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(var(--slide-scale, 1));
      transform-origin: center center;
      background: radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.12) 0%, transparent 40%),
                  radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 45%),
                  linear-gradient(135deg, #060C17 0%, #030712 100%);
      padding: 70px 90px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1;
      pointer-events: none;
    }

    .slide.active {
      opacity: 1;
      visibility: visible;
      z-index: 10;
      pointer-events: auto;
    }

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

    /* Keyframe Animations */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    .slide.active .anim-1 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
    .slide.active .anim-2 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }
    .slide.active .anim-3 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
    .slide.active .anim-4 { animation: zoomIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }

    /* Header & Footer */
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

    .slide-body {
      position: relative;
      z-index: 10;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 25px 0;
    }

    .slide-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 50px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -1px;
      line-height: 1.15;
      margin-bottom: 10px;
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
      max-width: 950px;
      line-height: 1.6;
    }

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

    .glass-card {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 30px;
      backdrop-filter: blur(12px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      position: relative;
      transition: all 0.3s ease;
    }
    .glass-card:hover {
      border-color: rgba(56, 189, 248, 0.3);
      transform: translateY(-4px);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(56, 189, 248, 0.1);
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

    .browser-frame {
      background: #0B132B;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.15);
      animation: float 6s ease-in-out infinite;
    }
    .browser-header {
      background: #0F172A;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .browser-dots { display: flex; gap: 8px; }
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
    .browser-content img { width: 100%; height: auto; display: block; }

    .tablet-frame { border: 8px solid #1E293B; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); background: #000; }
    .mobile-frame { border: 8px solid #1E293B; border-radius: 28px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); background: #000; }

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

    /* On-Screen Navigation Bar */
    #nav-bar {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 40px;
      padding: 10px 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      backdrop-filter: blur(16px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .nav-btn {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38BDF8;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s;
    }
    .nav-btn:hover {
      background: #38BDF8;
      color: #030712;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
    }
    .slide-num {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #F8FAFC;
      letter-spacing: 1px;
    }

    /* Progress bar */
    #progress-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(90deg, #38BDF8, #818CF8);
      z-index: 1001;
      transition: width 0.4s ease;
    }
  </style>
</head>
<body>

  <div id="pres-container">
"""

# Read all 10 slide contents from slide_1.html to slide_10.html
import re

slides_code = []
for i in range(1, 11):
    with open(f"slide_{i}.html", "r", encoding="utf-8") as f:
        content = f.read()
    # Extract div class="slide"
    m = re.search(r'<div class="slide">(.*?)</div>\s*</body>', content, re.DOTALL)
    if m:
        slide_inner = m.group(1)
        active_cls = " active" if i == 1 else ""
        slides_code.append(f'<div class="slide{active_cls}" id="slide-{i}">{slide_inner}</div>')

html_presentation += "\n".join(slides_code)

html_presentation += """
  </div>

  <!-- On-Screen Navigation -->
  <div id="nav-bar">
    <button class="nav-btn" id="prev-btn" title="Previous Slide (Left Arrow)">◀</button>
    <div class="slide-num" id="slide-indicator">01 / 10</div>
    <button class="nav-btn" id="next-btn" title="Next Slide (Right Arrow or Space)">▶</button>
  </div>

  <div id="progress-bar" style="width: 10%;"></div>

  <script>
    let currentSlide = 1;
    const totalSlides = 10;

    function updateScale() {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      const scale = Math.min(scaleX, scaleY);
      document.documentElement.style.setProperty('--slide-scale', scale);
    }

    window.addEventListener('resize', updateScale);
    updateScale();

    function goToSlide(n) {
      if (n < 1 || n > totalSlides) return;
      
      document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
      
      currentSlide = n;
      const target = document.getElementById('slide-' + currentSlide);
      if (target) {
        target.classList.add('active');
      }

      document.getElementById('slide-indicator').textContent = 
        (currentSlide < 10 ? '0' + currentSlide : currentSlide) + ' / ' + totalSlides;
        
      document.getElementById('progress-bar').style.width = (currentSlide / totalSlides * 100) + '%';
    }

    document.getElementById('prev-btn').addEventListener('click', () => goToSlide(currentSlide - 1));
    document.getElementById('next-btn').addEventListener('click', () => goToSlide(currentSlide + 1));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToSlide(currentSlide - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    });
  </script>
</body>
</html>
"""

with open("slides.html", "w", encoding="utf-8") as f:
    f.write(html_presentation)

print("Updated slides.html to interactive web presentation app with animations successfully!")
