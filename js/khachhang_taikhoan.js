if (!localStorage.getItem('idKhachHang')) {
    location.href = 'khachhang_dangnhap.html';
}

const urlApiKhachHang = 'http://localhost:8080/api/v1/khachhang/';
const urlApiGioHang = 'http://localhost:8080/api/v1/giohang/';

const elementHoten = $('#name');
const elementTaiKhoan = $('#taikhoan');
const elementMatKhau = $('#matkhau');
const elementNgaySinh = $('#ngaySinh');
const elementSdt = $('#sdt');
const elementDiaChi = $('#diaChi');
const elementCccd = $('#cccd');
const elementCapNhat = $('#btnCapNhat');

const idKhachHang = localStorage.getItem('idKhachHang');

fetch(urlApiKhachHang + idKhachHang)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let dates = data.data.ngaySinh.split('T')[0];
        elementHoten.val(data.data.hoTen);
        elementTaiKhoan.val(data.data.taiKhoan);
        elementNgaySinh.val(dates);
        elementSdt.val(data.data.soDienThoai);
        elementCccd.val(data.data.cccd);
        elementMatKhau.val(data.data.matKhau);
        elementDiaChi.val(data.data.diaChi);
    });

elementCapNhat.click(() => {
    const data = {
        'id' : idKhachHang,
        'hoTen' : elementHoten.val(),
        'ngaySinh' : elementNgaySinh.val(),
        'soDienThoai' : elementSdt.val(),
        'cccd' : elementCccd.val(),
        'diaChi' : elementDiaChi.val(),
        'taiKhoan' : elementTaiKhoan.val(),
        'matKhau' :elementMatKhau.val()
    };

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
    postData(urlApiKhachHang, data)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            if (data.status === 'Faild') {
                alert('Tên đăng nhập đã tồn tại, xin nhập tên khác');
            } else {
                window.location = './khachhang_trangchu_logined.html';
            }
        });
});

const loadSoLuongSanPham = () => {
    fetch(urlApiGioHang + "soluong/" + idKhachHang)
        .then(response => response.json())
        .then(({data}) => {
            console.log(data);
            $('#soluong').text(data);
        });
}
loadSoLuongSanPham();

const logout = () => {
    localStorage.removeItem('idKhachHang');
    location.href = 'khachhang_trangchu_unlogin.html';
};