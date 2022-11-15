const urlApiDanhMuc = 'http://localhost:8080/api/v1/danhmuc/';

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

    console.log(data);
});