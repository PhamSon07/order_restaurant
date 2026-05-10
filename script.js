const menuData = [
    { id: 1, name: "Phở Bò PTIT", price: 45000, category: "mon-chinh", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400" },
    { id: 2, name: "Cơm Gà Xối Mỡ", price: 40000, category: "mon-chinh", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { id: 3, name: "Bún Chả", price: 35000, category: "mon-chinh", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400" },
    { id: 4, name: "Trà Sữa Full Topping", price: 30000, category: "nuoc-uong", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400" },
    { id: 5, name: "Cà Phê Muối", price: 25000, category: "nuoc-uong", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400" },
    { id: 6, name: "Khoai Tây Lắc", price: 20000, category: "do-an-kem", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" }
];

let cart = [];

function renderMenu(data = menuData) {
    const container = document.getElementById('menu-container');
    container.innerHTML = data.map(item => `
        <div class="menu-card">
            <div class="card-img" style="background-image: url('${item.image}')"></div>
            <div class="card-info">
                <h3>${item.name}</h3>
                <p class="price">${item.price.toLocaleString()} đ</p>
                <button class="cat-btn" style="width:100%" onclick="addToCart(${item.id})">Thêm món</button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const item = menuData.find(i => i.id === id);
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
}

function changeQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById('order-list');
    const totalEl = document.getElementById('total-price');
    const countEl = document.getElementById('order-count');
    
    if (cart.length === 0) {
        list.innerHTML = '<p class="empty-msg">Chưa có món nào được chọn.</p>';
        totalEl.innerText = "0 đ";
        countEl.innerText = "0 món";
        return;
    }

    let total = 0;
    let count = 0;

    list.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        return `
            <div class="order-item">
                <div style="flex:1">
                    <strong>${item.name}</strong><br>
                    <small>${item.price.toLocaleString()}đ</small>
                </div>
                <div class="qty-controls">
                    <button class="btn-qty" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-qty" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <div style="width: 80px; text-align: right; font-weight: bold;">
                    ${(item.price * item.quantity).toLocaleString()}đ
                </div>
            </div>
        `;
    }).join('');

    totalEl.innerText = total.toLocaleString() + " đ";
    countEl.innerText = count + " món";
}

function filterMenu(cat) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    const filtered = cat === 'all' ? menuData : menuData.filter(i => i.category === cat);
    renderMenu(filtered);
}

function submitOrder() {
    if (cart.length === 0) return alert("Giỏ hàng đang trống bạn ơi!");
    
    // Hiệu ứng chốt đơn vui vẻ
    alert("🎉 PTIT RESTAURANT XÁC NHẬN!\n--------------------------\nĐơn hàng của bạn đang được chuẩn bị.\nCảm ơn bạn đã ủng hộ nhà hàng!");
    
    cart = [];
    updateCartUI();
}

window.onload = () => renderMenu();
