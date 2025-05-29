// عملکردهای صفحه مقالات فنی

document.addEventListener('DOMContentLoaded', function() {
    // تنظیم فیلترها
    setupFilters();
    
    // تنظیم جستجو
    setupSearch();
    
    // تنظیم لودینگ تنبل تصاویر
    setupLazyLoading();
});

// تنظیم فیلترها و مرتب‌سازی
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
}

// اعمال فیلترها و مرتب‌سازی
function applyFilters() {
    const category = document.getElementById('category-filter').value;
    const sort = document.getElementById('sort-filter').value;
    
    // نمایش لودینگ
    showLoading();
    
    // در حالت واقعی، اینجا درخواست به سرور ارسال می‌شود
    // فعلاً فقط شبیه‌سازی می‌کنیم
    setTimeout(() => {
        // پنهان کردن لودینگ
        hideLoading();
        
        // به‌روزرسانی URL با پارامترهای جدید
        updateURL(category, sort);
        
        // در حالت واقعی، نتایج جدید از سرور دریافت و نمایش داده می‌شوند
        console.log('فیلترها اعمال شدند:', { category, sort });
    }, 500);
}

// به‌روزرسانی URL با پارامترهای فیلتر
function updateURL(category, sort) {
    const url = new URL(window.location.href);
    
    if (category) {
        url.searchParams.set('category', category);
    } else {
        url.searchParams.delete('category');
    }
    
    if (sort) {
        url.searchParams.set('sort', sort);
    } else {
        url.searchParams.delete('sort');
    }
    
    // به‌روزرسانی URL بدون رفرش صفحه
    window.history.pushState({}, '', url);
}

// تنظیم جستجو
function setupSearch() {
    const searchForm = document.querySelector('.search-box form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input[type="search"]');
            const query = searchInput.value.trim();
            
            if (query) {
                // نمایش لودینگ
                showLoading();
                
                // در حالت واقعی، اینجا درخواست جستجو به سرور ارسال می‌شود
                // فعلاً فقط شبیه‌سازی می‌کنیم
                setTimeout(() => {
                    // پنهان کردن لودینگ
                    hideLoading();
                    
                    // به‌روزرسانی URL با پارامتر جستجو
                    const url = new URL(window.location.href);
                    url.searchParams.set('q', query);
                    window.history.pushState({}, '', url);
                    
                    // در حالت واقعی، نتایج جستجو از سرور دریافت و نمایش داده می‌شوند
                    console.log('جستجو انجام شد:', query);
                }, 500);
            }
        });
    }
}

// تنظیم لودینگ تنبل تصاویر
function setupLazyLoading() {
    // بررسی پشتیبانی مرورگر از Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // مشاهده تمام تصاویر با ویژگی loading="lazy"
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // پشتیبانی از مرورگرهای قدیمی
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }
}

// نمایش لودینگ
function showLoading() {
    // ایجاد المان لودینگ اگر وجود ندارد
    let loading = document.querySelector('.loading-overlay');
    
    if (!loading) {
        loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-spinner">
                <svg viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
            </div>
        `;
        document.body.appendChild(loading);
    }
    
    // نمایش لودینگ
    loading.style.display = 'flex';
}

// پنهان کردن لودینگ
function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    
    if (loading) {
        loading.style.display = 'none';
    }
}

// اضافه کردن استایل‌های لودینگ به صفحه
const style = document.createElement('style');
style.textContent = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
    }
    
    .loading-spinner svg {
        animation: rotate 2s linear infinite;
    }
    
    .loading-spinner circle {
        stroke: var(--primary-color);
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }
    
    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
    
    @media (prefers-color-scheme: dark) {
        .loading-overlay {
            background: rgba(0, 0, 0, 0.8);
        }
        
        .loading-spinner circle {
            stroke: var(--primary-color-dark);
        }
    }
`;
document.head.appendChild(style); 