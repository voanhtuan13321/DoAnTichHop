// truong hop chua dang nhap
if (!localStorage.getItem('idKhachHang')) {
    $('#btnDangNhap').css('display', 'block');
    $('#trangChuUnLogin').css('display', 'block');
    $('#soLuongUnLogin').css('display', 'block');
    $('#btnTaiKhoan').css('display', 'none');
    $('#trangChuLogined').css('display', 'none');
    $('#soLuongLogin').css('display', 'none');
} else {
    $('#btnDangNhap').css('display', 'none');
    $('#trangChuUnLogin').css('display', 'none');
    $('#soLuongUnLogin').css('display', 'none');
    $('#btnTaiKhoan').css('display', 'block');
    $('#trangChuLogined').css('display', 'block');
    $('#soLuongLogin').css('display', 'block');
}

const urlApiGioHang = 'http://localhost:8080/api/v1/giohang/';

const loadSoLuongSanPham = () => {
    idKhachHang = localStorage.getItem('idKhachHang');
    fetch(urlApiGioHang + "soluong/" + idKhachHang)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $('#soLuong').text(data.data);
        });
}
loadSoLuongSanPham();