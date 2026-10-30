
# Portofolio Pribadi - Muhammad Akbar

Website portofolio pribadi satu halaman (*single page*) yang modern, bersih, responsif, dan elegan. Dibuat khusus untuk kebutuhan melamar kerja, *freelance*, dan membangun *personal branding* sebagai **Junior Web Developer & Administrasi**.

Didesain agar perekrut, klien, atau mitra kolaborasi dapat memahami identitas, keahlian, dan melihat proyek nyata Anda dalam waktu kurang dari **30 detik**.

---

## 🌟 Fitur Utama

- **100% Pure HTML5 & CSS3**: Tanpa framework berat (Bootstrap/Tailwind) dan tanpa pustaka CSS eksternal. Kode sangat ringan dan cepat diakses (*lightning fast*).
- **Aksen Soft Brown yang Elegan**: Perpaduan warna cokelat lembut (*warm soft brown*) dengan warna netral krem dan espresso, menciptakan estetika modern, profesional, dan berkarakter.
- **Dukungan Dark Mode & Light Mode**:
  - Mengikuti preferensi tema perangkat (*prefers-color-scheme*).
  - Dilengkapi tombol toggle manual dengan penyimpanan preferensi di *localStorage*.
  - Kontras warna memenuhi standar aksesibilitas **WCAG AA**.
- **Mobile-First & Responsif Penuh**: Tampilan rapi dan proporsional di semua resolusi layar (ponsel 360px, tablet 768px, laptop 1024px, hingga desktop 1440px+). Area sentuh tombol minimal 44x44px.
- **Tipografi Fluid**: Menggunakan fungsi CSS `clamp()` untuk skala teks dan jarak (*spacing*) yang mulus. Font: **Plus Jakarta Sans** (Heading) & **Inter** (Body).
- **Progresif & Ramah Aksesibilitas**:
  - Tetap terbaca dengan sempurna meskipun JavaScript dimatikan (*zero flash of hidden content*).
  - Menghormati pengaturan pengguna `prefers-reduced-motion`.
  - Struktur HTML semantik lengkap (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Pola Portofolio Masalah &rarr; Solusi &rarr; Hasil**: Setiap kartu proyek dirancang untuk langsung meyakinkan perekrut mengenai dampak nyata dari karya Anda.

---

## 📁 Struktur Berkas

```text
portofolio/
├── index.html                  # Dokumen utama (struktur semantik & konten)
├── README.md                   # Petunjuk lengkap kustomisasi & panduan proyek
└── assets/
    ├── css/
    │   └── style.css           # Desain murni CSS3, variabel tema & layout responsif
    ├── js/
    │   └── main.js             # Vanilla JS: menu mobile, tema dark/light, animasi scroll
    └── img/
        ├── avatar-placeholder.svg   # Placeholder ilustrasi profil
        ├── project-1.svg            # Mockup proyek katalog UMKM Batik
        ├── project-2.svg            # Mockup proyek sistem administrasi & inventaris
        └── project-3.svg            # Mockup proyek landing page creator studio
```

---

## 🚀 Cara Menjalankan Website

Website ini berbasis *static front-end* murni, sehingga tidak memerlukan instalasi dependensi `npm` atau kompilasi apa pun.

### Opsi 1: Buka Langsung di Browser
Cukup klik ganda (*double-click*) file `index.html`, atau klik kanan &rarr; **Open with** &rarr; pilih browser favorit Anda (Google Chrome, Firefox, Edge, atau Safari).

### Opsi 2: Menggunakan Laragon / Local Server
Karena folder ini berada di direktori Laragon (`c:\laragon\www\portofolio`):
1. Buka aplikasi **Laragon**.
2. Klik tombol **Start All**.
3. Buka browser dan kunjungi: `http://localhost/portofolio` atau `http://portofolio.test`.

---

## ✏️ Panduan Kustomisasi Cepat

Semua bagian yang perlu Anda ganti telah ditandai dengan komentar:
```html
<!-- GANTI: ... -->
```
Anda cukup menekan tombol `Ctrl + F` (atau `Cmd + F`) di editor kode (VS Code / Notepad++) lalu ketik `GANTI:` untuk melompat langsung ke teks yang ingin diubah.

---

### 1. Mengganti Konten & Informasi Pribadi (`index.html`)

| Bagian | Elemen | Deskripsi yang Perlu Diubah |
| :--- | :--- | :--- |
| **SEO / Meta** | `<title>`, `<meta name="description">` | Nama Anda dan ringkasan profil |
| **Navbar** | `.logo__text`, `.logo__badge` | Inisial dan nama pendek Anda |
| **Hero** | `.hero__name`, `.hero__role`, `.hero__tagline` | Nama lengkap, posisi impian, dan kalimat perkenalan |
| **Tentang** | `.about__lead`, `.about__text`, `.about__meta-grid` | Cerita latar belakang pendidikan, domisili, dan minat |
| **Keahlian** | `.badge-list` | Tambah atau kurangi keahlian/software yang Anda kuasai |
| **Proyek** | `.project-card` | Judul karya, poin Masalah-Solusi-Hasil, tag teknologi, dan tautan demo/repo |
| **Pengalaman** | `.timeline__card` | Riwayat magang, kuliah kerja nyata (KKN), organisasi, atau asisten lab |
| **Kontak** | Tautan Email, WhatsApp, LinkedIn, GitHub, Instagram | Ubah dengan kontak aktif dan username media sosial Anda |

---

### 2. Mengganti Foto Profil & Gambar Proyek

1. **Foto Profil**:
   - Siapkan foto terbaik Anda berformat `.jpg`, `.png`, atau `.webp` (rasio kotak/1:1, ukuran disarankan 600x600px).
   - Simpan foto tersebut ke dalam folder: `assets/img/profil.jpg`.
   - Buka `index.html` pada bagian **Hero Section**, lalu ubah:
     ```html
     <!-- GANTI src berikut: -->
     <img src="assets/img/profil.jpg" alt="Potret profesional Muhammad Akbar" class="hero__img" width="380" height="380">
     ```

2. **Screenshot Proyek**:
   - Ambil screenshot antarmuka website/aplikasi Anda (rasio 16:10 atau 16:9, resolusi disarankan 1200x750px).
   - Simpan ke `assets/img/proyek-1.png`, `assets/img/proyek-2.png`, dll.
   - Ganti atribut `src="assets/img/proyek-1.png"` di dalam masing-masing kartu proyek.

---

### 3. Mengganti Tautan Unduh CV (PDF)

1. Simpan berkas CV Anda berformat PDF ke folder dokumen, misalnya: `assets/doc/CV_Muhammad_Akbar.pdf`.
2. Buka `index.html`, temukan tombol **Unduh CV** di bagian hero:
   ```html
   <a href="assets/doc/CV_Muhammad_Akbar.pdf" class="btn btn--secondary" download>
   ```

---

### 4. Mengganti Palet Warna (`assets/css/style.css`)

Semua warna diatur melalui **CSS Variables** di baris awal `assets/css/style.css`:

```css
:root {
  /* Ganti kode hex berikut sesuai selera Anda */
  --color-primary: #845233;         /* Warna aksen utama (Soft Brown) */
  --color-primary-hover: #6d4125;   /* Warna saat tombol disorot */
  --color-primary-light: #eedfcb;   /* Warna latar lembut untuk badge */
  
  --color-bg: #faf8f5;              /* Warna latar belakang halaman (Light) */
  --color-surface: #ffffff;         /* Warna kartu (Light) */
}

[data-theme="dark"] {
  --color-primary: #c69c6d;         /* Aksen cokelat muda untuk mode gelap */
  --color-bg: #141210;              /* Latar belakang gelap */
  --color-surface: #1e1a16;         /* Kartu mode gelap */
}
```

*Contoh inspirasi warna lain jika ingin berganti nuansa:*
- **Navy Minimalist**: `--color-primary: #1e3a8a;`
- **Forest Emerald**: `--color-primary: #166534;`
- **Terracotta Warm**: `--color-primary: #c2410c;`

---

### 5. Mengganti Font Google Fonts

Saat ini portofolio menggunakan **Plus Jakarta Sans** (Heading) dan **Inter** (Teks isi):

1. Pilih font di [Google Fonts](https://fonts.google.com/).
2. Salin tag `<link>` ke dalam `<head>` file `index.html`.
3. Buka `assets/css/style.css`, lalu ubah variabel tipografi:
   ```css
   :root {
     --font-heading: 'Poppins', sans-serif;
     --font-body: 'Inter', sans-serif;
   }
   ```

---

### 6. Menghubungkan Formulir Kontak ke Backend (PHP / Formspree)

Formulir saat ini sudah memiliki UI dan validasi HTML5. Untuk menerima pesan langsung:

#### Opsi A: Menggunakan PHP (di Laragon)
1. Buat file `kirim.php` di dalam folder proyek.
2. Di `index.html`, ubah tag pembuka `<form>`:
   ```html
   <form action="kirim.php" method="POST" class="contact-form" id="contact-form">
   ```
3. Di dalam `kirim.php`, ambil data `$_POST['nama']`, `$_POST['email']`, `$_POST['subjek']`, dan `$_POST['pesan']` menggunakan fungsi `mail()` bawaan PHP atau pustaka PHPMailer.

#### Opsi B: Menggunakan Layanan Tanpa Server (Formspree / Web3Forms)
Daftar gratis di [formspree.io](https://formspree.io/) atau [web3forms.com](https://web3forms.com/), lalu masukkan tautan endpoint Anda:
```html
<form action="https://formspree.io/f/KODE_UNIK_ANDA" method="POST" class="contact-form">
```

---

## 🛠️ Standar Kode & Kualitas

- **HTML5 Validator Ready**: Struktur semantik tanpa error tag bersarang.
- **BEM Naming Convention**: Penamaan class terstruktur seperti `.hero__cta-group`, `.btn--primary`, `.timeline__card`.
- **Zero Horizontal Overflow**: Dijamin tidak ada scrollbar mendatar yang merusak tampilan di perangkat seluler mana pun.
- **SEO & Social Share Ready**: Dilengkapi tag Open Graph (`og:title`, `og:image`, `og:description`) agar tampil menawan saat tautan dibagikan ke WhatsApp, LinkedIn, atau Twitter.

---

*Selamat menggunakan dan semoga sukses meraih peluang karier impian Anda!* 🚀
=======
# portofolio
Personal Portfolio - Muhammad Akbar
