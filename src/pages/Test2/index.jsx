import React, { useState } from 'react';
import '../Test2/index.css';

function TagInput() {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleAddTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const handleDropdownChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleTagClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="tag-input-container">
      <div className="tag-container">
        {tags.map((tag) => (
          <div key={tag} className="tag">
            {tag}
            <button
              className="remove-tag"
              onClick={() => handleRemoveTag(tag)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="add-tag-container">
        <input
          type="text"
          className="input"
          placeholder="tag"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          onClick={handleTagClick}
        />
        <button className="add-tag" onClick={handleAddTag}>
          +
        </button>
        {isDropdownVisible && (
          <div className="dropdown">
            <select onChange={handleDropdownChange}>
              <option value="Web">Web</option>
              <option value="CSS">CSS</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default TagInput;
