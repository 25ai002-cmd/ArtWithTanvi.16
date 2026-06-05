// --- DYNAMIC INTERACTIVE LOGIC FOR REVERIEOFTANVI ---

document.addEventListener('DOMContentLoaded', () => {

  // --- 0. CUSTOM TOAST NOTIFICATION UTILITY ---
  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'error') iconClass = 'fa-exclamation-circle';
    toast.innerHTML = `
      <i class="fas ${iconClass} toast-icon"></i>
      <span class="toast-message">${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // --- 1. HERO DESK CAROUSEL SCENARIO ---
  const deskArtworks = [
    { img: 'assets/sketch_botanical.png', name: 'Botanical Study' },
    { img: 'assets/canvas_dreamy.png', name: 'Nebula River' }
  ];
  
  let currentDeskArtIndex = 0;
  const deskArtworkImg = document.getElementById('desk-artwork-img');
  const deskArtworkName = document.getElementById('desk-artwork-name');
  
  if (deskArtworkImg && deskArtworkName) {
    setInterval(() => {
      // Fade out
      deskArtworkImg.style.opacity = 0;
      
      setTimeout(() => {
        currentDeskArtIndex = (currentDeskArtIndex + 1) % deskArtworks.length;
        const currentArt = deskArtworks[currentDeskArtIndex];
        
        deskArtworkImg.src = currentArt.img;
        deskArtworkName.textContent = currentArt.name;
        
        // Fade in
        deskArtworkImg.style.opacity = 1;
      }, 800); // Sync with CSS transition
    }, 6000);
  }

  // --- 2. HEADER SCROLL & MOBILE NAV TOGGLE ---
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Highlight Active Link based on scroll section
    let currentSection = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.clientHeight;
      if (window.scrollY >= (secTop - 150)) {
        currentSection = sec.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Mobile Nav Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      
      // Toggle nav list visibility in simple responsive way
      if (navMenu.style.display === 'block') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'block';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '80px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(252, 250, 246, 0.95)';
        navMenu.style.padding = '2rem';
        navMenu.style.borderBottom = '1px solid var(--border-light)';
        
        const navList = navMenu.querySelector('ul');
        if (navList) {
          navList.style.flexDirection = 'column';
          navList.style.alignItems = 'center';
          navList.style.gap = '1.5rem';
        }
      }
    });
    
    // Reset state on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 960) {
          navMenu.style.display = 'none';
          mobileToggle.classList.remove('active');
        }
      });
    });

    // Cleanup inline styles on window resize to prevent layout breaking
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) {
        navMenu.style.display = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.width = '';
        navMenu.style.background = '';
        navMenu.style.padding = '';
        navMenu.style.borderBottom = '';
        
        const navList = navMenu.querySelector('ul');
        if (navList) {
          navList.style.flexDirection = '';
          navList.style.alignItems = '';
          navList.style.gap = '';
        }
        mobileToggle.classList.remove('active');
      }
    });
  }

  // --- 3. SCROLL REVEAL ANIMATION OBSERVER ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // --- 4. GALLERY CATEGORY FILTER ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        if (filterValue === 'all') {
          item.style.display = 'flex';
          setTimeout(() => item.style.opacity = '1', 50);
        } else if (item.getAttribute('data-category') === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  // --- 5. GALLERY LIGHTBOX POPUP ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const titleText = item.querySelector('.gallery-title').textContent;
      const descText = item.querySelector('.gallery-desc').textContent;
      
      if (lightbox && lightboxImg && lightboxTitle && lightboxDesc) {
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = titleText;
        lightboxDesc.textContent = descText;
        lightbox.classList.add('active');
      }
    });
  });
  
  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  // --- 6. LIVE WALL PREVIEWER ---
  const wallBgImg = document.getElementById('wall-bg-img');
  const wallCanvas = document.getElementById('wall-canvas');
  const wallArtImg = document.getElementById('wall-art-img');
  
  const roomButtons = document.querySelectorAll('[data-room]');
  const sizeButtons = document.querySelectorAll('[data-size]');
  const frameButtons = document.querySelectorAll('[data-frame]');
  const artThumbs = document.querySelectorAll('.art-thumb');
  
  // Backdrop Switcher
  roomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roomButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const newRoomImg = btn.getAttribute('data-room');
      if (wallBgImg) {
        wallBgImg.style.opacity = 0;
        setTimeout(() => {
          wallBgImg.src = newRoomImg;
          wallBgImg.style.opacity = 1;
        }, 300);
      }
    });
  });
  
  // Artwork Picker
  artThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      artThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      
      const newArtSrc = thumb.getAttribute('data-art');
      
      if (wallArtImg) {
        wallArtImg.style.opacity = 0;
        setTimeout(() => {
          wallArtImg.src = newArtSrc;
          wallArtImg.style.opacity = 1;
        }, 300);
      }
    });
  });
  
  // Artwork Wall Sizing
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const newSize = btn.getAttribute('data-size');
      if (wallCanvas) {
        // Clear existing size classes
        wallCanvas.classList.remove('size-sm', 'size-md', 'size-lg');
        wallCanvas.classList.add(`size-${newSize}`);
      }
    });
  });
  
  // Frame border styles
  frameButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      frameButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const newFrame = btn.getAttribute('data-frame');
      if (wallCanvas) {
        wallCanvas.classList.remove('frame-none', 'frame-oak', 'frame-black', 'frame-gold');
        wallCanvas.classList.add(`frame-${newFrame}`);
      }
    });
  });

   // --- 9. PROFESSIONAL EMAIL INQUIRY PROCESS (BREVO API INTEGRATION) ---
  const emailForm = document.getElementById('email-inquiry-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const statusMsg = document.getElementById('contact-status-msg');

  // File Upload Elements
  const fileInput = document.getElementById('contact-file');
  const uploadZone = document.getElementById('upload-zone');
  const uploadPrompt = document.getElementById('upload-prompt');
  const previewContainer = document.getElementById('upload-preview-container');
  const previewImg = document.getElementById('upload-preview-img');
  const fileNameSpan = document.getElementById('upload-file-name');
  const removeFileBtn = document.getElementById('remove-file-btn');
  let base64FileData = null;
  let uploadFileName = "";

  if (fileInput && uploadZone) {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      uploadZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
      uploadZone.addEventListener(eventName, () => {
        uploadZone.style.borderColor = 'var(--color-sage)';
        uploadZone.style.backgroundColor = 'rgba(141, 168, 147, 0.05)';
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      uploadZone.addEventListener(eventName, () => {
        uploadZone.style.borderColor = '';
        uploadZone.style.backgroundColor = '';
      }, false);
    });

    // Handle dropped files
    uploadZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        fileInput.files = files;
        handleFileSelect(files[0]);
      }
    });

    // Handle selected files via browser
    fileInput.addEventListener('change', (e) => {
      if (fileInput.files.length > 0) {
        handleFileSelect(fileInput.files[0]);
      }
    });

    function handleFileSelect(file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please upload an image file (PNG, JPG, JPEG).', 'error');
        resetUploadZone();
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size exceeds 5MB. Please upload a smaller image.', 'error');
        resetUploadZone();
        return;
      }

      uploadFileName = file.name;
      fileNameSpan.textContent = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        base64FileData = e.target.result.split(',')[1];
        previewImg.src = e.target.result;
        uploadPrompt.style.display = 'none';
        previewContainer.style.display = 'flex';
      };
      reader.readAsDataURL(file);
    }

    removeFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      resetUploadZone();
    });

    function resetUploadZone() {
      fileInput.value = '';
      base64FileData = null;
      uploadFileName = "";
      previewImg.src = '';
      fileNameSpan.textContent = '';
      uploadPrompt.style.display = 'block';
      previewContainer.style.display = 'none';
    }
  }

  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const clientName = document.getElementById('contact-name').value;
      const clientEmail = document.getElementById('contact-email').value;
      const artMediumConfig = document.getElementById('contact-medium').value;
      const clientMessage = document.getElementById('contact-message').value;
      
      // Visual feedback: disable button & show loader
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Inquiry...';
      }
      
      if (statusMsg) {
        statusMsg.style.display = 'none';
        statusMsg.style.borderColor = 'transparent';
        statusMsg.style.backgroundColor = 'transparent';
        statusMsg.textContent = '';
      }

      const subjectText = `Art Commission Request - ${clientName}`;
      
      // Construct beautiful HTML body for the email Tanvi receives
      const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc; color: #334155;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Art Commission Request</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">Client Name:</td>
              <td style="padding: 8px 0; color: #0f172a;">${clientName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Client Email:</td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${clientEmail}" style="color: #3b82f6; text-decoration: none;">${clientEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569; vertical-align: top;">Configuration:</td>
              <td style="padding: 8px 0; color: #0f172a; font-style: italic;">${artMediumConfig || 'None specified'}</td>
            </tr>
          </table>
          
          <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #8da893; border-radius: 4px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <h4 style="margin: 0 0 10px 0; color: #475569;">Client Message & Vision:</h4>
            <p style="margin: 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${clientMessage}</p>
          </div>
          
          <p style="font-size: 0.85rem; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center;">
            This email was sent directly via your portfolio site using Brevo.
          </p>
        </div>
      `;

      // API request body for Brevo Transactional Email
      const requestData = {
        sender: {
          name: "ReverieOfTanvi Portfolio",
          email: "25ai056@sxca.edu.in"
        },
        to: [
          {
            email: "25ai056@sxca.edu.in",
            name: "Tanvi"
          }
        ],
        replyTo: {
          email: clientEmail,
          name: clientName
        },
        subject: subjectText,
        htmlContent: htmlContent
      };

      // Append attachment if client selected a file
      if (base64FileData && uploadFileName) {
        requestData.attachment = [
          {
            content: base64FileData,
            name: uploadFileName
          }
        ];
      }

      fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': CONFIG.BREVO_API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('API returned status: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        // Success State
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="far fa-envelope"></i> Send Commission Inquiry';
          submitBtn.disabled = false;
        }
        if (statusMsg) {
          statusMsg.style.display = 'block';
          statusMsg.style.backgroundColor = 'rgba(141, 168, 147, 0.1)';
          statusMsg.style.borderColor = 'var(--color-sage)';
          statusMsg.style.color = 'var(--color-sage)';
          statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your commission request has been sent successfully.';
        }
        emailForm.reset();
        if (fileInput && uploadZone) {
          // Reset file preview variables
          fileInput.value = '';
          base64FileData = null;
          uploadFileName = "";
          previewImg.src = '';
          fileNameSpan.textContent = '';
          uploadPrompt.style.display = 'block';
          previewContainer.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Error sending email via Brevo:', error);
        // Error State
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="far fa-envelope"></i> Send Commission Inquiry';
          submitBtn.disabled = false;
        }
        if (statusMsg) {
          statusMsg.style.display = 'block';
          statusMsg.style.backgroundColor = 'rgba(212, 140, 112, 0.1)';
          statusMsg.style.borderColor = 'var(--color-terracotta)';
          statusMsg.style.color = 'var(--color-terracotta)';
          statusMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send inquiry. Please try again or reach out on Instagram.';
        }
      });
    });
  }

  // --- 10. SHOPPING CART SYSTEM ---
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('dreamystrokes_cart')) || [];
  } catch (e) {
    cart = [];
  }

  const cartToggle = document.getElementById('cart-toggle');
  const cartClose = document.getElementById('cart-close');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCountBadge = document.getElementById('cart-count');
  const cartDrawerBody = document.getElementById('cart-drawer-body');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const checkoutIgBtn = document.getElementById('checkout-ig-btn');
  const checkoutEmailBtn = document.getElementById('checkout-email-btn');

  // Toggle Cart Drawer
  if (cartToggle && cartDrawer && cartOverlay) {
    cartToggle.addEventListener('click', () => {
      cartDrawer.classList.add('active');
      cartOverlay.classList.add('active');
    });
  }

  if (cartClose && cartOverlay && cartDrawer) {
    const closeCart = () => {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
    };
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
  }

  // Add Item to Cart
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent modal popup trigger
      const id = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title');
      const price = parseFloat(btn.getAttribute('data-price'));
      const img = btn.getAttribute('data-img');

      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, title, price, img, quantity: 1 });
      }

      updateCartUI();
      
      // Open drawer for visual feedback
      if (cartDrawer && cartOverlay) {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
      }
    });
  });

  // Update Cart UI function
  function updateCartUI() {
    localStorage.setItem('dreamystrokes_cart', JSON.stringify(cart));
    
    // Update Badge count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) {
      cartCountBadge.textContent = totalCount;
    }

    // Render Items
    if (!cartDrawerBody) return;
    
    if (cart.length === 0) {
      cartDrawerBody.innerHTML = '<div class="cart-empty-msg">Your cart is empty. Add some beautiful strokes!</div>';
      if (cartSubtotalEl) cartSubtotalEl.textContent = '₹0';
      return;
    }

    let cartHtml = '';
    let subtotal = 0;

    cart.forEach(item => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;
      
      cartHtml += `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.title}" class="cart-img-fluid cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</div>
          </div>
          <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
    });

    cartDrawerBody.innerHTML = cartHtml;
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    }

    // Bind remove buttons
    const removeButtons = cartDrawerBody.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
      });
    });
  }

  // Cart Checkout Templates
  function buildCartMessage() {
    let msg = `Hi Tanvi! I would like to order the following art pieces from your portfolio website:\n\n`;
    let subtotal = 0;
    cart.forEach(item => {
      msg += `- ${item.quantity}x ${item.title} (₹${item.price.toLocaleString('en-IN')} each)\n`;
      // Append image reference URL from GitHub repository
      const imgFileName = item.img.split('/').pop();
      const publicImageUrl = `https://raw.githubusercontent.com/25ai002-cmd/ArtWithTanvi.16/main/assets/${imgFileName}`;
      msg += `  Photo Reference: ${publicImageUrl}\n`;
      subtotal += item.price * item.quantity;
    });
    msg += `\nTotal: ₹${subtotal.toLocaleString('en-IN')} INR\n\nPlease let me know how to complete my order! Thank you.`;
    return msg;
  }

  // Checkout via Instagram
  if (checkoutIgBtn) {
    checkoutIgBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      const msg = buildCartMessage();
      navigator.clipboard.writeText(msg).then(() => {
        showToast('Order message copied! Redirecting to Instagram DMs...', 'success');
        window.open('https://www.instagram.com/artwithtanvi_.16/', '_blank');
      }).catch(err => {
        window.open('https://www.instagram.com/artwithtanvi_.16/', '_blank');
      });
    });
  }

  // Checkout via Email (Gmail compose redirect)
  if (checkoutEmailBtn) {
    checkoutEmailBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      const msg = buildCartMessage();
      const subjectText = `Art Order Request - ${cart.length} items`;
      
      // Gmail Compose URL
      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=25ai056@sxca.edu.in&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(msg)}`;
      window.open(gmailComposeUrl, '_blank');
    });
  }

  // --- 11. INSTAGRAM BIO LINK AUTO-SCROLL TO GALLERY ---
  const referrer = (document.referrer || '').toLowerCase();
  const userAgent = (navigator.userAgent || '').toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash;
  
  const isFromInstagram = referrer.includes('instagram') || 
                          referrer.includes('com.instagram.android') ||
                          userAgent.includes('instagram') ||
                          urlParams.has('ref') && urlParams.get('ref').toLowerCase() === 'ig' ||
                          urlParams.has('source') && urlParams.get('source').toLowerCase() === 'instagram' ||
                          urlParams.has('source') && urlParams.get('source').toLowerCase() === 'ig' ||
                          urlParams.has('utm_source') && urlParams.get('utm_source').toLowerCase() === 'instagram' ||
                          urlParams.has('ig') ||
                          urlParams.has('igshid') ||
                          hash === '#gallery';
                          
  function scrollToGallery(behavior = 'auto') {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      const header = document.getElementById('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const offsetTop = gallerySection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: behavior
      });

      // Force reveal elements in the gallery section to be active/visible immediately
      const revealElements = gallerySection.querySelectorAll('.reveal');
      revealElements.forEach(el => el.classList.add('active'));

      // Set active state on gallery navigation link
      const galleryNavLink = document.querySelector('a[href="#gallery"]');
      if (galleryNavLink) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        galleryNavLink.classList.add('active');
      }
    }
  }

  if (isFromInstagram) {
    // Attempt instant scroll immediately on DOMContentLoaded
    scrollToGallery('auto');
    
    // Also schedule after a tiny delay to ensure layout is fully calculated
    setTimeout(() => {
      scrollToGallery('auto');
    }, 100);

    // Final correction on window load (when all images are loaded)
    window.addEventListener('load', () => {
      scrollToGallery('auto');
    });
  }

  // Initialize UI
  updateCartUI();
});
