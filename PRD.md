# PRD — NusaCow: Tokenisasi Sapi sebagai Real World Asset di Solana

**Status:** Draft v0.1  
**Pemilik dokumen:** [isi nama]  
**Terakhir diperbarui:** 16 Agustus 2026  

---

## 1. Latar belakang & masalah

Peternak sapi di Indonesia kesulitan mengakses modal kerja karena ternak sulit dijadikan agunan bank (nilai didiskon jauh, sulit diverifikasi bank). Di sisi lain, investor retail tidak punya akses ke aset ternak sebagai instrumen investasi karena tiket masuknya besar dan tidak likuid.

Tokenisasi RWA memungkinkan sapi direpresentasikan sebagai token digital di blockchain (Solana), sehingga:
- Peternak mendapat akses modal/likuiditas lebih cepat
- Investor bisa memiliki fraksi sapi dengan modal kecil dan berpotensi menerima bagi hasil
- Kepemilikan dan riwayat sapi tercatat transparan dan dapat diverifikasi

---

## 2. Tujuan produk

1. Membangun platform yang menghubungkan peternak (penyedia aset) dengan investor (penyedia modal) melalui token RWA di Solana.
2. Menjamin setiap token yang beredar punya jaminan hukum dan fisik yang bisa diverifikasi (bukan sekadar klaim on-chain).
3. Menyediakan mekanisme kepatuhan (KYC/whitelist) agar sesuai kerangka regulasi Indonesia (OJK/Bappebti).

---

## 3. Tujuan yang TIDAK dikejar di fase ini (non-goals)

- Tidak membangun exchange/DEX sendiri untuk trading sekunder di fase MVP — token cukup transferable ke wallet ter-whitelist.
- Tidak mengelola custody dana fiat langsung (pakai payment/on-off ramp partner pihak ketiga).
- Tidak membangun IoT smart collar custom di fase MVP — verifikasi fisik manual dulu.

---

## 4. Pengguna & peran

| Peran | Deskripsi |
|---|---|
| **Peternak/mitra SPV** | Pemilik legal sapi, mengajukan sapi untuk ditokenisasi |
| **Attestor** | Pihak independen (dokter hewan/auditor) yang memverifikasi kondisi sapi secara berkala dan menandatangani update on-chain |
| **Investor** | Membeli token fraksi kepemilikan sapi, menerima distribusi yield |
| **Admin platform** | Mengelola whitelist KYC, approve peternak/SPV, mengelola parameter global |

---

## 5. Ruang lingkup (scope) — dipecah 3 program on-chain

Detail arsitektur ada di diagram sebelumnya (peternakan/SPV → attestor → 3 program Solana → investor).

### 5.1 Program registry (fase 1 — dikerjakan duluan)
Representasi setiap sapi/batch sebagai akun on-chain (PDA), berisi metadata dan riwayat atestasi.

**Fungsional:**
- Admin/SPV bisa mendaftarkan sapi baru (`register_cattle`)
- Attestor yang berwenang bisa update kondisi sapi (`update_attestation`)
- Status sapi bisa diubah: aktif, terjual, mati, ditarik dari program (`update_status`)
- Data historis atestasi bisa diaudit siapa pun (read-only, on-chain)

### 5.2 Program compliance (fase 2)
Whitelist KYC berbasis Token-2022 Transfer Hook — membatasi transfer token vault hanya ke wallet yang lolos verifikasi.

**Fungsional:**
- Admin menambah/mencabut wallet dari whitelist
- Transfer token vault otomatis ditolak jika wallet tujuan tidak ter-whitelist

### 5.3 Program vault/fund (fase 3 — paling kompleks, dikerjakan terakhir)
Fraksionalisasi kepemilikan sapi ke token SPL dan distribusi yield ke pemegang token.

**Fungsional:**
- Membuka fund/vault yang menaungi kumpulan sapi (referensi ke akun registry)
- Investor subscribe (beli token vault) dengan cap total suplai
- Distribusi yield pro-rata ke pemegang token (dari hasil penjualan susu/anak sapi/dsb)
- Mekanisme redeem/exit (jika ada)

---

## 6. Alur pengguna utama (MVP)

1. SPV mendaftarkan sapi → masuk program registry
2. Attestor memverifikasi kondisi awal sapi → update on-chain
3. Admin membuka vault untuk kumpulan sapi tsb, menentukan total token & harga
4. Investor yang sudah KYC (whitelist) membeli token vault
5. Attestor update kondisi sapi secara berkala (mis. bulanan)
6. Yield (kalau ada) didistribusikan ke pemegang token secara pro-rata

---

## 7. Persyaratan non-fungsional

- **Keamanan:** semua instruksi sensitif (mint, update atestasi, whitelist) harus punya validasi signer/authority ketat; audit smart contract sebelum mainnet.
- **Kepatuhan hukum:** token yang menjanjikan bagi hasil kemungkinan besar termasuk kategori efek — perlu konsultasi hukum sebelum go-live (bukan bagian dari scope teknis, tapi blocker peluncuran).
- **Auditability:** semua perubahan status/atestasi harus tercatat permanen dan bisa ditelusuri.
- **Biaya transaksi:** manfaatkan biaya rendah Solana untuk update atestasi rutin tanpa membebani margin.

---

## 8. Model data inti (ringkas)

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

---

## 9. Metrik keberhasilan (fase MVP)

- Jumlah sapi terdaftar di registry
- Jumlah wallet ter-whitelist (investor terverifikasi)
- Total nilai token vault yang berhasil di-subscribe
- Frekuensi update atestasi tepat waktu (SLA attestor)

---

## 10. Risiko utama

| Risiko | Mitigasi |
|---|---|
| Data fisik sapi dipalsukan/tidak sinkron dengan on-chain | Attestor independen + audit acak + reputasi attestor |
| Token dikategorikan sebagai efek ilegal tanpa izin | Konsultasi hukum & OJK/Bappebti sebelum mainnet |
| Sapi mati/hilang tanpa update status | SLA atestasi rutin + asuransi ternak (opsional fase lanjut) |
| Smart contract bug/exploit | Audit pihak ketiga sebelum mainnet, mulai di devnet/testnet |

---

## 11. Roadmap teknis

| Fase | Deliverable |
|---|---|
| Fase 1 | Program registry (devnet), CLI/test script untuk register & update atestasi |
| Fase 2 | Program compliance (whitelist + Token-2022 transfer hook) |
| Fase 3 | Program vault (fraksionalisasi + distribusi yield), integrasi ketiga program |
| Fase 4 | Frontend investor + admin dashboard, audit keamanan, migrasi mainnet |

---

## 12. Pertanyaan terbuka

- Bagaimana mekanisme legal SPV memegang sapi secara sah (perlu badan hukum apa)?
- Siapa yang berperan sebagai attestor resmi — internal tim atau pihak ketiga bersertifikat?
- Apakah token akan bisa diperdagangkan di secondary market publik atau tertutup (private placement)?
- Model yield: bagi hasil tetap (fixed) atau berdasarkan kinerja peternakan (variable)?
