/**
 * MHAZKHA PORTFOLIO - CORE JAVASCRIPT APP
 * Single Page Application router, interactive modals, navigation pill & filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const menuTrigger = document.getElementById('menuTrigger');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const menuNavLinks = document.querySelectorAll('.menu-nav-link');
  
  const views = document.querySelectorAll('.spa-view');
  
  // Project Modal
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalContent');
  
  // Hire Modal
  const menuHireBtn = document.getElementById('menuHireBtn');
  const hireModal = document.getElementById('hireModal');
  const hireBackdrop = document.getElementById('hireBackdrop');
  const hireCloseBtn = document.getElementById('hireCloseBtn');

  // Filter Buttons
  const projectFilterBtns = document.querySelectorAll('#projectFilters .filter-btn');
  const projectCards = document.querySelectorAll('.project-card-full');
  
  const logFilterBtns = document.querySelectorAll('#logFilters .filter-btn');
  const logCards = document.querySelectorAll('.log-card');

  // Project Detailed Data Store
  const projectsData = {
    'portal': {
      title: 'SMKN 1 Purbalingga Digital Portal System',
      category: 'Web Application & School Management',
      date: '2024 / 08',
      tags: ['PHP', 'MySQL', 'JavaScript', 'Tailwind/CSS', 'Responsive Web'],
      desc: 'Platform sistem informasi sekolah terpadu yang dirancang untuk mempermudah distribusi materi pembelajaran, absensi digital siswa, dan rekap nilai oleh guru. Dibangun dengan fokus pada kecepatan respon, keamanan autentikasi pengguna, dan tampilan antarmuka yang ramah pengguna.',
      highlights: [
        'Autentikasi role-based (Admin, Guru, Siswa)',
        'Dashboard responsif dengan grafik statistik aktivitas',
        'Sistem unduh materi dan unggah tugas secara terstruktur'
      ]
    },
    'ml-classifier': {
      title: 'Fruit Image Classifier (Lemon & Jeruk)',
      category: 'Machine Learning & Computer Vision',
      date: '2024 / 06',
      tags: ['Python', 'OpenCV', 'TensorFlow/Keras', 'CNN', 'Data Augmentation'],
      desc: 'Model kecerdasan buatan berbasis Convolutional Neural Network (CNN) untuk mengklasifikasikan tingkat kematangan dan jenis buah (Lemon & Jeruk). Dilengkapi dengan preprocessing augmentasi gambar dan visualisasi confidence score prediksi.',
      highlights: [
        'Akurasi pengujian mencapai >92% pada dataset uji',
        'Preprocessing otomatis (resize, normalization, grayscale/RGB filters)',
        'Eksplorasi deployment GUI menggunakan Python Tkinter/Streamlit'
      ]
    },
    'tka-predict': {
      title: 'Prediksi Nilai TKA (Tes Kemampuan Akademik)',
      category: 'Data Science & Predictive Analytics',
      date: '2024 / 04',
      tags: ['Python', 'Jupyter Notebook', 'Pandas', 'Scikit-Learn', 'Matplotlib'],
      desc: 'Eksplorasi data science untuk menganalisis korelasi antara pola belajar, frekuensi latihan soal, dan hasil skor Tes Kemampuan Akademik siswa. Menggunakan regresi linear dan Random Forest untuk menghasilkan estimasi nilai.',
      highlights: [
        'Visualisasi korelasi fitur dan heatmap matriks',
        'Penanganan missing values dan feature scaling',
        'Notebook terstruktur dengan penjelasan tiap tahapan analisa'
      ]
    },
    'pjbl-semarang': {
      title: 'PJBL Web Semarang Tourism & City Guide',
      category: 'Frontend Web Development',
      date: '2023 / 11',
      tags: ['React', 'CSS3', 'Figma', 'Interactive Maps', 'UI/UX'],
      desc: 'Proyek Pembelajaran Berbasis Proyek (PJBL) yang menghadirkan web portal pariwisata kota Semarang. Menampilkan panduan destinasi kuliner, sejarah Lawang Sewu, dan event kebudayaan lokal dengan micro-animations interaktif.',
      highlights: [
        'Desain UI modern yang dirancang terlebih dahulu di Figma',
        'Komponen modular menggunakan React',
        'Optimasi skor performa Lighthouse dan responsivitas mobile'
      ]
    },
    '3d-assets': {
      title: 'Cyber Aesthetic 3D Assets & Environment',
      category: '3D Art & Visual Assets',
      date: '2024 / 01',
      tags: ['Blender', 'Clay Render', 'Low-Poly', 'Cyberpunk', 'Lighting'],
      desc: 'Koleksi aset 3D bertema cyber tech low-poly yang dibuat dengan Blender. Mencakup perlengkapan komputer masa depan, setup meja kerja developer, dan lingkungan isometrik cyberpunk yang siap digunakan sebagai aset grafis web interaktif.',
      highlights: [
        'Optimasi jumlah poligon untuk performa render cepat',
        'Eksperimen pencahayaan neon ambient (Emission Shaders)',
        'Eksplorasi integrasi 3D ke web menggunakan Three.js'
      ]
    }
  };

  // ================= 1. VIEW ROUTER (SPA) =================
  function switchView(targetViewId) {
    views.forEach(view => {
      view.classList.remove('active');
    });

    const targetSection = document.getElementById(`view-${targetViewId}`);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Default to home
      document.getElementById('view-home').classList.add('active');
    }

    // Update active state on menu links
    menuNavLinks.forEach(link => {
      if (link.getAttribute('data-view') === targetViewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Handle URL Hash Navigation
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '') || 'home';
    switchView(hash);
  }

  window.addEventListener('hashchange', handleHashChange);
  // Initial call
  handleHashChange();

  // ================= 2. MENU OVERLAY TOGGLE =================
  function openMenu() {
    menuOverlay.classList.add('active');
    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOverlay.classList.remove('active');
    menuOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  menuTrigger.addEventListener('click', openMenu);
  menuCloseBtn.addEventListener('click', closeMenu);
  menuBackdrop.addEventListener('click', closeMenu);

  menuNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetView = link.getAttribute('data-view');
      if (targetView) {
        window.location.hash = targetView;
        closeMenu();
      }
    });
  });

  // ================= 3. PROJECT DETAIL MODAL =================
  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <span class="modal-proj-badge">${data.category} &bull; ${data.date}</span>
      <h2 class="modal-proj-title">${data.title}</h2>
      <p class="modal-proj-desc">${data.desc}</p>
      
      <span class="modal-section-label">Highlight Proyek:</span>
      <ul class="profile-details-list" style="margin-bottom: 1.5rem;">
        ${data.highlights.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <span class="modal-section-label">Teknologi / Platform:</span>
      <div class="modal-tech-list">
        ${data.tags.map(tag => `<span class="tag tag-lang">${tag}</span>`).join('')}
      </div>

      <div style="margin-top: 1.5rem; text-align: right;">
        <a href="https://github.com/Mhazkha" target="_blank" rel="noopener noreferrer" class="btn-hire-pill" style="display: inline-block; text-decoration: none;">
          Lihat Source Code di GitHub &rarr;
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind View buttons (both in Home selected works and Projects view)
  document.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('.btn-view');
    if (viewBtn) {
      const projectId = viewBtn.getAttribute('data-project');
      if (projectId) {
        openProjectModal(projectId);
      }
    }
  });

  modalCloseBtn.addEventListener('click', closeProjectModal);
  modalBackdrop.addEventListener('click', closeProjectModal);

  // ================= 4. HIRE ME MODAL =================
  function openHireModal() {
    closeMenu();
    hireModal.classList.add('active');
    hireModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeHireModal() {
    hireModal.classList.remove('active');
    hireModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (menuHireBtn) {
    menuHireBtn.addEventListener('click', openHireModal);
  }
  hireCloseBtn.addEventListener('click', closeHireModal);
  hireBackdrop.addEventListener('click', closeHireModal);

  // ================= 5. GLOBAL KEYBOARD SHORTCUTS =================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeProjectModal();
      closeHireModal();
    }
  });

  // ================= 6. PROJECTS FILTER LOGIC =================
  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ================= 7. LIFE LOGS FILTER LOGIC =================
  logFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      logFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const logFilter = btn.getAttribute('data-logfilter');

      logCards.forEach(card => {
        const category = card.getAttribute('data-logcategory');
        if (logFilter === 'all' || category === logFilter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
