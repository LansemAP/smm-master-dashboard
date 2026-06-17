// ==========================================
// MASTER SOCIAL MEDIA MANAGEMENT - CORE APP
// ==========================================

// Global state
let currentBrand = 'master'; // 'master', 'corely', 'suriosity', 'lansem'
let currentTab = 'dashboard'; // active tab name
let libActivePill = 'all'; // active category pill filter in Post Library
let latestTrendsData = null; // store real-time fetched India trends
let currentHashtagTime = '24h'; // active hashtag time range filter
let currentMediaFilter = 'all'; // active post media filter

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
    },
    {
        id: 8,
        brand: 'suriosity',
        platforms: ['linkedin'],
        content: `The food importers who locked in Indian millet supply chains in 2023 are sitting on some of the most profitable commodity positions in the natural food space right now.\n\nHere's the business case that most people are still sleeping on.\n\n📈 Indian Bajra / Ragi can be sourced FOB Indian port at USD 280–420 per MT.\nThe same grain, certified organic and repackaged for EU health retail, sells at USD 1,200–2,800 per MT.\nThat's a 3x–6x gross margin opportunity.\n\n🌍 The UN's International Year of Millets 2023 triggered active procurement policies in multiple national governments. The EU Farm-to-Fork strategy explicitly names millets as a food security priority through 2027. This is policy-backed demand, not a trend.\n\n✅ APEDA-registered exporters now offer phytosanitary certificates, COA, EU MRL-compliant pesticide testing, and aflatoxin <4 ppb as standard.\n\n⚠️ The competitive window is narrowing. Forward-looking importers in Germany, Netherlands, and UAE have already signed annual supply contracts. Early movers in organic Ragi, Foxtail, and Barnyard Millet are seeing the clearest arbitrage right now.\n\nIndia's millet export value crossed USD 75 million in FY 2022–23 — a ~20% jump YoY. And that number represents only a fraction of what organised export channels can ship at full capacity.\n\nAre you already sourcing millets from India, or is this a gap in your current portfolio?\n\n📩 DM us or email export@suriosity.com to request our product catalogue, certifications, and MOQ schedule.\n\n#MilletImports #IndianAgriculture #FoodExports #SuriosityAgri #AgriBusiness #APEDA #FoodSecurity #ImportOpportunity`,
        category: 'market-insights',
        status: 'to-view'
    }
];
 
// Local Storage Manager for Scheduled Posts
function getScheduledPosts() {
    const stored = localStorage.getItem('master_scheduled_posts_v5');
    if (!stored) {
        localStorage.setItem('master_scheduled_posts_v5', JSON.stringify(DEFAULT_POSTS));
        return DEFAULT_POSTS;
    }
    return JSON.parse(stored);
}
 
function saveScheduledPosts(posts) {
    localStorage.setItem('master_scheduled_posts_v5', JSON.stringify(posts));
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

    // Connection agent form submission
    const agentForm = document.getElementById('agent-generate-form');
    if (agentForm) {
        agentForm.addEventListener('submit', handleAgentGenerate);
    }

    // Toggle API Key input group and labels based on engine selection
    const apiKeyInput = document.getElementById('agent-api-key');
    const engineSelect = document.getElementById('agent-engine');
    const apiKeyGroup = document.getElementById('agent-api-key-group');
    const keyLabel = document.getElementById('agent-key-label');
    const keyHelp = document.getElementById('agent-key-help');

    if (engineSelect && apiKeyGroup) {
        const toggleApiKeyVisibility = () => {
            const val = engineSelect.value;
            if (val === 'simulated') {
                apiKeyGroup.style.display = 'none';
            } else {
                apiKeyGroup.style.display = 'flex';
                if (val === 'claude') {
                    if (keyLabel) keyLabel.textContent = 'Anthropic API Key';
                    if (apiKeyInput) {
                        apiKeyInput.placeholder = 'sk-ant-api03-...';
                        apiKeyInput.value = localStorage.getItem('smm_anthropic_api_key') || '';
                    }
                    if (keyHelp) keyHelp.textContent = 'Optional if ANTHROPIC_API_KEY is configured in your Vercel Environment Variables. Saved locally.';
                } else if (val === 'gemini') {
                    if (keyLabel) keyLabel.textContent = 'Gemini API Key';
                    if (apiKeyInput) {
                        apiKeyInput.placeholder = 'AIzaSy...';
                        apiKeyInput.value = localStorage.getItem('smm_gemini_api_key') || '';
                    }
                    if (keyHelp) keyHelp.textContent = 'Get a free key from Google AI Studio. Optional if GEMINI_API_KEY is configured on Vercel. Saved locally.';
                }
            }
        };

        engineSelect.addEventListener('change', toggleApiKeyVisibility);
        toggleApiKeyVisibility(); // Trigger initial state

        if (apiKeyInput) {
            apiKeyInput.addEventListener('input', (e) => {
                const val = engineSelect.value;
                if (val === 'claude') {
                    localStorage.setItem('smm_anthropic_api_key', e.target.value.trim());
                } else if (val === 'gemini') {
                    localStorage.setItem('smm_gemini_api_key', e.target.value.trim());
                }
            });
        }
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
            document.getElementById('post-content').focus();
        });
    }

    // Post Library: Add Post button -> opens scheduler
    const libAddBtn = document.getElementById('lib-add-btn');
    if (libAddBtn) {
        libAddBtn.addEventListener('click', () => switchTab('scheduler'));
    }

    // Post Library: category pills
    document.querySelectorAll('.lib-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            libActivePill = e.currentTarget.dataset.cat;
            document.querySelectorAll('.lib-pill').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
            // Sync category dropdown
            const catSelect = document.getElementById('lib-filter-category');
            if (catSelect) catSelect.value = libActivePill;
            renderLibraryView();
        });
    });

    // Post Library: filter dropdowns
    ['lib-filter-brand','lib-filter-platform','lib-filter-category','lib-filter-status'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', () => {
            if (id === 'lib-filter-category') {
                libActivePill = el.value;
                document.querySelectorAll('.lib-pill').forEach(p => {
                    p.classList.toggle('active', p.dataset.cat === libActivePill);
                });
            }
            renderLibraryView();
        });
    });

    // Post Library: search input
    const libSearch = document.getElementById('library-search');
    if (libSearch) libSearch.addEventListener('input', () => renderLibraryView());

    // Engagement Optimizer events
    const optContent = document.getElementById('opt-post-content');
    if (optContent) {
        optContent.addEventListener('input', analyzeDraftPost);
    }

    const optClear = document.getElementById('opt-clear-btn');
    if (optClear) {
        optClear.addEventListener('click', () => {
            optContent.value = '';
            analyzeDraftPost();
        });
    }

    const optSave = document.getElementById('opt-save-btn');
    if (optSave) {
        optSave.addEventListener('click', saveDraftToScheduler);
    }

    // Playbook tabs
    document.querySelectorAll('.playbook-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetTab = e.currentTarget.dataset.tab;
            document.querySelectorAll('.playbook-tab-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.tab === targetTab);
                b.style.background = b.dataset.tab === targetTab ? 'rgba(var(--accent-rgb), 0.1)' : 'transparent';
                b.style.borderColor = b.dataset.tab === targetTab ? 'var(--accent)' : 'transparent';
                b.style.color = b.dataset.tab === targetTab ? 'var(--accent)' : 'var(--text-secondary)';
            });

            document.querySelectorAll('.playbook-section').forEach(sec => {
                if (sec.id === targetTab) {
                    sec.style.display = 'block';
                    sec.classList.add('active');
                } else {
                    sec.style.display = 'none';
                    sec.classList.remove('active');
                }
            });
        });
    });

    // India Trends Tracker events
    const refreshBtn = document.getElementById('trends-refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            fetchRealTimeTrends(true);
        });
    }

    // Hashtag time range filter switching
    document.querySelectorAll('.hash-time-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentHashtagTime = e.currentTarget.dataset.time;
            document.querySelectorAll('.hash-time-btn').forEach(b => {
                b.classList.toggle('active', b === e.currentTarget);
                // Sync inline styling for active button state
                if (b === e.currentTarget) {
                    b.style.borderColor = 'var(--border-color)';
                    b.style.background = 'rgba(255,255,255,0.05)';
                    b.style.color = 'var(--text-primary)';
                } else {
                    b.style.borderColor = 'transparent';
                    b.style.background = 'transparent';
                    b.style.color = 'var(--text-secondary)';
                }
            });
            renderTrendsHashtags();
        });
    });

    // Media filter dropdown change
    const mediaFilterSelect = document.getElementById('trend-media-filter');
    if (mediaFilterSelect) {
        mediaFilterSelect.addEventListener('change', (e) => {
            currentMediaFilter = e.target.value;
            renderViralPosts();
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
    } else if (currentTab === 'library') {
        renderLibraryView();
    } else if (currentTab === 'agent') {
        renderAgentView();
    } else if (currentTab === 'engagement') {
        renderEngagementView();
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

// ==========================================
// CONNECTION AGENT LOGIC & RENDERING
// ==========================================

// Render Agent View (initialization if needed)
function renderAgentView() {
    // Keep it simple
}

// Extract Name from LinkedIn profile URL
function extractNameFromLinkedInUrl(url) {
    try {
        const parsedUrl = new URL(url);
        let pathname = parsedUrl.pathname;
        // Clean trailing slash
        if (pathname.endsWith('/')) {
            pathname = pathname.slice(0, -1);
        }
        const segments = pathname.split('/').filter(Boolean);
        // LinkedIn urls look like /in/username
        const profileSegment = segments[1] || segments[0];
        if (!profileSegment || profileSegment === 'in') return 'Professional';
        
        // Remove ending numbers/hashes (common in linkedin usernames like aneesh-mallick-762bb151)
        let cleanStr = profileSegment.replace(/-[0-9a-fA-F]+$/, '');
        // Replace hyphens/underscores with spaces
        cleanStr = cleanStr.replace(/[-_]/g, ' ');
        
        // Capitalize words
        return cleanStr.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    } catch (e) {
        return 'Professional';
    }
}

// Extract a clean first name, ignoring common professional titles
function getCleanFirstName(fullName) {
    const parts = fullName.split(' ').filter(Boolean);
    if (parts.length === 0) return 'there';
    
    const ignoredPrefixes = ['ca', 'cfa', 'dr', 'mr', 'ms', 'mrs', 'adv', 'er', 'cs', 'prof'];
    
    // Check if the first word is an ignored prefix
    let index = 0;
    while (index < parts.length && ignoredPrefixes.includes(parts[index].toLowerCase())) {
        index++;
    }
    
    // Return the first non-prefix word, capitalized
    const firstName = parts[index] || parts[0] || 'there';
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}

// Generate Custom Notes based on Name, Strategy, Profile Details, and Character Limit
function generateCustomNotes(name, strategy, profileText, limit) {
    const firstName = getCleanFirstName(name);
    const text = (profileText || '').toLowerCase();
    
    // Heuristic analysis of profile details
    let focus = 'your focus in the industry';
    let company = 'your firm';
    let credentials = 'CA/finance';
    
    // 1. Detect credentials
    if (text.includes('ca') && text.includes('cfa')) {
        credentials = 'CA/CFA';
        focus = 'your diverse CA and CFA credentials';
    } else if (text.includes('ca') || text.includes('chartered accountant')) {
        credentials = 'CA';
        focus = 'your Chartered Accountancy background';
    } else if (text.includes('cfa')) {
        credentials = 'CFA';
        focus = 'your CFA credentials';
    } else if (text.includes('cpa')) {
        credentials = 'CPA';
        focus = 'your CPA background';
    } else if (text.includes('tax')) {
        credentials = 'tax specialist';
        focus = 'your tax advisory background';
    } else if (text.includes('valuation') || text.includes('valuer')) {
        credentials = 'valuation specialist';
        focus = 'your corporate valuation background';
    } else if (text.includes('bookkeeping') || text.includes('accounting')) {
        credentials = 'accounting';
        focus = 'your work in client accounting services';
    }

    // 2. Detect company
    const companyMatch = (profileText || '').match(/(?:at|with|of)\s+([A-Z][A-Za-z0-9&\s]{3,20})/);
    if (companyMatch) {
        company = companyMatch[1].trim();
    } else if (text.includes('mehra goel')) {
        company = 'Mehra Goel & Co';
    }

    // 3. Define templates based on Strategy and Limit
    let options = [];

    if (limit === 200) {
        if (strategy === 'credentials') {
            options = [
                {
                    title: 'Admiration of Credentials (High Acceptance)',
                    text: `Hi ${firstName}, came across your profile and was impressed by your ${credentials} background. Expanding my network of finance leaders, would love to connect. Best, Arnab`
                },
                {
                    title: 'Personalized Practice Networking',
                    text: `Hi ${firstName}, noticed your impressive background at ${company}. Connecting with fellow accounting & finance experts to share insights and discuss trends. Let's connect! Best, Arnab`
                },
                {
                    title: 'Short & Polite Professional Connect',
                    text: `Hi ${firstName}, hope you're doing well. Noticed your diverse credentials across ${credentials} domains. Building connections with leading finance professionals. Let's connect! Best, Arnab`
                }
            ];
        } else if (strategy === 'networking') {
            options = [
                {
                    title: 'Soft Industry Networking',
                    text: `Hi ${firstName}, came across your profile and noticed your focus on cloud accounting. I'm building a network of CAs & finance pros to share insights on firm automation. Let's connect! Best, Arnab`
                },
                {
                    title: 'Peer-to-Peer Connection',
                    text: `Hi ${firstName}, hope you're well. Connecting with leading accounting practitioners to share industry updates and discuss modern accounting trends. Let's connect here. Best, Arnab`
                },
                {
                    title: 'Collaborative Sharing',
                    text: `Hi ${firstName}, noticed your work at ${company}. Connecting with fellow professionals to share ideas on modern practice management and scaling workflows. Open to connecting? Best, Arnab`
                }
            ];
        } else { // operations
            options = [
                {
                    title: 'Soft Capacity Scaling (No Pitch)',
                    text: `Hi ${firstName}, noticed your focus on ${focus}. I connect with practice leaders to share ideas on scaling practice capacity, automating ledgers, and solving team bottlenecks. Let's connect! Best, Arnab`
                },
                {
                    title: 'Modern Workflow Trends',
                    text: `Hi ${firstName}, hope you're well. Connecting with accounting practitioners to share trends on modern ledger workflows, scaling capacity, and optimizing partner time. Let's connect! Best, Arnab`
                },
                {
                    title: 'Practice Operations Focus',
                    text: `Hi ${firstName}, noticed your work at ${company}. Expanding my network to discuss how boutique practices are scaling ledger processing and tackling junior staffing shortages. Best, Arnab`
                }
            ];
        }
    } else { // 300 characters
        if (strategy === 'credentials') {
            options = [
                {
                    title: 'Credentials & Growth Focus',
                    text: `Hi ${firstName}, came across your profile and was really impressed by your combination of ${credentials} credentials at ${company}. I am expanding my network of finance and accounting leaders in the region to share insights. Would love to connect and keep in touch. Best, Arnab`
                },
                {
                    title: 'Direct Expertise Appreciation',
                    text: `Hi ${firstName}, hope you're doing well. I noticed your profile and your impressive work across valuation, finance, and ${credentials} domains. I build connections with leading accounting and advisory professionals to share ideas on practice growth. Let's connect here! Best, Arnab`
                },
                {
                    title: 'High-Level Peer Networking',
                    text: `Hi ${firstName}, noticed your work at ${company} and your extensive background in accounting. I am connecting with fellow finance experts to discuss industry trends, modern reporting, and share insights. Open to connecting and keeping in touch? Best, Arnab`
                }
            ];
        } else if (strategy === 'networking') {
            options = [
                {
                    title: 'Soft Cloud Accounting & Automation',
                    text: `Hi ${firstName}, came across your profile and noticed your focus on modern accounting. I'm building a network of CAs and finance professionals to share insights on automation, cloud accounting, and solving practice capacity bottlenecks. Let's connect to share ideas! Best, Arnab`
                },
                {
                    title: 'General Professional Networking',
                    text: `Hi ${firstName}, hope you're doing well. I connect with managing partners and senior practitioners to share operational updates, industry trends, and insights on growing local accounting firms. Would love to add you to my professional network here on LinkedIn. Best, Arnab`
                },
                {
                    title: 'Practice Management Collaboration',
                    text: `Hi ${firstName}, noticed your work in the accounting space at ${company}. Connecting with fellow CAs to exchange thoughts on modern practice management, advisory growth, and workflow efficiency. Let's connect here to share insights. Best, Arnab`
                }
            ];
        } else { // operations
            options = [
                {
                    title: 'Capacity & Workflow Operations',
                    text: `Hi ${firstName}, noticed your work at ${company}. I connect with practice partners to share ideas on scaling capacity and modernizing ledger workflows. Many boutique practices are currently exploring secure ways to automate processing and free up partner time. Let's connect. Best, Arnab`
                },
                {
                    title: 'Staffing & Overnight Processing Trends',
                    text: `Hi ${firstName}, hope you're well. Connecting with accounting leaders to discuss trends in practice capacity, overnight ledger processing, and addressing junior recruitment bottlenecks. Would love to connect and share ideas on optimizing partner bandwidth. Best, Arnab`
                },
                {
                    title: 'B2B Practice Operations Exchange',
                    text: `Hi ${firstName}, noticed your focus on ${focus}. I connect with practitioners to exchange insights on scaling boutique firm capacity, automating manual bookkeeping, and resolving junior staffing bottlenecks without sacrificing data security. Let's connect! Best, Arnab`
                }
            ];
        }
    }

    return options;
}

// Event handler for Generating Connection Notes
function handleAgentGenerate(e) {
    e.preventDefault();

    const url = document.getElementById('agent-linkedin-url').value.trim();
    const strategy = document.getElementById('agent-outreach-strategy').value;
    const profileText = document.getElementById('agent-profile-text').value.trim();
    const limit = parseInt(document.getElementById('agent-character-limit').value);
    const engine = document.getElementById('agent-engine').value;

    if (!url) {
        alert('Please enter a LinkedIn profile URL.');
        return;
    }

    const consoleBox = document.getElementById('agent-console');
    const statusTag = document.getElementById('agent-status-tag');
    const resultsContainer = document.getElementById('agent-results-container');

    // Reset UI state
    statusTag.textContent = 'Analyzing...';
    statusTag.style.color = 'var(--accent)';
    consoleBox.innerHTML = '';
    resultsContainer.style.display = 'none';
    resultsContainer.innerHTML = '';

    // Extracted target name
    const extractedName = extractNameFromLinkedInUrl(url);

    const addConsoleLine = (text, type) => {
        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        line.innerHTML = `<i class="fa-solid fa-angle-right"></i> ${text}`;
        consoleBox.appendChild(line);
        consoleBox.scrollTop = consoleBox.scrollHeight;
    };

    if (engine === 'simulated') {
        // Simulated Agent Steps and Timing
        const steps = [
            { text: `🔍 Initiating secure connection agent logic for target: ${url}`, type: 'muted', delay: 100 },
            { text: `👤 Extracting identity... Detected name: <strong>${extractedName}</strong>`, type: 'working', delay: 800 },
            { text: `🧠 Parsing profile copy and context: "${profileText ? profileText.slice(0, 45) + '...' : 'None provided'}"`, type: 'muted', delay: 1600 },
            { text: `🎯 Selected strategy: <strong>${strategy.toUpperCase()}</strong> (Max limit: ${limit} chars)`, type: 'working', delay: 2400 },
            { text: `📝 Formatting custom connection templates for ${getCleanFirstName(extractedName)}...`, type: 'muted', delay: 3000 },
            { text: `✅ Note generation complete! Validated under ${limit} character constraint.`, type: 'success', delay: 3600 }
        ];

        steps.forEach(step => {
            setTimeout(() => {
                addConsoleLine(step.text, step.type);

                // When the last step finishes, render cards
                if (step.type === 'success') {
                    statusTag.textContent = 'Complete';
                    statusTag.style.color = '#34d399';
                    const options = generateCustomNotes(extractedName, strategy, profileText, limit);
                    renderAgentOutput(options, limit);
                }
            }, step.delay);
        });
    } else {
        // Live AI Mode (Claude or Gemini)
        const isGemini = engine === 'gemini';
        const engineName = isGemini ? 'Gemini 1.5 Flash' : 'Claude Sonnet';
        const proxyName = isGemini ? 'Gemini' : 'Claude';

        addConsoleLine(`🔍 Initiating secure connection agent logic for target: ${url}`, 'muted');
        
        setTimeout(() => {
            addConsoleLine(`👤 Extracting identity... Detected name: <strong>${extractedName}</strong>`, 'working');
        }, 500);

        setTimeout(() => {
            addConsoleLine(`🧠 Preparing ${engineName} prompt for strategy: <strong>${strategy.toUpperCase()}</strong>`, 'muted');
        }, 1000);

        setTimeout(() => {
            addConsoleLine(`📡 Dispatching API request to Vercel ${proxyName} proxy...`, 'working');
            
            const isLocalStatic = window.location.protocol === 'file:' || 
                                  (window.location.hostname === 'localhost' && window.location.port !== '3000') ||
                                  (window.location.hostname === '127.0.0.1' && window.location.port !== '3000');
            const apiBase = isLocalStatic ? 'https://smm-master-dashboard.vercel.app' : '';
            const apiUrl = `${apiBase}/api/generate-outreach`;
            
            const apiKey = document.getElementById('agent-api-key')?.value.trim() || '';

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: extractedName,
                    strategy,
                    profileText,
                    limit,
                    apiKey,
                    engine
                })
            })
            .then(async response => {
                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.error || `HTTP error ${response.status}`);
                }
                return response.json();
            })
            .then(options => {
                addConsoleLine(`✅ ${proxyName} Note generation complete! Validated under ${limit} character constraint.`, 'success');
                statusTag.textContent = 'Complete';
                statusTag.style.color = '#34d399';
                renderAgentOutput(options, limit);
            })
            .catch(err => {
                addConsoleLine(`❌ Error calling ${engineName}: ${err.message}`, 'error');
                statusTag.textContent = 'Error';
                statusTag.style.color = '#ef4444';
            });
        }, 1500);
    }
}

// Render generated note output cards
function renderAgentOutput(options, limit) {
    const resultsContainer = document.getElementById('agent-results-container');
    resultsContainer.innerHTML = '';
    
    options.forEach((opt, idx) => {
        const charCount = opt.text.length;
        const countColorClass = charCount > limit ? 'color: #ef4444;' : (charCount > limit - 20 ? 'color: #fbbf24;' : 'color: #34d399;');
        const textId = `agent-note-text-${idx}`;

        const card = document.createElement('div');
        card.className = 'template-card';
        card.style.background = 'rgba(255, 255, 255, 0.02)';
        card.style.border = '1px solid var(--border-color)';
        card.style.padding = '16px';
        card.style.borderRadius = '12px';
        card.style.transition = 'all 0.3s ease';
        
        card.innerHTML = `
            <div class="template-meta" style="margin-bottom: 8px; display: flex; justify-content: space-between; font-size: 0.75rem;">
                <span class="template-tag" style="font-weight: 700; color: var(--accent); text-transform: uppercase;">${opt.title}</span>
                <span class="template-desc" style="${countColorClass} font-family: monospace; font-weight: 600;">${charCount} / ${limit} chars</span>
            </div>
            <div class="template-body" style="padding: 14px; background: rgba(0, 0, 0, 0.25); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.04); color: var(--text-primary); position: relative; font-family: var(--font-body); font-size: 0.85rem; line-height: 1.5; white-space: normal;">
                <textarea id="${textId}" style="position:absolute; left:-9999px;">${opt.text}</textarea>
                <span>${opt.text}</span>
                <button class="btn-copy" onclick="copyTemplateText('${textId}')" style="top: 10px; right: 10px; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); color: var(--text-secondary); cursor: pointer;">
                    <i class="fa-regular fa-copy"></i> Copy Note
                </button>
            </div>
        `;
        resultsContainer.appendChild(card);
    });

    resultsContainer.style.display = 'flex';
}

// =============================================
// POST LIBRARY — CATEGORY & POST MANAGER
// =============================================

const LIBRARY_POSTS_KEY = 'smm_library_posts_v2';

const LIBRARY_DEFAULT_POSTS = [
    {
        id: 'lib-1',
        brand: 'suriosity',
        title: 'The Hidden Global Impact of Indian Millets',
        category: 'carousel',
        platforms: ['linkedin'],
        status: 'to-view',
        createdAt: '2026-06-13',
        tags: ['#MilletRevolution', '#IndianAgriculture', '#GlobalFood', '#Sustainability', '#FoodSecurity', '#SuriosityAgri'],
        slides: 5,
        content: `A grain that survived Ice Ages is now outselling quinoa in European health stores.\n\nIndian millet — the same crop that tribal farmers in Madhya Pradesh have grown for 3,000 years without synthetic fertilizer — is quietly becoming the world's most sought-after superfood.\n\n5 facts:\n1. Kodra (Kodo) & Kutki (Samai/Varagu) thrive on 400mm rainfall. No irrigation.\n2. Ragi (Kelvaragu/Mandua) GI ~54 — vs white bread at 75.\n3. Bajra (Kambu/Sajje) has 2–3x more iron per 100g than spinach.\n4. UN declared 2023 the International Year of Millets. 70+ countries participated.\n5. India produces 170 lakh tonnes of millets — ~20% of global supply.\n\nDrop your city and country in the comments. 🌾`,
        notes: 'Upload all 5 slides as a PDF document for max LinkedIn reach. Drop sources in first comment immediately after posting.',
        assets: [
            { type: 'pdf', label: 'Carousel PDF (LinkedIn Upload)', file: 'Suriosity/LinkedIn/assets/millet_global_impact/millet_global_impact_carousel.pdf' },
            { type: 'png', label: 'Slide 01 — Climate Story', file: 'Suriosity/LinkedIn/assets/millet_global_impact/slide_01_climate_story.png' },
            { type: 'png', label: 'Slide 02 — Ragi Glycemic', file: 'Suriosity/LinkedIn/assets/millet_global_impact/slide_02_ragi_glycemic.png' },
            { type: 'png', label: 'Slide 03 — Bajra Iron', file: 'Suriosity/LinkedIn/assets/millet_global_impact/slide_03_bajra_iron.png' },
            { type: 'png', label: 'Slide 04 — IYM 2023', file: 'Suriosity/LinkedIn/assets/millet_global_impact/slide_04_iym_2023.png' },
            { type: 'png', label: 'Slide 05 — 170 Lakh Tonnes', file: 'Suriosity/LinkedIn/assets/millet_global_impact/slide_05_170_lakh_tonnes.png' }
        ]
    },
    {
        id: 'lib-5',
        brand: 'suriosity',
        title: 'Why Importers Are Betting Big on Indian Millets',
        category: 'market-insights',
        platforms: ['linkedin'],
        status: 'to-view',
        createdAt: '2026-06-16',
        tags: ['#MilletImports', '#IndianAgriculture', '#FoodExports', '#SuriosityAgri', '#AgriBusiness', '#APEDA', '#FoodSecurity', '#ImportOpportunity'],
        slides: 5,
        content: `The food importers who locked in Indian millet supply chains in 2023 are sitting on some of the most profitable commodity positions in the natural food space right now.\n\nFOB Price: USD 280–420/MT → EU Organic Retail: USD 1,200–2,800/MT → Gross margin: 3x–6x.\n\nGlobal millet market projected at USD 55+ Billion by 2030 (Grand View Research).\n\nIndia's millet export value was ~USD 64 million in FY22-23 (APEDA official) — and growing rapidly.\n\nAre you sourcing millets from India, or is this a gap in your portfolio?\n\n📩 DM or email export@suriosity.com`,
        notes: 'Upload all 5 slides as a PDF. Target: food importers, commodity buyers, food brand procurement heads in EU/UK/UAE/USA. DM anyone who engages with the product catalogue.',
        assets: [
            { type: 'png', label: 'Slide 01 — Cover', file: 'Suriosity/LinkedIn/assets/millet_importer_opportunity/slide_01_cover.png' },
            { type: 'png', label: 'Slide 02 — Market Size', file: 'Suriosity/LinkedIn/assets/millet_importer_opportunity/slide_02_market_size.png' },
            { type: 'png', label: 'Slide 03 — Margin Story', file: 'Suriosity/LinkedIn/assets/millet_importer_opportunity/slide_03_margins.png' },
            { type: 'png', label: 'Slide 04 — Compliance', file: 'Suriosity/LinkedIn/assets/millet_importer_opportunity/slide_04_compliance.png' },
            { type: 'png', label: 'Slide 05 — CTA', file: 'Suriosity/LinkedIn/assets/millet_importer_opportunity/slide_05_cta.png' }
        ]
    },
    {
        id: 'lib-2',
        brand: 'suriosity',
        title: 'Ramesh Gond — From Jabalpur to EU Markets',
        category: 'sourcing',
        platforms: ['linkedin'],
        status: 'to-view',
        createdAt: '2026-06-10',
        tags: ['#SuriosityAgri', '#MilletExports', '#SustainableAgri', '#Agribusiness'],
        slides: 0,
        content: `Ramesh Gond spent 12 years watching middlemen take 40% of his Kodo Millet profits.\n\nToday, his harvest is on a container ship bound for the European Union.\n\nDirect-sourcing isn't just about supply-chain efficiency. It's about dignifying agriculture.\n\nWhen global food brands partner with Suriosity, they aren't just importing premium grains. They are investing in the livelihood of growers like Ramesh.\n\nHow is your brand balancing direct-sourcing ethics with global pricing pressures? Let's discuss in the comments. 🤝`,
        notes: 'Long-form post. Strong engagement potential with farmers, exporters, and food brands.'
    },
    {
        id: 'lib-3',
        brand: 'lansem',
        title: 'HMRC Filing Deadline Reminder',
        category: 'compliance',
        platforms: ['linkedin'],
        status: 'idea',
        createdAt: '2026-06-08',
        tags: ['#LansemUK', '#UKAccounting', '#HMRCCompliance'],
        slides: 0,
        content: `HMRC Filing Deadline Reminder.\n\nAvoid late submission penalties. UK SMEs must file corporation tax accounts within 9 months of their financial year end.\n\nOur secure, VDI-locked Indian delivery center can draft your management accounts overnight, saving you up to 75% on in-house accounting overhead.\n\nSend us a DM to set up a pilot.\n\n#LansemUK #UKAccounting #HMRCCompliance`,
        notes: 'Post near end of fiscal quarter for maximum relevance. Consider pairing with a UK tax calendar graphic.'
    },
    {
        id: 'lib-4',
        brand: 'corely',
        title: 'Corely Autumn Essentials — Product Launch',
        category: 'product',
        platforms: ['instagram', 'pinterest'],
        status: 'idea',
        createdAt: '2026-06-05',
        tags: ['#CorelyOrganics', '#SlowFashion', '#LuxuryEssentials', '#GOTS'],
        slides: 0,
        content: `Sand, charcoal, and ivory. Corely Autumn Essentials.\n\nCrafted from 400 GSM high-density loopback organic cotton. Verified GOTS certified mills. Hand-dyed and finished in Delhi.\n\nDesigned to outlast trends.\nPre-ordering opens this Friday. Link in bio.\n\n#CorelyOrganics #SlowFashion #MinimalistStyle`,
        notes: 'Pair with lifestyle product shot from Delhi atelier. Warm, natural light preferred.'
    }
];

function getLibraryPosts() {
    const stored = localStorage.getItem(LIBRARY_POSTS_KEY);
    if (!stored) {
        localStorage.setItem(LIBRARY_POSTS_KEY, JSON.stringify(LIBRARY_DEFAULT_POSTS));
        return LIBRARY_DEFAULT_POSTS;
    }
    return JSON.parse(stored);
}

function saveLibraryPosts(posts) {
    localStorage.setItem(LIBRARY_POSTS_KEY, JSON.stringify(posts));
}

function renderLibraryView() {
    const grid = document.getElementById('library-grid');
    if (!grid) return;

    const searchVal = (document.getElementById('library-search')?.value || '').toLowerCase();
    const brandFilter = document.getElementById('lib-filter-brand')?.value || 'all';
    const platformFilter = document.getElementById('lib-filter-platform')?.value || 'all';
    const catFilter = libActivePill;
    const statusFilter = document.getElementById('lib-filter-status')?.value || 'all';

    let posts = getLibraryPosts();

    if (currentBrand !== 'master') {
        posts = posts.filter(p => p.brand === currentBrand);
    }
    if (brandFilter !== 'all') posts = posts.filter(p => p.brand === brandFilter);
    if (platformFilter !== 'all') posts = posts.filter(p => p.platforms.includes(platformFilter));
    if (catFilter !== 'all') posts = posts.filter(p => p.category === catFilter);
    if (statusFilter !== 'all') posts = posts.filter(p => p.status === statusFilter);
    if (searchVal) posts = posts.filter(p =>
        p.title.toLowerCase().includes(searchVal) ||
        p.content.toLowerCase().includes(searchVal) ||
        (p.tags || []).some(t => t.toLowerCase().includes(searchVal))
    );

    grid.innerHTML = '';

    if (posts.length === 0) {
        grid.innerHTML = `
            <div class="lib-empty-state">
                <i class="fa-regular fa-folder-open"></i>
                <p>No posts match your filters.</p>
                <button class="btn-primary" onclick="switchTab('scheduler')" style="margin-top:12px;">
                    <i class="fa-solid fa-plus"></i> Create First Post
                </button>
            </div>
        `;
        return;
    }

    posts.forEach(post => {
        const card = buildLibraryCard(post);
        grid.appendChild(card);
    });
}

const BRAND_META = {
    suriosity: { label: 'Suriosity', color: '#65c97a', icon: 'fa-wheat-awn' },
    corely:    { label: 'Corely',    color: '#c9a065', icon: 'fa-shirt' },
    lansem:    { label: 'Lansem UK', color: '#6592c9', icon: 'fa-briefcase' }
};

const STATUS_META = {
    'idea':    { label: 'Draft',    color: '#64748b' },
    'to-edit': { label: 'To Edit',  color: '#fbbf24' },
    'to-view': { label: 'To View',  color: '#a855f7' },
    'posted':  { label: 'Posted',   color: '#10b981' }
};

const CATEGORY_META = {
    'carousel':           { label: 'Carousel',           icon: 'fa-images' },
    'thought-leadership': { label: 'Thought Leadership',  icon: 'fa-lightbulb' },
    'sourcing':           { label: 'Sourcing Story',      icon: 'fa-seedling' },
    'market-insights':    { label: 'Market Insights',     icon: 'fa-chart-bar' },
    'compliance':         { label: 'Compliance',          icon: 'fa-shield-halved' },
    'product':            { label: 'Product',             icon: 'fa-box' },
    'behind-scenes':      { label: 'Behind the Scenes',   icon: 'fa-camera' }
};

const PLATFORM_ICONS = {
    linkedin:  { icon: 'fa-brands fa-linkedin',  color: '#0077b5' },
    instagram: { icon: 'fa-brands fa-instagram', color: '#e1306c' },
    twitter:   { icon: 'fa-brands fa-x-twitter', color: '#1da1f2' },
    facebook:  { icon: 'fa-brands fa-facebook',  color: '#1877f2' },
    pinterest: { icon: 'fa-brands fa-pinterest', color: '#bd081c' },
    youtube:   { icon: 'fa-brands fa-youtube',   color: '#ff0000' }
};

// Build assets section HTML for card or modal
function buildAssetsHtml(assets, context) {
    if (!assets || assets.length === 0) return '';
    if (context === 'card') {
        // Compact: just PDF badge + count
        const pdf = assets.find(a => a.type === 'pdf');
        const pngs = assets.filter(a => a.type === 'png');
        const badges = [];
        if (pdf) badges.push(`<span class="lib-asset-badge pdf"><i class="fa-regular fa-file-pdf"></i> PDF ready</span>`);
        if (pngs.length) badges.push(`<span class="lib-asset-badge png"><i class="fa-regular fa-images"></i> ${pngs.length} slides</span>`);
        return `<div class="lib-card-assets">${badges.join('')}</div>`;
    }
    // Full list for modal
    const rows = assets.map(a => {
        const icon = a.type === 'pdf' ? 'fa-file-pdf' : 'fa-file-image';
        const color = a.type === 'pdf' ? '#ef4444' : '#60a5fa';
        return `<div class="lib-asset-row">
            <i class="fa-regular ${icon}" style="color:${color};"></i>
            <span>${a.label}</span>
            <span class="lib-asset-filename">${a.file.split('/').pop()}</span>
        </div>`;
    }).join('');
    return `
        <div class="lib-assets-panel">
            <div class="lib-assets-header"><i class="fa-solid fa-paperclip"></i> Attached Assets</div>
            ${rows}
        </div>
    `;
}

function buildLibraryCard(post) {
    const card = document.createElement('div');
    card.className = 'lib-card';
    card.setAttribute('data-id', post.id);

    const brand = BRAND_META[post.brand] || { label: post.brand, color: '#888', icon: 'fa-circle' };
    const status = STATUS_META[post.status] || { label: post.status, color: '#888' };
    const cat = CATEGORY_META[post.category] || { label: post.category, icon: 'fa-file' };

    const platformIcons = (post.platforms || []).map(p => {
        const m = PLATFORM_ICONS[p] || { icon: 'fa-globe', color: '#888' };
        return `<i class="${m.icon}" style="color:${m.color}; font-size:1rem;" title="${p}"></i>`;
    }).join('');

    const preview = post.content.slice(0, 120).replace(/\n/g, ' ');
    const tagsHtml = (post.tags || []).slice(0, 3).map(t =>
        `<span class="lib-tag">${t}</span>`
    ).join('');
    const assetsHtml = buildAssetsHtml(post.assets, 'card');

    card.innerHTML = `
        <div class="lib-card-top">
            <div class="lib-card-brand" style="color:${brand.color}">
                <i class="fa-solid ${brand.icon}"></i> ${brand.label}
            </div>
            <div class="lib-card-status" style="background:${status.color}22; color:${status.color}; border:1px solid ${status.color}44;">
                ${status.label}
            </div>
        </div>
        <div class="lib-card-category">
            <i class="fa-solid ${cat.icon}"></i> ${cat.label}
            ${post.slides > 0 ? `<span class="lib-slides-badge">${post.slides} slides</span>` : ''}
        </div>
        <h4 class="lib-card-title">${post.title}</h4>
        <p class="lib-card-preview">${preview}…</p>
        <div class="lib-card-tags">${tagsHtml}</div>
        ${assetsHtml}
        <div class="lib-card-footer">
            <div class="lib-card-platforms">${platformIcons}</div>
            <div class="lib-card-date">${post.createdAt}</div>
        </div>
        <div class="lib-card-actions">
            <button class="lib-btn-preview" onclick="openLibraryPreview('${post.id}')">
                <i class="fa-regular fa-eye"></i> Preview
            </button>
            <button class="lib-btn-status" onclick="cycleLibraryStatus('${post.id}')">
                <i class="fa-solid fa-arrow-right"></i> Advance
            </button>
            <button class="lib-btn-delete" onclick="deleteLibraryPost('${post.id}')">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `;
    return card;
}

function openLibraryPreview(postId) {
    const posts = getLibraryPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const brand = BRAND_META[post.brand] || { label: post.brand, color: '#888', icon: 'fa-circle' };
    const status = STATUS_META[post.status] || { label: post.status, color: '#888' };
    const cat = CATEGORY_META[post.category] || { label: post.category, icon: 'fa-file' };

    const platformIcons = (post.platforms || []).map(p => {
        const m = PLATFORM_ICONS[p] || { icon: 'fa-globe', color: '#888' };
        return `<i class="${m.icon}" style="color:${m.color}; font-size:1.1rem;" title="${p}"></i>`;
    }).join(' ');

    const statusOptions = Object.entries(STATUS_META).map(([val, meta]) =>
        `<option value="${val}" ${post.status === val ? 'selected' : ''}>${meta.label}</option>`
    ).join('');

    const modal = document.getElementById('lib-preview-modal');
    const modalContent = document.getElementById('lib-preview-content');

    modalContent.innerHTML = `
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-bottom:18px;">
            <span style="color:${brand.color}; font-weight:700;"><i class="fa-solid ${brand.icon}"></i> ${brand.label}</span>
            <span style="color:var(--text-muted);">·</span>
            <span style="color:var(--text-secondary);"><i class="fa-solid ${cat.icon}"></i> ${cat.label}</span>
            <span style="color:var(--text-muted);">·</span>
            <span>${platformIcons}</span>
            <span style="color:var(--text-muted);">·</span>
            <span style="background:${status.color}22; color:${status.color}; border:1px solid ${status.color}44; padding:2px 10px; border-radius:20px; font-size:0.75rem; font-weight:600;">${status.label}</span>
        </div>
        <h3 style="font-family:var(--font-heading); font-size:1.15rem; margin-bottom:14px;">${post.title}</h3>
        <div style="white-space:pre-wrap; font-size:0.88rem; line-height:1.7; color:var(--text-primary); background:rgba(0,0,0,0.2); padding:18px; border-radius:10px; border:1px solid var(--border-color); max-height:280px; overflow-y:auto; margin-bottom:16px;">${post.content}</div>
        ${post.notes ? `<div style="font-size:0.8rem; color:var(--text-muted); background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:10px 14px; margin-bottom:16px;"><i class="fa-solid fa-note-sticky" style="margin-right:6px;"></i>${post.notes}</div>` : ''}
        ${buildAssetsHtml(post.assets, 'modal')}
        <div style="display:flex; gap:12px; align-items:center;">
            <label style="font-size:0.8rem; color:var(--text-secondary); white-space:nowrap;">Change Status:</label>
            <select id="lib-preview-status-select" style="flex:1; background:rgba(0,0,0,0.3); border:1px solid var(--border-color); color:var(--text-primary); border-radius:8px; padding:8px 12px; font-size:0.85rem;">
                ${statusOptions}
            </select>
            <button class="btn-primary" onclick="saveLibraryStatus('${post.id}')" style="white-space:nowrap;">
                <i class="fa-solid fa-check"></i> Save
            </button>
        </div>
    `;
    modal.classList.add('active');
}

function saveLibraryStatus(postId) {
    const newStatus = document.getElementById('lib-preview-status-select').value;
    const posts = getLibraryPosts();
    const idx = posts.findIndex(p => p.id === postId);
    if (idx > -1) { posts[idx].status = newStatus; saveLibraryPosts(posts); }
    closeLibraryPreview();
    renderLibraryView();
}

function cycleLibraryStatus(postId) {
    const order = ['idea', 'to-edit', 'to-view', 'posted'];
    const posts = getLibraryPosts();
    const idx = posts.findIndex(p => p.id === postId);
    if (idx > -1) {
        const ci = order.indexOf(posts[idx].status);
        posts[idx].status = order[(ci + 1) % order.length];
        saveLibraryPosts(posts);
        renderLibraryView();
    }
}

function deleteLibraryPost(postId) {
    if (!confirm('Delete this post from the library?')) return;
    saveLibraryPosts(getLibraryPosts().filter(p => p.id !== postId));
    renderLibraryView();
}

function closeLibraryPreview() {
    const modal = document.getElementById('lib-preview-modal');
    if (modal) modal.classList.remove('active');
}

// =============================================
// ENGAGEMENT OPTIMIZER VIEW LOGIC
// =============================================

const PLAYBOOK_DB = {
    master: {
        hooks: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-lightbulb" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Contrarian (High Dwell):</strong> "Everyone tells you X. Here is why that's bad advice."</span></li>
                <li><i class="fa-solid fa-chart-line" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Data-Driven:</strong> "I spent $10K on X and learned these 3 critical lessons."</span></li>
                <li><i class="fa-solid fa-comments" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Story Opening:</strong> Start with a struggle: "Ramesh spent years trying to..."</span></li>
            </ul>
        `,
        formatting: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-align-left" style="color: var(--accent); margin-right: 6px;"></i> <span>Keep paragraphs extremely short (1-2 sentences maximum).</span></li>
                <li><i class="fa-solid fa-list-ul" style="color: var(--accent); margin-right: 6px;"></i> <span>Use numbered lists or bullet points to make stats stand out.</span></li>
                <li><i class="fa-solid fa-eye" style="color: var(--accent); margin-right: 6px;"></i> <span>Insert generous line breaks to create "dwell-friendly" white space.</span></li>
            </ul>
        `,
        algo: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-ban" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Link penalty:</strong> Do not put URLs in the body. Say "Link in comments".</span></li>
                <li><i class="fa-solid fa-hashtag" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Hashtags:</strong> Use 3-5 tags. Place them at the very bottom.</span></li>
                <li><i class="fa-solid fa-user-check" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Dwell Time:</strong> PDF carousels perform 5x better than basic text.</span></li>
            </ul>
        `
    },
    suriosity: {
        hooks: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-seedling" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Agrarian/Direct:</strong> "Ramesh Gond spent 12 years watching middlemen take 40% of his Kodo Millet profits..."</span></li>
                <li><i class="fa-solid fa-globe" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>B2B Exporter:</strong> "The food importers who locked in Indian millet supply chains are sitting on..."</span></li>
                <li><i class="fa-solid fa-wheat-awn" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Product Focus:</strong> "Bajra moisture levels are charting a perfect 11-12% baseline. Here's why..."</span></li>
            </ul>
        `,
        formatting: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-percent" style="color: var(--accent); margin-right: 6px;"></i> <span>Put logistics specs (moisture, pesticide MRLs) in bold/bullet list.</span></li>
                <li><i class="fa-solid fa-anchor" style="color: var(--accent); margin-right: 6px;"></i> <span>Use clean sections: e.g. "The Problem", "The Solution", "The Impact".</span></li>
            </ul>
        `,
        algo: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-tag" style="color: var(--accent); margin-right: 6px;"></i> <span>Tag APEDA and include keywords like "Millet Exports", "Agri Business".</span></li>
                <li><i class="fa-solid fa-comments" style="color: var(--accent); margin-right: 6px;"></i> <span>Encourage replies from importers by asking about MOQ and catalogue requests.</span></li>
            </ul>
        `
    },
    corely: {
        hooks: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-shirt" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Minimalist Aesthetic:</strong> "Sand, charcoal, and ivory. Designed to outlast trends."</span></li>
                <li><i class="fa-solid fa-pen-nib" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Artisanal Focus:</strong> "Meet Rajesh. He manages our primary knitting house in Delhi..."</span></li>
            </ul>
        `,
        formatting: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-leaf" style="color: var(--accent); margin-right: 6px;"></i> <span>Use earthy, restrained descriptions. Avoid overly promotional uppercase hype.</span></li>
                <li><i class="fa-solid fa-scissors" style="color: var(--accent); margin-right: 6px;"></i> <span>Make listings clean and highlight premium fabric details (GOTS, GSM).</span></li>
            </ul>
        `,
        algo: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-camera" style="color: var(--accent); margin-right: 6px;"></i> <span>Include hashtags like #CorelyOrganics, #SlowFashion, #MinimalistStyle.</span></li>
                <li><i class="fa-solid fa-link" style="color: var(--accent); margin-right: 6px;"></i> <span>Keep links in bio; do not link directly in body captions.</span></li>
            </ul>
        `
    },
    lansem: {
        hooks: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-triangle-exclamation" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Regulatory Alert:</strong> "Avoid late submission penalties. HMRC filing reminder."</span></li>
                <li><i class="fa-solid fa-shield-halved" style="color: var(--accent); margin-right: 6px;"></i> <span><strong>Security Check:</strong> "How secure is your offshore accounting team?"</span></li>
            </ul>
        `,
        formatting: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-pound-sign" style="color: var(--accent); margin-right: 6px;"></i> <span>Emphasize exact percentage savings (e.g. "Save up to 75% on overhead").</span></li>
                <li><i class="fa-solid fa-laptop-code" style="color: var(--accent); margin-right: 6px;"></i> <span>Clearly state operational safety measures (GDPR compliance, VDI setups).</span></li>
            </ul>
        `,
        algo: `
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                <li><i class="fa-solid fa-briefcase" style="color: var(--accent); margin-right: 6px;"></i> <span>Include UK-specific corporate hashtags like #UKAccounting, #LansemUK.</span></li>
                <li><i class="fa-solid fa-user-plus" style="color: var(--accent); margin-right: 6px;"></i> <span>Invite direct messages (DM) for client capacity pilots.</span></li>
            </ul>
        `
    }
};

function renderEngagementView() {
    const brandPlaybook = PLAYBOOK_DB[currentBrand] || PLAYBOOK_DB.master;

    // Populate dynamic playbook content
    const hooksDiv = document.getElementById('playbook-hooks');
    const formDiv = document.getElementById('playbook-formatting');
    const algoDiv = document.getElementById('playbook-algo');

    if (hooksDiv) hooksDiv.innerHTML = brandPlaybook.hooks;
    if (formDiv) formDiv.innerHTML = brandPlaybook.formatting;
    if (algoDiv) algoDiv.innerHTML = brandPlaybook.algo;

    // Trigger analysis in case there's existing text in textarea
    analyzeDraftPost();

    // Trigger loading trends
    fetchRealTimeTrends();
}

function updateCheckStatus(id, status, descText) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = `check-item ${status}`;
    
    const icon = el.querySelector('.check-status i');
    if (icon) {
        if (status === 'success') {
            icon.className = 'fa-solid fa-circle-check';
        } else if (status === 'warning') {
            icon.className = 'fa-solid fa-triangle-exclamation';
        } else if (status === 'error') {
            icon.className = 'fa-solid fa-circle-xmark';
        } else {
            icon.className = 'fa-solid fa-circle-notch';
        }
    }
    
    const desc = el.querySelector('.check-desc');
    if (desc && descText) {
        desc.textContent = descText;
    }
}

function analyzeDraftPost() {
    const textEl = document.getElementById('opt-post-content');
    if (!textEl) return;
    
    const text = textEl.value;
    const charCount = text.length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    // Update count labels
    const charCountEl = document.getElementById('opt-char-count');
    const wordCountEl = document.getElementById('opt-word-count');
    if (charCountEl) charCountEl.textContent = `${charCount} characters`;
    if (wordCountEl) wordCountEl.textContent = `${wordCount} words`;

    // Handle empty state
    if (text.trim() === '') {
        const scoreValEl = document.getElementById('opt-score-val');
        const scoreLabelEl = document.getElementById('opt-score-label');
        const indicator = document.getElementById('opt-score-indicator');

        if (scoreValEl) scoreValEl.textContent = '0';
        if (scoreLabelEl) scoreLabelEl.textContent = 'Write something to start the real-time evaluation.';
        if (indicator) {
            indicator.style.strokeDashoffset = '251.2';
            indicator.style.stroke = 'var(--accent)';
        }

        updateCheckStatus('chk-hook', 'pending', 'Needs a strong opening line (e.g. data, story, or question).');
        updateCheckStatus('chk-dwell', 'pending', 'Keep paragraphs under 2 sentences with clean line breaks.');
        updateCheckStatus('chk-links', 'pending', 'Avoid external links in body; put them in comments instead.');
        updateCheckStatus('chk-hashtags', 'pending', 'Aim for exactly 3 to 5 relevant hashtags.');
        updateCheckStatus('chk-cta', 'pending', 'Ask a direct question at the end to prompt discussions.');
        return;
    }

    let hookScore = 5;
    let spacingScore = 5;
    let linkScore = 25;
    let hashtagScore = 0;
    let ctaScore = 0;

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const firstLine = lines[0] || '';

    // 1. Hook Check
    let hookDesc = 'Needs a stronger opening sentence under 200 chars.';
    let hookStatus = 'error';
    if (firstLine.length > 10 && firstLine.length <= 200) {
        hookScore += 10;
    }
    if (/[0-9]/.test(firstLine)) {
        hookScore += 5; // Has stats/numbers
    }
    if (firstLine.includes('?')) {
        hookScore += 5; // Direct question hook
    }
    const triggers = ['how', 'why', 'spent', 'lost', 'learn', 'meet', 'hidden', 'opp', 'opportunities', 'bajra', 'ragi', 'millet', 'hmrc', 'secure', 'organics', 'sustainable', 'middlemen', 'agriculture', 'importers', 'profit'];
    if (triggers.some(t => firstLine.toLowerCase().includes(t))) {
        hookScore += 5; // Strong keywords detected
    }
    if (hookScore >= 20) {
        hookStatus = 'success';
        hookDesc = 'Excellent! Highly engaging hook under 200 characters.';
    } else if (hookScore >= 10) {
        hookStatus = 'warning';
        hookDesc = 'Decent hook. Try adding numbers or starting with a question.';
    }

    // 2. Dwell Spacing Check
    let spacingDesc = 'Dense paragraphs block readability. Add double line breaks.';
    let spacingStatus = 'error';
    const paragraphs = text.split(/\n\s*\n/).filter(Boolean);
    const hasDoubleNewlines = text.includes('\n\n') || text.includes('\r\n\r\n');
    const hasBullets = /[-*•\u2022]|\d\.\s/.test(text);

    if (hasDoubleNewlines) {
        spacingScore += 10;
    }
    if (hasBullets) {
        spacingScore += 10;
    }
    
    // Penalty if any paragraph is too long (> 3 sentences)
    let tooDense = false;
    paragraphs.forEach(p => {
        const sentences = p.split(/[.!?]\s+/).filter(Boolean);
        if (sentences.length > 2) {
            tooDense = true;
        }
    });
    if (!tooDense && paragraphs.length > 1) {
        spacingScore += 5;
    } else if (tooDense) {
        spacingScore = Math.max(0, spacingScore - 5);
    }

    if (spacingScore >= 20) {
        spacingStatus = 'success';
        spacingDesc = 'Readability optimized! Spacious paragraphs and clear visual anchors.';
    } else if (spacingScore >= 10) {
        spacingStatus = 'warning';
        spacingDesc = 'Readability is okay. Break down sentences into smaller lines.';
    }

    // 3. Link Penalty Check
    let linkStatus = 'success';
    let linkDesc = 'Perfect. No external links in body text (Reach penalty safe).';
    if (/(https?:\/\/|www\.)[^\s]+/.test(text)) {
        linkScore = 0;
        linkStatus = 'error';
        linkDesc = 'Warning: External links in body suppress reach by 50%+. Put link in comments.';
    }

    // 4. Hashtag Check
    const hashtags = text.match(/#[a-zA-Z0-9_]+/g) || [];
    const hashCount = hashtags.length;
    let hashStatus = 'warning';
    let hashDesc = 'No hashtags found. Add 3-5 tags to increase indexability.';
    
    if (hashCount >= 3 && hashCount <= 5) {
        hashtagScore = 15;
        hashStatus = 'success';
        hashDesc = `Great hashtag count (${hashCount} tags). Reach is optimized.`;
    } else if (hashCount > 5) {
        hashtagScore = 5;
        hashStatus = 'error';
        hashDesc = `Too many hashtags (${hashCount}). LinkedIn flags this as spam. Limit to 3-5.`;
    } else if (hashCount > 0) {
        hashtagScore = 8;
        hashStatus = 'warning';
        hashDesc = `Only ${hashCount} hashtag${hashCount > 1 ? 's' : ''}. Add a few more (aim for 3-5).`;
    }

    // 5. Call To Action (CTA) Check
    const last150 = text.slice(-150).toLowerCase();
    const ctaTriggers = ['comment', 'agree', 'discuss', 'thoughts', 'dm us', 'dm ', 'email', 'catalog', 'catalogue', 'contact', '?', 'what is', 'how do', 'share'];
    const hasCTA = ctaTriggers.some(t => last150.includes(t));
    let ctaStatus = 'warning';
    let ctaDesc = 'Missing a final CTA. Ask a question at the end to drive comments.';

    if (hasCTA) {
        ctaScore = 10;
        ctaStatus = 'success';
        ctaDesc = 'CTA detected! Prompting discussion in the comments boosts organic reach.';
    }

    // Dynamic Score Calculation
    const totalScore = hookScore + spacingScore + linkScore + hashtagScore + ctaScore;
    
    // Update UI elements
    const scoreValEl = document.getElementById('opt-score-val');
    const scoreLabelEl = document.getElementById('opt-score-label');
    const indicator = document.getElementById('opt-score-indicator');

    if (scoreValEl) scoreValEl.textContent = totalScore.toString();
    
    let label = 'Low engagement potential. Review checklist details.';
    let strokeColor = '#ef4444'; // Red
    
    if (totalScore >= 80) {
        label = 'Excellent! Post is highly optimized for reach and comments.';
        strokeColor = '#10b981'; // Green
    } else if (totalScore >= 50) {
        label = 'Good potential. Resolve warnings to unlock higher engagement.';
        strokeColor = '#fbbf24'; // Yellow
    }

    if (scoreLabelEl) scoreLabelEl.textContent = label;
    if (indicator) {
        const dashOffset = 251.2 - (251.2 * totalScore) / 100;
        indicator.style.strokeDashoffset = dashOffset.toString();
        indicator.style.stroke = strokeColor;
    }

    // Update checklists
    updateCheckStatus('chk-hook', hookStatus, hookDesc);
    updateCheckStatus('chk-dwell', spacingStatus, spacingDesc);
    updateCheckStatus('chk-links', linkStatus, linkDesc);
    updateCheckStatus('chk-hashtags', hashStatus, hashDesc);
    updateCheckStatus('chk-cta', ctaStatus, ctaDesc);
}

function saveDraftToScheduler() {
    const textEl = document.getElementById('opt-post-content');
    if (!textEl) return;
    
    const text = textEl.value.trim();
    if (!text) {
        alert('Cannot save empty post draft.');
        return;
    }

    const posts = getScheduledPosts();
    const newPost = {
        id: Date.now(),
        brand: currentBrand === 'master' ? 'suriosity' : currentBrand, // Default to suriosity if master brand active
        platforms: ['linkedin'],
        content: text,
        category: 'thought-leadership',
        status: 'idea'
    };

    posts.unshift(newPost);
    saveScheduledPosts(posts);

    alert('Success! Your optimized draft has been saved to the Content Board under Ideas/Drafts.');
    switchTab('scheduler');
}

// =============================================
// REAL-TIME INDIA TRENDS FETCHING & RENDERING
// =============================================

function fetchRealTimeTrends(forceReload = false) {
    if (latestTrendsData && !forceReload) {
        // Data already loaded, just render
        renderTrendsHashtags();
        renderViralPosts();
        return;
    }

    const overlay = document.getElementById('trends-loading-overlay');
    const loadingText = document.getElementById('trends-loading-text');
    const syncTimeText = document.getElementById('trends-sync-time');

    if (overlay) {
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
    }
    if (loadingText) {
        loadingText.textContent = 'Fetching real-time trends from India...';
    }

    const isLocalStatic = window.location.protocol === 'file:' || 
                          (window.location.hostname === 'localhost' && window.location.port !== '3000') ||
                          (window.location.hostname === '127.0.0.1' && window.location.port !== '3000');
    const apiBase = isLocalStatic ? 'https://smm-master-dashboard.vercel.app' : '';
    const apiUrl = `${apiBase}/api/get-trends`;

    const apiKey = localStorage.getItem('smm_gemini_api_key') || '';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: apiKey
        })
    })
    .then(async response => {
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || `HTTP status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        latestTrendsData = data;
        
        // Hide loading
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => { overlay.style.display = 'none'; }, 300);
        }

        // Update sync time
        if (syncTimeText) {
            const now = new Date();
            syncTimeText.textContent = `Synced: ${now.toLocaleTimeString()}`;
        }

        // Render both views
        renderTrendsHashtags();
        renderViralPosts();
    })
    .catch(err => {
        console.error("Error loading trends:", err);
        if (loadingText) {
            loadingText.innerHTML = `<span style="color: #ef4444;">Error fetching trends: ${err.message}</span><br>
            <button class="btn-primary" onclick="fetchRealTimeTrends(true)" style="margin-top:12px; font-size:0.75rem; padding:6px 12px; cursor:pointer;">Retry</button>`;
        }
        if (syncTimeText) {
            syncTimeText.textContent = 'Sync Failed';
        }
    });
}

function renderTrendsHashtags() {
    const listContainer = document.getElementById('trends-hashtags-list');
    if (!listContainer || !latestTrendsData) return;

    listContainer.innerHTML = '';
    
    // Choose list based on current timeframe
    let tagsList = [];
    if (currentHashtagTime === '24h') {
        tagsList = latestTrendsData.hashtags24h || [];
    } else if (currentHashtagTime === '48h') {
        tagsList = latestTrendsData.hashtags48h || [];
    } else {
        tagsList = latestTrendsData.hashtags1w || [];
    }

    if (tagsList.length === 0) {
        listContainer.innerHTML = '<div style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:20px;">No trending hashtags found.</div>';
        return;
    }

    tagsList.forEach(item => {
        const row = document.createElement('div');
        row.className = 'hashtag-row-item';
        
        row.innerHTML = `
            <span class="hashtag-name">${item.tag}</span>
            <span class="hashtag-growth"><i class="fa-solid fa-arrow-trend-up"></i> ${item.growth}</span>
        `;
        listContainer.appendChild(row);
    });
}

function renderViralPosts() {
    const listContainer = document.getElementById('trends-posts-list');
    if (!listContainer || !latestTrendsData) return;

    listContainer.innerHTML = '';

    let posts = latestTrendsData.posts || [];

    // Filter by mediaType
    if (currentMediaFilter !== 'all') {
        posts = posts.filter(p => (p.mediaType || '').toLowerCase() === currentMediaFilter);
    }

    if (posts.length === 0) {
        listContainer.innerHTML = '<div style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:20px;">No posts match this media format filter.</div>';
        return;
    }

    posts.forEach(post => {
        const item = document.createElement('div');
        item.className = 'viral-post-item';

        const formatLabel = post.mediaType.toUpperCase();
        const formatClass = (post.mediaType || '').toLowerCase();

        item.innerHTML = `
            <div class="viral-post-header">
                <h5 class="viral-post-topic">${post.topic}</h5>
                <span class="viral-post-format-badge ${formatClass}">${formatLabel}</span>
            </div>
            <p class="viral-post-excerpt">${post.excerpt}</p>
            <div class="viral-post-footer">
                <div class="viral-post-metrics">
                    <div class="viral-post-metric">
                        <i class="fa-regular fa-thumbs-up"></i>
                        <span>${post.likes.toLocaleString()}</span>
                    </div>
                    <div class="viral-post-metric">
                        <i class="fa-regular fa-comment"></i>
                        <span>${post.comments.toLocaleString()}</span>
                    </div>
                </div>
                <div class="viral-post-metrics">
                    <div class="viral-post-metric er" title="Estimated Engagement Rate">
                        <i class="fa-solid fa-fire-flame-simple"></i>
                        <span>${post.engagementRate}</span>
                    </div>
                </div>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

// Expose trends fetcher to window scope for inline onclick retry triggers
window.fetchRealTimeTrends = fetchRealTimeTrends;


