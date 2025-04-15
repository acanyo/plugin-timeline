document.addEventListener('DOMContentLoaded', function() {
    // 初始化时间线动画
    initTimelineAnimation();
    
    // 初始化图片懒加载
    initLazyLoading();
    
    // 初始化平滑滚动
    initSmoothScroll();

    // 高亮当前选中的过滤器按钮
    const currentPath = window.location.pathname;
    const filterButtons = document.querySelectorAll('.handsome-timeline-filter .handsome-btn');
    filterButtons.forEach(button => {
        if (button.getAttribute('href') === currentPath) {
            button.classList.add('handsome-active');
        }
    });
});

// 时间线动画
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.handsome-timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });
}

// 图片懒加载
function initLazyLoading() {
    const images = document.querySelectorAll('.handsome-timeline-image img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 类型切换动画
function initTypeSwitch() {
    const typeCards = document.querySelectorAll('.handsome-timeline-type-card');
    
    typeCards.forEach(card => {
        card.addEventListener('click', function() {
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });
}

// 响应式处理
function handleResponsive() {
    const container = document.querySelector('.handsome-container');
    const timelineList = document.querySelector('.handsome-timeline-list');
    
    function adjustLayout() {
        if (window.innerWidth < 768) {
            container.classList.add('handsome-mobile');
            if (timelineList) {
                timelineList.classList.add('handsome-mobile-list');
            }
        } else {
            container.classList.remove('handsome-mobile');
            if (timelineList) {
                timelineList.classList.remove('handsome-mobile-list');
            }
        }
    }
    
    window.addEventListener('resize', adjustLayout);
    adjustLayout();
} 