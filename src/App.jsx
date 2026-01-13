import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const typingTexts = [
    'Data Science Mentee @ SPE',
    'Data Scientist',
    'Developer Student @ AHS',
    'Data Engineer',
    'Full Stack Developer',
    'Tech Enthusiast',
    'Statistician',
    'Sports Fanatic'
  ]
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [activeSection, setActiveSection] = useState('about')
  
  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0)
  }, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        } else {
          entry.target.classList.remove('visible')
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('.scroll-section')
    sections.forEach(section => observer.observe(section))

    return () => sections.forEach(section => observer.unobserve(section))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + 150

      let currentSection = ''
      sections.forEach(section => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop - 100) {
          currentSection = section.getAttribute('id')
        }
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-container a[href^="#"]');
    function handleNavClick(e) {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const header = document.querySelector('.app-header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetRect = target.getBoundingClientRect();
          const scrollY = window.scrollY + targetRect.top;
          // Ensure we don't scroll above the top
          const scrollTo = Math.max(scrollY - headerHeight, 0);
          window.scrollTo({ top: scrollTo, behavior: 'smooth' });
        }
      }
    }
    navLinks.forEach(link => link.addEventListener('click', handleNavClick));
    return () => navLinks.forEach(link => link.removeEventListener('click', handleNavClick));
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <nav>
          <ul className="nav-container">
            <li>
              <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
            </li>
            <li>
              <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
            </li>
            <li>
              <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
            </li>
            <li>
              <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      
      <main>
        <section id="about" className="hero-section scroll-section content-section">
          <div className="profile-image-container">
            <img src="/christopherthomson-portfolio/headshot.png" alt="Christopher Thomson" className="profile-image" />
          </div>
          <h1>Christopher Thomson</h1>
          <div className="typing-container">
            <span className="static-text">I'm a </span>
            <span className="typing-text" key={currentTextIndex}>{typingTexts[currentTextIndex]}</span>
          </div>
          <p className="hero-about">
            I'm a passionate developer and data enthusiast with experience in full-stack development
            and data science. Currently working as a Data Science Mentee at SPE and formerly a
            Developer Student at Alberta Health Services.
          </p>
        </section>

        <section id="projects" className="scroll-section content-section">
          <h2>Projects</h2>
          <div className="projects-grid">
            <a id="dreamtrack" className="project-card">
              <h3>DreamTrack</h3>
              <p>
                A comprehensive job application tracking platform designed to streamline the
                job search and hiring process for job seekers, employers, and administrators.
                Deployed using Docker containers and hosted on Firebase for scalability and reliability.
              </p>
              <div className="project-skills">
                <h4>Tech Stack:</h4>
                <div className="project-skills-logos">
                  <div className="project-skill" title="Firebase">
                    <img src="/christopherthomson-portfolio/logos/firebase-icon.svg" alt="Firebase" className="skill-logo" />
                  </div>
                  <div className="project-skill" title='Docker'>
                    <img src="https://cdn.simpleicons.org/docker" alt="Docker" className="skill-logo" />
                  </div>
                  <div className="project-skill" title='JavaScript'>
                    <img src="https://cdn.simpleicons.org/javascript" alt="JavaScript" className="skill-logo" style={{ filter: 'brightness(0.95)' }}/>
                  </div>
                  <div className="project-skill" title='HTML'>
                    <img src="https://cdn.simpleicons.org/html5" alt="HTML" className="skill-logo" />
                  </div>
                  <div className="project-skill" title="TailwindCSS">
                    <img src="https://cdn.simpleicons.org/tailwindcss" alt="TailwindCSS" className="skill-logo" />
                  </div>
                </div>
              </div>
              <div className="project-links">
                <h4>Github URL</h4>
                <a href="https://github.com/Cthomson20/DreamTrack-WebApp" title="GitHub" target="_blank" rel="noopener noreferrer" className="contact-icon github" aria-label="GitHub">
                <svg className="link-logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.589 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </a>
            <a id="atlas" className="project-card">
              <h3>ATLAS</h3>
              <p>
                A dynamically updating documentation website for Alberta Health Services' internal
                tools and processes. Built to provide an intuitive interface for
                healthcare professionals to access up-to-date documents and diagrams efficiently.
                Hosted using in-house linux servers and Podman containers.
              </p>
              <div className="project-skills">
                <h4>Tech Stack</h4>
                <div className="project-skills-logos">
                  <div className="project-skill" title='Podman'>
                    <img src="https://cdn.simpleicons.org/podman" alt="Podman" className="skill-logo" />
                  </div>
                  <div className="project-skill" title='Linux'>
                    <img src="https://cdn.simpleicons.org/linux" alt="Linux" className="skill-logo" style={{ filter: 'brightness(0.95)' }}/>
                  </div>
                  <div className="project-skill" title='GitLab CI/CD'>
                    <img src="https://cdn.simpleicons.org/gitlab" alt="GitLab CI/CD" className="skill-logo" />
                  </div>
                  <div className="project-skill" title='Node.js'>
                    <img src="https://cdn.simpleicons.org/nodedotjs" alt="Node.js" className="skill-logo" />
                  </div>
                  <div className="project-skill" title='JavaScript'>
                    <img src="https://cdn.simpleicons.org/javascript" alt="JavaScript" className="skill-logo" style={{ filter: 'brightness(0.95)' }}/>
                  </div>
                </div>
              </div>
              <h5>*Please reachout for more information/references*</h5>
            </a>
            <a id="customer-pipeline" className="project-card">
              <h3>Video Game Sales Analytics Dashboard Pipeline</h3>
              <p>
                Video game sales analytics dashboard, developed an end‑to‑end ETL data pipeline
                in Python (PySpark/Pandas) and SQL (PostgreSQL), improving data
                quality and enabling automated reporting for stakeholders.
              </p>
              <div className="project-skills">
                <h4>Tech Stack</h4>
                <div className="project-skills-logos">
                  <div className="project-skill" title='Python'>
                    <img src="https://cdn.simpleicons.org/python" alt="Python" className="skill-logo" />
                  </div>
                  <div className="project-skill" title='PostgreSQL'>
                    <img src="https://cdn.simpleicons.org/postgresql" alt="PostgreSQL" className="skill-logo" />
                  </div>
                  <div className="project-skill" title='Spark'>
                    <img src="/christopherthomson-portfolio/logos/apache_spark-icon.svg" alt="Spark" className="skill-logo" />
                  </div>
                  <div className="project-skill" title='Pandas'>
                    <img src="https://cdn.simpleicons.org/pandas" alt="Pandas" className="skill-logo" />
                  </div>
                </div>
              </div>
              <div className="project-links">
                <h4>Github URL</h4>
                <a href="https://github.com/Cthomson20/seng550-customer-analytics-dashboard-pipeline" title="GitHub" target="_blank" rel="noopener noreferrer" className="contact-icon github" aria-label="GitHub">
                <svg className="link-logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.589 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </a>
            <a id="movie-theatre-ui" className="project-card">
              <h3>Movie Theatre UI</h3>
              <p>
                Comprehensive movie theatre ticket booking system front-end only.
                The application allows users to browse movies, select showtimes,
                choose seats, and complete ticket purchases through an
                intuitive multi-step booking flow.
              </p>
              <div className="project-skills">
                <h4>Tech Stack:</h4>
                <div className="project-skills-logos">
                  <div className="project-skill" title='React'>
                    <img src="https://cdn.simpleicons.org/react" alt="React" className="skill-logo" style={{ filter: 'brightness(0.7)' }}/>
                  </div>
                  <div className="project-skill" title='HTML'>
                    <img src="https://cdn.simpleicons.org/html5" alt="HTML" className="skill-logo" />
                  </div>
                  <div className="project-skill" title='CSS'>
                    <img src="https://cdn.simpleicons.org/css" alt="CSS" className="skill-logo" />
                  </div>
                </div>
              </div>
              <h4>URL's</h4>
              <div className="project-links">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <a href="https://github.com/Cthomson20/movie_theatre_system" title="GitHub" target="_blank" rel="noopener noreferrer" className="contact-icon github" aria-label="GitHub">
                    <svg className="link-logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.589 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="https://cthomson20.github.io/movie_theatre_system/" title="Live Demo" target="_blank" rel="noopener noreferrer" className="contact-icon movie" aria-label="Live Demo">
                    <img src="/christopherthomson-portfolio/logos/playbutton.svg" alt="Live Demo" className="link-logo" />
                  </a>
                </div>
              </div>
            </a>
            <a id="screentime-dashboard" className="project-card">
              <h3>Screentime Analysis Dashboard</h3>
              <p>
                A screentime analysis dashboard in created in Observable using javascript
                to visualize and analyze the screentime of various individuals.
                We tracked screentime data over a period of time and created
                interactive visualizations to provide insights into usage patterns.
              </p>
              <div className="project-skills">
                <h4>Tech Stack:</h4>
                <div className="project-skills-logos">
                  <div className="project-skill" title='JavaScript'>
                    <img src="https://cdn.simpleicons.org/javascript" alt="JavaScript" className="skill-logo" />
                  </div>
                </div>
              </div>
              <h4>URL</h4>
              <div className="project-links">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <a href="https://observablehq.com/d/79e661079687e9a0" title="Live Demo" target="_blank" rel="noopener noreferrer" className="contact-icon movie" aria-label="Live Demo">
                    <img src="/christopherthomson-portfolio/logos/playbutton.svg" alt="Live Demo" className="link-logo" />
                  </a>
                </div>
              </div>
            </a>
          </div>
        </section>

        <section id="skills" className="scroll-section content-section">
          <h2>Skills</h2>
          <div id="programming-languages" className="skills-grid">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <div className="skills-icons">
                <div className="skill-item" title='Python'>
                  <img src="https://cdn.simpleicons.org/python" alt="Python" className="skill-logo" />
                </div>
                <div className="skill-item" title='JavaScript'>
                  <img src="https://cdn.simpleicons.org/javascript" alt="JavaScript" className="skill-logo" />
                </div>
                <div className="skill-item" title='SQL'>
                  <img src="/christopherthomson-portfolio/logos/SQL_Image.svg" alt="SQL" className="skill-logo" />
                </div>
                <div className="skill-item" title='HTML'>
                  <img src="https://cdn.simpleicons.org/html5" alt="HTML" className="skill-logo" />
                </div>
                <div className="skill-item" title='CSS'>
                  <img src="https://cdn.simpleicons.org/css" alt="CSS" className="skill-logo" />
                </div>
                <div className="skill-item" title='TailwindCSS'>
                  <img src="https://cdn.simpleicons.org/tailwindcss" alt="TailwindCSS" className="skill-logo" />
                </div>
              </div>
            </div>
            
            <div id="frameworks-libraries" className="skill-category">
              <h3>Frameworks & Libraries</h3>
              <div className="skills-icons">
                <div className="skill-item" title='TensorFlow'>
                  <img src="https://cdn.simpleicons.org/tensorflow" alt="TensorFlow" className="skill-logo" />
                </div>
                <div className="skill-item" title='Docusaurus'>
                      <img src="https://cdn.simpleicons.org/docusaurus" alt="Docusaurus" className="skill-logo" style={{ filter: 'brightness(0.90)' }}/>
                </div>
                <div className="skill-item" title='HuggingFace'>
                  <img src="https://cdn.simpleicons.org/huggingface" alt="HuggingFace" className="skill-logo" style={{ filter: 'brightness(0.95)' }}/>
                </div>
                <div className="skill-item" title='Node.js'>
                  <img src="https://cdn.simpleicons.org/nodedotjs" alt="Node.js" className="skill-logo" />
                </div>
                <div className="skill-item" title='React'>
                  <img src="https://cdn.simpleicons.org/react" alt="React" className="skill-logo" style={{ filter: 'brightness(0.7)' }} />
                </div>
                <div className="skill-item" title='Spark'>
                  <img src="/christopherthomson-portfolio/logos/apache_spark-icon.svg" alt="Spark" className="skill-logo" />
                </div>
                <div className="skill-item" title='Pandas'>
                  <img src="https://cdn.simpleicons.org/pandas" alt="Pandas" className="skill-logo" />
                </div>
              </div>
            </div>
            
            <div id="devops-infrastructure" className="skill-category">
              <h3>DevOps & Infrastructure</h3>
              <div className="skills-icons">
                <div className="skill-item" title='Docker'>
                  <img src="https://cdn.simpleicons.org/docker" alt="Docker" className="skill-logo" />
                </div>
                <div className="skill-item" title='Podman'>
                  <img src="https://cdn.simpleicons.org/podman" alt="Podman" className="skill-logo" />
                </div>
                <div className="skill-item" title='GitLab CI/CD'>
                  <img src="https://cdn.simpleicons.org/gitlab" alt="GitLab CI/CD" className="skill-logo" />
                </div>
                <div className="skill-item" title='Linux'>
                  <img src="https://cdn.simpleicons.org/linux" alt="Linux" className="skill-logo" />
                </div>
                <div className="skill-item" title='macOS'>
                  <img src="https://cdn.simpleicons.org/apple" alt="macOS" className="skill-logo" />
                </div>
                <div className="skill-item" title='Windows'>
                  <img src="/christopherthomson-portfolio/logos/microsoft-icon.svg" alt="Windows" className="skill-logo" />
                </div>
                <div className="skill-item" title='PostgreSQL'>
                  <img src="https://cdn.simpleicons.org/postgresql" alt="PostgreSQL" className="skill-logo" />
                </div>
                <div className="skill-item" title='VS Code'>
                  <img src="/christopherthomson-portfolio/logos/visualstudio_code-icon.svg" alt="VS Code" className="skill-logo" />
                </div>
              </div>
            </div>
            
            <div id="cloud-enterprise" className="skill-category">
              <h3>Cloud & Enterprise</h3>
              <div className="skills-icons" >
                <div className="skill-item" title='Microsoft 365'>
                  <img src="/christopherthomson-portfolio/logos/office-2.svg" alt="Microsoft 365" className="skill-logo" />
                </div>
                <div className="skill-item" title='SharePoint'>
                  <img src="/christopherthomson-portfolio/logos/microsoft-sharepoint.svg" alt="SharePoint" className="skill-logo" />
                </div>
                <div className="skill-item" title='ServiceNow'>
                  <img src="/christopherthomson-portfolio/logos/servicenow-icon.svg" alt="ServiceNow" className="skill-logo" />
                </div>
                <div className="skill-item" title='Power Automate'>
                  <img src="/christopherthomson-portfolio/logos/Microsoft_Power_Automate.svg" alt="Power Automate" className="skill-logo" />
                </div>
                <div className="skill-item" title='Jira'>
                  <img src="https://cdn.simpleicons.org/jira" alt="Jira" className="skill-logo" />
                </div>
                <div className="skill-item" title='Tableau'>
                  <img src="/christopherthomson-portfolio/logos/tableau-icon.svg" alt="Tableau" className="skill-logo" />
                </div>
                <div className="skill-item" title='Firebase'>
                  <img src="/christopherthomson-portfolio/logos/firebase-icon.svg" alt="Firebase" className="skill-logo" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-section content-section">
          <h2>Contact</h2>
          <p>Let's get in touch!</p>
          <div className="contact-links">
            <a href="mailto:christopherthomson2026@gmail.com" title="Email" className="contact-icon email" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="4"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/christopher-thomson-cgy/" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="contact-icon linkedin" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595zm0 0"/></svg>
            </a>
            <a href="https://github.com/Cthomson20" title="GitHub" target="_blank" rel="noopener noreferrer" className="contact-icon github" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.589 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="/christopherthomson-portfolio/ChristopherThomson_2026resume.pdf" title="Download Resume/CV" download className="contact-icon cv" aria-label="Download Resume/CV">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 8L16 4.586A2 2 0 0 0 14.828 4H6zm7 1.414L18.586 7H15a2 2 0 0 1-2-2V3.414zM8 12h8v2H8v-2zm0 4h5v2H8v-2z"/></svg>
            </a>
          </div>
        <footer className="app-footer">
          <p>&copy; 2025 Christopher Thomson. All rights reserved.</p>
        </footer>
        </section>
      </main>
      
    </div>
  )
}


export default App
