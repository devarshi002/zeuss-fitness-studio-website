import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./Landing.css";
import trainer1 from "../assets/trainer1.jpg";
import trainer2 from "../assets/trainer2.jpg";
import trainer3 from "../assets/trainer3.jpg";

// ── Counter Hook ──────────────────────────────────────────────
function useCounter(target, duration = 2000, started) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  const years = useCounter(5, 1500, statsStarted);
  const members = useCounter(1000, 2000, statsStarted);
  const programs = useCounter(50, 1500, statsStarted);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Scroll reveal
      const sections = document.querySelectorAll("section");
      sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) sec.classList.add("visible");
      });

      // Stats counter trigger
      if (statsRef.current) {
        const top = statsRef.current.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) setStatsStarted(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on nav link click
  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="landing">

      {/* ── Navbar ── */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <h2 className="logo">ZEUSS FITNESS STUDIO</h2>

        {/* Desktop Links */}
        <ul className="nav-links">
          {["hero","about","plans","trainers","transformations","whychoose","contact"].map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={handleNavClick}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <button className="login-btn desktop-only" onClick={() => navigate("/login")}>
          Member Login
        </button>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? "drawer-open" : ""}`}>
        <ul>
          {["hero","about","plans","trainers","transformations","whychoose","contact"].map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={handleNavClick}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button className="login-btn" onClick={() => { navigate("/login"); handleNavClick(); }}>
          Member Login
        </button>
      </div>

      {/* ── Hero ── */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>Unleash Your Inner Beast 💪</h1>
          <p>Train Hard • Stay Strong • Transform Your Body</p>
          <button className="cta-btn" onClick={() => navigate("/login")}>
            Join Now
          </button>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="about">
        <div className="about-wrapper">
          <div className="about-images">
            <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61" alt="Gym Equipment" />
            <img src="https://images.unsplash.com/photo-1594737625785-a6cbdabd333c" alt="Workout Area" />
          </div>

          <div className="about-content">
            <h2>About Zeuss Fitness Studio</h2>
            <p>
              Zeuss Fitness Studio is a premium transformation hub dedicated to
              building strength, endurance, and confidence. With world-class
              equipment and expert trainers, we help individuals unlock their
              true physical potential.
            </p>

            <div className="about-features">
              <div className="feature"><span>🏋️</span><p>Modern Equipment</p></div>
              <div className="feature"><span>🥗</span><p>Personalized Diet Plans</p></div>
              <div className="feature"><span>👨‍🏫</span><p>Certified Trainers</p></div>
              <div className="feature"><span>🔥</span><p>Body Transformation Programs</p></div>
            </div>

            {/* Animated Stats */}
            <div className="about-stats" ref={statsRef}>
              <div><h3>{years}+</h3><p>Years Experience</p></div>
              <div><h3>{members}+</h3><p>Members Transformed</p></div>
              <div><h3>{programs}+</h3><p>Fitness Programs</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Membership Plans ── */}
      <section id="plans" className="plans">
        <h2>Membership Plans</h2>
        <div className="plan-cards">
          <div className="plan-card gold">
            <h3>Gold Plan</h3>
            <p className="price">₹1999 / month</p>
            <ul>
              <li>Gym Equipment Access</li>
              <li>Cardio Zone</li>
              <li>Locker Facility</li>
            </ul>
          </div>
          <div className="plan-card platinum">
            <h3>Platinum Plan</h3>
            <p className="price">₹3499 / month</p>
            <ul>
              <li>All Gold Features</li>
              <li>Personal Trainer</li>
              <li>Diet Consultation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Trainers ── */}
      <section id="trainers" className="trainers">
        <h2>Our Expert Trainers</h2>
        <div className="trainer-cards">
          <div className="trainer-card">
            <img src={trainer1} alt="Trainer 1" />
            <h3>Rahul Sharma</h3>
            <p>Strength & Conditioning Coach</p>
          </div>
          <div className="trainer-card">
            <img src={trainer2} alt="Trainer 2" />
            <h3>Neha Patil</h3>
            <p>Certified Personal Trainer</p>
          </div>
          <div className="trainer-card">
            <img src={trainer3} alt="Trainer 3" />
            <h3>Arjun Mehta</h3>
            <p>Bodybuilding Specialist</p>
          </div>
        </div>
      </section>

      {/* ── Transformations ── */}
      <section id="transformations" className="transformations">
        <h2>Transformation Achievers</h2>
        <div className="transform-grid">
          <div className="transform-card">
            <img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e" alt="Transformation" />
            <p>From Beginner to Bodybuilder 💪</p>
          </div>
          <div className="transform-card">
            <img src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba" alt="Transformation" />
            <p>Skinny to Muscular Transformation 🔥</p>
          </div>
          <div className="transform-card">
            <img src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1" alt="Transformation" />
            <p>Strength & Physique Upgrade 🚀</p>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section id="whychoose" className="whychoose">
        <h2>WHY PEOPLE CHOOSE US</h2>
        <p className="whychoose-sub">
          People choose us for our expert trainers, state-of-the-art equipment, and commitment to delivering exceptional results.
        </p>
        <div className="whychoose-grid">
          {[
            { icon: "❤️‍🔥", title: "SPORTS PERFORMANCE TRAINING", desc: "Elevate your game with specialized training designed to enhance agility, strength, and endurance for peak athletic performance." },
            { icon: "🥗", title: "NUTRITION", desc: "Fuel your body right with personalized meal plans and expert nutritional guidance to support your fitness goals and overall health." },
            { icon: "👥", title: "BOOTCAMPS", desc: "Join our high-energy group bootcamps to build strength and camaraderie in a motivating, team-based environment." },
            { icon: "🏋️", title: "OPEN AIR FITNESS CENTER", desc: "Experience the freedom of training outdoors in our unique open-air facility, combining fresh air with top-tier equipment." },
            { icon: "🎯", title: "RESULT ORIENTED TRAINING", desc: "We focus on measurable progress. Our scientifically-backed methods ensure you reach your specific fitness milestones efficiently." },
            { icon: "🕐", title: "CONVENIENCE AND FLEXIBILITY", desc: "Training that fits your life. With flexible schedules and diverse location options, we make consistency easy." },
          ].map((item, i) => (
            <div className="whychoose-card" key={i}>
              <div className="whychoose-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="testimonials">
        <h2>What Our Members Say</h2>
        <div className="testimonial-grid">
          {[
            { name: "Vikram S.", stars: 5, text: "Lost 18 kg in 4 months! The trainers here are incredibly dedicated and the environment is super motivating." },
            { name: "Priya M.", stars: 5, text: "Best gym in the city. The Platinum plan is absolutely worth it — my trainer customized everything for me." },
            { name: "Rohan K.", stars: 5, text: "Zeuss transformed not just my body but my mindset. The diet plan + training combo is unbeatable." },
          ].map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">{"★".repeat(t.stars)}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <h4>— {t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact">
        <div className="contact-top">
          <h2>GET IN <span>TOUCH</span></h2>
          <p>We'd love to hear from you. Visit us, call us, or drop a message below.</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-left">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.315898808205!2d77.69656777381897!3d12.950788729842182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae133f2e697dc9%3A0xcf08cb6ab03a39a2!2sZeus%20Fitness%20Studio!5e0!3m2!1sen!2sin!4v1771614991362!5m2!1sen!2sin"
                width="100%" height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Zeuss Fitness Studio Location"
              />
            </div>

            <div className="hours-box">
              <h3>🕐 GYM HOURS</h3>
              <div className="hours-list">
                <div className="hours-row">
                  <span>Monday – Friday</span>
                  <span className="hours-time">05:30 AM – 10:00 PM</span>
                </div>
                <div className="hours-row">
                  <span>Saturday</span>
                  <span className="hours-time">05:30 AM – 10:00 PM</span>
                </div>
                <div className="hours-row">
                  <span>Sunday</span>
                  <span className="hours-time">06:00 AM – 11:00 AM</span>
                </div>
              </div>
            </div>

            <div className="contact-details">
              <p>📍 Zeuss Fitness Studio, Main City Road</p>
              <p>📞 +91 98765 43210</p>
              <p>📧 zeussfitness@gmail.com</p>
            </div>
            <div className="contact-buttons">
              <a href="tel:+919876543210" className="contact-btn call">📞 Call Now</a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="contact-btn whatsapp">💬 WhatsApp Us</a>
            </div>
          </div>

          <div className="contact-form-box">
            <h3>CONTACT US</h3>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number" required />
                </div>
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className="form-group">
                <select defaultValue="">
                  <option value="" disabled>Select Interest</option>
                  <option>Gold Membership</option>
                  <option>Platinum Membership</option>
                  <option>Personal Training</option>
                  <option>Diet Consultation</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message..." rows={5} required />
              </div>
              <button type="submit" className="submit-btn">SUBMIT NOW →</button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <h3>"No Pain, No Gain 🔥"</h3>
        <p>Follow us on:</p>
        <div className="socials">
          <span>Instagram</span>
          <span>Facebook</span>
          <span>YouTube</span>
        </div>
        <p>© 2026 Zeuss Fitness Studio. All Rights Reserved.</p>
      </footer>

      {/* ── WhatsApp Floating Button ── */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </div>
  );
}

export default Landing;