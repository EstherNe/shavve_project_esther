
  
export interface StockDatatype {
    market_type: string;
    region: string;
    primary_exchanges: string;
    local_open: string;
    local_close: string;
    current_status: string;
    notes: string;
  }
  
  export interface StockResponse {
    endpoint: string;
    markets: StockDatatype[];
  }
  