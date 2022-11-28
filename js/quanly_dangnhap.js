
const urlApiNhanVien = 'http://localhost:8080/api/v1/nhanvien/';

$('#btnLogin').click((e) => {

    let data = {
        'taiKhoan' : $('#inputTaiKhoan').val(),
        'matKhau' : $('#inputMatKhau').val()
    };

    async function putData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
    
    putData(urlApiNhanVien + 'login', data)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            if (data.status === 'OK') {
                localStorage.setItem('idNhanVien', data.data.id);
                window.location = './quanly_trangchu.html';
            } else {
                alert('Tai khoan mat khong khong dung');
            }
        });

});