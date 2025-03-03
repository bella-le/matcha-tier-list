import React from 'react';
import brandData from '../data/brands.json';

const BrandList = () => {
  return (
    <div className="brand-list">
      <div className="tier-list-header">
        <h1>matcha brands</h1>
      </div>
      <div className="matcha-list">
        {brandData.brands.map((brand, index) => (
          <a
            key={index}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="matcha-item"
          >
            {/* <div className="rank-number">{index + 1}</div> */}
            <div className="matcha-content">
              <div className="matcha-main-info">
                <div className="matcha-title-section">
                  <h2 className="matcha-name">{brand.name}</h2>
                  <p className="description">{brand.description}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BrandList;
