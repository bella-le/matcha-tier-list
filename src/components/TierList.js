import React, { useState, useMemo } from 'react';
import matchaData from '../data/matcha.json';

const TierList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [matchas] = useState(matchaData.matchas);

  // Get unique tags from all matchas
  const allTags = useMemo(() => {
    const tags = new Set();
    matchas.forEach(matcha => {
      matcha.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [matchas]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Add originalIndex to each matcha
  const matchasWithIndex = useMemo(() => 
    matchas.map((matcha, index) => ({
      ...matcha,
      originalIndex: index
    }))
  , [matchas]);

  const filteredMatchas = matchasWithIndex.filter(matcha => {
    const matchesSearch = 
      matcha.name.toLowerCase().includes(searchTerm) ||
      matcha.brand.toLowerCase().includes(searchTerm);
    
    const matchesTags = 
      selectedTags.length === 0 ||
      selectedTags.every(tag => matcha.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="tier-list">
      <div className="tier-list-header">
        <h1>bella's matcha tier list 🍵</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search matcha..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <div className="tag-filters">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="matcha-list">
        {filteredMatchas.map((matcha) => (
          <a 
            key={matcha.originalIndex}
            href={matcha.productUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="matcha-item"
          >
            <div className="rank-number">{matcha.originalIndex + 1}</div>
            <div className="matcha-content">
              <div className="matcha-main-info">
                <div className="matcha-title-section">
                  <span className="brand-name">{matcha.brand}</span>
                  <h3 className="matcha-name">{matcha.name}</h3>
                  <p className="price">${matcha.pricePerGram.toFixed(2)}/g</p>
                </div>
                <div className="matcha-image-container">
                  <img src={matcha.imageUrl} alt={matcha.name} className="matcha-image" />
                </div>
              </div>
              <div className="matcha-details">
                <p className="description">{matcha.description}</p>
                <div className="tags">
                  {matcha.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className={`tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TierList;
