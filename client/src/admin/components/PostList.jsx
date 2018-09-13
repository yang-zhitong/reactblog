import React from "react";

const style = {
  justifyContent: "space-between",
  display: "flex"
};

const List = ({ addNew, children }) => {
  return (
    <div className="hero is-fullheight cards column is-5">
      <div className="field" style={style}>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="输入关键词"
          />
        </div>
        <div className="control">
          <a className="button is-info" onClick={addNew}>
            新增
          </a>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default List;