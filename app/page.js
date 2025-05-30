"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Code,
  Brain,
  Zap,
  Award,
  MapPin,
  Calendar,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import {
  OrbitControls,
  SpotLight,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";

const AnimatedSphere = () => {
  const { viewport } = useThree();
  const [spring, api] = useSpring(() => ({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { mass: 2, tension: 200 },
  }));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    api.start({
      position: [Math.sin(t / 2) * 0.5, Math.cos(t / 2) * 0.5, 0],
      rotation: [Math.cos(t / 4), Math.sin(t / 4), 0],
    });
  });

  return (
    <animated.mesh {...spring}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#88ccff"
          attach="material"
          distort={0.5}
          speed={4}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>
    </animated.mesh>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const skills = [
    { name: "Python", category: "Programming" },
    { name: "JavaScript", category: "Programming" },
    { name: "React/Next.js", category: "Frontend" },
    { name: "FastAPI", category: "Backend" },
    { name: "YOLOv8", category: "AI/ML" },
    { name: "Docker", category: "DevOps" },
    { name: "Google Cloud", category: "Cloud" },
    { name: "Three.js", category: "Graphics" },
  ];

  const projects = [
    {
      title: "AlgoPlayground",
      description:
        "Interactive DSA visualization tool with real-time 3D animations and step-by-step walkthroughs for better conceptual clarity.",
      tech: [
        "Next.js",
        "React",
        "Three.js",
        "Blender",
        "Framer Motion",
        "GSAP",
      ],
      link: "https://algoplayground.vercel.app",
      date: "Jan 2025",
    },
    {
      title: "Miners Security Helmet",
      description:
        "Smart mining helmet with IoT sensors for gas detection, temperature monitoring, and emergency alerts with real-time GPS tracking.",
      tech: ["ESP32", "IoT", "Firebase", "Google Maps API", "IFTTT"],
      date: "Aug 2024",
    },
    {
      title: "Intelligent Urban Waste Management",
      description:
        "AI-powered waste collection optimizer using OR-Tools and GIS to calculate truck requirements and optimize routes.",
      tech: ["Python", "Google OR-Tools", "GIS", "Folium"],
      date: "Sep 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 25% 25%, rgba(56, 189, 248, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)",
          y: backgroundY,
        }}
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/60 backdrop-blur-xl border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Nihar Singla
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["About", "Experience", "Projects", "Education", "Contact"].map(
                (item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      activeSection === item.toLowerCase()
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                        layoutId="activeTab"
                      />
                    )}
                  </motion.button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/40 backdrop-blur-lg border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-4 space-y-2">
                {[
                  "About",
                  "Experience",
                  "Projects",
                  "Education",
                  "Contact",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            className="!absolute inset-0"
          >
            <ambientLight intensity={0.2} />
            <SpotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <AnimatedSphere />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
            <fog attach="fog" args={["#000", 5, 15]} />
          </Canvas>
        </motion.div>

        <motion.div
          className="text-center z-10 relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <motion.div
                className="w-full h-full bg-gradient-to-br from-sky-400 to-teal-500 rounded-full flex items-center justify-center text-4xl font-bold"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                NS
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-sky-400 to-teal-500 rounded-full opacity-20 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent"
          >
            Nihar Singla
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Entry-Level AI & Software Engineer | Full-Stack Developer |
            Specialized in Real-Time Systems and Visual Learning Platforms
          </motion.p>

          {/* Hero Section Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.a
              href="mailto:niharsingla001@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-sky-500/25 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              Get In Touch
            </motion.a>

            <motion.a
              href="https://github.com/nihar004"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-full text-gray-300 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
              GitHub
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/nihar-singla001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-full text-gray-300 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} />
              LinkedIn
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="animate-bounce">
            <ChevronDown size={32} className="mx-auto text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              I&#39;m a passionate AI & Software Engineer with expertise in
              real-time systems, computer vision, and full-stack development.
              Currently pursuing B.Tech in CSE with a CGPA of 9.47, I love
              creating innovative solutions that make a real-world impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Brain className="text-cyan-400" size={28} />
                Expertise
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">
                    AI & Machine Learning
                  </h4>
                  <p className="text-gray-300">
                    Computer Vision, OCR, YOLOv8, Real-time Processing
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">
                    Full-Stack Development
                  </h4>
                  <p className="text-gray-300">
                    React, Next.js, FastAPI, Spring Boot, REST APIs
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-pink-400 mb-2">
                    DevOps & Cloud
                  </h4>
                  <p className="text-gray-300">
                    Docker, Google Cloud Platform, CI/CD
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Award className="text-purple-400" size={28} />
                Achievements
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">2nd in batch with CGPA 9.47</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">ML/OS/IoT topper</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    Sustainable Hackathon finalist (2023, 2024)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    Patent application for IoT innovation
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-gray-900/40 backdrop-blur-lg rounded-xl p-4 border border-sky-500/10 text-center hover:bg-sky-900/20 transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-lg font-semibold">{skill.name}</div>
                  <div className="text-sm text-gray-400">{skill.category}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                  AI Developer Intern
                </h3>
                <p className="text-xl text-gray-300">VehicleCare, Gurugram</p>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar size={16} />
                <span>May 2024 - July 2024</span>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div
                className="flex items-start gap-3 p-4 bg-white/5 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-300">
                  Engineered CarSight, a real-time number plate recognition
                  system using YOLOv8 and OCR (Tesseract + Google Vertex AI),
                  deployed for field testing.
                </p>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 p-4 bg-white/5 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-300">
                  Boosted OCR pipeline accuracy from 27% to 58% on real-world
                  vehicle datasets by optimizing detection, skew correction, and
                  recognition stages.
                </p>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 p-4 bg-white/5 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="text-pink-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-300">
                  Architected a containerized FastAPI backend, deployed on
                  Google Cloud with Docker + Nginx SSL, enabling multi-project
                  hosting.
                </p>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 p-4 bg-white/5 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-300">
                  Prototyped an AI-driven insurance claim validator (PDF parsing
                  + OCR) to automate policy verification—successfully
                  transitioned to the production team.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300">
              Innovative solutions that make a real-world impact
            </p>
          </motion.div>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 border border-sky-500/10 hover:bg-sky-900/20 transition-all group transform hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-cyan-400">
                        {project.title}
                      </h3>
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-cyan-400 transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} />
                    <span>{project.date}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-sky-500/20 to-teal-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Education
            </h2>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                    B.Tech in Computer Science Engineering
                  </h3>
                  <p className="text-xl text-gray-300">
                    BML Munjal University, India
                  </p>
                  <p className="text-lg text-purple-400 font-semibold">
                    CGPA: 9.47
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  <span>2022 - 2026</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">
                    CBSE Class XII
                  </h3>
                  <p className="text-xl text-gray-300">
                    Bharat Mata Sarawati Bal Mandir, Delhi
                  </p>
                  <p className="text-lg text-cyan-400 font-semibold">
                    Aggregate: 83.6%
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  <span>2021 - 2022</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-pink-400 mb-2">
                    CBSE Class X
                  </h3>
                  <p className="text-xl text-gray-300">
                    Model Public School, Rohtak
                  </p>
                  <p className="text-lg text-purple-400 font-semibold">
                    Aggregate: 94.83%
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  <span>2019 - 2020</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Let&lsquo;s Connect
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              I&lsquo;m always excited to discuss new opportunities, innovative
              projects, and potential collaborations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.a
                href="mailto:niharsingla001@gmail.com"
                className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    Email
                  </h3>
                  <p className="text-gray-300">niharsingla001@gmail.com</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    Location
                  </h3>
                  <p className="text-gray-300">Gurugram, Haryana, India</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Quick Links
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  href="https://github.com/nihar004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} className="text-gray-400" />
                  <span className="text-gray-300">GitHub</span>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/nihar-singla001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} className="text-gray-400" />
                  <span className="text-gray-300">LinkedIn</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex justify-center items-center gap-6 mb-6">
              <motion.a
                href="mailto:niharsingla001@gmail.com"
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail
                  size={24}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                />
              </motion.a>
              <motion.a
                href="https://github.com/nihar004"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github
                  size={24}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/nihar-singla001"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin
                  size={24}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                />
              </motion.a>
            </div>

            <motion.p
              className="text-gray-400 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Built with passion using Next.js, Framer Motion, and lots of ☕
            </motion.p>

            <motion.p
              className="text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              © 2025 Nihar Singla. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating particles animation */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-sky-400 to-teal-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Canvas Background Gradient */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="!absolute inset-0"
        >
          <ambientLight intensity={0.2} />
          <SpotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <AnimatedSphere />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
          <fog attach="fog" args={["#000", 5, 15]} />
        </Canvas>
      </div>

      {/* Gradient Mask */}
      <div className="gradient-mask" />
    </div>
  );
};

export default Portfolio;
