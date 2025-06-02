async function loadData() {
  const res = await fetch('data/siswa.csv');
  const text = await res.text();
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const data = lines.slice(1).map(line => {
    const cells = line.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h] = cells[i].trim());
    return obj;
  });
  return data;
}

async function cariSiswa() {
  const nisn = document.getElementById('nisnInput').value.trim();
  const siswa = (await loadData()).find(s => s.nisn === nisn);
  const hasil = document.getElementById('hasil');
  if (siswa) {
    document.getElementById('fotoSiswa').src = `fotosiswa/${siswa.foto}`;
    document.getElementById('namaSiswa').textContent = siswa.nama;
    document.getElementById('kelasSiswa').textContent = siswa.kelas;
    document.getElementById('statusKelulusan').textContent = siswa.status;
    hasil.style.display = 'block';
  } else {
    hasil.innerHTML = `<p style="color:red;">Data tidak ditemukan. Periksa kembali NISN yang Anda masukkan.</p>`;
    hasil.style.display = 'block';
  }
}
