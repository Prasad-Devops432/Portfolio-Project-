/* =========================================================
   Portfolio script — Vanilla JS + Three.js
   ========================================================= */
import * as THREE from "three";

/* ---------- DATA ---------- */
const SKILLS = [
  { icon: "fa-server",   title: "IT Support & Systems",
    items: ["Windows 10/11","Linux (Ubuntu, CentOS)","MacOS basics","VMware vSphere","Hyper-V","Service desk & ticketing"] },
  { icon: "fa-cloud",    title: "Cloud & DevOps",
    items: ["AWS (EC2, S3, VPC, IAM, CloudWatch, Lambda)","Microsoft Azure","Git, GitHub, GitLab","Jenkins","GitHub Actions","Docker"] },
  { icon: "fa-shield-halved", title: "Identity & Security",
    items: ["Active Directory","Microsoft Entra ID","Microsoft 365 admin","Group Policy","FortiGate fundamentals","IAM principles"] },
  { icon: "fa-network-wired", title: "Networking",
    items: ["TCP/IP, DNS, DHCP","VPN & Wi-Fi troubleshooting","Firewall configuration","ping, ipconfig, tracert, nslookup"] },
  { icon: "fa-terminal", title: "Scripting & Automation",
    items: ["PowerShell","Bash","Python (in progress)","CI/CD automation"] },
  { icon: "fa-users",    title: "Soft Skills",
    items: ["Clear communication","Customer service mindset","Fast learner","Team collaboration","Documentation","Problem solving"] }
];

const PROJECTS = [
  { title: "Azure AD Hybrid Identity & SSO",
    desc: "Migrated on-premises Active Directory users to Azure AD with Azure AD Connect, configured directory sync and enabled Single Sign-On for seamless, secure access.",
    tech: ["Azure AD","AD Connect","SSO","Hybrid Identity"],
    outcome: "Validated end-to-end auth flow across systems." },
  { title: "AWS Cost Optimization & Monitoring",
    desc: "Identified unexpected costs from unused EBS volumes and unmonitored resources, then implemented SNS email alerts to flag abnormal consumption in real time.",
    tech: ["AWS","EBS","SNS","CloudWatch","FinOps"],
    outcome: "Removed unused resources and reduced ongoing cloud spend." },
  { title: "Azure Load Balancing & Traffic Distribution",
    desc: "Designed and configured an Azure Load Balancer distributing traffic across Linux and Windows VMs, verifying high availability across backend servers.",
    tech: ["Azure","Load Balancer","Linux VMs","Windows VMs"],
    outcome: "Achieved balanced traffic flow and high availability." },
  { title: "CI/CD Website Deployment — Jenkins & Tomcat",
    desc: "Deployed a static site to Apache Tomcat via a Jenkins pipeline integrated with GitHub, automating the full build and deployment workflow.",
    tech: ["Jenkins","GitHub","Apache Tomcat","CI/CD"],
    outcome: "Automated reliable deployments at every commit." },
  { title: "Active Directory User & Access Admin Lab",
    desc: "Built a Windows Server lab to manage AD users, OUs and security groups — performing password resets, account unlocks, provisioning and Group Policy testing.",
    tech: ["Windows Server","Active Directory","Group Policy","OUs"],
    outcome: "Simulated real service desk access scenarios end to end." },
  { title: "FortiGate Firewall Fundamentals Lab",
    desc: "Built foundational hands-on knowledge of FortiGate configuration — interfaces, firewall policies, NAT and access control concepts in a controlled lab.",
    tech: ["FortiGate","Firewall","NAT","Network Security"],
    outcome: "Strengthened firewall troubleshooting awareness." }
];

const EDUCATION = [
  { title: "Graduate Diploma in Cybersecurity and Cloud Management", org: "Yoobee College, New Zealand", date: "Expected 2026" },
  { title: "Certification in Information Technology", org: "Yoobee College", date: "Completed 2025" }
];

const CERTS = [
  { title: "Microsoft Azure Fundamentals (AZ-900)", note: "In Progress" },
  { title: "Cybersecurity: From Beginner to Expert", note: "Udemy · 2025" },
  { title: "Service Desk Job Simulation", note: "Forage · 2026" },
  { title: "IT Support & Helpdesk Fundamentals", note: "LinkedIn Learning" }
];

/* ---------- RENDER ---------- */
const $ = (sel) => document.querySelector(sel);

$("#year").textContent = new Date().getFullYear();

$("#skills-grid").innerHTML = SKILLS.map(s => `
  <article class="skill-card">
    <span class="skill-icon"><i class="fa-solid ${s.icon}"></i></span>
    <h3>${s.title}</h3>
    <div class="tags">${s.items.map(i => `<span class="tag">${i}</span>`).join("")}</div>
  </article>
`).join("");

$("#projects-grid").innerHTML = PROJECTS.map(p => `
  <article class="project">
    <div class="project-head">
      <h3>${p.title}</h3>
      <i class="fa-solid fa-arrow-up-right-from-square"></i>
    </div>
    <p>${p.desc}</p>
    <p class="outcome"><strong>Outcome:</strong> ${p.outcome}</p>
    <div class="tags">${p.tech.map(t => `<span class="tag">${t}</span>`).join("")}</div>
  </article>
`).join("");

$("#education-list").innerHTML = EDUCATION.map(e => `
  <div class="edu-card">
    <span class="edu-icon"><i class="fa-solid fa-graduation-cap"></i></span>
    <div>
      <h3>${e.title}</h3>
      <p class="org">${e.org}</p>
      <p class="date">${e.date}</p>
    </div>
  </div>
`).join("");

$("#certs-list").innerHTML = CERTS.map(c => `
  <div class="cert-card">
    <span class="cert-icon"><i class="fa-solid fa-award"></i></span>
    <div>
      <p style="font-weight:500">${c.title}</p>
      <p class="muted" style="font-size:.875rem">${c.note}</p>
    </div>
  </div>
`).join("");

/* ---------- NAV: scroll style + hamburger ---------- */
const header = $("#header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 12));
const navLinks = $("#nav-links");
$("#hamburger").addEventListener("click", (e) => {
  const open = navLinks.classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ---------- Contact form (frontend mailto) ---------- */
$("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const name = data.get("name"), email = data.get("email"), message = data.get("message");
  const body = encodeURIComponent(`Hi Prasad,\n\n${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:klprasad6@gmail.com?subject=${encodeURIComponent("Portfolio enquiry from " + name)}&body=${body}`;
  $("#form-status").textContent = "Opening your email client…";
  setTimeout(() => { e.target.reset(); $("#form-status").textContent = ""; }, 1500);
});

/* =========================================================
   3D SCENES (Three.js, vanilla)
   ========================================================= */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function makeScene(canvas, cameraPos = [0, 1.2, 5], fov = 50) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
  camera.position.set(...cameraPos);

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  new ResizeObserver(resize).observe(canvas);
  return { renderer, scene, camera };
}

/* ---- BIRDS (hero) ---- */
function initBirds() {
  const canvas = $("#birds-canvas");
  if (!canvas) return;
  const { renderer, scene, camera } = makeScene(canvas, [0, 1, 6], 55);
  scene.add(new THREE.AmbientLight(0xffffff, 0.95));
  const dir = new THREE.DirectionalLight(0xffffff, 0.6);
  dir.position.set(5, 5, 5); scene.add(dir);

  const birds = [];
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
  const wingMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const headMat = new THREE.MeshStandardMaterial({ color: 0x0d0d0d });

  function makeBird(scale = 1) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), bodyMat);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), headMat);
    head.position.set(0.18, 0.06, 0);
    const lw = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 0.55), wingMat);
    const rw = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 0.55), wingMat);
    lw.position.set(0, 0.05, 0.05); rw.position.set(0, 0.05, -0.05);
    g.add(body, head, lw, rw);
    g.scale.setScalar(scale);
    g.userData = { lw, rw };
    return g;
  }

  const configs = [
    { offset: 0,  speed: 0.6,  y: 1.8, scale: 1 },
    { offset: 3,  speed: 0.55, y: 2.4, scale: 0.8 },
    { offset: 6,  speed: 0.7,  y: 1.2, scale: 0.9 },
    { offset: 9,  speed: 0.5,  y: 2.8, scale: 0.7 },
    { offset: 12, speed: 0.65, y: 0.6, scale: 1.1 }
  ];
  configs.forEach(c => { const b = makeBird(c.scale); b.userData.cfg = c; scene.add(b); birds.push(b); });

  const clock = new THREE.Clock();
  function tick() {
    const elapsed = clock.getElapsedTime();
    birds.forEach(b => {
      const c = b.userData.cfg;
      const t = elapsed * c.speed + c.offset;
      const x = ((t * 1.4) % 18) - 9;
      b.position.set(x, c.y + Math.sin(t * 1.2) * 0.4, -2 + Math.cos(t * 0.4) * 1.5);
      b.rotation.y = Math.PI / 2 + Math.sin(t * 0.3) * 0.1;
      const flap = Math.sin(t * 8) * 0.7;
      b.userData.lw.rotation.z = flap;
      b.userData.rw.rotation.z = -flap;
    });
    renderer.render(scene, camera);
    if (!reduceMotion) requestAnimationFrame(tick);
  }
  tick();
}

/* ---- HORSE (projects) ---- */
function initHorse() {
  const canvas = $("#horse-canvas");
  if (!canvas) return;
  const { renderer, scene, camera } = makeScene(canvas, [0, 1.2, 4], 50);
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(3, 5, 2); scene.add(dir);

  // sun
  const sun = new THREE.Mesh(new THREE.CircleGeometry(0.6, 32), new THREE.MeshBasicMaterial({ color: 0xffd166 }));
  sun.position.set(-2.5, 2.4, -3); scene.add(sun);

  // ground
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial({ color: 0x6a8f4a }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -0.05; scene.add(ground);

  // horse
  const horse = new THREE.Group();
  horse.position.set(0, -0.3, 0); horse.rotation.y = -0.3;
  const dark = new THREE.MeshStandardMaterial({ color: 0x3a2418, roughness: 0.8 });
  const darker = new THREE.MeshStandardMaterial({ color: 0x2e1c12 });
  const black = new THREE.MeshStandardMaterial({ color: 0x1a0d06 });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.8, 8, 16), dark);
  body.position.y = 0.55; body.rotation.z = Math.PI / 2; horse.add(body);

  const neck = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.45, 6, 12), dark);
  neck.position.set(0.55, 0.85, 0); neck.rotation.z = -0.6 + Math.PI / 2; horse.add(neck);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.22, 0.22), darker);
  head.position.set(0.85, 1.05, 0); head.rotation.z = -0.3; horse.add(head);

  const mane = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.18), black);
  mane.position.set(0.45, 1.1, 0); horse.add(mane);

  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.55, 8), black);
  tail.position.set(-0.55, 0.7, 0); tail.rotation.z = 0.5; horse.add(tail);

  function makeLeg(x, z) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.7, 8), dark);
    leg.position.set(x, 0.2, z); horse.add(leg); return leg;
  }
  const fl = makeLeg(0.35, 0.18), fr = makeLeg(0.35, -0.18),
        bl = makeLeg(-0.35, 0.18), br = makeLeg(-0.35, -0.18);
  scene.add(horse);

  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    horse.position.y = -0.3 + Math.abs(Math.sin(t * 6)) * 0.08;
    horse.rotation.y = -0.3 + Math.sin(t * 0.4) * 0.15;
    const a = Math.sin(t * 8) * 0.6;
    fl.rotation.x = a; br.rotation.x = a; fr.rotation.x = -a; bl.rotation.x = -a;
    renderer.render(scene, camera);
    if (!reduceMotion) requestAnimationFrame(tick);
  }
  tick();
}

/* ---- TORTOISE (skills) ---- */
function initTortoise() {
  const canvas = $("#tortoise-canvas");
  if (!canvas) return;
  const { renderer, scene, camera } = makeScene(canvas, [0, 1.4, 3], 45);
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dir = new THREE.DirectionalLight(0xffffff, 0.9);
  dir.position.set(2, 4, 2); scene.add(dir);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(10, 6), new THREE.MeshStandardMaterial({ color: 0x7aa84a }));
  ground.rotation.x = -Math.PI / 2; scene.add(ground);

  // grass blades
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x4f8a30 });
  for (let i = 0; i < 30; i++) {
    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.2, 4), grassMat);
    blade.position.set((Math.random() - 0.5) * 6, 0.1, (Math.random() - 0.5) * 3);
    scene.add(blade);
  }

  // tortoise
  const t = new THREE.Group();
  const shellTop = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x3a5a2a, roughness: 0.9 })
  );
  shellTop.position.y = 0.25; t.add(shellTop);
  const shellBot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.06, 16),
    new THREE.MeshStandardMaterial({ color: 0x5a4a2a })
  );
  shellBot.position.y = 0.18; t.add(shellBot);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), new THREE.MeshStandardMaterial({ color: 0x7a8a3a }));
  head.position.set(0.55, 0.22, 0); t.add(head);
  [[0.25,0.25],[0.25,-0.25],[-0.25,0.25],[-0.25,-0.25]].forEach(([x,z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.14), new THREE.MeshStandardMaterial({ color: 0x5a6a2a }));
    leg.position.set(x, 0.12, z); t.add(leg);
  });
  t.rotation.y = Math.PI / 2;
  scene.add(t);

  const clock = new THREE.Clock();
  function tick() {
    const e = clock.getElapsedTime();
    t.position.x = ((e * 0.25) % 5) - 2.5;
    t.position.y = Math.sin(e * 4) * 0.02;
    head.position.x = 0.55 + Math.sin(e * 1.5) * 0.05;
    renderer.render(scene, camera);
    if (!reduceMotion) requestAnimationFrame(tick);
  }
  tick();
}

initBirds();
initHorse();
initTortoise();
