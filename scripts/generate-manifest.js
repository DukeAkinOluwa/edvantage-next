// scripts/generate-manifest.js
const glob = require('glob');
const fs = require('fs-extra');

const manualManifest = {
    "name": "Edvantage",
    "short_name": "Edvantage",
    "start_url": "./",
    "display": "standalone",
    "display_override": ["window-controls-overlay", "standalone", "fullscreen", "minimal-ui"],
    "theme_color": "#FAFBFD",
    "background_color": "#2A52BE",
    "icons": [
        {
        "src": "./Images/Manifest/Logos/Edvantage1.png",
        "sizes": "1080x1080",
        "type": "image/png"
        },
        {
        "src": "./Images/Manifest/Logos/Edvantage2.png",
        "sizes": "1080x1080",
        "type": "image/png"
        },
        {
        "src": "./Images/Manifest/Logos/Logo.jpg",
        "sizes": "144x144",
        "type": "image/png"
        }
    ],
    "screenshots": [
        {
        "src": "./Images/Manifest/Screenshots/screenshot-wide-1.png",
        "sizes": "1919x1048",
        "type": "image/png",
        "form_factor": "wide"
        },
        {
        "src": "./Images/Manifest/Screenshots/screenshot-wide-2.png",
        "sizes": "1919x1048",
        "type": "image/png",
        "form_factor": "wide"
        },
        {
        "src": "./Images/Manifest/Screenshots/screenshot-mobile-1.png",
        "sizes": "395x862",
        "type": "image/png",
        "form_factor": "narrow"
        },
        {
        "src": "./Images/Manifest/Screenshots/screenshot-mobile-2.png",
        "sizes": "390x861",
        "type": "image/png",
        "form_factor": "narrow"
        }
    ],
    "protocol_handlers": [
        {
        "protocol": "web+edvantage",
        "url": "./users/[userId]/%s"
        }
    ]
};

const generateManifest = async () => {
    const files = glob.sync('public/**/*.{html,css,js,jpg,jpeg,png,svg}', { nodir: true });
    const dynamicAssets = files.map(file => file.replace('public', ''));
    
    const completeManifest = {
        ...manualManifest,
        files: [
        "/",
        "/manifest.json"
        // ...dynamicAssets
        ]
    };

    await fs.writeJson('public/manifest.json', completeManifest, { spaces: 2 });
    console.log('Manifest generated with static files and custom PWA content');
    // console.log(completeManifest)
};

generateManifest();
