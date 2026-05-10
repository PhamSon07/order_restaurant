const menuData = [
    { id: 1, name: "Phở Bò PTIT", price: 45000, category: "mon-chinh", image: "https://i.postimg.cc/FzdBnhSK/pho-bo.jpg" },
    { id: 2, name: "Cơm Gà Xối Mỡ", price: 40000, category: "mon-chinh", image: "https://i.postimg.cc/Rh6DbvtZ/com-ga-xoi-mo.jpg" },
    { id: 3, name: "Bún Chả", price: 35000, category: "mon-chinh", image: "https://i.postimg.cc/NF9zPQXG/bun-cha.webp" },
    { id: 4, name: "Mỳ Xào PTIT", price: 38000, category: "mon-chinh", image: "https://i.postimg.cc/BbLVwJFQ/mi-xao.jpg" },
    { id: 5, name: "Cơm Tấm Sườn", price: 42000, category: "mon-chinh", image: "https://i.postimg.cc/j2wFkRfx/com-tam.jpg" },
    { id: 6, name: "Bánh Mì PTIT", price: 28000, category: "mon-chinh", image: "https://i.postimg.cc/kG6ph7Sn/banh-mi.jpg" },
    { id: 7, name: "Trà Sữa Full Topping", price: 30000, category: "nuoc-uong", image: "https://i.postimg.cc/2ybKXCWC/tra-sua.png" },
    { id: 8, name: "Cà Phê Muối", price: 25000, category: "nuoc-uong", image: "https://i.postimg.cc/4y7SFXcZ/ca-phe-muoi.jpg" },
    { id: 9, name: "Sinh Tố Dâu", price: 32000, category: "nuoc-uong", image: "https://i.postimg.cc/PJpRFdDH/sinh-to-dau-tay.png" },
    { id: 10, name: "Trà chanh", price: 15000, category: "nuoc-uong", image: "https://i.postimg.cc/BbLVwJFW/tra-chanh-thai-xanh.jpg" },
    { id: 11, name: "Cơm Nắm Thịt Nướng", price: 22000, category: "nuoc-uong", image: "https://i.postimg.cc/cCgb5d3G/com-nam-rau-cu-thumbnail-1.jpg" },
    { id: 12, name: "Khoai Tây Lắc", price: 20000, category: "do-an-kem", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop" },
    { id: 13, name: "Gà Rán PTIT", price: 35000, category: "do-an-kem", image: "https://i.postimg.cc/wMyGb9mC/hinh-anh-ga-ran.jpg" },
    { id: 14, name: "Trứng Cút Chiên", price: 15000, category: "do-an-kem", image: "https://i.postimg.cc/gjXTBGhF/trung-cut-chien.jpg" },
    { id: 15, name: "Khoai lang kén", price: 25000, category: "do-an-kem", image: "https://i.postimg.cc/prh61PF3/dia-khoai-lang-ken.jpg" }
];

let cart = [];

// Hiệu ứng thông báo khi thêm món
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; 
        background: ${type === 'success' ? '#E63946' : '#999'};
        color: white; padding: 15px 25px;
        border-radius: 12px; font-weight: 600;
        box-shadow: 0 4px 15px rgba(230, 57, 70, 0.3);
        animation: slideInRight 0.4s ease-out;
        z-index: 1000;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out forwards';
        setTimeout(() => notification.remove(), 400);
    }, 2000);
}

// Thêm CSS animation vào head
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    .add-btn-pulse {
        animation: pulse 0.4s ease-out !important;
    }
`;
document.head.appendChild(style);

function renderMenu(data = menuData) {
    const container = document.getElementById('menu-container');
    container.innerHTML = data.map(item => `
        <div class="menu-card">
            <div class="card-img" style="background-image: url('${item.image}');" data-fallback="true"></div>
            <div class="card-info">
                <h3>${item.name}</h3>
                <p class="price">${item.price.toLocaleString()} đ</p>
                <textarea placeholder="Ghi chú" class="note-input" id="note-${item.id}" rows="2" maxlength="50"></textarea>
                <button class="cat-btn" style="width:100%" onclick="addToCart(${item.id}, this)">Thêm món</button>
            </div>
        </div>
    `).join('');
    
    // Validate and set fallback for images that fail to load
    setTimeout(() => {
        document.querySelectorAll('.card-img[data-fallback="true"]').forEach((imgDiv, idx) => {
            const bgImage = imgDiv.style.backgroundImage.slice(5, -2);
            const tmpImg = new Image();
            tmpImg.onload = () => {
                imgDiv.setAttribute('data-fallback', 'false');
            };
            tmpImg.onerror = () => {
                const gradients = [
                    'linear-gradient(135deg, #e63946 0%, #f06a6a 100%)',
                    'linear-gradient(135deg, #a8dadc 0%, #457b9d 100%)',
                    'linear-gradient(135deg, #f1faee 0%, #e63946 100%)'
                ];
                const emojis = ['🍽️', '🥘', '🍲', '🥗', '🍛'];
                imgDiv.style.backgroundImage = gradients[idx % gradients.length];
                imgDiv.innerHTML = `<div style="font-size:2.5em;">${emojis[idx % emojis.length]}</div>`;
            };
            tmpImg.src = bgImage;
        });
    }, 100);
}

function addToCart(id, buttonEl) {
    const item = menuData.find(i => i.id === id);
    const noteEl = document.getElementById(`note-${id}`);
    const note = noteEl ? noteEl.value.trim() : '';
    
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.quantity++;
        if (note) existing.note = note;
    } else {
        const cartItem = { ...item, quantity: 1 };
        if (note) cartItem.note = note;
        cart.push(cartItem);
    }
    
    // Thêm hiệu ứng pulse vào nút
    if (buttonEl) {
        buttonEl.classList.add('add-btn-pulse');
        setTimeout(() => buttonEl.classList.remove('add-btn-pulse'), 400);
    }
    
    showNotification(`✨ Đã thêm ${item.name} vào giỏ!`);
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
        const noteDisplay = item.note ? `<div style="font-size: 0.8em; color: #E63946; margin-top: 5px; font-style: italic;">📝 ${item.note}</div>` : '';
        return `
            <div class="order-item">
                <div style="flex:1">
                    <strong>${item.name}</strong><br>
                    <small>${item.price.toLocaleString()}đ</small>
                    ${noteDisplay}
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

function filterMenu(cat, buttonEl) {
    document.querySelectorAll('.category-nav .cat-btn').forEach(btn => btn.classList.remove('active'));
    buttonEl.classList.add('active');
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
