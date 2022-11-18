
const urlApiKhachHang = 'http://localhost:8080/api/v1/khachhang/';

$('#btn_dangnhap').click((e) => {
    const data = {
        'taiKhoan' : $('#inputTaiKhoan').val(),
        'matKhau' : $('#inputMatKhau').val()
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
    
    postData(urlApiKhachHang + 'dangnhap', data)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            if (data.status === 'FAILD') {
                alert('Tài khoản hoặc mật khẩu không đúng, vui lòng nhập lại');
            } else {
                localStorage.setItem('idKhachHang', data.data.id);
                window.location = './khachhang_trangchu_logined.html';
            }
        });
});