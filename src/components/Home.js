import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  const animationRef = useRef(null);
  const [userCount, setUserCount] = useState(0);
  const [providerCount, setProviderCount] = useState(0);
  const [activeRideCount, setActiveRideCount] = useState(0); // New state variable
  let followMouse = true;

  useEffect(() => {
    // Fetch total number of users
    fetch('process.env.REACT_APP_BACKEND_URL/users/all/paginated?page=0&size=1')
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.totalElements);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    // Fetch total number of providers
    fetch('process.env.REACT_APP_BACKEND_URL/offers/all/providers')
      .then((response) => response.json())
      .then((data) => {
        setProviderCount(data.length);
      })
      .catch((error) => {
        console.error('Error fetching providers:', error);
      });

    // Fetch total number of active rides
    fetch('process.env.REACT_APP_BACKEND_URL/offers/filter?page=0&size=1&status=AVAILABLE')
      .then((response) => response.json())
      .then((data) => {
        setActiveRideCount(data.totalElements);
      })
      .catch((error) => {
        console.error('Error fetching active rides:', error);
      });
  }, []);

  useEffect(() => {
    const canvas = animationRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 2;

    let particlesArray = [];
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (event) => {
      if (followMouse) {
        mouse.x = event.x;
        mouse.y = event.y;
      }
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('click', (event) => {
      const numberOfParticles = Math.floor(Math.random() * 10) + 5;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 5 + 1;
        let directionX = Math.random() * 2 - 1;
        let directionY = Math.random() * 2 - 1;
        let color = '#B7C9E2';
        particlesArray.push(new Particle(event.x, event.y, directionX, directionY, size, color));
      }
    });

    window.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      followMouse = !followMouse;
    });

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.directionY = -this.directionY;
        }
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (followMouse && mouse.x !== null && mouse.y !== null && distance < mouse.radius + this.size) {
          this.x += dx * 0.05;
          this.y += dy * 0.05;
        } else {
          this.x += this.directionX;
          this.y += this.directionY;
        }
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 5 + 1;
        let x = Math.random() * (canvas.width - size * 2) + size * 2;
        let y = Math.random() * (canvas.height - size * 2) + size * 2;
        let directionX = Math.random() * 2 - 1;
        let directionY = Math.random() * 2 - 1;
        let color = '#B7C9E2';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
    }

    init();
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2;
      init();
    });
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Header Section with Animation */}
      <div
        className="jumbotron text-center mb-0"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '7rem 0',
          backgroundColor: '#e5e3dc',
          color: '#333',
          height: '200vh',
        }}
      >
        <canvas
          ref={animationRef}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        ></canvas>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="display-4 mb-4" style={{ fontWeight: 'bold' }}>
            Welcome to Háskóli Íslands Carpooling Service!
          </h1>
          <p className="lead" style={{ fontSize: '1.25rem' }}>
            Discover a better way to commute — eco-friendly, affordable, and community-driven.
          </p>
          <p className="lead" style={{ fontSize: '1rem' }}>
            We have <strong>{userCount}</strong> users with{' '}
            <strong>{providerCount}</strong> people offering rides.
          </p>
          <p className="lead" style={{ fontSize: '1rem' }}>
            Currently, we have <strong>{activeRideCount}</strong> active rides available.
          </p>
          <Button as={Link} to="/register" variant="primary" size="lg" className="mt-3">
            Get Started
          </Button>
        </div>
        {/* Features Section Styled Like Timeline */}
        <div
          className="features-section py-5"
          style={{ backgroundColor: 'transparent', color: '#333', position: 'relative' }}
        >
          <Container className="narrow-container" style={{ maxWidth: '50%' }}>
            <div className="timeline">
              <Row className="align-items-center mb-5">
                <Col md={6} className="text-md-end">
                  <img
                    src="https://via.placeholder.com/500"
                    alt="A happy woman"
                    className="img-fluid"
                  />
                </Col>
                <Col md={6} className="d-flex align-items-center">
                  <div>
                    <h3 className="text-dark" style={{ fontWeight: 'bold' }}>
                      Save Money
                    </h3>
                    <p>
                      Cut down on travel costs by sharing rides with fellow students and staff.
                    </p>
                  </div>
                </Col>
              </Row>
              <div className="timeline-dot"></div>
              <Row className="align-items-center mb-5">
                <Col md={6} className="text-md-end order-md-2">
                  <img
                    src="https://via.placeholder.com/500"
                    alt="A Car"
                    className="img-fluid"
                  />
                </Col>
                <Col md={6} className="order-md-1 d-flex align-items-center">
                  <div>
                    <h3 className="text-dark" style={{ fontWeight: 'bold' }}>
                      Reduce Emissions
                    </h3>
                    <p>
                      Help reduce traffic congestion and pollution in the greater Reykjavík area.
                    </p>
                  </div>
                </Col>
              </Row>
              <div className="timeline-dot"></div>
              <Row className="align-items-center mb-5">
                <Col md={6} className="text-md-end">
                  <img
                    src="https://via.placeholder.com/500"
                    alt="A schoolmate"
                    className="img-fluid"
                  />
                </Col>
                <Col md={6} className="d-flex align-items-center">
                  <div>
                    <h3 className="text-dark" style={{ fontWeight: 'bold' }}>
                      Build Community
                    </h3>
                    <p>Make meaningful connections on your way to campus.</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>

      {/* Call to Action Section */}
      <div
        className="call-to-action-section py-5"
        style={{ backgroundColor: '#f7f4ef', color: '#333' }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="text-dark" style={{ fontWeight: 'bold' }}>
                Let’s Drive Change — One Shared Ride at a Time
              </h2>
              <p className="lead" style={{ fontSize: '1.1rem' }}>
                Ready to make your journey to campus more social, sustainable, and stress-free? Sign
                up today and be part of the solution!
              </p>
              <Button as={Link} to="/register" variant="primary" size="lg" className="mt-3">
                Join Now
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
