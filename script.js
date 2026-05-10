// Dữ liệu mô phỏng (Hardcode tạm thời khi chưa có database)
const menuData = [
    { id: 1, name: "Phở Bò Kobe", price: 65000, image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400" },
    { id: 2, name: "Cơm Tấm Sườn Bì", price: 45000, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { id: 3, name: "Bún Chả Hà Nội", price: 50000, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400" },
    { id: 4, name: "Gà Rán Phần M", price: 75000, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400" },
    { id: 5, name: "Trà Đào Cam Sả", price: 35000, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400" },
    { id: 6, name: "Cà Phê Sữa Đá", price: 25000, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400" }
];

// Giỏ hàng hiện tại
let currentOrder = [];

// Hàm định dạng tiền tệ VNĐ
function formatVND(amount) {
    return amount.toLocaleString('vi-VN') + ' đ';
}

// Khởi tạo trang: Hiển thị thực đơn
function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';

    menuData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-card'; // Đổi class để dùng CSS mới
        div.innerHTML = `
            <div class="card-img" style="background-image: url('${item.image}')"></div>
            <div class="card-info">
                <h3>${item.name}</h3>
                <p class="price">${formatVND(item.price)}</p>
                <button class="add-btn" onclick="addToOrder(${item.id})">Thêm món</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Thêm món vào đơn hàng
function addToOrder(itemId) {
    const item = menuData.find(i => i.id === itemId);
    const existingItem = currentOrder.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        currentOrder.push({ ...item, quantity: 1 });
    }
    updateOrderDisplay();
}

// Giảm bớt số lượng món
function removeFromOrder(itemId) {
    const itemIndex = currentOrder.findIndex(i => i.id === itemId);
    if (itemIndex > -1) {
        if (currentOrder[itemIndex].quantity > 1) {
            currentOrder[itemIndex].quantity -= 1;
        } else {
            currentOrder.splice(itemIndex, 1);
        }
    }
    updateOrderDisplay();
}

// Cập nhật giao diện Đơn hàng
function updateOrderDisplay() {
    const orderList = document.getElementById('order-list');
    const totalPriceEl = document.getElementById('total-price');
    let total = 0;

    if (currentOrder.length === 0) {
        orderList.innerHTML = '<p class="empty-msg">Chưa có món nào được chọn.</p>';
        totalPriceEl.textContent = '0 đ';
        return;
    }

    orderList.innerHTML = '';
    currentOrder.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <div>
                <strong>${item.name}</strong> x ${item.quantity}
            </div>
            <div>
                <span>${formatVND(itemTotal)}</span>
                <button style="margin-left: 10px; background-color: #e74c3c; padding: 2px 8px;" onclick="removeFromOrder(${item.id})">-</button>
            </div>
        `;
        orderList.appendChild(div);
    });

    totalPriceEl.textContent = formatVND(total);
}

// Giả lập chức năng chốt đơn
function submitOrder() {
    if (currentOrder.length === 0) {
        alert("Vui lòng chọn món trước khi chốt đơn!");
        return;
    }
    
    // Nơi đây sau này sẽ gọi fetch/axios gửi JSON lên server C++
    console.log("Dữ liệu chuẩn bị gửi server:", JSON.stringify(currentOrder));
    alert("Chốt đơn thành công! (Mô phỏng)");
    
    currentOrder = [];
    updateOrderDisplay();
}

// Chạy hàm render khi web vừa load xong
window.onload = renderMenu;
