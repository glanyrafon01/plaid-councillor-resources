const fs = require('fs');
const path = require('path');

// Process OCR text files and create search index
function createSearchIndex() {
  const searchIndex = {
    '100Tips': [],
    'BeingaCouncillor': []
  };

  // Process 100Tips PDF (6 pages)
  for (let i = 0; i < 6; i++) {
    const filePath = path.join(__dirname, '../public/ocr_output', `100tips_images-00${i}.txt`);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      searchIndex['100Tips'].push({
        page: i,
        content: content
      });
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error.message);
    }
  }

  // Process BeingaCouncillor PDF (2 pages)
  for (let i = 0; i < 2; i++) {
    const filePath = path.join(__dirname, '../public/ocr_output', `councillor_images-00${i}.txt`);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      searchIndex['BeingaCouncillor'].push({
        page: i,
        content: content
      });
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error.message);
    }
  }

  // Write search index to public directory
  const outputPath = path.join(__dirname, '../public/search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  
  console.log('Search index created successfully!');
  console.log(`Total pages indexed: ${searchIndex['100Tips'].length + searchIndex['BeingaCouncillor'].length}`);
}

createSearchIndex();