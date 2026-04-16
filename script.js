// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Simple smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for navbar height
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn)');

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100; // Account for offset
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Multi-language Support ---
    let currentLang = 'en';

    const translations = {
        en: {
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-skills': 'Skills',
            'nav-work': 'Work',
            'nav-talk': 'Let\'s Talk',
            'hero-greeting': 'Hi, I\'m <span class="highlight">Mai Abdalla</span>',
            'hero-title': 'Crafting Elegant<br> <span class="gradient-text">Flutter & Dart</span> Apps',
            'hero-subtitle': 'Software Engineer specializing in cross-platform mobile development for Android & iOS. Turning complex requirements into scalable, user-friendly mobile solutions.',
            'add-review-btn': 'Add My Review <i class="fas fa-plus"></i>',
            'modal-title': 'Share Your <span class="gradient-text">Experience</span>',
            'submit-review': 'Submit Review <i class="fas fa-paper-plane"></i>',
            'rating-label': 'Your Rating:',
            'about-p1': 'Hello! I\'m <span class="highlight">Mai Abdalla</span>, a passionate Flutter Developer with a Bachelor\'s degree in Computer Science from the University of Khartoum. I have over 2 years of proven experience in building scalable cross-platform mobile applications.',
            'about-p2': 'My expertise lies heavily in <span class="highlight">Flutter</span> and <span class="highlight">Dart</span>, with a strong background in UI/UX design, RESTful API integration, and robust state management using <span class="highlight">BLoC</span> and <span class="highlight">Cubit</span>.',
            'about-p3': 'I architect applications using <span class="highlight">Clean Architecture</span> and <span class="highlight">MVVM</span> patterns to ensure maintainability and high performance.',
            'exp-gtg-date': 'Jul 2025 - Present',
            'exp-gtg-title': 'Mobile App Developer',
            'exp-gtg-company': 'Gulf Tech Group | Dubai, UAE',
            'exp-gtg-task1': 'Architect and develop high-performance mobile applications using Flutter & Dart.',
            'exp-gtg-task2': 'Boosted app performance by 40% through advanced code optimization and efficient state management.',
            'exp-gtg-task3': 'Reduced memory consumption by implementing optimized caching strategies and asset management.',
            'exp-gtg-task4': 'Handle end-to-end deployment cycles, including App Store/Play Store publishing and continuous updates.',
            'exp-morph-date': 'Mar 2024 - Mar 2025',
            'exp-morph-title': 'Flutter Developer (Contract)',
            'exp-morph-company': 'Morph | Saudi Arabia (Remote)',
            'exp-morph-task1': 'Developed and refined robust cross-platform mobile applications for Android and iOS platforms.',
            'exp-morph-task2': 'Architected scalable solutions using Clean Architecture and MVVM patterns to ensure code maintainability.',
            'exp-morph-task3': 'Integrated complex RESTful APIs and managed state efficiently using advanced state management techniques.',
            'exp-morph-task4': 'Collaborated remotely to deliver high-quality features, focusing on UI polish and performance optimization.',
            'exp-free-date': 'Nov 2023 - Present',
            'exp-free-title': 'Freelance Flutter Developer',
            'exp-free-task1': 'Delivered end-to-end mobile solutions for diverse clients, covering full-lifecycle development from early requirements to deployment.',
            'exp-free-task2': 'Expertly integrated diverse third-party services including secure payment gateways, Firebase analytics, and real-time cloud messaging.',
            'exp-free-task3': 'Consistently optimized application performance, focusing on smooth UI transitions, efficient memory management, and reduced load times.',
            'exp-free-task4': 'Provided technical consultation to startups, helping translate business concepts into scalable and high-quality mobile products.'
        },
        ar: {
            'nav-home': 'الرئيسية',
            'nav-about': 'عني',
            'nav-skills': 'المهارات',
            'nav-work': 'أعمالي',
            'nav-talk': 'تحدث معي',
            'contact-send': 'إرسال الرسالة <i class="fas fa-paper-plane"></i>',
            'hero-greeting': 'مرحباً، أنا <span class="highlight">مي عبدالله</span>',
            'hero-title': 'أبتكر تطبيقات<br> <span class="gradient-text">فلاتر ودارت</span> أنيقة',
            'hero-subtitle': 'مهندسة برمجيات متخصصة في تطوير تطبيقات الموبايل للآيفون والأندرويد. أحول المتطلبات المعقدة إلى حلول برمجية قابلة للتوسع وسهلة الاستخدام.',
            'add-review-btn': 'أضف رأيك <i class="fas fa-plus"></i>',
            'modal-title': 'شاركنا <span class="gradient-text">تجربتك</span>',
            'submit-review': 'إرسال التقيم <i class="fas fa-paper-plane"></i>',
            'rating-label': 'تقييمك:',
            'about-p1': 'مرحباً! أنا <span class="highlight">مي عبدالله</span>، مطورة تطبيقات فلاتر شغوفة، حاصلة على درجة البكالوريوس في علوم الحاسوب من جامعة الخرطوم. لدي خبرة تزيد عن سنتين في بناء تطبيقات جوال قابلة للتوسع وعابرة للأنظمة.',
            'about-p2': 'تتركز خبرتي بشكل كبير في <span class="highlight">Flutter</span> و <span class="highlight">Dart</span>، مع خلفية قوية في تصميم واجهات المستخدم (UI/UX)، وربط تطبيقات الـ RESTful API، وإدارة الحالة (State Management) باستخدام <span class="highlight">BLoC</span> و <span class="highlight">Cubit</span>.',
            'about-p3': 'أقوم ببناء التطبيقات باستخدام أنماط <span class="highlight">Clean Architecture</span> و <span class="highlight">MVVM</span> لضمان سهولة الصيانة والأداء العالي.',
            'exp-gtg-date': 'يوليو 2025 - الحاضر',
            'exp-gtg-title': 'مطورة تطبيقات موبايل',
            'exp-gtg-company': 'Gulf Tech Group | دبي، الإمارات العربية المتحدة',
            'exp-gtg-task1': 'تصميم وبناء تطبيقات موبايل عالية الأداء باستخدام Flutter و Dart.',
            'exp-gtg-task2': 'تسريع أداء التطبيقات بنسبة 40% من خلال تحسين الكود وإدارة الحالة الفعالة.',
            'exp-gtg-task3': 'تقليل استهلاك الذاكرة عبر تنفيذ استراتيجيات التخزين المؤقت المتقدمة وتحسين الأصول.',
            'exp-gtg-task4': 'إدارة دورة حياة التطبيق بالكامل، بما في ذلك الرفع على المتاجر والتحديثات المستمرة.',
            'exp-morph-date': 'مارس 2024 - مارس 2025',
            'exp-morph-title': 'مطورة تطبيقات فلاتر (تعاقد بالمشروع)',
            'exp-morph-company': 'Morph | المملكة العربية السعودية (عن بعد)',
            'exp-morph-task1': 'تطوير وتحسين تطبيقات موبايل قوية عابرة للأنظمة لمنصات الأندرويد والآيفون.',
            'exp-morph-task2': 'بناء حلول برمجية قابلة للتوسع باستخدام أنماط Clean Architecture و MVVM لضمان سهولة الصيانة.',
            'exp-morph-task3': 'ربط برمجيات RESTful API المعقدة وإدارة الحالة بكفاءة باستخدام تقنيات إدارة الحالة المتقدمة.',
            'exp-morph-task4': 'التعاون عن بعد لتقديم ميزات عالية الجودة، مع التركيز على دقة الواجهات وتحسين الأداء.',
            'exp-free-date': 'نوفمبر 2023 - الحاضر',
            'exp-free-title': 'مطورة تطبيقات فلاتر (عمل حر)',
            'exp-free-task1': 'تقديم حلول موبايل شاملة لمجموعة متنوعة من العملاء، تغطي دورة التطوير الكاملة من المتطلبات الأولية وحتى الرفع على المتاجر.',
            'exp-free-task2': 'ربط احترافي لمختلف الخدمات الخارجية بما في ذلك بوابات الدفع الآمنة، تحليلات Firebase، والرسائل السحابية الحية.',
            'exp-free-task3': 'تحسين أداء التطبيقات باستمرار، مع التركيز على سلاسة الانتقالات بين الواجهات، الإدارة الفعالة للذاكرة، وتقليل أوقات التحميل.',
            'exp-free-task4': 'تقديم استشارات تقنية للشركات الناشئة، للمساعدة في تحويل مفاهيم الأعمال إلى منتجات موبايل عالية الجودة وقابلة للتوسع.'
        }
    };

    const langBtn = document.getElementById('lang-switch');

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            updateUI();
            loadProjectsFromFirebase();
            loadTestimonialsFromFirebase();
        });
    }

    function updateUI() {
        // Update static text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });

        // Update button text and body direction
        if (currentLang === 'ar') {
            if (langBtn) langBtn.textContent = 'EN';
            document.body.classList.add('rtl');
        } else {
            if (langBtn) langBtn.textContent = 'AR';
            document.body.classList.remove('rtl');
        }
    }

    // Star Rating Logic
    const starsContainer = document.getElementById('star-rating-input');
    const ratingInput = document.getElementById('review-rating');

    if (starsContainer) {
        const stars = starsContainer.querySelectorAll('i');

        // Function to set stars
        const setStars = (value) => {
            stars.forEach(s => {
                const sValue = parseInt(s.getAttribute('data-value'));
                if (sValue <= value) {
                    s.classList.replace('far', 'fas');
                } else {
                    s.classList.replace('fas', 'far');
                }
            });
        };

        // Initialize with 5 stars
        setStars(5);

        stars.forEach(star => {
            star.addEventListener('click', function () {
                const value = parseInt(this.getAttribute('data-value'));
                ratingInput.value = value;
                setStars(value);
            });
        });
    }

    // Modal Logic
    const reviewModal = document.getElementById('review-modal');
    const openModalBtn = document.getElementById('open-review-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    if (openModalBtn) {
        openModalBtn.onclick = () => reviewModal.style.display = "block";
    }

    if (closeModalBtn) {
        closeModalBtn.onclick = () => reviewModal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == reviewModal) {
            reviewModal.style.display = "none";
        }
    }

    const testimonialForm = document.getElementById('testimonialForm');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = testimonialForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = (currentLang === 'ar' ? 'جاري الحفظ...' : 'Saving...') + ' <i class="fas fa-spinner fa-spin"></i>';

            const writer = document.getElementById('review-writer').value;
            const content = document.getElementById('review-content').value;
            const rating = parseInt(document.getElementById('review-rating').value);

            try {
                if (window.db && window.firebaseDocs) {
                    const { collection, addDoc, serverTimestamp } = window.firebaseDocs;
                    await addDoc(collection(window.db, "testimonails"), {
                        writer: writer,
                        content: content,
                        rating: rating,
                        date: serverTimestamp()
                    });

                    btn.innerHTML = (currentLang === 'ar' ? 'شكراً لرأيك!' : 'Thank you!') + ' <i class="fas fa-check"></i>';
                    setTimeout(() => {
                        reviewModal.style.display = "none";
                        testimonialForm.reset();
                        btn.innerHTML = originalText;
                        loadTestimonialsFromFirebase(); // Reload reviews
                    }, 2000);
                }
            } catch (error) {
                console.error("Error submitting testimonial: ", error);
                btn.innerHTML = 'Error! <i class="fas fa-times"></i>';
                setTimeout(() => btn.innerHTML = originalText, 3000);
            }
        });
    }

    // Contact Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = (currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...') + ' <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;

            try {
                if (window.db && window.firebaseDocs) {
                    const { collection, addDoc, serverTimestamp } = window.firebaseDocs;
                    await addDoc(collection(window.db, "messages"), {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                        timestamp: serverTimestamp()
                    });

                    btn.innerHTML = (currentLang === 'ar' ? 'تم الإرسال!' : 'Message Sent!') + ' <i class="fas fa-check"></i>';
                    btn.style.background = 'linear-gradient(135deg, #27C93F, #20a633)';
                    contactForm.reset();
                }
            } catch (error) {
                console.error("Error sending message: ", error);
                btn.innerHTML = (currentLang === 'ar' ? 'خطأ!' : 'Error!') + ' <i class="fas fa-times"></i>';
                btn.style.background = '#ff5f56';
            }

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.opacity = '1';
            }, 3000);
        });
    }

    // --- Firebase Integration ---
    const projectsGrid = document.getElementById('projects-grid');

    async function loadProjectsFromFirebase() {
        if (!window.db || !window.firebaseDocs) return;

        // Show spinner while loading
        if (projectsGrid) {
            projectsGrid.innerHTML = `
                <div class="loading-spinner" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <i class="fas fa-spinner fa-spin fa-3x" style="color: var(--accent-color);"></i>
                    <p style="margin-top: 1rem;">${currentLang === 'ar' ? 'جاري تحميل المشاريع...' : 'Loading amazing projects...'}</p>
                </div>
            `;
        }

        try {
            const { collection, getDocs, query, orderBy } = window.firebaseDocs;
            const q = query(collection(window.db, "projects"), orderBy("order", "asc"));
            const querySnapshot = await getDocs(q);

            if (projectsGrid) projectsGrid.innerHTML = '';

            if (querySnapshot.empty) {
                projectsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">${currentLang === 'ar' ? 'لا توجد مشاريع حالياً.' : 'No projects found.'}</p>`;
                return;
            }

            querySnapshot.forEach((doc) => {
                const data = { ...doc.data(), id: doc.id };
                const projectCard = createProjectCard(data);
                if (projectsGrid) projectsGrid.appendChild(projectCard);
            });
        } catch (error) {
            console.error("Error fetching projects: ", error);
            if (projectsGrid) {
                projectsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #ff5f56;">Error loading projects.</p>`;
            }
        }
    }

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card glass-card';

        // Extract values based on current language
        const title = project.title ? (project.title[currentLang] || project.title.en || project.title) : 'Untitled';
        const description = project.description ? (project.description[currentLang] || project.description.en || project.description) : '';
        const statusText = project.status && typeof project.status === 'object' ? (project.status[currentLang] || project.status.en) : (project.status || '');

        // Use localized technologies array for short tags
        const techArray = project.technologies ? (project.technologies[currentLang] || project.technologies.en || []) : (project.tags || []);
        const techHtml = techArray.map(tech => `<span class="tag">${tech}</span>`).join('');

        // 1. Search for Logo (Smart Case-Insensitive Search)
        const logoKey = Object.keys(project).find(k => k.toLowerCase() === 'logo');
        const logoUrl = logoKey ? project[logoKey] : null;

        // 2. Search for Screenshots (Check for imageUrls array OR numbered fields 1, 2, 3...)
        let firstScreenshot = null;
        if (project.imageUrls && project.imageUrls.length > 0) {
            firstScreenshot = project.imageUrls[0];
        } else if (project['1']) {
            firstScreenshot = project['1'];
        }

        // 3. Set Thumbnail Content (Priority: Logo > Screenshot > Icon)
        let thumbContent = `<div class="project-placeholder"><i class="${project.icon || 'fas fa-rocket'}"></i></div>`;

        if (logoUrl && typeof logoUrl === 'string') {
            thumbContent = `<div class="project-placeholder logo-container"><img src="${logoUrl}" alt="${title}" class="project-logo-small"></div>`;
        } else if (firstScreenshot) {
            thumbContent = `<img src="${firstScreenshot}" alt="${title}" class="project-img-real">`;
        }

        // Generate Store Links for overlay
        let linksHtml = '';
        const links = project.projectLinks || project.links;
        if (links) {
            const appStoreUrl = links['Apple store'] || links.appStore || links.appleStore;
            const googlePlayUrl = links['Google play'] || links.googlePlay;
            const githubUrl = links.github || links.GitHub;

            if (appStoreUrl) linksHtml += `<a href="${appStoreUrl}" target="_blank" class="project-link"><i class="fab fa-apple"></i></a>`;
            if (googlePlayUrl) linksHtml += `<a href="${googlePlayUrl}" target="_blank" class="project-link"><i class="fab fa-google-play"></i></a>`;
            if (githubUrl) linksHtml += `<a href="${githubUrl}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>`;
        }

        card.innerHTML = `
            <div class="project-image">
                ${thumbContent}
                ${statusText ? `<div class="project-status-badge">${statusText}</div>` : ''}
                <div class="project-links-overlay">
                    ${linksHtml}
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${title}</h3>
                <p class="project-desc">${description.substring(0, 100)}${description.length > 100 ? '...' : ''}</p>
                <div class="project-tags">
                    ${techHtml}
                </div>
                <button class="view-details-btn" data-i18n="view-details">
                    <span>${currentLang === 'ar' ? 'عرض التفاصيل' : 'See Details'}</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;

        // Add click event for the details button
        const detailsBtn = card.querySelector('.view-details-btn');
        detailsBtn.onclick = () => openProjectDetails(project);

        return card;
    }

    const projectModal = document.getElementById('project-modal');
    const projectDetailsContent = document.getElementById('project-details-content');
    const closeProjectModalBtn = document.getElementById('close-project-modal');

    if (closeProjectModalBtn) {
        closeProjectModalBtn.onclick = () => projectModal.style.display = "none";
    }

    function openProjectDetails(project) {
        const title = project.title ? (project.title[currentLang] || project.title.en || project.title) : 'Untitled';
        const description = project.description ? (project.description[currentLang] || project.description.en || project.description) : '';
        const features = project.features ? (project.features[currentLang] || project.features.en || []) : [];
        const languages = project.languages ? (project.languages[currentLang] || project.languages.en || (typeof project.languages === 'string' ? project.languages : '')) : '';
        const status = project.status ? (project.status[currentLang] || project.status.en || project.status) : 'Active';

        // 1. Images Gallery
        let galleryHtml = '';
        if (project.imageUrls && project.imageUrls.length > 0) {
            galleryHtml = `
                <div class="details-gallery">
                    ${project.imageUrls.map(url => `<img src="${url}" alt="Screenshot" onclick="window.open('${url}', '_blank')">`).join('')}
                </div>
            `;
        }

        // 2. Features List
        let featuresHtml = '';
        if (features.length > 0) {
            featuresHtml = `
                <h4 class="details-features-title">${currentLang === 'ar' ? 'المميزات الرئيسية' : 'Key Features'}</h4>
                <div class="features-list">
                    ${features.map(f => `<div class="feature-item"><i class="fas fa-check-circle"></i> ${f}</div>`).join('')}
                </div>
            `;
        }

        // 3. Technologies Tags
        const techArray = project.technologies ? (project.technologies[currentLang] || project.technologies.en || []) : (project.tags || []);
        let techHtml = '';
        if (techArray.length > 0) {
            techHtml = techArray.map(tech => `<span class="tag" style="margin-bottom: 0.5rem;">${tech}</span>`).join('');
        }

        // 4. Dynamic Metadata (Capture all other fields from Firebase)
        const excludedKeys = ['title', 'description', 'features', 'languages', 'imageUrls', 'status', 'icon', 'logo', 'order', 'tags', 'technologies', 'projectLinks', 'links', 'id', '1', '2', '3', '4', '5'];
        let additionalMetadataHtml = '';

        Object.keys(project).forEach(key => {
            if (!excludedKeys.includes(key)) {
                let val = project[key];
                // Handle localized objects
                if (typeof val === 'object' && val !== null && (val.en || val.ar)) {
                    val = val[currentLang] || val.en;
                }

                if (val && (typeof val === 'string' || typeof val === 'number')) {
                    const displayKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                    additionalMetadataHtml += `<div class="meta-item"><strong>${displayKey}:</strong> <span>${val}</span></div>`;
                }
            }
        });

        // 5. Project Links
        let linksHtml = '';
        const links = project.projectLinks || project.links;
        if (links) {
            const appStoreUrl = links['Apple store'] || links.appStore || links.appleStore;
            const googlePlayUrl = links['Google play'] || links.googlePlay;
            const githubUrl = links.github || links.GitHub;
            const webUrl = links.web || links.website || links.live;

            if (appStoreUrl) linksHtml += `<a href="${appStoreUrl}" target="_blank" class="btn btn-outline btn-sm"><i class="fab fa-apple"></i> App Store</a>`;
            if (googlePlayUrl) linksHtml += `<a href="${googlePlayUrl}" target="_blank" class="btn btn-outline btn-sm"><i class="fab fa-google-play"></i> Google Play</a>`;
            if (githubUrl) linksHtml += `<a href="${githubUrl}" target="_blank" class="btn btn-outline btn-sm"><i class="fab fa-github"></i> GitHub</a>`;
            if (webUrl) linksHtml += `<a href="${webUrl}" target="_blank" class="btn btn-outline btn-sm"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
        }

        projectDetailsContent.innerHTML = `
            ${galleryHtml}
            <div class="details-header" style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
                ${project.languages && project.languages.logo ? `<img src="${project.languages.logo}" alt="Logo" style="width: 60px; height: 60px; border-radius: 12px; object-fit: contain; background: rgba(255,255,255,0.05); padding: 5px;">` : ''}
                <h2 class="gradient-text" style="margin: 0;">${title}</h2>
            </div>
            
            <p class="project-desc" style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">${description}</p>
            
            ${techHtml ? `<div class="modal-tech-tags" style="margin-bottom: 2rem; display: flex; flex-wrap: wrap; gap: 0.8rem;">${techHtml}</div>` : ''}
            
            ${featuresHtml}

            <div class="details-meta-grid">
                <div class="meta-item"><strong>${currentLang === 'ar' ? 'الحالة:' : 'Status:'}</strong> <span>${status}</span></div>
                ${languages ? `<div class="meta-item"><strong>${currentLang === 'ar' ? 'الدعم:' : 'Supports:'}</strong> <span class="lang-badge">${languages}</span></div>` : ''}
                ${additionalMetadataHtml}
            </div>

            ${linksHtml ? `<div class="details-links">${linksHtml}</div>` : ''}
        `;

        projectModal.style.display = "block";
    }

    // --- Testimonials Integration ---
    const testimonialsGrid = document.getElementById('testimonials-grid');
    const testimonialDetailModal = document.getElementById('testimonial-detail-modal');
    const testimonialDetailContent = document.getElementById('testimonial-detail-content');
    const closeTestimonialDetailBtn = document.getElementById('close-testimonial-detail-modal');

    if (closeTestimonialDetailBtn) {
        closeTestimonialDetailBtn.onclick = () => testimonialDetailModal.style.display = "none";
    }

    async function loadTestimonialsFromFirebase() {
        if (!window.db || !window.firebaseDocs) return;

        try {
            const { collection, getDocs } = window.firebaseDocs;
            const querySnapshot = await getDocs(collection(window.db, "testimonails"));

            if (testimonialsGrid) {
                testimonialsGrid.innerHTML = '';
                stopAutoScroll(); // Clear any existing interval
            }

            if (querySnapshot.empty) {
                if (testimonialsGrid) {
                    testimonialsGrid.innerHTML = `
                        <div class="empty-state">
                            <i class="far fa-comments"></i>
                            <p>${currentLang === 'ar' ? 'لا توجد تقييمات حالياً. كن أول من يضيف رأيه!' : 'No testimonials yet. Be the first to share your experience!'}</p>
                        </div>
                    `;
                }
                return;
            }

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const card = createTestimonialCard(data);
                if (testimonialsGrid) testimonialsGrid.appendChild(card);
            });

            startAutoScroll();
        } catch (error) {
            console.error("Error fetching testimonials: ", error);
        }
    }

    function createTestimonialCard(data) {
        const card = document.createElement('div');
        card.className = 'testimonial-card glass-card';

        // Extract localized values
        const content = data.content ? (data.content[currentLang] || data.content.en || data.content) : '';
        const writer = data.writer ? (data.writer[currentLang] || data.writer.en || data.writer) : 'Anonymous';

        const stars = '⭐'.repeat(data.rating || 5);
        const date = data.date ? new Date(data.date.seconds * 1000).toLocaleDateString() : '';

        // Check if content needs "Read More" (more than ~150 chars)
        const isLong = content.length > 150;
        const readMoreHtml = isLong ? `<button class="read-more-btn">${currentLang === 'ar' ? 'اقرأ المزيد' : 'Read More'}</button>` : '';

        card.innerHTML = `
            <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
            <p class="testimonial-content">${content}</p>
            ${readMoreHtml}
            <div class="testimonial-stars">${stars}</div>
            <div class="testimonial-writer">${writer}</div>
            <div class="testimonial-date">${date}</div>
        `;

        // Add event for Read More
        if (isLong) {
            card.querySelector('.read-more-btn').onclick = () => openTestimonialDetail(content, writer, stars);
        }

        return card;
    }

    function openTestimonialDetail(content, writer, stars) {
        testimonialDetailContent.innerHTML = `
            <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
            <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem; font-style: italic;">${content}</p>
            <div class="testimonial-stars" style="font-size: 1.2rem; margin-bottom: 1rem;">${stars}</div>
            <div class="testimonial-writer" style="font-size: 1.1rem;">${writer}</div>
        `;
        testimonialDetailModal.style.display = "block";
    }

    // Auto Scroll Logic
    let scrollInterval;
    function startAutoScroll() {
        if (!testimonialsGrid) return;

        scrollInterval = setInterval(() => {
            testimonialsGrid.scrollLeft += 1;

            // Loop back to start
            if (testimonialsGrid.scrollLeft >= testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth - 1) {
                testimonialsGrid.scrollLeft = 0;
            }
        }, 50); // Adjust speed here
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    if (testimonialsGrid) {
        testimonialsGrid.onmouseenter = stopAutoScroll;
        testimonialsGrid.onmouseleave = startAutoScroll;
    }

    // Call initial loads
    updateUI();
    loadProjectsFromFirebase();
    loadTestimonialsFromFirebase();
});
