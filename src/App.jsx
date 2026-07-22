import { useEffect, useState } from 'react'
import './App.css'

const BASE = '/christopherthomson-portfolio'

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

const skillCategories = [
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    skills: [
      { name: 'Python', src: 'https://cdn.simpleicons.org/python' },
      { name: 'JavaScript', src: 'https://cdn.simpleicons.org/javascript' },
      { name: 'SQL', src: `${BASE}/logos/SQL_Image.svg` },
      { name: 'HTML', src: 'https://cdn.simpleicons.org/html5' },
      { name: 'CSS', src: 'https://cdn.simpleicons.org/css' },
      { name: 'TailwindCSS', src: 'https://cdn.simpleicons.org/tailwindcss' }
    ]
  },
  {
    id: 'frameworks-libraries',
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'TensorFlow', src: 'https://cdn.simpleicons.org/tensorflow' },
      { name: 'Docusaurus', src: 'https://cdn.simpleicons.org/docusaurus' },
      { name: 'Hugging Face', src: 'https://cdn.simpleicons.org/huggingface' },
      { name: 'Node.js', src: 'https://cdn.simpleicons.org/nodedotjs' },
      { name: 'React', src: 'https://cdn.simpleicons.org/react' },
      { name: 'Spark', src: `${BASE}/logos/apache_spark-icon.svg` },
      { name: 'Pandas', src: 'https://cdn.simpleicons.org/pandas' }
    ]
  },
  {
    id: 'devops-infrastructure',
    title: 'DevOps & Infrastructure',
    skills: [
      { name: 'Docker', src: 'https://cdn.simpleicons.org/docker' },
      { name: 'Podman', src: 'https://cdn.simpleicons.org/podman' },
      { name: 'GitLab CI/CD', src: 'https://cdn.simpleicons.org/gitlab' },
      { name: 'Linux', src: 'https://cdn.simpleicons.org/linux' },
      { name: 'macOS', src: 'https://cdn.simpleicons.org/apple' },
      { name: 'Windows', src: `${BASE}/logos/microsoft-icon.svg` },
      { name: 'PostgreSQL', src: 'https://cdn.simpleicons.org/postgresql' },
      { name: 'VS Code', src: `${BASE}/logos/visualstudio_code-icon.svg` }
    ]
  },
  {
    id: 'cloud-enterprise',
    title: 'Cloud & Enterprise',
    skills: [
      { name: 'Microsoft 365', src: `${BASE}/logos/office-2.svg` },
      { name: 'SharePoint', src: `${BASE}/logos/microsoft-sharepoint.svg` },
      { name: 'ServiceNow', src: `${BASE}/logos/servicenow-icon.svg` },
      { name: 'Power Automate', src: `${BASE}/logos/Microsoft_Power_Automate.svg` },
      { name: 'Jira', src: 'https://cdn.simpleicons.org/jira' },
      { name: 'Tableau', src: `${BASE}/logos/tableau-icon.svg` },
      { name: 'Firebase', src: `${BASE}/logos/firebase-icon.svg` }
    ]
  }
]

const projects = [
  {
    title: 'Knowledgebase Management System',
    description:
      'Designed and deployed a scalable documentation system processing 1000+ markdown files, reducing information search time. Automated content deployment with GitLab CI/CD pipelines, achieving 99.9% uptime and zero-downtime releases.',
    tech: ['Podman/Docker', 'JavaScript', 'GitLab', 'Linux']
  },
  {
    title: 'Job Search & Employer Application Tracker',
    description:
      'Developed a responsive job search and employer application tracker web app to streamline application tracking and enhance user experience.',
    tech: ['HTML', 'JavaScript', 'TailwindCSS', 'Docker']
  },
  {
    title: 'Video Game Sales Dashboard & ETL Pipeline',
    description:
      'Built a video game sales analytics dashboard powered by end-to-end ETL data pipelines, improving data quality and enabling automated reporting for stakeholders.',
    tech: ['Python', 'SQL']
  },
  {
    title: 'Web App UI for AI RAG System',
    description:
      'Redesigned an AI-powered search interface and integrated a vector database with the web frontend, enabling semantic search across 5000+ documents.',
    tech: ['Python', 'JavaScript', 'HTML/CSS', 'PostgreSQL', 'Hugging Face']
  }
]

function useTypewriter(words, { typeSpeed = 65, deleteSpeed = 35, holdTime = 1800 } = {}) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex % words.length]
    let timeout

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), holdTime)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }, deleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, holdTime])

  return text
}

function App() {
  const typedText = useTypewriter(typingTexts)
  const [activeSection, setActiveSection] = useState('about')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    const sections = document.querySelectorAll('.scroll-section')
    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + 150

      let currentSection = ''
      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop - 100) {
          currentSection = section.getAttribute('id')
        }
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }

      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <nav>
          <a href="#about" className="nav-brand">
            CT<span className="nav-brand-dot">.</span>
          </a>
          <ul className="nav-container">
            {['about', 'projects', 'skills', 'contact'].map((section) => (
              <li key={section}>
                <a href={`#${section}`} className={activeSection === section ? 'active' : ''}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      </header>

      <main>
        <section id="about" className="hero-section scroll-section content-section">
          <div className="profile-image-container">
            <img src={`${BASE}/headshot.png`} alt="Christopher Thomson" className="profile-image" />
          </div>
          <p className="hero-greeting">Hello, I&apos;m</p>
          <h1 className="hero-name">Christopher Thomson</h1>
          <div className="typing-container">
            <span className="static-text">I&apos;m a&nbsp;</span>
            <span className="typing-text">
              {typedText}
              <span className="typing-caret" aria-hidden="true" />
            </span>
          </div>
          <p className="hero-about">
            I&apos;m a passionate developer and data enthusiast with experience in full-stack development
            and data science. Currently working as a Data Science Mentee at SPE and formerly a
            Developer Student at Alberta Health Services.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-ghost">Get in Touch</a>
          </div>
        </section>

        <section id="projects" className="scroll-section content-section">
          <p className="section-eyebrow">01 — What I&apos;ve built</p>
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div className="project-card" key={project.title} style={{ '--delay': `${i * 0.1}s` }}>
                <span className="project-number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tag) => (
                    <span className="tech-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="scroll-section content-section">
          <p className="section-eyebrow">02 — What I work with</p>
          <h2>Skills</h2>
          <div className="skills-grid">
            {skillCategories.map((category, i) => (
              <div id={category.id} className="skill-category" key={category.id} style={{ '--delay': `${i * 0.1}s` }}>
                <h3>{category.title}</h3>
                <div className="skills-icons">
                  {category.skills.map((skill) => (
                    <div className="skill-item" title={skill.name} key={skill.name}>
                      <img src={skill.src} alt={skill.name} className="skill-logo" loading="lazy" />
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-section content-section">
          <p className="section-eyebrow">03 — Say hello</p>
          <h2>Contact</h2>
          <p className="contact-blurb">Let&apos;s get in touch!</p>
          <div className="contact-links">
            <a href="mailto:christopherthomson2026@gmail.com" title="Email" className="contact-icon email" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="4"/><polyline points="22,6 12,13 2,6"/></svg>
              <span className="contact-label">Email</span>
            </a>
            <a href="https://www.linkedin.com/in/christopher-thomson-cgy/" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="contact-icon linkedin" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595zm0 0"/></svg>
              <span className="contact-label">LinkedIn</span>
            </a>
            <a href="https://github.com/Cthomson20" title="GitHub" target="_blank" rel="noopener noreferrer" className="contact-icon github" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.589 8.2-6.085 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span className="contact-label">GitHub</span>
            </a>
            <a href={`${BASE}/ChristopherThomson_2025resume.pdf`} title="Download Resume/CV" download className="contact-icon cv" aria-label="Download Resume/CV">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 8L16 4.586A2 2 0 0 0 14.828 4H6zm7 1.414L18.586 7H15a2 2 0 0 1-2-2V3.414zM8 12h8v2H8v-2zm0 4h5v2H8v-2z"/></svg>
              <span className="contact-label">Resume</span>
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
