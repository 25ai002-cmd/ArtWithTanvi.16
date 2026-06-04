// --- DYNAMIC INTERACTIVE LOGIC FOR DREAMYSTROKES ---

document.addEventListener('DOMContentLoaded', () => {

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
        navMenu.style.background = 'rgba(8, 12, 9, 0.95)';
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
      const newArtMedium = thumb.getAttribute('data-medium');
      
      if (wallArtImg) {
        wallArtImg.style.opacity = 0;
        setTimeout(() => {
          wallArtImg.src = newArtSrc;
          wallArtImg.style.opacity = 1;
        }, 300);
      }
      
      // Auto-update Est Pricing medium to match
      if (newArtMedium) {
        document.querySelectorAll('[data-est-style]').forEach(btn => {
          btn.classList.remove('active');
          if (btn.getAttribute('data-est-style') === newArtMedium) {
            btn.classList.add('active');
          }
        });
        updatePriceEstimate();
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

  // --- 7. INTERACTIVE COST ESTIMATOR ---
  let selectedMedium = 'sketch'; // 'sketch' or 'canvas'
  let selectedSliderSize = 2; // 1: Small, 2: Medium, 3: Large
  let selectedFrame = 'none'; // 'none', 'oak', 'black', 'gold'
  
  const styleSketchBtn = document.getElementById('est-style-sketch');
  const styleCanvasBtn = document.getElementById('est-style-canvas');
  const sizeSlider = document.getElementById('size-slider');
  const sizeLabel = document.getElementById('slider-size-label');
  const estFrameButtons = document.querySelectorAll('[data-est-frame]');
  
  const priceInrEl = document.getElementById('price-val-inr');
  const summarySpecEl = document.getElementById('summary-spec-text');
  
  // Base rates and pricing rules in Indian Rupees (INR)
  const baseRates = {
    sketch: 2500,
    canvas: 6000
  };
  
  const sizeMultipliers = {
    1: 1.0,  // Small (A5)
    2: 1.5,  // Medium (A4)
    3: 2.2   // Large (A3)
  };
  
  const sizeTextMap = {
    1: 'Small (A5 - 6"x8")',
    2: 'Medium (A4 - 8"x12")',
    3: 'Large (A3 - 12"x16")'
  };
  
  const framingRates = {
    none: { 1: 0, 2: 0, 3: 0 },
    oak: { 1: 1000, 2: 1800, 3: 3000 },
    black: { 1: 800, 2: 1500, 3: 2500 },
    gold: { 1: 1500, 2: 2500, 3: 4200 }
  };
  
  const frameTextMap = {
    none: 'Without Frame (Canvas Sheet)',
    oak: 'Natural Oak Wood Frame',
    black: 'Metallic Obsidian Frame',
    gold: 'Classic Gold Leaf Frame'
  };
  
  const mediumTextMap = {
    sketch: 'Graphite/Charcoal Sketch',
    canvas: 'Vibrant Canvas Painting'
  };
  
  function updatePriceEstimate() {
    // 1. Get active inputs
    // Medium
    const activeMediumBtn = document.querySelector('[data-est-style].active');
    if (activeMediumBtn) {
      selectedMedium = activeMediumBtn.getAttribute('data-est-style');
    }
    
    // Size Slider
    if (sizeSlider) {
      selectedSliderSize = parseInt(sizeSlider.value);
    }
    
    // Frame
    const activeFrameBtn = document.querySelector('[data-est-frame].active');
    if (activeFrameBtn) {
      selectedFrame = activeFrameBtn.getAttribute('data-est-frame');
    }
    
    // 2. Perform Calculation
    const base = baseRates[selectedMedium];
    const multiplier = sizeMultipliers[selectedSliderSize];
    const framingCost = framingRates[selectedFrame][selectedSliderSize];
    
    const totalInr = Math.round((base * multiplier) + framingCost);
    
    // 3. Update DOM UI
    if (priceInrEl) priceInrEl.textContent = totalInr.toLocaleString('en-IN');
    
    if (sizeLabel) {
      sizeLabel.textContent = sizeTextMap[selectedSliderSize];
    }
    
    if (summarySpecEl) {
      summarySpecEl.innerHTML = `${sizeTextMap[selectedSliderSize]} ${mediumTextMap[selectedMedium]}<br><span style="color: var(--color-terracotta);">${frameTextMap[selectedFrame]}</span>`;
    }
    
    // Auto-prefill the contact form input with the current design config
    const contactMediumInput = document.getElementById('contact-medium');
    if (contactMediumInput) {
      contactMediumInput.value = `${sizeTextMap[selectedSliderSize]} ${mediumTextMap[selectedMedium]} (${frameTextMap[selectedFrame]}) - Est: ₹${totalInr.toLocaleString('en-IN')}`;
    }
  }
  
  // Event Listeners for Estimator controls
  if (styleSketchBtn && styleCanvasBtn) {
    styleSketchBtn.addEventListener('click', () => {
      styleCanvasBtn.classList.remove('active');
      styleSketchBtn.classList.add('active');
      updatePriceEstimate();
    });
    styleCanvasBtn.addEventListener('click', () => {
      styleSketchBtn.classList.remove('active');
      styleCanvasBtn.classList.add('active');
      updatePriceEstimate();
    });
  }
  
  if (sizeSlider) {
    sizeSlider.addEventListener('input', updatePriceEstimate);
  }
  
  estFrameButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      estFrameButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updatePriceEstimate();
    });
  });
  
  // Initialize Pricing estimator values
  updatePriceEstimate();

  // --- 8. INSTAGRAM DM ORDER BUTTON PROCESS ---
  const orderDmBtn = document.getElementById('order-dm-btn');
  const dmSuccessEl = document.getElementById('dm-copy-success');
  
  if (orderDmBtn) {
    orderDmBtn.addEventListener('click', () => {
      // 1. Build beautiful message template
      const orderMessage = `Hi Tanvi! I visited your portfolio website and would love to place a custom art order.
Here is the configuration I designed:
- Medium Style: ${mediumTextMap[selectedMedium]}
- Artwork Sizing: ${sizeTextMap[selectedSliderSize]}
- Framing Selection: ${frameTextMap[selectedFrame]}
- Estimated Budget: ₹${priceInrEl.textContent} INR

Details/Reference Photo description:
[Type your description or scene details here]

Please let me know how we can proceed!`;

      // 2. Copy message to user's clipboard
      navigator.clipboard.writeText(orderMessage).then(() => {
        // Show success notification
        if (dmSuccessEl) {
          dmSuccessEl.style.display = 'block';
          setTimeout(() => {
            dmSuccessEl.style.display = 'none';
          }, 3500);
        }
        
        // 3. Open Instagram direct link in a new window/tab after a short pause
        setTimeout(() => {
          window.open('https://www.instagram.com/artwithtanvi_.16/', '_blank');
        }, 1200);
      }).catch(err => {
        console.error('Error copying text: ', err);
        // Fallback: alert/redirect
        window.open('https://www.instagram.com/artwithtanvi_.16/', '_blank');
      });
    });
  }

   // --- 9. PROFESSIONAL EMAIL INQUIRY PROCESS (BREVO API INTEGRATION) ---
  const emailForm = document.getElementById('email-inquiry-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const statusMsg = document.getElementById('contact-status-msg');

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
          name: "dreamystrokes Portfolio",
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
});
