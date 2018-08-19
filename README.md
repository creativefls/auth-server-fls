# Akun Future Leader
> auth server akun future leader

# Kebutuhan
- node v8
- mongodb 3.6^
- postman

# Cara Pasang
- clone repo ini, atau fork dulu
- masuk ke direktori repo
- npm install
- cp .env.example .env
- edit, sesuaikan file .env
- npm start atau npm run dev jika pakai nodemon
- Coba API dengan Postman. tersedia `postman_collection.json`

# Cara Kerja
- register akun di halaman `/` menggunakan html form
- login -> client request ke auth server
  - server memberi balikan token jwt dengan secret yang ditentukan
  - token bisa digunakan untuk request ke app server dengan auth sesuai jwt secret

# Pengembangan ke depan

:white_medium_square: otp verifikasi email
:white_medium_square: implement oauth2 flow
