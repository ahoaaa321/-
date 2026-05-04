/**
 * 澜凤酒业官网 - 主JavaScript文件
 */

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileMenu();
    initSmoothScroll();
    initNavHighlight();
    initContactForm();
    initScrollAnimations();
});

/**
 * 移动端菜单
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // 点击导航链接后关闭菜单
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 导航高亮
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function highlightNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav();
}

/**
 * 联系表单
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4757';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // 显示提交成功消息
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> 提交成功！';
                btn.style.background = 'linear-gradient(135deg, #2ed573, #1abc9c)';
                
                // 重置表单
                setTimeout(() => {
                    this.reset();
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            }
        });
    }
}

/**
 * 滚动动画
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.product-card, .quality-card, .honor-card, .news-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * 头部滚动效果
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    }
});

/**
 * 产品购买按钮点击
 */
document.querySelectorAll('.product-actions .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        alert(`感谢您对"${productName}"的关注！\n\n购买功能即将开放，敬请期待！\n客服热线：400-888-8888`);
    });
});

/**
 * 咨询客服按钮点击
 */
document.querySelectorAll('.product-actions .btn-outline').forEach(btn => {
    btn.addEventListener('click', function() {
        alert('客服热线：400-888-8888\n\n工作时间：周一至周日 9:00 - 18:00\n邮箱：contact@lanfeng-jiuye.com');
    });
});