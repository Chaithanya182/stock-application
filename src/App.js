import React, { Component } from "react";
import StockList from "./components/StockList";
import TradingPanel from "./components/TradingPanel";
import HoldingsTable from "./components/HoldingsTable";
import "./App.css";

class App extends Component {
  state = {
    stocks: [
      { symbol: "AAPL", name: "Apple Inc.", price: 150.0 },
      { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800.0 },
      { symbol: "MSFT", name: "Microsoft Corporation", price: 300.0 },
      { symbol: "AMZN", name: "Amazon.com Inc.", price: 3300.0 },
    ],
    holdings: {},
    selectedStock: null,
    quantity: 1,
    error: "", 
  };

  componentDidMount() {
    this.priceInterval = setInterval(this.updatePrices, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.priceInterval);
  }

  updatePrices = () => {
    this.setState((prevState) => ({
      stocks: prevState.stocks.map((stock) => ({
        ...stock,
        price: +(stock.price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2),
      })),
    }));
  };

  handleSelectStock = (stock) => {
    this.setState({ selectedStock: stock, error: "" }); 
  };

  handleQuantityChange = (e) => {
    const quantity = Math.max(1, parseInt(e.target.value) || 0);
    this.setState({ quantity });
  };

  handleBuy = () => {
    const { selectedStock, quantity, holdings } = this.state;

    if (selectedStock) {
      this.setState((prevState) => ({
        holdings: {
          ...prevState.holdings,
          [selectedStock.symbol]:
            (prevState.holdings[selectedStock.symbol] || 0) + quantity,
        },
        error: "", // Clear error on successful buy
      }));
    }
  };

  handleSell = () => {
    const { selectedStock, quantity, holdings } = this.state;

    if (selectedStock) {
      const currentQuantity = holdings[selectedStock.symbol] || 0;

      if (quantity > currentQuantity) {
        this.setState({ error: "Insufficient quantity to sell." });
        return; 
      }

      const newQuantity = Math.max(0, currentQuantity - quantity);
      const updatedHoldings = {
        ...holdings,
        [selectedStock.symbol]: newQuantity,
      };

      if (newQuantity === 0) delete updatedHoldings[selectedStock.symbol];

      this.setState({
        holdings: updatedHoldings,
        error: "",
      });
    }
  };

  render() {
    const { stocks, holdings, selectedStock, quantity, error } = this.state;

    return (
      <div className="app-container">
        <h1 className="app-title">Real-Time Stock Market Dashboard</h1>
        <div className="flex-container">
          <StockList stocks={stocks} onSelect={this.handleSelectStock} />
          <TradingPanel
            selectedStock={selectedStock}
            quantity={quantity}
            onQuantityChange={this.handleQuantityChange}
            onBuy={this.handleBuy}
            onSell={this.handleSell}
          />
          <HoldingsTable holdings={holdings} stocks={stocks} />
        </div>
        {error && <div className="error-message">{error}</div>}{" "}
       
      </div>
    );
  }
}

export default App;
