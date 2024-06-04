import React, { useState } from 'react';
import './SkinShop.css';

interface Skin {
  id: number;
  name: string;
  imageUrl: string;
}

const availableSkins: Skin[] = [
  { id: 1, name: 'Skin 1', imageUrl: './skin1.webp' },
  { id: 2, name: 'Skin 2', imageUrl: './skin2.webp' },
  { id: 3, name: 'Skin 3', imageUrl: './skin3.png' },
];

const SkinShop: React.FC = () => {
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);

  const handleSkinClick = (skin: Skin) => {
    setSelectedSkin(skin);
    // Assuming you have a function to save the selected skin to the user's profile
    // saveSelectedSkin(skin);
  };

  return (
    <div className="skin-shop">
      <h2>Choose Your Skin</h2>
      <div className="skin-preview">
        {selectedSkin ? (
          <img src={selectedSkin.imageUrl} alt={selectedSkin.name} className="selected-skin" />
        ) : (
          <p>No skin selected</p>
        )}
      </div>
      <div className="skin-list">
        {availableSkins.map((skin) => (
          <div
            key={skin.id}
            className={`skin-item ${selectedSkin && selectedSkin.id === skin.id ? 'selected' : ''}`}
            onClick={() => handleSkinClick(skin)}
          >
            <img src={skin.imageUrl} alt={skin.name} className="skin-image" />
            <p>{skin.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkinShop;
