import React from 'react'

const items = ({item, onChoosePostClick}) => {
  return (
    <div className="box" onClick={onChoosePostClick}>
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{item.title}</strong>
              <br />
              {item.description || ''}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default items;