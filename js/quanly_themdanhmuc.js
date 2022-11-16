if (!localStorage.getItem('idNhanVien')) {
    location.href = './quanly_dangnhap.html';
}

const urlApiDanhMuc = 'http://localhost:8080/api/v1/danhmuc/';

$('#btn-them-danhmuc').click((e) => {
    let value = $('#input-ten-danh-muc').val();

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
    
    postData(urlApiDanhMuc, {'tenDanhMuc' : value})
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
    
    window.location = "quanly_danhmuc.html"
});

$('#btnDangXuat').click((e) => {
    localStorage.removeItem('idNhanVien');
    localStorage.removeItem('base64IMG');
    location.href = './quanly_dangnhap.html';
});