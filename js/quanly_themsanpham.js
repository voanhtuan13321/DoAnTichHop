if (!localStorage.getItem('idNhanVien')) {
    location.href = './quanly_dangnhap.html'
}

const urlApiDanhMuc = 'http://localhost:8080/api/v1/danhmuc/';
const urlApiSanPham = 'http://localhost:8080/api/v1/sanpham/';

fetch(urlApiDanhMuc)
    .then((response) => response.json())
    .then((data) => {
        const listDanhMuc = data.data;
        const htmls = listDanhMuc.map((item) => 
            (`
                <option value="${item.id}">${item.tenDanhMuc}</option>
            `)
        );
        $('#select-danhmuc').html(htmls);
    });

$('#file').change((ev) => {
    const files = ev.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.addEventListener('load', (ev) => {
        let base = ev.target.result;
        $('#img').attr('src', base);
        localStorage.setItem('base64IMG', JSON.stringify(base));
    })
});

$('#btn-them').click((e) => {
    let data = {
        'tenSanPham' : $('#input-tensanpham').val(),
        'anh' : JSON.parse(localStorage.getItem('base64IMG')),
        'moTa' : $('#input-mota').val(),
        'gia' : $('#input-gia').val(),
        'trangThai' : document.getElementById('input-trangthai').checked,
        'idDanhMuc' : Number($('#select-danhmuc').val()),
        'idNhanVien' : localStorage.getItem('idNhanVien')
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
    
    postData(urlApiSanPham, data)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            location.href = ocation.href;
        });
});

$('#btnDangXuat').click((e) => {
    localStorage.removeItem('idNhanVien');
    localStorage.removeItem('base64IMG');
    location.href = './quanly_dangnhap.html';
});