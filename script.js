// const url = 'https://docs.google.com/spreadsheets/d/1kBRlTY1cjK3NXPsIVqd4uepnKt-SiD17LHUoNjIO2TQ/gviz/tq?tqx=out:json';
const url = 'https://docs.google.com/spreadsheets/d/1kBRlTY1cjK3NXPsIVqd4uepnKt-SiD17LHUoNjIO2TQ/gviz/tq?tqx=out:json';
function traCuu() {
  // Lấy giá trị từ các trường nhập
  const cccd = document.getElementById('cccd').value.trim();
  const classCode = document.getElementById('classCode').value.trim();
  // Kiểm tra nếu không nhập đủ thông tin
  if ( !cccd || classCode === "0000000000") {
    alert('Vui lòng nhập đầy đủ thông tin và chọn lớp học!');
    return;
  }
  // Gọi API để lấy dữ liệu từ Google Sheets
  fetch(url)
    .then(response => response.text())
    .then(text => {
      try {
        // Xử lý JSON trả về từ Google Sheets
        const json = JSON.parse(text.substring(47).slice(0, -2)); // Cắt bỏ phần dư thừa
        const rows = json.table.rows;

        // Tìm kiếm dòng khớp với họ tên và số CCCD
        let foundData = null;
        rows.forEach(row => {
          const soCCCD = row.c[8]?.v || '';                   // Cột I: CCCD
          const maLop = row.c[42]?.v || '';                   // Cột AQ: Mã lớp học

          if (soCCCD === cccd && maLop === classCode) {
            foundData = row;
          }
        });

        // Hiển thị kết quả
        if (foundData) {
          const rowData = foundData.c.map(cell => cell?.v || ''); // Lấy toàn bộ thông tin dòng
          const displayData = `
            <p class="de_muc"><strong>I. THÔNG TIN HỌC VIÊN</strong></p>
            <p><strong>Mã lớp học:</strong> ${rowData[42]}</p>
            <p><strong>STT:</strong> ${rowData[0]}</p>
            <p><strong>Họ tên đệm(*):</strong> ${rowData[1]}</p>
            <p><strong>Tên(*):</strong> ${rowData[2]}</p>
            <p><strong>Giới tính:</strong> ${rowData[3]}</p>
            <p><strong>Ngày tháng năm sinh(*):</strong> ${rowData[4]}</p>
            <p><strong>Địa chỉ thường trú:</strong> ${rowData[14]}</p>
            <p><strong>Đơn vị công tác(*):</strong> ${rowData[5]}</p>
            <p><strong>Chuyên ngành:</strong> ${rowData[6]}</p>
            <p><strong>Trình độ:</strong> ${rowData[7]}</p>
            <p><strong>CMND/CCCD:</strong> ${rowData[8]}</p>
            <p><strong>Ngày cấp CMND/CCCD:</strong> ${rowData[9]}</p>
            <p><strong>Nơi cấp CMND/CCCD:</strong> ${rowData[10]}</p>
            <p><strong>Số CCHN(*):</strong> ${rowData[11]}</p>
            <p><strong>Ngày cấp CCHN(*):</strong> ${rowData[12]}</p>
            <p><strong>Mã số thuế:</strong> ${rowData[13]}</p>
            <br>
            <p class="de_muc"><strong>II. THÔNG TIN ĐỊA CHỈ GỬI CHỨNG CHỈ</strong></p>
            <p><strong>Số nhà:</strong> ${rowData[15]}</p>
            <p><strong>Quận/Huyện:</strong> ${rowData[16]}</p>
            <p><strong>Tỉnh/Thành Phố:</strong> ${rowData[17]}</p>
            <p><strong>Số điện thoại:</strong> ${rowData[18]}</p>
            <p><strong>Email đăng kí:</strong> ${rowData[19]}</p>
            <p><strong>Email gửi hồ sơ:</strong> ${rowData[20]}</p>
            <br>
            <p class="de_muc"><strong>III. THÔNG TIN LỆ PHÍ VÀ ĐĂNG KÍ BUỔI HỌC</strong></p>
            <p><strong>Lệ phí B1:</strong> ${rowData[21]}</p>
            <p><strong>Lệ phí B2:</strong> ${rowData[22]}</p>
            <p><strong>Lệ phí B3:</strong> ${rowData[23]}</p>
            <br>
            <p class="de_muc"><strong>IV. THÔNG TIN HỒ SƠ ĐĂNG KÍ:</strong></p>
            <p><strong>Phiếu đăng kí:</strong> ${rowData[25]}</p>
            <p><strong>Văn bằng:</strong> ${rowData[26]}</p>
            <p><strong>CMND/CCCD:</strong> ${rowData[27]}</p>
            <p><strong>Ảnh:</strong> ${rowData[28]}</p>
            <p><strong>Bill học phí:</strong> ${rowData[29]}</p>
            <p><strong>Tình trạng hồ sơ:</strong> ${rowData[30]}</p>
            <br>
            <p class="de_muc"><strong>V. THÔNG TIN KẾT QUẢ BUỔI HỌC:</strong></p>
            <p><strong>Thời gian học buổi 1:</strong> ${rowData[33]}</p>
            <p><strong>Điểm kiểm tra buổi 1:</strong> ${rowData[34]}</p>
            <p><strong>Đánh giá tổng kết buổi 1:</strong> ${rowData[35]}</p>
            <br>
            <p><strong>Thời gian học buổi 2:</strong> ${rowData[36]}</p>
            <p><strong>Điểm kiểm tra buổi 2:</strong> ${rowData[37]}</p>
            <p><strong>Đánh giá tổng kết buổi 2:</strong> ${rowData[38]}</p>
            <br>
            <p><strong>Thời gian học buổi 3:</strong> ${rowData[39]}</p>
            <p><strong>Điểm kiểm tra buổi 3:</strong> ${rowData[40]}</p>
            <p><strong>Đánh giá tổng kết buổi 3:</strong> ${rowData[41]}</p>
            <br>
            <p><strong>Tổng số lượng chứng chỉ được cấp trong toàn khoá học:</strong> ${rowData[31]}</p>
            <p><strong>Tổng số tiết học:</strong> ${rowData[32]}</p>
            <br>
            <p class="de_muc_luu_y"><strong>Lưu ý:</strong></p>
            <p>1. Thông tin mang (*) là thông tin được in trên chứng chỉ.</p>
            <p>2. Quý học viên vui lòng kiểm tra toàn bộ thông tin bên trên, mọi câu hỏi Quý học viên gửi mail về địa chỉ: <a href="mailto:cmehoiduochoc@quangtrungco.edu.vn">cmehoiduochoc@quangtrungco.edu.vn</a></p> 
            <p>Trân trọng,</p>
            <p><strong>BAN TỔ CHỨC LỚP HỌC.</strong></p>
          `;
          document.getElementById('data').innerHTML = displayData;
        } else {
          document.getElementById('data').innerHTML = `<p><strong>Kết quả:</strong> Không tìm thấy thông tin phù hợp.</p>`;
        }
        updateClassImages();
        
        document.getElementById('cccd').value = '';
        document.getElementById('classCode').value = '0000000000';
      } catch (error) {
        console.error('Error processing data:', error);
        document.getElementById('data').innerHTML = `<p><strong>Lỗi:</strong> Không tìm thấy .</p>`;
      }
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
      document.getElementById('data').innerHTML = `<p><strong>Lỗi:</strong> Không thể kết nối với Google Sheets.</p>`;
    });
}
function updateClassImages() {
  // Ẩn tất cả hình ảnh
  document.querySelectorAll('.class_img').forEach(img => img.style.display = 'none');

  // Lấy mã lớp học
  const classcode = document.getElementById('classCode').value.trim();

  // Kiểm tra và hiển thị hình ảnh phù hợp
  if (classcode && classcode !== '0000000000') {
    const images = document.querySelectorAll(`[id^=img_${classcode}]`);
    if (images.length) {
      images.forEach(img => img.style.display = 'block');
    } else {
      console.warn(`Không tìm thấy hình ảnh cho mã lớp: ${classcode}`);
      document.getElementById('imageMessage').textContent = `Không có hình ảnh phù hợp với mã lớp: ${classcode}`;
    }
  }
}
