import React, { Component } from "react";
import "./index.css";

class StockList extends Component {
  render() {
    const { stocks, onSelect } = this.props;

    return (
      <div className="stock-list">
        <h2 className="stock-list-title">Stock List</h2>
        <div className="cyber-line"></div>
        <ul className="stock-items">
          {stocks.map((stock) => (
            <li key={stock.symbol} className="stock-item">
              <span className="stock-symbol">{stock.symbol}</span>
              <span className="stock-name">{stock.name}</span>
              <span className="stock-price">${stock.price.toFixed(2)}</span>
              <button onClick={() => onSelect(stock)} className="select-btn">
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default StockList;
