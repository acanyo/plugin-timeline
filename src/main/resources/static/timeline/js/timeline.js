document.addEventListener('DOMContentLoaded', function() {
    // 暗黑模式切换
    const toggleButton = document.querySelector('.handsome-timeline-dark-light');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('handsome-timeline-light-mode');
        });
    }

    // 时间线类型切换
    const timelineTypes = document.querySelectorAll('.handsome-timeline-type a');
    timelineTypes.forEach(type => {
        type.addEventListener('click', function(e) {
            e.preventDefault();
            timelineTypes.forEach(t => t.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });

    // 滚动动画
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
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });
}); 