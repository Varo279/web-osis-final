# 📝 Cara Mengedit Website OSIS

Panduan lengkap untuk mengedit konten website OSIS dengan mudah menggunakan file JSON dan gambar.

## 📂 Struktur File

```
src/data/
├── members.json      # Data anggota OSIS
├── programs.json     # Data program kerja (detail lengkap)
└── events.json       # Data kegiatan (detail lengkap)

public/images/
├── members/          # Folder foto anggota
├── programs/         # Folder foto program
└── events/           # Folder foto kegiatan
```

## 📚 Format Program Kerja (`programs.json`)

Setiap program memiliki halaman detailnya sendiri di `/program/{id}`

```json
{
  "id": "akademik",
  "title": "Akademik",
  "description": "Deskripsi singkat...",
  "icon": "BookOpen",
  "image": "/images/programs/akademik.jpg",
  "tujuan": "Tujuan program...",
  "sasaran": ["Target 1", "Target 2"],
  "kegiatan": [
    {
      "nama": "Nama Kegiatan",
      "deskripsi": "Deskripsi kegiatan",
      "jadwal": "Waktu pelaksanaan"
    }
  ],
  "pencapaian": ["Pencapaian 1", "Pencapaian 2"]
}
```

**Icon tersedia:** BookOpen, Trophy, Palette, Users, Newspaper, Heart

## 🎉 Format Event (`events.json`)

Setiap event memiliki halaman detailnya sendiri di `/event/{id}`

```json
{
  "id": "mpls-2024",
  "title": "Judul Event",
  "date": "15-17 Juli 2024",
  "location": "Lokasi",
  "participants": "320 Siswa",
  "type": "Orientasi",
  "description": "Deskripsi singkat...",
  "image": "/images/events/mpls.jpg",
  "tujuan": "Tujuan event...",
  "rangkaian_kegiatan": [
    {
      "hari": "Hari 1",
      "tema": "Tema",
      "kegiatan": ["Kegiatan 1", "Kegiatan 2"]
    }
  ],
  "hasil_kegiatan": ["Hasil 1", "Hasil 2"]
}
```

**Type tersedia:** Orientasi, Perayaan, Pelatihan, Sosial, Seni

## 📝 Field Opsional Event

- `donasi_terkumpul`: Array daftar donasi
- `testimoni`: Array objek dengan `nama`, `jabatan`, `testimoni`
- `penghargaan`: Array objek dengan `kategori`, `pemenang`
- `fakta_menarik`: Array fakta menarik
- `rencana_tindak_lanjut`: Array rencana lanjutan

## ⚠️ Penting

1. ID harus unik dan lowercase (contoh: "akademik", "mpls-2024")
2. Path gambar: `/images/...` bukan `public/images/...`
3. Validasi JSON di https://jsonlint.com/
4. Backup sebelum edit besar

## 🎨 Kustomisasi Tema

Website dilengkapi dengan sistem tema yang dapat dikustomisasi:

### Cara Mengubah Tema:
1. Klik tombol **Palette** di pojok kanan bawah layar
2. Pilih salah satu tema preset yang tersedia:
   - Default Blue
   - Ocean Breeze
   - Sunset Orange
   - Forest Green
   - Royal Purple

### Membuat Tema Custom:
1. Buka **Theme Customizer** (tombol Palette)
2. Pilih tab "Buat Custom"
3. Sesuaikan warna untuk setiap elemen:
   - Primary: Warna utama (tombol, link)
   - Secondary: Warna sekunder
   - Accent: Warna aksen
   - Background: Warna latar belakang
   - Foreground: Warna teks utama
   - Dan lainnya...
4. Klik "Simpan Tema" untuk menyimpan
5. Tema akan tersimpan di browser secara otomatis

**Note:** Tema yang dipilih akan tersimpan secara permanen di browser pengguna.

## 👥 Format Anggota OSIS (`members.json`)

Setiap anggota memiliki halaman detailnya sendiri di `/member/{nama-anggota}`

```json
{
  "position": "Ketua OSIS",
  "name": "Ahmad Rizki Pratama",
  "class": "Kelas XII IPA 1",
  "image": "/images/members/member1.jpg"
}
```

### Halaman Detail Anggota
Halaman detail anggota menampilkan:
- Profil lengkap anggota
- Tanggung jawab dan tugas
- Prestasi dan penghargaan
- Program yang diikuti

## 📋 Sistem Pagination

Website secara otomatis menampilkan tombol "Lihat Semua" jika:
- Jumlah program kerja > 10 item
- Jumlah kegiatan > 10 item  
- Jumlah anggota > 10 item

Tombol ini akan membawa ke halaman khusus yang menampilkan semua item.

Lihat `src/data/programs.json`, `src/data/events.json`, dan `src/data/members.json` untuk contoh lengkap!