document.addEventListener('DOMContentLoaded', function() {
    // ========== SKILLS HOVER EFFECT ==========
    const skills = document.querySelectorAll('.skill-badge');
    skills.forEach(skill => {
        skill.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#3498db';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
        });
        
        skill.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#ecf0f1';
            this.style.color = '#2c3e50';
            this.style.transform = 'scale(1)';
        });
    });

    // ========== EXPERIENCE ITEMS ANIMATION ==========
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100);
    });

    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            console.log('Contact Form Submitted:', { email, message });
            showNotification('Message sent successfully!', 'success');
            this.reset();
        });
    }

    // ========== COMMENT FORM HANDLING ==========
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const comment = document.getElementById('comment').value.trim();
            
            // Validation
            if (!name || !comment) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            console.log('Comment Submitted:', { name, comment });
            showNotification('Comment submitted successfully!', 'success');
            this.reset();
        });
    }

    // ========== BULLETPROOF RESUME DOWNLOAD ==========
    const downloadBtn = document.getElementById('downloadResume');
    const downloadStatus = document.getElementById('downloadStatus');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 1. Define the PDF filename (must match your actual file)
            const pdfFilename = 'Kyle-Tuazon-Resume.pdf';
            
            // 2. Show downloading status
            downloadStatus.textContent = "Starting download...";
            downloadStatus.style.color = "#3498db";
            
            // 3. Create the full URL to the PDF
            let pdfUrl;
            try {
                // Try to create proper URL (works on live servers)
                pdfUrl = new URL(pdfFilename, window.location.href).href;
            } catch (e) {
                // Fallback for local testing
                pdfUrl = pdfFilename;
            }
            
            // 4. Method 1: Standard download approach
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = pdfFilename;
            link.style.display = 'none';
            document.body.appendChild(link);
            
            try {
                link.click();
                downloadStatus.textContent = "Download started!";
                downloadStatus.style.color = "#2ecc71";
                showNotification('Resume download started!', 'success');
            } catch (error) {
                // 5. Method 2: If first method failed
                console.log("Standard download failed, trying alternative method...");
                try {
                    // Open in new tab as fallback
                    window.open(pdfUrl, '_blank');
                    downloadStatus.textContent = "Opened resume in new tab";
                    downloadStatus.style.color = "#f39c12";
                    showNotification('Opened resume in new tab', 'info');
                } catch (error) {
                    // 6. Final fallback
                    console.error("All download methods failed:", error);
                    downloadStatus.textContent = "Error: Could not download resume";
                    downloadStatus.style.color = "#e74c3c";
                    showNotification('Failed to download resume', 'error');
                    
                    // 7. Show troubleshooting help
                    console.log("Troubleshooting steps:");
                    console.log("1. Make sure '" + pdfFilename + "' exists in your project folder");
                    console.log("2. Verify the filename matches exactly (case-sensitive)");
                    console.log("3. Try accessing it directly: " + pdfUrl);
                    console.log("4. Test on a live web server (not file://)");
                }
            }
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(link);
            }, 100);
        });
    }

    // ========== HELPER FUNCTIONS ==========
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
});