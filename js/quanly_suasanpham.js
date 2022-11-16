if (!localStorage.getItem('idNhanVien')) {
    location.href = './quanly_dangnhap.html';
}


$('#btnDangXuat').click((e) => {
    localStorage.removeItem('idNhanVien');
    localStorage.removeItem('base64IMG');
    location.href = './quanly_dangnhap.html';
});