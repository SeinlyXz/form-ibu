# 🪞 Cermin Karsa - Quiz Application

Aplikasi kuis interaktif untuk mengidentifikasi potensi wirausaha dengan 4 kategori hasil: Inovator, Kreator, Pendidik, dan Pelestari.

## 📋 Fitur

### 1. **Form Biodata**
- Input nama dan nomor HP peserta
- Validasi form yang responsive
- Design yang user-friendly

### 2. **Kuis Interaktif**
- 5 pertanyaan pilihan ganda
- Progress bar untuk tracking kemajuan
- Navigasi maju-mundur
- Tampilan mobile-responsive

### 3. **Hasil Quiz**
- Analisis otomatis berdasarkan jawaban terbanyak
- 4 tipe hasil:
  - 💡 **Inovator** - Pencetus ide dan solusi baru
  - 🎨 **Kreator** - Pembuat karya estetik dan kreatif
  - 📚 **Pendidik** - Pengajar dan motivator
  - 🌿 **Pelestari** - Penjaga budaya dan nilai lokal
- Rincian jawaban detail

### 4. **Rekapitulasi Data**
- Dashboard statistik peserta
- Tabel data lengkap dengan semua submission
- Export data ke CSV
- Filter dan sorting

## 🏗️ Struktur Project (Modular)

```
src/
├── lib/
│   ├── components/
│   │   ├── BiodataForm.svelte      # Form input biodata
│   │   ├── QuizForm.svelte         # Form pertanyaan kuis
│   │   ├── ResultDisplay.svelte    # Tampilan hasil
│   │   └── RekapTable.svelte       # Tabel rekapitulasi
│   ├── data/
│   │   └── questions.ts            # Data pertanyaan kuis
│   ├── types/
│   │   └── quiz.ts                 # TypeScript interfaces
│   └── utils/
│       ├── quizCalculator.ts       # Logic perhitungan hasil
│       └── csvExport.ts            # Utility export CSV
├── routes/
│   ├── +page.svelte                # Halaman utama kuis
│   ├── api/
│   │   └── quiz/
│   │       └── +server.ts          # API endpoint (GET & POST)
│   └── rekap/
│       ├── +page.svelte            # Halaman rekapitulasi
│       └── +page.ts                # Load data untuk rekap
└── app.html
```

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js (v18 atau lebih baru)
- npm atau pnpm

### Instalasi & Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## 📊 API Endpoints

### POST `/api/quiz`
Submit hasil kuis dan simpan ke file JSON.

**Request Body:**
```json
{
  "biodata": {
    "nama": "John Doe",
    "nomorHP": "08123456789"
  },
  "answers": [
    { "questionNo": 1, "answer": "a" },
    { "questionNo": 2, "answer": "b" }
  ],
  "result": {
    "type": "inovator",
    "counts": { "a": 3, "b": 1, "c": 1, "d": 0 }
  },
  "submittedAt": "2025-11-07T10:30:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Submission saved successfully",
  "result": { /* result object */ }
}
```

### GET `/api/quiz`
Ambil semua data submission.

**Response:**
```json
{
  "success": true,
  "submissions": [ /* array of submissions */ ],
  "total": 10
}
```

## 💾 Penyimpanan Data

Data disimpan dalam file JSON di folder `quiz-data/submissions.json` (otomatis dibuat saat submission pertama).

Struktur data:
```json
[
  {
    "biodata": { "nama": "...", "nomorHP": "..." },
    "answers": [ /* ... */ ],
    "result": { /* ... */ },
    "submittedAt": "2025-11-07T10:30:00.000Z"
  }
]
```

## 📥 Export CSV

Fitur export CSV tersedia di halaman `/rekap`:
- Format: UTF-8 with BOM (kompatibel dengan Excel)
- Kolom: No, Nama, Nomor HP, Hasil, Jawaban A-D, Waktu Submit
- Nama file: `rekap-kuis-cermin-karsa-YYYY-MM-DD.csv`

## 🎨 Teknologi

- **Framework**: SvelteKit 2.0+
- **Language**: TypeScript
- **Styling**: Vanilla CSS (scoped)
- **Runtime**: Node.js

## 📱 Responsive Design

- Desktop-first design
- Optimized untuk layar desktop (target user)
- Mobile-friendly untuk akses data rekap

## 🔒 Security Notes

- Input validation untuk form biodata
- Server-side validation untuk API endpoints
- CSV export dengan BOM untuk encoding yang benar

## 📝 License

Private project for internal use.

---

**Developed with ❤️ for Cermin Karsa Initiative**
