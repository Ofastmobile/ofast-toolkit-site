// Mobile sidebar toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const docsSidebar   = document.getElementById('docsSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        mobileMenuBtn.addEventListener('click', () => {
            docsSidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('visible');
        });

        sidebarOverlay.addEventListener('click', () => {
            docsSidebar.classList.remove('open');
            sidebarOverlay.classList.remove('visible');
        });

        // Scroll spy — highlight active TOC link
        const tocLinks = document.querySelectorAll('.toc-link');
        const sections = document.querySelectorAll('.content-body h2[id], .content-body h3[id]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tocLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-62px 0px -70% 0px',
            threshold: 0
        });

        sections.forEach(section => observer.observe(section));

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // FAQ accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.closest('.faq-item');
                const isOpen = item.classList.contains('open');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
                if (!isOpen) item.classList.add('open');
            });
        });

        // Sidebar search filter
        const searchInput = document.getElementById('sidebarSearch');
        const sidebarLinks = document.querySelectorAll('.sidebar-link');

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            sidebarLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                link.style.display = text.includes(query) ? 'flex' : 'none';
            });
        });

