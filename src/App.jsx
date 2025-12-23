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
            <img src="/headshot.jpeg" alt="Christopher Thomson" className="profile-image" />
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
            <div className="project-card">
              <h3>Project 1</h3>
              <p>Description of your project goes here.</p>
            </div>
            <div className="project-card">
              <h3>Project 2</h3>
              <p>Description of your project goes here.</p>
            </div>
            <div className="project-card">
              <h3>Project 3</h3>
              <p>Description of your project goes here.</p>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-section content-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Languages</h3>
              <p>Python, JavaScript, SQL, R</p>
            </div>
            <div className="skill-category">
              <h3>Frameworks</h3>
              <p>React, Node.js, Express</p>
            </div>
            <div className="skill-category">
              <h3>Tools</h3>
              <p>Git, Docker, VS Code</p>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-section content-section">
          <h2>Contact</h2>
          <p>Let's get in touch!</p>
          <div className="contact-links">
            <a href="mailto:your.email@example.com">Email</a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </section>
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Christopher Thomson. All rights reserved.</p>
      </footer>
    </div>
  )
}


export default App
