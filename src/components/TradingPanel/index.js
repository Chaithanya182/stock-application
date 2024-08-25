import React, { Component } from "react";
import "./index.css";

class TradingPanel extends Component {
  render() {
    const { selectedStock, quantity, onQuantityChange, onBuy, onSell } =
      this.props;

    return (
      <div className="trading-panel">
        <h2 className="trading-panel-title">Trading Panel</h2>
        <div className="cyber-line"></div>
        {selectedStock ? (
          <div className="trading-info">
            <p>
              Selected Stock:{" "}
              <span className="neon-text">{selectedStock.symbol}</span>
            </p>
            <p>
              Price:{" "}
              <span className="neon-text">
                ${selectedStock.price.toFixed(2)}
              </span>
            </p>
            <div className="trading-actions">
              <input
                type="number"
                value={quantity}
                onChange={onQuantityChange}
                min="1"
              />
              <button onClick={onBuy} className="buy-btn">
                Buy
              </button>
              <button onClick={onSell} className="sell-btn">
                Sell
              </button>
            </div>
          </div>
        ) : (
          <p className="select-prompt">Please select a stock to trade.</p>
        )}
      </div>
    );
  }
}

export default TradingPanel;
