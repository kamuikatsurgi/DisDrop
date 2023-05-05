import React, { useRef, useEffect } from 'react';

const Particle = (ctx, x, y, radius, color) => {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: Math.random() - 0.5,
    y: Math.random() - 0.5,
  };

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  this.update = () => {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.velocity.y = -this.velocity.y;
    }

    this.draw();
  };
};

const LandingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particlesArray = [];

    for (let i = 0; i < 100; i++) {
      const radius = Math.random() * 3 + 1;
      const x = Math.random() * (window.innerWidth - radius * 2) + radius;
      const y = Math.random() * (window.innerHeight - radius * 2) + radius;
      const color = `rgba(255, 255, 255, ${Math.random()})`;
      particlesArray.push(new Particle(ctx, x, y, radius, color));
    }

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default LandingParticles;
