// ==========================================
// MASTER SOCIAL MEDIA MANAGEMENT - CORE APP
// ==========================================

// Global state
let currentBrand = 'master'; // 'master', 'corely', 'suriosity', 'lansem'
let currentTab = 'dashboard'; // 'dashboard', 'accounts', 'scheduler', 'guidelines'

// Brand Information Database
const BRANDS_DB = {
    master: {
        name: 'Master Hub',
        themeClass: 'theme-master',
        kpi: {
            followers: '303.8K',
            followersChange: '+12.4%',
            followersUp: true,
            reach: '1.2M',
            reachChange: '+8.2%',
            reachUp: true,
            engagement: '4.9%',
            engagementChange: '+0.5%',
            engagementUp: true,
            scheduled: '14'
        },
        chartData: [20, 35, 30, 50, 45, 65, 80],
        accounts: [] // Combined from below
    },
    corely: {
        name: 'Corely Luxury',
        tagline: 'Luxury Essential Wear & Artisanal Textiles',
        themeClass: 'theme-corely',
        kpi: {
            followers: '257.3K',
            followersChange: '+15.1%',
            followersUp: true,
            reach: '840K',
            reachChange: '+11.3%',
            reachUp: true,
            engagement: '6.4%',
            engagementChange: '+1.2%',
            engagementUp: true,
            scheduled: '5'
        },
        chartData: [40, 45, 55, 50, 68, 72, 95],
        voice: {
            tagline: 'Minimalist, Sustainable, and Artisanal',
            traits: [
                { name: 'Elegant & Restrained', desc: 'Use quiet, thoughtful wording. Avoid loud promotional jargon, capitalize sparingly, and speak on durability.' },
                { name: 'Artisanal Transparency', desc: 'Focus heavily on raw materials (GOTS organic cotton, loops, weaves) and behind-the-scenes artisan profiles from Delhi.' },
                { name: 'Earthy & Modern', desc: 'Visual descriptions should match our sand, charcoal, and ivory colorways. Keep captions spacious with ample line breaks.' }
            ],
            hashtags: '#CorelyOrganics #SlowFashion #LuxuryEssentials #GOTS #DelhiTextiles #MinimalistStyle',
            templates: [
                {
                    tag: 'Product Launch',
                    desc: 'Instagram / Pinterest template for new collections',
                    body: `Sand, charcoal, and ivory. Corely Autumn Essentials.

Crafted from 400 GSM high-density loopback organic cotton. Verified GOTS certified mills. Hand-dyed and finished in Delhi. 

Designed to outlast trends. 
Pre-ordering opens this Friday. Link in bio.

#CorelyOrganics #SlowFashion #MinimalistStyle`
                },
                {
                    tag: 'Behind the Scenes',
                    desc: 'TikTok / Instagram Reel caption for supplier storytelling',
                    body: `Meet Rajesh. 

He manages our primary knitting house in Delhi. Every yard of our organic cotton passes through his hands. 

Transparency isn't a goal; it's our standard. 

#SlowFashion #GOTS #DelhiTextiles #Transparency`
                }
            ]
        },
        accounts: [
            { id: 'c-ig', platform: 'instagram', rgb: '225, 48, 108', handle: '@corely.apparel', followers: '52.4K', engagement: '4.8%', manager: 'Neha S.', status: 'Active', login: 'social@corely.com' },
            { id: 'c-pin', platform: 'pinterest', rgb: '189, 8, 28', handle: '@corely_essential', followers: '112.0K', engagement: '2.1%', manager: 'Neha S.', status: 'Active', login: 'pinterest@corely.com' },
            { id: 'c-tt', platform: 'tiktok', rgb: '0, 242, 254', handle: '@corely.wear', followers: '84.0K', engagement: '12.0%', manager: 'Aarav M.', status: 'Active', login: 'tiktok@corely.com' },
            { id: 'c-li', platform: 'linkedin', rgb: '0, 119, 181', handle: 'Corely Apparel', followers: '8.9K', engagement: '3.2%', manager: 'Arnab P.', status: 'Active', login: 'b2b@corely.com' }
        ]
    },
    suriosity: {
        name: 'Suriosity Agri',
        tagline: 'Premium Millet & Agricultural Exports from India',
        themeClass: 'theme-suriosity',
        kpi: {
            followers: '38.1K',
            followersChange: '+5.4%',
            followersUp: true,
            reach: '210K',
            reachChange: '-1.5%',
            reachUp: false,
            engagement: '3.2%',
            engagementChange: '+0.2%',
            engagementUp: true,
            scheduled: '4'
        },
        chartData: [15, 18, 16, 22, 24, 28, 30],
        voice: {
            tagline: 'Authoritative, Agrarian, and Trustworthy',
            traits: [
                { name: 'Expert & Technical', desc: 'Detail crop specifications, soil chemistry, moisture levels, and export logistics. Use clear, educational data.' },
                { name: 'Farmer-First', desc: 'Emphasize sourcing transparency, fair trade practices, and the livelihood of local farming clusters across India.' },
                { name: 'Global Compliance', desc: 'Highlight APEDA certifications, phytosanitary standards, and secure door-to-port supply chains.' }
            ],
            hashtags: '#SuriosityAgri #MilletExports #SustainableAgri #IndianExporters #SuperfoodMillet #APEDA',
            templates: [
                {
                    tag: 'Market Insights',
                    desc: 'LinkedIn / Twitter crop updates',
                    body: `Commodity Update: Indian Pearl Millet (Bajra).

As harvest wraps up, our moisture levels are charting a perfect 11-12% baseline. This guarantees optimal storage stability for long-transit ocean shipments.

We are currently booking shipments for Q3. Talk to our logistics desk today.

#SuriosityAgri #MilletExports #AgriBusiness`
                },
                {
                    tag: 'Sourcing Transparency',
                    desc: 'Facebook / YouTube short story on sourcing',
                    body: `Direct from the mandis of Rajasthan. 

We work closely with local farming cooperatives to ensure our Sorghum and Finger Millet meet strict EU pesticide-residue guidelines. 

From Indian soil to global port, quality is guaranteed. 

#SustainableAgri #SuperfoodMillet #IndianExporters`
                }
            ]
        },
        accounts: [
            { id: 's-li', platform: 'linkedin', rgb: '0, 119, 181', handle: 'Suriosity Agri Exports', followers: '15.2K', engagement: '5.1%', manager: 'Rajesh K.', status: 'Active', login: 'export@suriosity.com' },
            { id: 's-tw', platform: 'twitter', rgb: '29, 161, 242', handle: '@SuriosityAgri', followers: '3.4K', engagement: '2.9%', manager: 'Rajesh K.', status: 'Active', login: 'twitter@suriosity.com' },
            { id: 's-fb', platform: 'facebook', rgb: '24, 119, 242', handle: 'Suriosity Exporters', followers: '12.8K', engagement: '1.8%', manager: 'Sita G.', status: 'Active', login: 'facebook@suriosity.com' },
            { id: 's-yt', platform: 'youtube', rgb: '255, 0, 0', handle: 'Suriosity Agri India', followers: '6.7K', engagement: '4.2%', manager: 'Amit P.', status: 'Active', login: 'youtube@suriosity.com' }
        ]
    },
    lansem: {
        name: 'Lansem UK',
        tagline: 'Pure-Offshore UK Accounting & Legal Support Services',
        themeClass: 'theme-lansem',
        kpi: {
            followers: '8.4K',
            followersChange: '+22.6%',
            followersUp: true,
            reach: '150K',
            reachChange: '+20.5%',
            reachUp: true,
            engagement: '5.1%',
            engagementChange: '+1.8%',
            engagementUp: true,
            scheduled: '5'
        },
        chartData: [5, 8, 12, 18, 25, 32, 45],
        voice: {
            tagline: 'Secure, Professional, and Compliance-focused',
            traits: [
                { name: 'Ultra-Secure & Compliant', desc: 'Emphasize VDI lockdown, GDPR compliance, UK Virtual Entity structures, and HMRC regulatory alignments.' },
                { name: 'Cost Arbitrage Focus', desc: 'Contrast the 75% savings with the uncompromised UK standard delivery. Boldly state profitability metrics.' },
                { name: 'Timely & Explanatory', desc: 'Post proactively around HMRC deadlines, SRA rules, and fiscal year ends. Provide actionable UK SME advice.' }
            ],
            hashtags: '#LansemUK #AccountingOutsourcing #UKAccounting #GDPRSecure #VDI #HMRCCompliance',
            templates: [
                {
                    tag: 'Compliance Warning',
                    desc: 'LinkedIn regulatory alert for UK business owners',
                    body: `HMRC Filing Deadline Reminder.

Avoid late submission penalties. UK SMEs must file corporation tax accounts within 9 months of their financial year end.

Our secure, VDI-locked Indian delivery center can draft your management accounts overnight, saving you up to 75% on in-house accounting overhead. 

Send us a DM to set up a pilot.

#LansemUK #UKAccounting #HMRCCompliance`
                },
                {
                    tag: 'Security Spotlight',
                    desc: 'LinkedIn / Explainer script on data leakage prevention',
                    body: `How secure is your offshore accounting team?

With Lansem, zero data leaves the UK. Our professionals log in through dual-factor authenticated Virtual Desktop Infrastructures (VDI). 

Screen pixels are streamed; raw financial database downloads are locked. 

English Law contracts + full UK Professional Indemnity Insurance.

#GDPRSecure #VDI #AccountingOutsourcing`
                }
            ]
        },
        accounts: [
            { id: 'l-li', platform: 'linkedin', rgb: '0, 119, 181', handle: 'Lansem UK', followers: '4.2K', engagement: '6.4%', manager: 'Sarah L.', status: 'Active', login: 'sarah.l@lansem.co.uk' },
            { id: 'l-tw', platform: 'twitter', rgb: '29, 161, 242', handle: '@LansemUK', followers: '1.8K', engagement: '3.1%', manager: 'Sarah L.', status: 'Active', login: 'social@lansem.co.uk' },
            { id: 'l-yt', platform: 'youtube', rgb: '255, 0, 0', handle: 'Lansem Professional Services', followers: '2.4K', engagement: '5.8%', manager: 'Dave B.', status: 'Active', login: 'admin@lansem.co.uk' }
        ]
    }
};

// Combine all accounts for Master View
BRANDS_DB.master.accounts = [
    ...BRANDS_DB.corely.accounts,
    ...BRANDS_DB.suriosity.accounts,
    ...BRANDS_DB.lansem.accounts
];

const DEFAULT_POSTS = [
    { 
        id: 7, 
        brand: 'suriosity', 
        platforms: ['linkedin'], 
        content: `Ramesh Gond spent 12 years watching middlemen take 40% of his Kodo Millet profits. 

Today, his harvest is on a container ship bound for the European Union. 🚢

Here is how a farmer from a small village near Jabalpur, Madhya Pradesh, bypassed the traditional squeeze and found a global market:

### The Problem: A Broken Supply Chain
For generations, smallholders in MP's tribal belts have grown Kodo and Kutki—highly resilient, nutrient-dense ancient grains. They require very little water and thrive naturally without chemical fertilizers.

But the traditional local supply chain was holding them back:
* Multi-tiered middlemen buying at arbitrary, rock-bottom rates.
* Outdated physical grading that rejected healthy crop heaps.
* Long payment delays forcing farmers into high-interest debt cycles.

Ramesh had export-quality grains, but zero market transparency.

### The Solution: The Suriosity Direct-Sourcing Model
When we established Suriosity’s sourcing network in the Jabalpur division, we bypassed the middlemen and setup farm-gate collection units:

1. **Digital Grading**: We brought portable digital moisture meters directly to Ramesh’s farm. He saw the exact moisture reading (11.5%) in seconds. No guessing, no exploitation.
2. **Bypassing the Squeeze**: Sourcing directly from FPOs and gate collections allowed us to avoid heavy agent commissions, routing that savings directly to Ramesh.
3. **Export Training**: We trained Ramesh’s grower cluster on solar-drying and post-harvest handling to meet strict EU pesticide-residue and aflatoxin guidelines (< 4 ppb).

### The Real Impact
This season, Ramesh bypassed the traditional traders entirely. 
📈 His net income per hectare increased by **45%**.
💰 He received secure, instant digital payments on the same day.
🌾 His clean, organic-grade Kodo Millet was packed in export-certified multi-layer bags and shipped directly to Mundra port.

Direct-sourcing isn't just about supply-chain efficiency. It’s about dignifying agriculture.

When global food brands partner with Suriosity, they aren’t just importing premium grains. They are investing in the livelihood of growers like Ramesh.

How is your brand balancing direct-sourcing ethics with global pricing pressures this year? Let's discuss in the comments. 🤝

#SuriosityAgri #MilletExports #SustainableAgri #Agribusiness`, 
        category: 'sourcing', 
        status: 'to-view' 
    }
];
 
// Local Storage Manager for Scheduled Posts
function getScheduledPosts() {
    const stored = localStorage.getItem('master_scheduled_posts_v4');
    if (!stored) {
        localStorage.setItem('master_scheduled_posts_v4', JSON.stringify(DEFAULT_POSTS));
        return DEFAULT_POSTS;
    }
    return JSON.parse(stored);
}
 
function saveScheduledPosts(posts) {
    localStorage.setItem('master_scheduled_posts_v4', JSON.stringify(posts));
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    renderAll();
});

// Setup Events
function setupEventListeners() {
    // Brand buttons switching
    document.querySelectorAll('.brand-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const brand = e.currentTarget.dataset.brand;
            switchBrand(brand);
        });
    });

    // Nav navigation links switching
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const tab = e.currentTarget.dataset.tab;
            switchTab(tab);
        });
    });

    // Post creation form submission
    const scheduleForm = document.getElementById('post-schedule-form');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', handleAddPost);
    }

    // Post edit form submission
    const editPostForm = document.getElementById('edit-post-form');
    if (editPostForm) {
        editPostForm.addEventListener('submit', handleEditPostSubmit);
    }

    // Post edit delete button action
    const editPostDeleteBtn = document.getElementById('btn-edit-post-delete');
    if (editPostDeleteBtn) {
        editPostDeleteBtn.addEventListener('click', handleEditPostDelete);
    }

    // Modal close buttons
    document.querySelectorAll('.btn-modal-close, .modal-overlay').forEach(element => {
        element.addEventListener('click', (e) => {
            if (e.target === e.currentTarget || e.target.classList.contains('btn-modal-close') || e.target.classList.contains('fa-xmark')) {
                closeAllModals();
            }
        });
    });

    // Quick add post button
    const quickAddBtn = document.getElementById('quick-add-post-btn');
    if (quickAddBtn) {
        quickAddBtn.addEventListener('click', () => {
            switchTab('scheduler');
            // Focus on post creation form
            document.getElementById('post-content').focus();
        });
    }
}

// Switch between active brands
function switchBrand(brandId) {
    currentBrand = brandId;
    
    // Update active class on brand buttons
    document.querySelectorAll('.brand-btn').forEach(btn => {
        if (btn.dataset.brand === brandId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Body Theme Class
    const body = document.body;
    body.className = ''; // Reset
    body.classList.add(BRANDS_DB[brandId].themeClass);

    // Update header labels and breadcrumbs
    const headerTitle = document.getElementById('header-title');
    const headerSub = document.getElementById('header-sub');
    const brandNameDisplay = document.getElementById('brand-name-display');

    if (brandId === 'master') {
        headerTitle.textContent = 'Unified Social Hub';
        headerSub.textContent = 'Master Control for Corely, Suriosity, and Lansem';
        brandNameDisplay.textContent = 'MASTER VIEW';
    } else {
        headerTitle.textContent = BRANDS_DB[brandId].name;
        headerSub.textContent = BRANDS_DB[brandId].tagline;
        brandNameDisplay.textContent = BRANDS_DB[brandId].name.toUpperCase();
    }

    // Adapt post creation brand dropdown choice based on brand
    const formBrandSelect = document.getElementById('post-brand');
    if (formBrandSelect) {
        if (brandId !== 'master') {
            formBrandSelect.value = brandId;
            formBrandSelect.disabled = true; // Lock dropdown if in brand-specific view
        } else {
            formBrandSelect.value = 'corely';
            formBrandSelect.disabled = false; // Unlock dropdown for Master view
        }
    }

    // Render all elements matching new brand filter
    renderAll();
}

// Switch between navigation tabs
function switchTab(tabId) {
    currentTab = tabId;

    // Update active class on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.tab === tabId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update active panel view
    document.querySelectorAll('.view-section').forEach(view => {
        if (view.id === `${tabId}-view`) {
            view.classList.add('active');
        } else {
            view.classList.remove('active');
        }
    });

    renderAll();
}

// Render All views based on State
function renderAll() {
    const brandData = BRANDS_DB[currentBrand];
    const posts = getScheduledPosts().filter(p => currentBrand === 'master' || p.brand === currentBrand);

    // Dynamic metrics updating
    updateKPIs(brandData, posts.length);

    // Render corresponding active tab
    if (currentTab === 'dashboard') {
        renderDashboardView(brandData, posts);
    } else if (currentTab === 'accounts') {
        renderAccountsView(brandData);
    } else if (currentTab === 'scheduler') {
        renderSchedulerView(posts);
    } else if (currentTab === 'guidelines') {
        renderGuidelinesView(brandData);
    }
}

// Update KPI cards on the dashboard view
function updateKPIs(brandData, totalScheduledCount) {
    const totalFollowers = document.getElementById('kpi-followers-val');
    const followersChange = document.getElementById('kpi-followers-change');
    const followersChangeIcon = document.getElementById('kpi-followers-change-icon');

    const totalReach = document.getElementById('kpi-reach-val');
    const reachChange = document.getElementById('kpi-reach-change');
    const reachChangeIcon = document.getElementById('kpi-reach-change-icon');

    const engagementVal = document.getElementById('kpi-engagement-val');
    const engagementChange = document.getElementById('kpi-engagement-change');
    const engagementChangeIcon = document.getElementById('kpi-engagement-change-icon');

    const scheduledVal = document.getElementById('kpi-scheduled-val');

    if (totalFollowers) {
        totalFollowers.textContent = brandData.kpi.followers;
        followersChange.textContent = brandData.kpi.followersChange;
        followersChange.parentElement.className = `kpi-change ${brandData.kpi.followersUp ? 'up' : 'down'}`;
        followersChangeIcon.className = `fa-solid ${brandData.kpi.followersUp ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`;
    }

    if (totalReach) {
        totalReach.textContent = brandData.kpi.reach;
        reachChange.textContent = brandData.kpi.reachChange;
        reachChange.parentElement.className = `kpi-change ${brandData.kpi.reachUp ? 'up' : 'down'}`;
        reachChangeIcon.className = `fa-solid ${brandData.kpi.reachUp ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`;
    }

    if (engagementVal) {
        engagementVal.textContent = brandData.kpi.engagement;
        engagementChange.textContent = brandData.kpi.engagementChange;
        engagementChange.parentElement.className = `kpi-change ${brandData.kpi.engagementUp ? 'up' : 'down'}`;
        engagementChangeIcon.className = `fa-solid ${brandData.kpi.engagementUp ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`;
    }

    if (scheduledVal) {
        // Dynamic count of posts in local storage
        scheduledVal.textContent = totalScheduledCount;
    }
}

// Render Dashboard main panels
function renderDashboardView(brandData, posts) {
    // Render dynamic growth chart
    renderGrowthChart(brandData.chartData);

    // Render Upcoming posts timeline (max 3)
    const timelinesList = document.getElementById('dashboard-feed-list');
    if (!timelinesList) return;
    timelinesList.innerHTML = '';

    const limitPosts = posts.slice(0, 3);
    if (limitPosts.length === 0) {
        timelinesList.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-calendar-xmark"></i>
                <p>No upcoming posts scheduled.</p>
            </div>
        `;
        return;
    }

    limitPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-feed-card';
        card.style.cursor = 'pointer';
        card.setAttribute('onclick', `openEditPostModal(${post.id})`);
        
        const platformsHtml = post.platforms.map(p => 
            `<i class="fa-brands fa-${p === 'twitter' ? 'x-twitter' : p} platform-icon ${p}"></i>`
        ).join(' ');

        const formattedStatus = post.status.replace('-', ' ').toUpperCase();

        card.innerHTML = `
            <div class="post-card-header">
                <span class="brand-badge ${post.brand}">${post.brand}</span>
                <div style="display: flex; gap: 8px; align-items: center;">
                    ${platformsHtml}
                </div>
            </div>
            <p class="post-content-preview">${post.content}</p>
            <div class="post-card-footer">
                <span class="status-badge ${post.status}"><i class="fa-solid fa-tag"></i> ${formattedStatus}</span>
                <button class="btn-icon-delete" onclick="event.stopPropagation(); deletePost(${post.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        timelinesList.appendChild(card);
    });
}

// Generate dynamic SVG path for line chart
function renderGrowthChart(points) {
    const svg = document.getElementById('growth-chart-svg');
    if (!svg) return;

    // Clear previous dynamic paths & circles
    svg.querySelectorAll('.dynamic-chart-element').forEach(el => el.remove());

    const width = 600;
    const height = 200;
    const padding = 20;

    const maxVal = Math.max(...points) * 1.1; // Add 10% breathing room
    const xStep = (width - padding * 2) / (points.length - 1);

    // Compute coordinate points
    const coords = points.map((p, idx) => {
        const x = padding + idx * xStep;
        const y = height - padding - ((p / maxVal) * (height - padding * 2));
        return { x, y };
    });

    // Create Path Strings
    let linePath = `M ${coords[0].x},${coords[0].y}`;
    let areaPath = `M ${coords[0].x},${coords[0].y}`;

    for (let i = 1; i < coords.length; i++) {
        // Curved cubic bezier
        const cpX1 = coords[i-1].x + xStep / 2;
        const cpY1 = coords[i-1].y;
        const cpX2 = coords[i].x - xStep / 2;
        const cpY2 = coords[i].y;
        
        linePath += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${coords[i].x},${coords[i].y}`;
        areaPath += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${coords[i].x},${coords[i].y}`;
    }

    // Close area path for gradient filling
    areaPath += ` L ${coords[coords.length - 1].x},${height - padding} L ${coords[0].x},${height - padding} Z`;

    // Add Area elements to SVG
    const areaEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    areaEl.setAttribute('d', areaPath);
    areaEl.setAttribute('class', 'chart-area dynamic-chart-element');
    svg.appendChild(areaEl);

    // Add Line elements to SVG
    const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    lineEl.setAttribute('d', linePath);
    lineEl.setAttribute('class', 'chart-path dynamic-chart-element');
    svg.appendChild(lineEl);

    // Add interactive data points (circles)
    coords.forEach((c, idx) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', c.x);
        circle.setAttribute('cy', c.y);
        circle.setAttribute('r', '4');
        circle.setAttribute('class', 'chart-dot dynamic-chart-element');
        
        // Tooltip interaction
        const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        tooltip.textContent = `Interval ${idx + 1}: ${points[idx]}K`;
        circle.appendChild(tooltip);

        svg.appendChild(circle);
    });
}

// Render accounts grid view
function renderAccountsView(brandData) {
    const container = document.getElementById('accounts-matrix-container');
    if (!container) return;
    container.innerHTML = '';

    // Master brand view has combined accounts, otherwise single brand accounts
    const accounts = currentBrand === 'master' ? BRANDS_DB.master.accounts : brandData.accounts;

    accounts.forEach(acc => {
        const card = document.createElement('div');
        card.className = 'account-card glass-panel';
        card.style.setProperty('--account-platform-rgb', acc.rgb);

        const platformTitle = acc.platform.charAt(0).toUpperCase() + acc.platform.slice(1);
        
        card.innerHTML = `
            <div class="account-card-header">
                <div class="platform-logo-wrapper">
                    <i class="fa-brands fa-${acc.platform === 'twitter' ? 'x-twitter' : acc.platform} platform-icon" style="color: rgb(${acc.rgb});"></i>
                </div>
                <div class="account-meta">
                    <h4>${acc.handle}</h4>
                    <p>${platformTitle} (${acc.id.startsWith('c-') ? 'Corely' : acc.id.startsWith('s-') ? 'Suriosity' : 'Lansem'})</p>
                </div>
                <span class="account-status-pill active">${acc.status}</span>
            </div>
            <div class="account-stats-row">
                <div class="account-stat">
                    <span>Followers</span>
                    <h5>${acc.followers}</h5>
                </div>
                <div class="account-stat">
                    <span>Engagement</span>
                    <h5>${acc.engagement}</h5>
                </div>
            </div>
            <div class="account-footer-actions">
                <div class="manager-tag">
                    <div class="manager-avatar">${acc.manager.charAt(0)}</div>
                    <span>Manager: ${acc.manager}</span>
                </div>
                <button class="btn-secondary" onclick="openCredentialsModal('${acc.id}')">
                    <i class="fa-solid fa-key" style="margin-right: 4px;"></i> Creds
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Render Content Board Layout
function renderSchedulerView(posts) {
    const colIdea = document.getElementById('list-idea');
    const colToEdit = document.getElementById('list-to-edit');
    const colToView = document.getElementById('list-to-view');
    const colPosted = document.getElementById('list-posted');

    if (!colIdea) return;

    // Clear existing cards
    colIdea.innerHTML = '';
    colToEdit.innerHTML = '';
    colToView.innerHTML = '';
    colPosted.innerHTML = '';

    const counts = { idea: 0, 'to-edit': 0, 'to-view': 0, posted: 0 };

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-feed-card';
        card.style.cursor = 'pointer';
        card.setAttribute('onclick', `openEditPostModal(${post.id})`);

        const platformsHtml = post.platforms.map(p => 
            `<i class="fa-brands fa-${p === 'twitter' ? 'x-twitter' : p} platform-icon ${p}"></i>`
        ).join(' ');

        card.innerHTML = `
            <div class="post-card-header" style="margin-bottom: 8px;">
                <span class="brand-badge ${post.brand}" style="font-size:0.6rem;">${post.brand}</span>
                <div style="display: flex; gap: 6px; align-items: center;">
                    ${platformsHtml}
                </div>
            </div>
            <p class="post-content-preview" style="font-size: 0.8rem; -webkit-line-clamp: 3; line-height: 1.4; color: var(--text-primary);">${post.content}</p>
            <div class="post-card-footer" style="margin-top: 8px; justify-content: flex-end;">
                <button class="btn-icon-delete" onclick="event.stopPropagation(); deletePost(${post.id})" style="padding: 2px;">
                    <i class="fa-solid fa-trash-can" style="font-size: 0.8rem;"></i>
                </button>
            </div>
        `;

        if (post.status === 'idea') {
            colIdea.appendChild(card);
            counts.idea++;
        } else if (post.status === 'to-edit') {
            colToEdit.appendChild(card);
            counts['to-edit']++;
        } else if (post.status === 'to-view') {
            colToView.appendChild(card);
            counts['to-view']++;
        } else if (post.status === 'posted') {
            colPosted.appendChild(card);
            counts.posted++;
        }
    });

    // Update count labels
    document.getElementById('count-idea').textContent = counts.idea;
    document.getElementById('count-to-edit').textContent = counts['to-edit'];
    document.getElementById('count-to-view').textContent = counts['to-view'];
    document.getElementById('count-posted').textContent = counts.posted;
}

// Render brand copy guidelines & writing templates
function renderGuidelinesView(brandData) {
    const identityCol = document.getElementById('guidelines-identity-column');
    const templatesList = document.getElementById('guidelines-templates-list');
    
    if (!identityCol || !templatesList) return;

    identityCol.innerHTML = '';
    templatesList.innerHTML = '';

    // Master view doesn't have local branding sheets, so show prompt to select brand
    if (currentBrand === 'master') {
        identityCol.innerHTML = `
            <div class="empty-state" style="grid-column: span 2; padding: 60px;">
                <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 3rem;"></i>
                <h3 style="margin-top:12px; font-family: var(--font-heading);">Select a Specific Brand</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted);">Please select Corely, Suriosity, or Lansem from the sidebar to view detailed brand voice guidelines and templates.</p>
            </div>
        `;
        return;
    }

    // Render Voice & Tone Guidelines Card
    const voiceCard = document.createElement('div');
    voiceCard.className = 'voice-card glass-panel';
    
    const traitsHtml = brandData.voice.traits.map(t => `
        <div class="trait-item">
            <h5>${t.name}</h5>
            <p>${t.desc}</p>
        </div>
    `).join('');

    voiceCard.innerHTML = `
        <div class="voice-header">
            <div class="logo-icon" style="width: 32px; height: 32px; font-size: 0.9rem;">
                <i class="fa-solid fa-microphone-lines"></i>
            </div>
            <h3>Brand Voice</h3>
        </div>
        <p class="voice-tagline">${brandData.voice.tagline}</p>
        <div class="voice-traits">
            ${traitsHtml}
        </div>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
            <h5 style="font-size:0.8rem; font-weight:700; color:var(--text-secondary); margin-bottom:8px;">RECOMMENDED HASHTAGS</h5>
            <p style="font-family: monospace; font-size: 0.75rem; color: var(--accent); line-height: 1.4; word-break: break-all;">${brandData.voice.hashtags}</p>
        </div>
    `;
    identityCol.appendChild(voiceCard);

    // Render Post Templates
    brandData.voice.templates.forEach((tpl, idx) => {
        const card = document.createElement('div');
        card.className = 'template-card';

        const idForArea = `text-template-${idx}`;

        card.innerHTML = `
            <div class="template-meta">
                <span class="template-tag">${tpl.tag}</span>
                <span class="template-desc">${tpl.desc}</span>
            </div>
            <div class="template-body">
                <textarea id="${idForArea}" style="position:absolute; left:-9999px;">${tpl.body}</textarea>
                ${tpl.body.replace(/\n/g, '<br>')}
                <button class="btn-copy" onclick="copyTemplateText('${idForArea}')">
                    <i class="fa-regular fa-copy"></i> Copy
                </button>
            </div>
        `;
        templatesList.appendChild(card);
    });
}

// Add New Content/Idea Post Handler
function handleAddPost(e) {
    e.preventDefault();

    const brand = document.getElementById('post-brand').value;
    const content = document.getElementById('post-content').value.trim();
    const status = document.getElementById('post-status').value;

    // Get selected platforms
    const platforms = [];
    document.querySelectorAll('.platform-checkbox:checked').forEach(cb => {
        platforms.push(cb.value);
    });

    if (!content) {
        alert('Please fill out the post content.');
        return;
    }

    if (platforms.length === 0) {
        alert('Please select at least one platform channel.');
        return;
    }

    const posts = getScheduledPosts();
    const newPost = {
        id: Date.now(), // Unique ID
        brand,
        platforms,
        content,
        category: 'custom',
        status
    };

    posts.unshift(newPost); // Add to beginning
    saveScheduledPosts(posts);

    // Reset Form
    document.getElementById('post-content').value = '';
    document.querySelectorAll('.platform-checkbox').forEach(cb => cb.checked = false);
    document.getElementById('post-status').value = 'idea';

    // Re-render
    renderAll();
    alert('Post successfully created!');
}

// Delete scheduled post
function deletePost(id) {
    let posts = getScheduledPosts();
    posts = posts.filter(p => p.id !== id);
    saveScheduledPosts(posts);
    renderAll();
}

// Copy template clipboard utility
window.copyTemplateText = function(elementId) {
    const copyText = document.getElementById(elementId);
    if (!copyText) return;

    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Modern clipboard API write
    navigator.clipboard.writeText(copyText.value).then(() => {
        alert('Copy successful: Template is ready in clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

// Open Credentials lookup modal
window.openCredentialsModal = function(accountId) {
    const modal = document.getElementById('credentials-modal');
    if (!modal) return;

    // Retrieve specific account data
    const allAccounts = BRANDS_DB.master.accounts;
    const account = allAccounts.find(a => a.id === accountId);
    if (!account) return;

    const brandName = account.id.startsWith('c-') ? 'Corely' : account.id.startsWith('s-') ? 'Suriosity' : 'Lansem';
    
    // Fill credentials data
    document.getElementById('cred-brand-name').textContent = `${brandName} SMM Access`;
    document.getElementById('cred-handle').textContent = account.handle;
    document.getElementById('cred-email').textContent = account.login;
    
    // Generating mock password based on platform and brand
    document.getElementById('cred-password').textContent = `${account.platform}_${brandName.toLowerCase()}_2026!`;

    // Show modal
    modal.classList.add('active');
};

// Close all modal instances
function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Expose deleting to window scope for onclick handlers
window.deletePost = deletePost;

// Open Edit Post modal
window.openEditPostModal = function(postId) {
    const modal = document.getElementById('edit-post-modal');
    if (!modal) return;

    const posts = getScheduledPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    // Populate data
    document.getElementById('edit-post-id').value = post.id;
    document.getElementById('edit-post-brand').value = post.brand;
    document.getElementById('edit-post-content').value = post.content;
    document.getElementById('edit-post-status').value = post.status;

    // Reset platform checkboxes
    document.querySelectorAll('.edit-platform-checkbox').forEach(cb => {
        cb.checked = post.platforms.includes(cb.value);
    });

    // Show modal
    modal.classList.add('active');
};

// Handle edit post form submit
function handleEditPostSubmit(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('edit-post-id').value);
    const brand = document.getElementById('edit-post-brand').value;
    const content = document.getElementById('edit-post-content').value.trim();
    const status = document.getElementById('edit-post-status').value;

    const platforms = [];
    document.querySelectorAll('.edit-platform-checkbox:checked').forEach(cb => {
        platforms.push(cb.value);
    });

    if (!content) {
        alert('Please fill out the post content.');
        return;
    }

    if (platforms.length === 0) {
        alert('Please select at least one platform channel.');
        return;
    }

    const posts = getScheduledPosts();
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        alert('Post not found in database.');
        return;
    }

    // Update fields
    posts[postIndex].brand = brand;
    posts[postIndex].content = content;
    posts[postIndex].status = status;
    posts[postIndex].platforms = platforms;

    saveScheduledPosts(posts);
    closeAllModals();
    renderAll();
}

// Handle edit delete click
function handleEditPostDelete() {
    const id = parseInt(document.getElementById('edit-post-id').value);
    if (confirm("Are you sure you want to delete this scheduled post?")) {
        deletePost(id);
        closeAllModals();
    }
}
