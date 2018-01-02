# Aku Future Leader
> tempat akun Young Leader yang akan digunakan untuk mengakses sistem dan aplikasi FLS

# Cara Kerja
- Auth server terhubung ke database pengguna akun Young Leader
- Auth server dapat melayani register dan login pengguna
- **Register** dilakukan dengan mengirim request `post` ke endpoint register dengan data yang dibutuhkan. *bisa mengacu ke doc api*
- **Login** dilakukan dengan mengirim request `post` dari **client** ke endpoint login dengan data `username` dan `password`.
  - Setelah login berhasil, **client** akan menerima respon data `token`
  - data `token` ini ada token hasil encode `jwt` yang memuat `username` dan `email` pengguna yang berhasil login.
  - `token` dapat digunakan untuk authorisasi dalam melakukan request ke **resource server**

# Kebutuhan
- node js 
- mongodb
- nodemon (opsional)
- Postman (untuk coba API)

# Cara Pasang
- clone repo ini, atau fork dulu
- masuk ke direktori repo
- `npm install`
- `cp .env.example .env`
- edit, sesuaikan file `.env`
- `npm start` atau `npm run dev` jika pakai nodemon
- Coba API dengan Postman.

# API Dokumentasi
bisa diakses di `oururl.com/api-docs` atau `localhost:port/api-docs` jika menjalankan di local server

- Dokumentasi API menggunakan swagger-ui
- data endpoint api diambil dari file .`swagger.json`
- file json didapat dari hasil export Postman yang disesuaikan formatnya dengan bantuan [Apimatic Transformer](https://apimatic.io/transformer)

tutorial [disini](https://medium.com/@idrisadetunmbi/node-express-rest-api-documentation-through-postman-apimatic-and-swagger-ui-express-7fb7c7895882)

# Pull Request Welcome