'use client';

import React, { useRef, useEffect } from 'react';

const PremiumCateringBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(x: number, y: number, speedX: number, speedY: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }

        // Mouse interaction
        if (mouse.current.x !== null && mouse.current.y !== null) {
          let dx = mouse.current.x - this.x;
          let dy = mouse.current.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) { // Repulsion radius
            this.x -= dx / (distance / 2);
            this.y -= dy / (distance / 2);
          }
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.shadowBlur = 5;
        ctx!.shadowColor = this.color;
        ctx!.fill();
      }
    }
    
    let particles: Particle[] = [];
    const particleCount = 80;
    const colors = ['#D4AF37', '#800020'];

    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 0.5;
        let speedY = (Math.random() - 0.5) * 0.5;
        let color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, speedX, speedY, color));
      }
    }

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance =
            ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
            ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            ctx!.strokeStyle = `rgba(212, 175, 55, ${opacityValue})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    }

    class LightBurst {
        x: number;
        y: number;
        radius: number;
        maxRadius: number;
        speed: number;
        life: number;
        maxLife: number;

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = 0;
            this.maxRadius = Math.random() * 50 + 20;
            this.speed = Math.random() * 0.5 + 0.1;
            this.life = 1;
            this.maxLife = Math.random() * 50 + 50;
        }

        update() {
            this.radius += this.speed;
            this.life -= 1 / this.maxLife;
        }

        draw() {
            if (this.life <= 0) return;
            ctx!.beginPath();
            const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, `rgba(212, 175, 55, ${this.life * 0.2})`);
            gradient.addColorStop(1, `rgba(212, 175, 55, 0)`);
            ctx!.fillStyle = gradient;
            ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx!.fill();
        }
    }

    let lightBursts: LightBurst[] = [];

    function animate() {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      
      // Vignette
      const outerRadius = canvas.width * 0.7;
      const innerRadius = canvas.width * 0.3;
      const gradient = ctx!.createRadialGradient(canvas.width / 2, canvas.height / 2, innerRadius, canvas.width / 2, canvas.height / 2, outerRadius);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0,0, canvas.width, canvas.height);


      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connect();

      if (Math.random() < 0.03 && lightBursts.length < 5) {
          lightBursts.push(new LightBurst());
      }
      lightBursts.forEach((burst, index) => {
          burst.update();
          burst.draw();
          if (burst.life <= 0) {
              lightBursts.splice(index, 1);
          }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 h-full w-full bg-background" />
  );
};

export default PremiumCateringBackground;
