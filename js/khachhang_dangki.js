
const urlApiKhachHang = 'http://localhost:8080/api/v1/khachhang/';

$('#btn_dangki').click((e) => {
    if ($('#inputMatKhau1').val() !== $('#inputMatKhau2').val()) {
        alert('Mật khẩu không trùng khớp');
        return;
    }

    const data = {
        'hoTen' : $('#inputTen').val(),
        'ngaySinh' : $('#inputNgaySinh').val(),
        'soDienThoai' : $('#inputSodt').val(),
        'cccd' : $('#inputCccd').val(),
        'diaChi' : $('#inputDiaChi').val(),
        'taiKhoan' : $('#inputTaiKhoan').val(),
        'matKhau' : $('#inputMatKhau1').val()
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
                localStorage.setItem('idKhachHang', data.data.id);
                window.location = './khachhang_trangchu_logined.html';
            }
        });
});