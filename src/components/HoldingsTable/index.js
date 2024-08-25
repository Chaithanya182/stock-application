import React, { Component } from "react";
import "./index.css";

class HoldingsTable extends Component {
  render() {
    const { holdings, stocks } = this.props;

    return (
      <div className="holdings-table">
        <h2 className="holdings-table-title">Your Holdings</h2>
        <div className="cyber-line"></div>
        <ul className="holdings-list">
          <li className="holdings-list-header">
            <span>Symbol</span>
            <span>Quantity</span>
            <span>Current Value</span>
          </li>
          {Object.entries(holdings).map(([symbol, quantity]) => {
            const stock = stocks.find((s) => s.symbol === symbol);
            return (
              <li key={symbol} className="holdings-list-item">
                <span className="symbol">{symbol}</span>
                <span className="quantity">{quantity}</span>
                <span className="value">
                  ${(stock.price * quantity).toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default HoldingsTable;
