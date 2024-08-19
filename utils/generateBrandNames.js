function generateWord(length) {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    let word = '';
    for (let i = 0; i < length; i++) {
      word += i % 2 === 0 ? consonants[Math.floor(Math.random() * consonants.length)] : vowels[Math.floor(Math.random() * vowels.length)];
    }
    return word;
  }
  
  export function generateBrandNames(description, nameType, randomness) {
    const words = description.toLowerCase().split(/\s+/);
    const names = [];
  
    for (let i = 0; i < 5; i++) {
      let name = '';
      switch (nameType) {
        case 'Descriptive':
          name = words[Math.floor(Math.random() * words.length)];
          break;
        case 'Misspelled':
          name = words[Math.floor(Math.random() * words.length)].replace(/[aeiou]/g, c => 'aeiou'[(Math.floor(Math.random() * 5))]);
          break;
        case 'Invented':
          name = generateWord(Math.floor(Math.random() * 5) + 4);
          break;
        case 'Metaphorical':
          const metaphors = ['sky', 'ocean', 'mountain', 'star', 'river', 'forest', 'cloud', 'moon', 'sun', 'wind'];
          name = metaphors[Math.floor(Math.random() * metaphors.length)];
          break;
      }
  
      if (Math.random() * 100 < randomness) {
        name = name.split('').sort(() => Math.random() - 0.5).join('');
      }
  
      names.push(name.charAt(0).toUpperCase() + name.slice(1));
    }
  
    return names;
  }