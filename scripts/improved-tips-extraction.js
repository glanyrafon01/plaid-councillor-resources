const fs = require('fs');
const path = require('path');

// Manual mapping of tips based on the OCR content we have
const manualTips = [
  { number: 1, text: "Get to know them. Invite them to your ward to promote an issue local or national or just for a walk about." },
  { number: 2, text: "Does a local organisation need someone to officially open or launch an event? Persuade the MS MP you have made friends with to do so." },
  { number: 3, text: "Does your branch publish regular newsletters? Make sure that it gives you high profile." },
  { number: 4, text: "Get to know your local press and radio reporters." },
  { number: 5, text: "Get to know your community." },
  { number: 6, text: "Get yourself elected as your Council’s representative on influential local groups." },
  { number: 7, text: "Issue regular press releases." },
  { number: 8, text: "Send letters to the press." },
  { number: 9, text: "Invite those famous in the world of entertainment or sport to visit your ward." },
  { number: 10, text: "Make sure you have a picture and a press release of the event." },
  { number: 11, text: "Get high quality photos of yourself. Give or email a good copy to the local press to use when you send your press releases in and remind them they have it." },
  { number: 12, text: "Use your mobile phone, iPad or a digital camera and take a snap every time you do something in public. Use the pictures." },
  { number: 13, text: "Browse your other local political parties’ websites. What are they doing? Get there first." },
  { number: 14, text: "Join community groups." },
  { number: 15, text: "Browse your local community websites. Is there a way you can help / get them on your side?" },
  { number: 16, text: "Attack and discredit your opponents." },
  { number: 17, text: "Keep your opponents literature. Is there anything there that is attractive or useful that you could borrow and adapt?" },
  { number: 18, text: "Keep all your press cuttings and press releases." },
  { number: 19, text: "Become a school governor." },
  { number: 20, text: "Recruit members and supporters to your Plaid Branch." },
  { number: 21, text: "Keep in constant contact with your local branch." },
  { number: 22, text: "If you don't have one attend the nearest one, and then after a while, when you've collected local members, set up your own branch." },
  { number: 23, text: "Use them as extra pairs of eyes and ears to gather local information." },
  { number: 24, text: "Use them to help you distribute leaflets." },
  { number: 25, text: "If you belong to a branch and attend regularly propose yourself as a delegate to Constituency committee, National Council etc." },
  { number: 26, text: "Attend National Council (two meetings a year) and get to learn more about your Party's beliefs and policies, and to network with other colleagues in a similar situation." },
  { number: 27, text: "Attend your Constituency Committee and /or your County Committee." },
  { number: 28, text: "Attend Plaid's conferences when they are within easy reach (both the spring and autumn National Conferences move around)." },
  { number: 29, text: "You are welcome to attend Plaid Cymru's Councillor Association. It meets around four times a year and welcomes representation from every Plaid Councillor." },
  { number: 30, text: "Get to know what your limitations are — what you can and can not achieve as a local Councillor." },
  { number: 31, text: "Find out who to pass on problems you can not tackle. If you have a local Plaid County Councillor that's easy, if not get to know who is a Plaid County Councillor in your authority, if you have one. Make friends with them so that they will help you." },
  { number: 32, text: "Browse your own council's website." },
  { number: 33, text: "Browse your County Council's website." },
  { number: 34, text: "Do you have a constituency office? Use it; get to know the staff and how they can help you and how you can be of help to them." },
  { number: 35, text: "If not then where is your nearest office? Where is your Regional AM's office? Use it." },
  { number: 36, text: "Work with local MSs, MPs, Actual or Candidates." },
  { number: 37, text: "Every time there is another election e.g. Westminster get yourself on the campaign team when they visit your ward. Go round knocking doors with them, introduce yourself as their local councillor — raise your profile." },
  { number: 38, text: "Ask for help — you will need all the help that you can get at election time." },
  { number: 39, text: "Sponsor a Rugby / Football match." },
  { number: 40, text: "Organise petitions for worthwhile ventures." },
  { number: 41, text: "Organise write in campaigns." },
  { number: 42, text: "Organise advice surgeries, or if you have a local County Councillor join forces." },
  { number: 43, text: "Organise street surgeries." },
  { number: 44, text: "Organise residents’ surveys." },
  { number: 45, text: "Target 1° time voters." },
  { number: 46, text: "Do they receive an 18\" birthday card from Plaid? If not send deliver one." },
  { number: 47, text: "Get involved in Community Audits." },
  { number: 48, text: "Get yourself a mentor. Someone with political experience." },
  { number: 49, text: "Draft yourself a letterhead." },
  { number: 50, text: "Decide on a clear corporate style." },
  { number: 51, text: "Make yourself a “sorry you were out when | called” card." },
  { number: 52, text: "Remember to vote leaflet." },
  { number: 53, text: "Deliver a Calendar or a card of useful/vital local services." },
  { number: 54, text: "Do you have a supply of posters and car stickers to sell to those who ask?" },
  { number: 55, text: "Have you got a Plaid car sticker on your car?" },
  { number: 56, text: "Keep literature design simple." },
  { number: 57, text: "Keep to Arial or a similar San Serif style of print." },
  { number: 58, text: "Remember that a print size under 10 is difficult to read." },
  { number: 59, text: "Remember that white print on a black background or the use of colour is difficult for those with sight problems." },
  { number: 60, text: "Election address - keep your manifesto simple." },
  { number: 61, text: "Capitalise on a community issue." },
  { number: 62, text: "Put all constituents’ complaints to your Council or to any other body in writing and keep your email trail." },
  { number: 63, text: "Set up a ward web page." },
  { number: 64, text: "Update it frequently, at least once a week, preferably oftener." },
  { number: 65, text: "Put all local events on it to attract a regular readership." },
  { number: 66, text: "Put plenty of pictures on it and update your own picture regularly." },
  { number: 67, text: "If you must use Twitter remember it’s toxic." },
  { number: 68, text: "Experiment with other websites but be careful." },
  { number: 69, text: "Use Canva or a similar program to produce a professional poster or leaflet." },
  { number: 70, text: "Set up a 'what's app' site with your fellow Plaid councillors." },
  { number: 71, text: "Set up a similar site for your activist team." },
  { number: 72, text: "Any issue you can't handle should be referred to the relevant body e.g. County Council, MP. Ms etc'." },
  { number: 73, text: "Are you sending letters to the right person? Do some background research." },
  { number: 74, text: "Keep records of progress on complaints." },
  { number: 75, text: "Chase complaints until you have a result or reason." },
  { number: 76, text: "Keep complainants informed about what's happening." },
  { number: 77, text: "Keep a record of EVERYTHING." },
  { number: 78, text: "Keep a supply of postal vote registration forms in your car; any one can now have a postal vote." },
  { number: 79, text: "Keep a supply of membership of Plaid forms, also of ‘Friends of Plaid’." },
  { number: 80, text: "Recruit postal voters, members and friends of, as you visit to help your electors." },
  { number: 81, text: "Keep a regular update of your electoral register." },
  { number: 82, text: "Mark those you know are supporters and those you help, or other relevant information." },
  { number: 83, text: "Make a note of Welsh speakers and learn enough Welsh to greet them." },
  { number: 84, text: "Make a note of those who are antagonistic. If short of time do you really need to re-canvass and get this?" },
  { number: 85, text: "Use this vital info for your re-election and to aid the election of County Councillors, Assembly Members, and MP’s MEP’s in your ward." },
  { number: 86, text: "Maybe you could with their permission get missing voters to re-register." },
  { number: 87, text: "Keep a supply of electoral registration forms — they can be filled and sent back any time of year." },
  { number: 88, text: "Target regular supporters to join Plaid Cymru or become 'Friends of'." },
  { number: 89, text: "Collect and read local information leaflets (from your Library, Council Office etc.)." },
  { number: 90, text: "File them in your own library and use them as a resource to help others." },
  { number: 91, text: "Never say no. Say I’m not the expert you need, but will try to put you in touch with someone who can help." },
  { number: 92, text: "And do so." },
  { number: 93, text: "Do you have friends who would make good councillors? Tell them how cool it is." },
  { number: 94, text: "Persuade them to stand. You never know when there will be a by-election in your or a neighbouring council." },
  { number: 95, text: "A good councillor never says No without explaining why." },
  { number: 96, text: "A good councillor never says ‘Yes’; instead, he or she will say ‘I will try my best’." },
  { number: 97, text: "If anyone asks if they owe you anything —say yes a vote for me and for Plaid Cymru in every election that's all." }
];

// Categorize the tips
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

manualTips.forEach(tip => {
  const text = tip.text.toLowerCase();
  let categorized = false;

  // Media and Public Relations
  if (text.includes('press') || text.includes('photo') || text.includes('picture') || 
      text.includes('newspaper') || text.includes('media') || text.includes('website') ||
      text.includes('newsletter') || text.includes('release')) {
    categories['Media and Public Relations'].push(tip);
    categorized = true;
  }
  
  // Community Engagement  
  if (text.includes('community') || text.includes('local') || text.includes('ward') || 
      text.includes('resident') || text.includes('event') || text.includes('surgery') ||
      text.includes('group') || text.includes('organisation')) {
    categories['Community Engagement'].push(tip);
    categorized = true;
  }
  
  // Party Involvement
  if (text.includes('plaid') || text.includes('branch') || text.includes('party') || 
      text.includes('councillor') || text.includes('meeting') || text.includes('conference') ||
      text.includes('committee') || text.includes('association')) {
    categories['Party Involvement'].push(tip);
    categorized = true;
  }
  
  // Personal Organization
  if (text.includes('record') || text.includes('file') || text.includes('organi') || 
      text.includes('supply') || text.includes('library') || text.includes('calendar') ||
      text.includes('update') || text.includes('note') || text.includes('draft')) {
    categories['Personal Organization'].push(tip);
    categorized = true;
  }
  
  // Election Strategy
  if (text.includes('election') || text.includes('vote') || text.includes('campaign') || 
      text.includes('candidate') || text.includes('ballot') || text.includes('canvass') ||
      text.includes('electoral') || text.includes('by-election')) {
    categories['Election Strategy'].push(tip);
    categorized = true;
  }
  
  // Communication
  if (text.includes('letter') || text.includes('email') || text.includes('contact') || 
      text.includes('phone') || text.includes('write') || text.includes('speak') ||
      text.includes('invite') || text.includes('send')) {
    categories['Communication'].push(tip);
    categorized = true;
  }
  
  // Networking
  if (text.includes('friend') || text.includes('network') || text.includes('know') || 
      text.includes('mentor') || text.includes('help') || text.includes('support') ||
      text.includes('relationship') || text.includes('colleague')) {
    categories['Networking'].push(tip);
    categorized = true;
  }
  
  // Documentation
  if (text.includes('complaint') || text.includes('document') || text.includes('record') || 
      text.includes('file') || text.includes('keep') || text.includes('note') ||
      text.includes('trail') || text.includes('information')) {
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

console.log('Improved tips extraction and categorization complete!');
console.log(`Total tips: ${manualTips.length}`);
console.log('Categories:');
Object.entries(categories).forEach(([category, tips]) => {
  console.log(`- ${category}: ${tips.length} tips`);
});