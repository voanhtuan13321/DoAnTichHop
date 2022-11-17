if (!localStorage.getItem('idNhanVien')) {
    location.href = './quanly_dangnhap.html';
}

const searchParam = new URLSearchParams(location.search);
const id = searchParam.get('id');
console.log(id);

const urlApiSanPham = 'http://localhost:8080/api/v1/sanpham/';
const urlApiDanhMuc = 'http://localhost:8080/api/v1/danhmuc/';

fetch(urlApiDanhMuc)
    .then(response => response.json())
    .then(data => {
        let htmls = data.data.map(item => 
            (`
                <option value="${item.id}">${item.tenDanhMuc}</option>
            `)
        );
        $('#selectDanhMuc').html(htmls);
    });

fetch(urlApiSanPham + id)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        $('#inputTenSanPham').val(data.data.tenSanPham);
        $('#inputImg').attr('src', data.data.anh);
        $('#inputMoTa').val(data.data.moTa);
        $('#inputGia').val(data.data.gia);
        $('#inputTrangThai').prop('checked', data.data.trangThai);
        $('#selectDanhMuc').val(data.data.danhMuc.id);
    });

$('#file').change((ev) => {
    const files = ev.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.addEventListener('load', (ev) => {
        let base = ev.target.result;
        $('#inputImg').attr('src', base);
        localStorage.setItem('base64IMG', JSON.stringify(base));
    })
});

$('#btnSua').click(e => {
    let data = {
        'id' : Number(id),
        'tenSanPham' : $('#inputTenSanPham').val(),
        'anh' : $('#inputImg').attr('src'),
        'moTa' : $('#inputGia').val(),
        'gia' : $('#inputGia').val(),
        'trangThai' : $('#inputTrangThai').prop('checked'),
        'idDanhMuc' : $('#selectDanhMuc').val(),
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
            location.href = './quanly_trangchu.html';
        });
});

$('#btnDangXuat').click((e) => {
    localStorage.removeItem('idNhanVien');
    localStorage.removeItem('base64IMG');
    location.href = './quanly_dangnhap.html';
});