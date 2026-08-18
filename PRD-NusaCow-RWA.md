# PRD — NusaCow: Tokenisasi Sapi sebagai Real World Asset di Solana

**Status:** Draft v0.2
**Pemilik dokumen:** [isi nama]
**Terakhir diperbarui:** 18 Agustus 2026

---

## Ringkasan (untuk dibaca siapa saja, tanpa jargon)

NusaCow adalah aplikasi yang menghubungkan **peternak sapi** yang butuh modal dengan **investor** yang ingin menaruh uang di ternak tanpa harus punya kandang sendiri. Peternak mengajukan sapinya, tim kami memverifikasi sapi itu benar-benar ada dan sehat, lalu sapi tersebut "dipecah" menjadi unit-unit kecil yang bisa dibeli investor mulai dari nominal terjangkau. Investor menerima laporan foto/kondisi sapi secara berkala dan bagi hasil dari keuntungan ternak (misal penjualan susu atau anak sapi). Semua catatan kepemilikan disimpan di blockchain Solana supaya transparan dan tidak bisa diubah sepihak — tapi kepercayaan utamanya tetap datang dari proses verifikasi manusia (tim kurasi dan attestor), bukan cuma dari teknologi.

---

## 1. Latar belakang & masalah

Peternak sapi di Indonesia kesulitan mengakses modal kerja karena ternak sulit dijadikan agunan bank (nilai didiskon jauh, sulit diverifikasi bank). Di sisi lain, investor retail tidak punya akses ke aset ternak sebagai instrumen investasi karena tiket masuknya besar dan tidak likuid.

Tokenisasi RWA memungkinkan sapi direpresentasikan sebagai token digital di blockchain (Solana), sehingga:
- Peternak mendapat akses modal/likuiditas lebih cepat
- Investor bisa memiliki fraksi sapi dengan modal kecil dan berpotensi menerima bagi hasil
- Kepemilikan dan riwayat sapi tercatat transparan dan dapat diverifikasi

## 2. Tujuan produk

1. Membangun platform yang menghubungkan peternak (penyedia aset) dengan investor (penyedia modal) melalui token RWA di Solana.
2. Menjamin setiap token yang beredar punya jaminan hukum dan fisik yang bisa diverifikasi (bukan sekadar klaim on-chain).
3. Menyediakan mekanisme kepatuhan (KYC/whitelist) agar sesuai kerangka regulasi Indonesia (OJK/Bappebti).

## 3. Tujuan yang TIDAK dikejar di fase ini (non-goals)

- Tidak membangun exchange/DEX sendiri untuk trading sekunder di fase MVP — token cukup transferable ke wallet ter-whitelist.
- Tidak mengelola custody dana fiat langsung — pakai payment/on-off ramp partner pihak ketiga berlisensi (mis. penyedia PJP/e-wallet yang sudah punya izin BI, bukan dibangun sendiri).
- Tidak membangun IoT smart collar custom di fase MVP — verifikasi fisik manual dulu.
- Tidak menyediakan asuransi ternak sendiri di fase MVP — hanya menampilkan status sapi diasuransikan pihak ketiga atau tidak, sebagai informasi ke investor.

## 4. Pengguna & peran

| Peran | Deskripsi |
|---|---|
| **Peternak/mitra SPV** | Pemilik legal sapi, mengajukan sapi untuk ditokenisasi |
| **Attestor** | Pihak independen (dokter hewan/auditor) yang memverifikasi kondisi sapi secara berkala dan menandatangani update on-chain |
| **Investor** | Membeli token fraksi kepemilikan sapi, menerima distribusi yield |
| **Admin platform** | Mengelola whitelist KYC, approve peternak/SPV, mengelola parameter global |
| **Tim ops/kurasi** | Meninjau pengajuan sapi sebelum tayang, menangani keluhan/sengketa |

## 5. Model bisnis

| Sumber pendapatan | Mekanisme |
|---|---|
| **Fee originasi** | Persentase dari total dana terkumpul saat sebuah vault sapi baru selesai fully-funded (mis. 2–3%) |
| **Fee manajemen** | Persentase tahunan dari nilai aset yang dikelola platform (mis. 1–2%/tahun), dipotong dari yield sebelum didistribusikan |
| **Spread distribusi yield** | Potongan kecil saat bagi hasil disalurkan ke investor |

**Mekanisme harga & minimum investasi (perlu diputuskan sebelum coding vault):**
- Harga per token ditentukan di awal saat vault dibuka: `harga_total_vault / total_supply_token`
- Minimum pembelian: [isi — misal 1 token atau nominal minimum Rp X]
- Model harga: fixed per vault (bukan mengambang seperti bursa), supaya sederhana di MVP

## 6. Ruang lingkup (scope) — dipecah 3 program on-chain

Detail arsitektur ada di diagram sebelumnya (peternakan/SPV → attestor → 3 program Solana → investor).

### 6.1 Program registry (fase 1 — dikerjakan duluan)
Representasi setiap sapi/batch sebagai akun on-chain (PDA), berisi metadata dan riwayat atestasi.

**User stories:**
- Sebagai SPV, saya ingin mendaftarkan sapi baru dengan data dasarnya, supaya sapi saya bisa mulai proses tokenisasi.
- Sebagai attestor, saya ingin mencatat bukti verifikasi kondisi sapi secara berkala, supaya investor punya data terkini yang bisa dipercaya.
- Sebagai investor, saya ingin melihat riwayat verifikasi sebuah sapi sebelum membeli, supaya saya yakin uang saya aman.

**Fungsional:**
- Admin/SPV bisa mendaftarkan sapi baru (`register_cattle`)
- Attestor yang berwenang bisa update kondisi sapi (`update_attestation`)
- Status sapi bisa diubah: aktif, terjual, mati, ditarik dari program (`update_status`)
- Data historis atestasi bisa diaudit siapa pun (read-only, on-chain)

### 6.2 Program compliance (fase 2)
Whitelist KYC berbasis Token-2022 Transfer Hook — membatasi transfer token vault hanya ke wallet yang lolos verifikasi.

**User stories:**
- Sebagai admin, saya ingin hanya wallet yang sudah KYC yang bisa memegang token, supaya platform patuh regulasi.
- Sebagai investor, saya ingin proses KYC saya sekali saja berlaku untuk semua vault, supaya tidak berulang-ulang.

**Fungsional:**
- Admin menambah/mencabut wallet dari whitelist
- Transfer token vault otomatis ditolak jika wallet tujuan tidak ter-whitelist

### 6.3 Program vault/fund (fase 3 — paling kompleks, dikerjakan terakhir)
Fraksionalisasi kepemilikan sapi ke token SPL dan distribusi yield ke pemegang token.

**User stories:**
- Sebagai investor, saya ingin membeli sebagian kecil dari kumpulan sapi, supaya saya bisa mulai investasi dengan modal kecil.
- Sebagai investor, saya ingin menerima bagi hasil secara otomatis dan proporsional, supaya saya tidak perlu klaim manual.
- Sebagai peternak, saya ingin dana investor cair begitu vault penuh, supaya saya bisa segera pakai modalnya.

**Fungsional:**
- Membuka fund/vault yang menaungi kumpulan sapi (referensi ke akun registry)
- Investor subscribe (beli token vault) dengan cap total suplai
- Distribusi yield pro-rata ke pemegang token (dari hasil penjualan susu/anak sapi/dsb)
- Mekanisme redeem/exit (jika ada)

## 7. Alur aplikasi (UX, di luar smart contract)

Ini lapisan yang membuat pengguna percaya — bukan cuma catatan on-chain.

**Sisi peternak:**
1. Isi form pengajuan sapi (foto, dokumen kepemilikan, lokasi kandang, riwayat kesehatan)
2. Masuk antrian review tim ops — tidak otomatis tayang
3. Setelah disetujui, sapi masuk katalog dan mulai proses tokenisasi
4. Dashboard peternak: status pengajuan, dana yang sudah cair, jadwal kunjungan attestor

**Sisi investor:**
1. Browse katalog vault (foto sapi, lokasi, proyeksi yield, riwayat attestor)
2. Daftar & KYC (sekali saja, berlaku untuk semua vault)
3. Beli token di sebuah vault (minimum sesuai kebijakan)
4. Dashboard portofolio: token yang dimiliki, update kondisi sapi berkala, riwayat yield diterima

**Sisi admin/attestor:**
1. Dashboard approve pengajuan peternak & kelola whitelist KYC
2. Attestor upload bukti verifikasi (foto/video/dokumen) → tersimpan off-chain (IPFS/Arweave), hash-nya dikunci on-chain

## 8. Legal & kepatuhan (perlu ditindaklanjuti sebelum go-live, bukan hanya teknis)

- **Klasifikasi token:** token yang menjanjikan bagi hasil kemungkinan besar termasuk kategori efek/surat berharga di bawah UU Pasar Modal dan aturan OJK/Bappebti (khususnya PP 49/2023 & POJK terkait aset kripto/urun dana) — wajib konsultasi hukum sebelum token dijual ke publik.
- **Struktur SPV:** perlu badan hukum (PT/koperasi) yang secara sah memegang kepemilikan sapi dan bertanggung jawab ke investor jika terjadi sengketa — token di wallet investor tidak otomatis punya kekuatan hukum tanpa perjanjian yang mengikat SPV ini.
- **Perlindungan data pribadi:** data KYC investor & peternak tunduk UU PDP — perlu kebijakan penyimpanan, retensi, dan consent yang jelas.
- **Penyelesaian sengketa:** perlu mekanisme jika sapi mati/hilang, investor komplain, atau peternak wanprestasi — idealnya diatur dalam perjanjian yang ditandatangani sebelum investor membeli token (bukan hanya smart contract).

## 9. Dukungan pelanggan & penanganan risiko operasional

- Kanal pengaduan investor (mis. jika update atestasi telat atau sapi dilaporkan bermasalah)
- SOP jika sapi mati/hilang: attestor wajib lapor dalam [isi] hari, status di-update, opsi klaim asuransi (jika sapi diasuransikan pihak ketiga)
- Status asuransi ditampilkan sebagai informasi transparan per vault (bukan dijamin platform)

## 10. Persyaratan non-fungsional

- **Keamanan:** semua instruksi sensitif (mint, update atestasi, whitelist) harus punya validasi signer/authority ketat; audit smart contract sebelum mainnet.
- **Kepatuhan hukum:** lihat bagian 8 — ini blocker peluncuran, bukan sekadar catatan risiko.
- **Auditability:** semua perubahan status/atestasi harus tercatat permanen dan bisa ditelusuri.
- **Biaya transaksi:** manfaatkan biaya rendah Solana untuk update atestasi rutin tanpa membebani margin.

## 11. Model data inti (ringkas)

**CattleAsset (PDA, program registry)**
- `id: u64` — ID unik sapi/batch
- `spv_owner: Pubkey` — wallet SPV pemilik legal
- `breed: String`
- `birth_date: i64`
- `status: enum { Active, Sold, Deceased, Withdrawn }`
- `last_attestor: Pubkey`
- `last_attestation_hash: [u8;32]` — hash bukti (foto/dokumen off-chain)
- `last_attestation_ts: i64`

**VaultConfig (program vault, fase 3)**
- `cattle_refs: Vec<Pubkey>` — referensi ke akun CattleAsset
- `total_supply: u64`
- `token_mint: Pubkey`
- `price_per_token: u64`
- `min_purchase: u64`

## 12. Metrik keberhasilan (fase MVP)

- Jumlah sapi terdaftar di registry
- Jumlah wallet ter-whitelist (investor terverifikasi)
- Total nilai token vault yang berhasil di-subscribe
- Frekuensi update atestasi tepat waktu (SLA attestor)
- Waktu rata-rata pencairan dana ke peternak setelah vault penuh

## 13. Risiko utama

| Risiko | Mitigasi |
|---|---|
| Data fisik sapi dipalsukan/tidak sinkron dengan on-chain | Attestor independen + audit acak + reputasi attestor |
| Token dikategorikan sebagai efek ilegal tanpa izin | Konsultasi hukum & OJK/Bappebti sebelum mainnet |
| Sapi mati/hilang tanpa update status | SLA atestasi rutin + opsi asuransi ternak pihak ketiga |
| Smart contract bug/exploit | Audit pihak ketiga sebelum mainnet, mulai di devnet/testnet |
| Kebocoran data KYC | Enkripsi data sensitif, kepatuhan UU PDP, akses dibatasi role |

## 14. Roadmap teknis (dengan estimasi durasi)

| Fase | Deliverable | Estimasi |
|---|---|---|
| Fase 1 | Program registry (devnet), test script register & update atestasi | 2–3 minggu |
| Fase 2 | Program compliance (whitelist + Token-2022 transfer hook) | 1–2 minggu |
| Fase 3 | Program vault (fraksionalisasi + distribusi yield), integrasi 3 program | 3–4 minggu |
| Fase 4 | Frontend investor + admin dashboard | 3–4 minggu |
| Fase 5 | Audit keamanan smart contract + review legal | 2–4 minggu (paralel dgn fase 4) |
| Fase 6 | Migrasi mainnet + onboarding peternak/investor pertama | [isi] |

## 15. Pertanyaan terbuka

- Bagaimana mekanisme legal SPV memegang sapi secara sah (perlu badan hukum apa)?
- Siapa yang berperan sebagai attestor resmi — internal tim atau pihak ketiga bersertifikat?
- Apakah token akan bisa diperdagangkan di secondary market publik atau tertutup (private placement)?
- Model yield: bagi hasil tetap (fixed) atau berdasarkan kinerja peternakan (variable)?
- Siapa penyedia on/off-ramp fiat yang akan diajak kerja sama?
- Berapa minimum investasi dan harga per token yang realistis untuk target pasar Indonesia?

## 16. Glosarium

| Istilah | Arti sederhana |
|---|---|
| **RWA (Real World Asset)** | Aset dunia nyata (di sini: sapi) yang direpresentasikan sebagai token digital |
| **Tokenisasi** | Proses mengubah kepemilikan suatu aset menjadi token digital yang bisa dipecah dan diperdagangkan |
| **On-chain** | Data yang tersimpan langsung di blockchain, transparan dan tidak bisa diubah sepihak |
| **Off-chain** | Data yang disimpan di luar blockchain (mis. foto sapi di server/IPFS), hanya "sidik jari"-nya (hash) yang dikunci on-chain |
| **PDA (Program Derived Address)** | Akun data di Solana yang dikendalikan oleh program, bukan wallet pribadi |
| **SPL Token** | Standar token di Solana (setara "ERC-20" di Ethereum) |
| **Attestor** | Pihak independen yang memverifikasi kondisi sapi secara berkala |
| **Whitelist / KYC** | Daftar wallet yang sudah diverifikasi identitasnya dan boleh transaksi |
| **Vault** | Kumpulan sapi yang "dibungkus" jadi satu produk investasi, dipecah jadi token |
| **Yield** | Bagi hasil/keuntungan yang diterima investor dari hasil ternak |
| **SPV (Special Purpose Vehicle)** | Badan hukum yang dibentuk khusus untuk memegang kepemilikan aset (sapi) secara sah |
