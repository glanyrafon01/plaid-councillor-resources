const fs = require('fs');
const path = require('path');

function extractAndCategorizeTips() {
  // Read all OCR text files
  const tipPages = [];
  for (let i = 1; i <= 5; i++) { // Pages 1-5 contain the tips (0-indexed, so 1-5)
    const pageNum = i.toString().padStart(3, '0');
    const filePath = path.join(__dirname, '../public/ocr_output', `100tips_images-${pageNum}.txt`);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      tipPages.push(content);
    } catch (error) {
      console.error(`Error reading page ${i}:`, error.message);
    }
  }

  // Combine all pages and clean up
  const combinedText = tipPages.join('\n\n');
  
  // Clean up the text - remove extra spaces, fix line breaks
  const cleanedText = combinedText
    .replace(/\n\n+/g, '\n') // Remove multiple empty lines
    .replace(/(\d+)\./g, '\n$1.') // Ensure numbers have newlines before them
    .replace(/\.\s+(\w)/g, '. $1') // Fix spacing after periods
    .replace(/\s{2,}/g, ' ') // Remove multiple spaces
    .trim();

  // Split into individual tips
  const tipLines = cleanedText.split('\n');
  const tips = [];
  let currentTip = null;

  tipLines.forEach(line => {
    // Check if line starts with a number (tip number)
    const tipMatch = line.match(/^(\d+)\.(.*)$/);
    
    if (tipMatch) {
      // Save previous tip if it exists
      if (currentTip) {
        tips.push(currentTip);
      }
      
      // Start new tip
      const tipNumber = parseInt(tipMatch[1]);
      const tipText = tipMatch[2].trim();
      currentTip = {
        number: tipNumber,
        text: tipText,
        fullText: tipText
      };
    } else if (currentTip && line.trim()) {
      // Continue current tip
      currentTip.fullText += ' ' + line.trim();
    }
  });

  // Add the last tip
  if (currentTip) {
    tips.push(currentTip);
  }

  // Sort tips by number
  tips.sort((a, b) => a.number - b.number);

  // Categorize tips
  const categories = {
    'Media and Public Relations': [],
    'Community Engagement': [],
    'Party Involvement': [],
    'Personal Organization': [],
    'Election Strategy': [],
    'Communication': [],
    'Networking': [],
    'Documentation': [],
    'Miscellaneous': []
  };

  tips.forEach(tip => {
    const text = tip.fullText.toLowerCase();
    let categorized = false;

    // Media and Public Relations
    if (text.includes('press') || text.includes('photo') || text.includes('picture') || 
        text.includes('newspaper') || text.includes('media') || text.includes('website')) {
      categories['Media and Public Relations'].push(tip);
      categorized = true;
    }
    
    // Community Engagement  
    if (text.includes('community') || text.includes('local') || text.includes('ward') || 
        text.includes('resident') || text.includes('event') || text.includes('surgery')) {
      categories['Community Engagement'].push(tip);
      categorized = true;
    }
    
    // Party Involvement
    if (text.includes('plaid') || text.includes('branch') || text.includes('party') || 
        text.includes('councillor') || text.includes('meeting') || text.includes('conference')) {
      categories['Party Involvement'].push(tip);
      categorized = true;
    }
    
    // Personal Organization
    if (text.includes('record') || text.includes('file') || text.includes('organi') || 
        text.includes('supply') || text.includes('library') || text.includes('calendar')) {
      categories['Personal Organization'].push(tip);
      categorized = true;
    }
    
    // Election Strategy
    if (text.includes('election') || text.includes('vote') || text.includes('campaign') || 
        text.includes('candidate') || text.includes('ballot') || text.includes('canvass')) {
      categories['Election Strategy'].push(tip);
      categorized = true;
    }
    
    // Communication
    if (text.includes('letter') || text.includes('email') || text.includes('contact') || 
        text.includes('phone') || text.includes('write') || text.includes('speak')) {
      categories['Communication'].push(tip);
      categorized = true;
    }
    
    // Networking
    if (text.includes('friend') || text.includes('network') || text.includes('know') || 
        text.includes('mentor') || text.includes('help') || text.includes('support')) {
      categories['Networking'].push(tip);
      categorized = true;
    }
    
    // Documentation
    if (text.includes('complaint') || text.includes('document') || text.includes('record') || 
        text.includes('file') || text.includes('keep') || text.includes('note')) {
      categories['Documentation'].push(tip);
      categorized = true;
    }
    
    // If not categorized, add to Miscellaneous
    if (!categorized) {
      categories['Miscellaneous'].push(tip);
    }
  });

  // Write categorized tips to JSON file
  const outputPath = path.join(__dirname, '../public/100tips-categorized.json');
  fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2));
  
  console.log('Tips extraction and categorization complete!');
  console.log(`Total tips extracted: ${tips.length}`);
  console.log('Categories:');
  Object.entries(categories).forEach(([category, tips]) => {
    console.log(`- ${category}: ${tips.length} tips`);
  });
}

extractAndCategorizeTips();