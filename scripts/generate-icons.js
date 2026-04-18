const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const inputImage = path.join(__dirname, '../public/assets/nathafty.jpeg');
const outputDir = path.join(__dirname, '../public/assets');

async function generateIcons() {
  console.log('🎨 Génération des icônes PWA...');

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}.png`);
    
    await sharp(inputImage)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Icône ${size}x${size} créée: ${outputPath}`);
  }

  console.log('✨ Toutes les icônes ont été générées avec succès!');
}

generateIcons().catch(err => {
  console.error('❌ Erreur lors de la génération des icônes:', err);
  process.exit(1);
});
