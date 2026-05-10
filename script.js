const menuData = [
    { id: 1, name: "Phở Bò Kobe", price: 65000, category: "mon-chinh", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400" },
    { id: 2, name: "Cơm Tấm Sườn Bì", price: 45000, category: "mon-chinh", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { id: 3, name: "Bánh Mì Bơ Tỏi", price: 25000, category: "do-an-kem", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400" },
    { id: 4, name: "Khoai Tây Chiên", price: 30000, category: "do-an-kem", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
    { id: 5, name: "Trà Đào Cam Sả", price: 35000, category: "nuoc-uong", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400" },
    { id: 6, name: "Cà Phê Sữa Đá", price: 25000, category: "nuoc-uong", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400" }
];

let currentOrder = [];

// Hàm lọc món ăn
function filterMenu(category) {
    // Đổi màu nút đang chọn
    const btns = document.querySelectorAll('.cat-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Hiển thị món theo loại
    const filtered = category === 'all' ? menuData : menuData.filter(item => item.category === category);
    renderMenu(filtered);
}

function formatVND(amount) {
    return amount.toLocaleString('vi-VN') + ' đ';
}

function renderMenu(data = menuData) {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-card';
        div.innerHTML = `
            <div class="card-img" style="background-image: url('${item.image}')"></div>
            <div class="card-info">
                <h3>${item.name}</h3>
                <p class="price">${formatVND(item.price)}</p>
                <button class="cat-btn" style="width:100%" onclick="addToOrder(${item.id})">Thêm ngay</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Các hàm addToOrder, updateOrderDisplay,... giữ nguyên logic cũ nhưng cập nhật ID hiển thị
function addToOrder(itemId) {
    const item = menuData.find(i => i.id === itemId);
    const existing = currentOrder.find(i => i.id === itemId);
    if (existing) { existing.quantity++; } 
    else { currentOrder.push({...item, quantity: 1}); }
    updateOrderDisplay();
}

function updateOrderDisplay() {
    const orderList = document.getElementById('order-list');
    const totalEl = document.getElementById('total-price');
    const countEl = document.getElementById('order-count');
    
    let total = 0;
    let count = 0;
    
    orderList.innerHTML = '';
    currentOrder.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        orderList.innerHTML += `
            <div class="order-item">
                <span>${item.name} x${item.quantity}</span>
                <span>${formatVND(item.price * item.quantity)}</span>
            </div>
        `;
    });

    if(currentOrder.length === 0) orderList.innerHTML = '<p class="empty-msg">Giỏ hàng đang trống.</p>';
    
    totalEl.textContent = formatVND(total);
    countEl.textContent = count + " món";
}

function submitOrder() {
    if(currentOrder.length === 0) return alert("Vui lòng chọn món!");
    alert("Cảm ơn bạn! Đơn hàng đã được ghi nhận.");
    currentOrder = [];
    updateOrderDisplay();
}

window.onload = () => renderMenu();
