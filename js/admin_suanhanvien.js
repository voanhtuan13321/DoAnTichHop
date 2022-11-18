if (!localStorage.getItem('idAdmin')) {
    location.href = './admin_dangnhap.html';
}

const urlApiNhanVien = 'http://localhost:8080/api/v1/nhanvien/';

const searchParam = new URLSearchParams(location.search);
const id = searchParam.get('id');

fetch(urlApiNhanVien + id)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let dates = data.data.ngaySinh
        console.log(dates);

        $('#inputTen').val(data.data.hoTen);
        $('#img').attr('src', data.data.anh);
        //document.getElementById('inputNgaySinh').value = dates.split('T')[0];
        $('#inputNgaySinh').val(dates.split('T')[0]);
        $('#inputSoDt').val(data.data.soDienThoai);
        $('#inputCccd').val(data.data.cccd);
        $('#inputTaiKhoan').val(data.data.taiKhoan);
        $('#inputMatKhau').val(data.data.matKhau);
    })

$('#btn-sua').click(e => {
    const data = {
        'id' : Number(id),
        'hoTen' : $('#inputTen').val(),
        'ngaySinh' : $('#inputNgaySinh').val(),
        'soDienThoai' : $('#inputSoDt').val(),
        'cccd' : $('#inputCccd').val(),
        'taiKhoan' : $('#inputTaiKhoan').val(),
        'matKhau' : $('#inputMatKhau').val(),
        'anh' : $('#img').attr('src')
    };

    console.log(data);

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
    
    postData(urlApiNhanVien, data)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            if (data.status === 'Faild') {
                alert('Tên tài khoản đã tồn tại !!!');
                return;
            }
            location.href = './admin_nhanvien.html';
        });
});

const logout = () => {
    localStorage.removeItem('idAdmin');
    location.href = './admin_dangnhap.html';
}