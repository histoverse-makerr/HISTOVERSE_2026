document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. SCRIPT HAMBURGER MENU (MOBILE) ---
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            // Pasang / lepas class 'active' untuk membuka menu & mengubah tombol bar
            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Menutup menu otomatis ketika link navigasi diklik
        const links = document.querySelectorAll(".nav-links a");
        links.forEach(link => {
            link.addEventListener("click", function () {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // --- 2. SMOOTH SCROLL (GESER HALUS) ---
    // Diaktifkan pada klik menu navigasi jangkar (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Pastikan link mengarah ke id yang ada di halaman yang sama
            if (targetId !== "#" && document.querySelector(targetId)) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Dikurangi tinggi navbar (70px)
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. ANIMASI SCROLL SEDERHANA ---
    // Memunculkan section saat di-scroll ke bawah
    const animatedElements = document.querySelectorAll('.scroll-ani');

    function checkScroll() {
        const triggerBottom = (window.innerHeight / 5) * 4; // Ambang batas picu muncul

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('appear');
            }
        });
    }

    // Jalankan saat pertama dimuat dan setiap kali di-scroll
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Jalankan sekali di awal

    // --- 4. PENANGANAN GAMBAR GAGAL DIMUAT (FALLBACK) ---
    // Jika link gambar dari ImageBB rusak/tidak diakses, cadangan teks/abu-abu akan otomatis aktif
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            // Sembunyikan gambar asli yang rusak
            this.style.display = 'none';
            // Cari elemen div fallback setelahnya jika ada, kemudian tampilkan
            const fallbackElement = this.nextElementSibling;
            if (fallbackElement && fallbackElement.classList.contains('image-fallback')) {
                fallbackElement.style.display = 'flex';
            } else {
                // Jika elemen tidak tersedia di struktur, buat cadangan darurat instan
                const errSpan = document.createElement('div');
                errSpan.className = 'image-fallback';
                errSpan.style.display = 'flex';
                errSpan.innerText = 'Gambar belum tersedia';
                this.parentNode.insertBefore(errSpan, this);
            }
        });
    });

});