import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/assets');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Subfolders for clean organization
const bannersDir = path.join(targetDir, 'banners');
const productsDir = path.join(targetDir, 'products');
const brandDir = path.join(targetDir, 'brand');

[bannersDir, productsDir, brandDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const ASSETS_TO_DOWNLOAD = [
  // Banners & Brand
  { url: 'https://cakebites.pk/wp-content/uploads/2026/05/Cake-Bites-Banner-1.png', dest: path.join(bannersDir, 'hero-banner.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/06/OujlJi-1-768x65.png', dest: path.join(bannersDir, 'divider.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/06/5f831c29-370c-4062-8ddb-7c8c29d40e18.png', dest: path.join(bannersDir, 'combos-banner.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/07/37911e05-62ce-4781-b7bc-0f9efda0b824.png', dest: path.join(bannersDir, 'best-selling-banner.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/05/Cake-bites-catogery-banner-1.png', dest: path.join(bannersDir, 'cakes-banner.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/05/Cupcake-banner-1.png', dest: path.join(bannersDir, 'cupcakes-banner.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/05/Baronies-cake-1.png', dest: path.join(bannersDir, 'brownies-banner.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/05/sundae-cup-in-cake-bites.png', dest: path.join(bannersDir, 'sundae-banner.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/05/Bento-cake-banner-for-cakbites.png', dest: path.join(bannersDir, 'bento-banner.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/05/customized-cake-in-cakebites-banner.png', dest: path.join(bannersDir, 'custom-banner.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/06/luxury-background-gold-gradient-design_483537-1108-removebg-preview-e1781195121523.png', dest: path.join(bannersDir, 'gold-accent.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/cakebites_logo.png', dest: path.join(brandDir, 'cakebites-logo.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/06/cakesbites-b-w-logo.png', dest: path.join(brandDir, 'cakebites-logo-bw.png') },

  // Combos
  { url: 'https://cakebites.pk/wp-content/uploads/2026/06/52f483d9-e0f2-4ff0-94bf-5605834a7af7.webp', dest: path.join(productsDir, 'mango-bliss-combo.webp') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/06/772ef285-63ca-4c30-af19-cb06ae70a7df.webp', dest: path.join(productsDir, 'golden-nutella-combo.webp') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/06/5f50f861-dff1-4c0c-a4f9-d1cc4a000848.webp', dest: path.join(productsDir, 'milky-bloom-combo.webp') },

  // Best Selling & Signature Cakes
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1701430460-Double20cake.jpeg', dest: path.join(productsDir, 'double-fudge-cake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1731001864-lotus.jpeg', dest: path.join(productsDir, 'lotus-three-milk-cake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886869-Nutella20cake.jpeg', dest: path.join(productsDir, 'nutella-cake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/05/Three-Milk-Mango-Cake-by-Cakebites.pk_.jpg', dest: path.join(productsDir, 'three-milk-mango-cake.jpg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545699-Three203_13_11zon.webp', dest: path.join(productsDir, 'three-milk-cake.webp') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545934-Dream-Lava-2_64_11zon.webp', dest: path.join(productsDir, 'dream-lava-cake.webp') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1713426928-ferror20cske_11zon.png', dest: path.join(productsDir, 'ferrero-rocher-cake.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2026/02/Untitled-1_0028_DSC08154.jpg', dest: path.join(productsDir, 'ferrero-classic-cake.jpg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751546396-Chocolate-Fudge-Cake_82_11zon.webp', dest: path.join(productsDir, 'german-fudge-cake.webp') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545285-Red-velvet-2_44_11zon.jpeg', dest: path.join(productsDir, 'red-velvet-cake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1699887294-Belgian20cake.jpeg', dest: path.join(productsDir, 'belgian-malt-cake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1699887245-Chocolate20cake.jpeg', dest: path.join(productsDir, 'chocolate-mousse-cake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886990-Milky20cake.jpeg', dest: path.join(productsDir, 'milky-malt-cake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751548137-Coffee204_48_11zon.png', dest: path.join(productsDir, 'coffee-cake.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751544975-Black20Forest.png', dest: path.join(productsDir, 'black-forest-cake.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1701430557-Pineapple20cake.jpeg', dest: path.join(productsDir, 'pineapple-cake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751548088-Chocolate20Heaven_87_11zon.png', dest: path.join(productsDir, 'chocolate-heaven-cake.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545966-Kitkat205_28_11zon.png', dest: path.join(productsDir, 'kitkat-chocolate-cake.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545814-Dairy20Milk_55_11zon.png', dest: path.join(productsDir, 'dairy-milk-cake.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545388-Salted20Caramel_8_11zon.png', dest: path.join(productsDir, 'salted-caramel-cake.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0023_DSC08195-copy.jpg', dest: path.join(productsDir, 'raffaello-cake.jpg') },
  
  // Cheesecakes
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/lotus.png', dest: path.join(productsDir, 'lotus-cheesecake.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545017-New-York-Cheese-Cake-6_38_11zon.webp', dest: path.join(productsDir, 'new-york-cheesecake.webp') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/WhatsApp-Image-2026-03-18-at-2.34.13-AM.jpeg', dest: path.join(productsDir, 'strawberry-cheesecake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/blueberry.png', dest: path.join(productsDir, 'blueberry-cheesecake.png') },

  // Cupcakes
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045065-Ferrero20cup20cake.jpeg', dest: path.join(productsDir, 'ferrero-cupcake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1713426823-Belgian20Cupcake.png', dest: path.join(productsDir, 'belgian-chocolate-cupcake.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1699887645-MNM20cupcake.jpeg', dest: path.join(productsDir, 'mm-cupcake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886589-Swiss20cup20cake.jpeg', dest: path.join(productsDir, 'swiss-dark-cupcake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886958-Milky20cup20cake.jpeg', dest: path.join(productsDir, 'milky-chocolate-cupcake.jpeg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0010_DSC08035.jpg', dest: path.join(productsDir, 'nutella-chocolate-cupcake.jpg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0014_DSC08119.jpg', dest: path.join(productsDir, 'red-velvet-cupcake.jpg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886618-Salted20cup20cake.jpeg', dest: path.join(productsDir, 'salted-caramel-cupcake.jpeg') },

  // Brownies
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1730999508-Capture20NUT.webp', dest: path.join(productsDir, 'nutella-brownie.webp') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/cadbury.png', dest: path.join(productsDir, 'cadbury-brownie.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045197-Mars20Brownie.webp', dest: path.join(productsDir, 'mars-chocolate-brownie.webp') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045100-Belgian20Brownie.webp', dest: path.join(productsDir, 'belgian-malt-brownie.webp') },

  // Sundaes
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045505-Three20sundae.webp', dest: path.join(productsDir, 'three-milk-sundae.webp') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045238-Nutella20sundae.webp', dest: path.join(productsDir, 'nutella-sundae.webp') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0001_DSC08299.jpg', dest: path.join(productsDir, 'galaxy-sundae.jpg') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1713426852-red20Sundae.webp', dest: path.join(productsDir, 'red-velvet-sundae.webp') },

  // Bento Cakes (Authentic 1 - 8)
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1724107966-IMG-00309.png', dest: path.join(productsDir, 'bento-cake-1.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1724108028-IMG-00310.png', dest: path.join(productsDir, 'bento-cake-2.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1724108059-IMG-00311.png', dest: path.join(productsDir, 'bento-cake-3.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1724108092-IMG-00312.png', dest: path.join(productsDir, 'bento-cake-4.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1724108217-IMG-00313.png', dest: path.join(productsDir, 'bento-cake-5.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1724108300-IMG-00314.png', dest: path.join(productsDir, 'bento-cake-6.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1724108270-IMG-00315.png', dest: path.join(productsDir, 'bento-cake-7.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1724108355-IMG-00316.png', dest: path.join(productsDir, 'bento-cake-8.png') },

  // Customized Cupcakes (Authentic 1 - 8)
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1723817336-Cup20Cake.png', dest: path.join(productsDir, 'custom-cupcake-box-1.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1723817469-Cup20Cake1.png', dest: path.join(productsDir, 'custom-cupcake-box-2.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1723818525-Cup20Cake2.png', dest: path.join(productsDir, 'custom-cupcake-box-3.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1723818619-Cup20Cake3.png', dest: path.join(productsDir, 'custom-cupcake-box-4.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png', dest: path.join(productsDir, 'custom-cupcake-box-5.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1723819319-Minimum.png', dest: path.join(productsDir, 'custom-cupcake-box-6.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1723886170-Cup20Cake6.png', dest: path.join(productsDir, 'custom-cupcake-box-7.png') },
  { url: 'https://cakebites.pk/wp-content/uploads/2025/12/1723886206-Cupcakes6.png', dest: path.join(productsDir, 'custom-cupcake-box-8.png') },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    // Check if already exists and is non-empty
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`[EXISTS] ${path.basename(dest)}`);
      return resolve({ status: 'cached', file: dest });
    }

    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://cakebites.pk/'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed with HTTP ${res.statusCode} for ${url}`));
      }

      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const size = fs.statSync(dest).size;
          console.log(`[DOWNLOADED] ${path.basename(dest)} (${(size / 1024).toFixed(1)} KB)`);
          resolve({ status: 'downloaded', file: dest, size });
        });
      });
    });

    req.on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });

    req.setTimeout(30000, () => {
      req.destroy();
      file.close();
      fs.unlink(dest, () => {});
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function run() {
  console.log(`Starting download of ${ASSETS_TO_DOWNLOAD.length} assets from cakebites.pk...`);
  let success = 0;
  let failed = 0;

  // Process in small parallel batches of 5
  const batchSize = 5;
  for (let i = 0; i < ASSETS_TO_DOWNLOAD.length; i += batchSize) {
    const batch = ASSETS_TO_DOWNLOAD.slice(i, i + batchSize);
    await Promise.all(batch.map(async item => {
      try {
        await downloadFile(item.url, item.dest);
        success++;
      } catch (err) {
        console.error(`[ERROR] ${item.url} -> ${err.message}`);
        failed++;
      }
    }));
  }

  console.log(`\nAsset download completed! Success: ${success}, Failed: ${failed}`);
}

run();
