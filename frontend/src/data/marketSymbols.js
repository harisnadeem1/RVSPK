export const MARKET_SYMBOLS = [
  { proName: 'FOREXCOM:SPXUSD',  shortName: 'S&P 500',     category: 'index' },
  { proName: 'FOREXCOM:NSXUSD',  shortName: 'NASDAQ 100',  category: 'index' },
  { proName: 'FOREXCOM:DJI',     shortName: 'Dow Jones',   category: 'index' },
  { proName: 'INDEX:DAX',        shortName: 'DAX 40',      category: 'index' },
  { proName: 'FOREXCOM:UKXGBP',  shortName: 'FTSE 100',    category: 'index' },
  { proName: 'INDEX:NKY',        shortName: 'Nikkei 225',  category: 'index' },
  { proName: 'INDEX:HSI',        shortName: 'Hang Seng',   category: 'index' },
  { proName: 'INDEX:CAC40',      shortName: 'CAC 40',      category: 'index' },
  { proName: 'BSE:SENSEX',       shortName: 'SENSEX',      category: 'index' },
]

// Filtered exports
export const INDEX_SYMBOLS = MARKET_SYMBOLS.filter(s => s.category === 'index')

// Ticker tape — curate this independently (can mix indices, forex, crypto)
export const TICKER_SYMBOLS = [
  { proName: 'FOREXCOM:SPXUSD',   shortName: 'S&P 500'     },
  { proName: 'FOREXCOM:NSXUSD',   shortName: 'NASDAQ 100'  },
  { proName: 'FOREXCOM:DJI',      shortName: 'Dow Jones'   },
  { proName: 'INDEX:DAX',         shortName: 'DAX 40'      },
  { proName: 'FOREXCOM:UKXGBP',   shortName: 'FTSE 100'    },
  { proName: 'INDEX:NKY',         shortName: 'Nikkei 225'  },
  { proName: 'INDEX:HSI',         shortName: 'Hang Seng'   },
  { proName: 'INDEX:CAC40',       shortName: 'CAC 40'      },
  { proName: 'BSE:SENSEX',        shortName: 'SENSEX'      },
  { proName: 'FX:EURUSD',         shortName: 'EUR/USD'     },
  { proName: 'FX:GBPUSD',         shortName: 'GBP/USD'     },
  { proName: 'FX:USDJPY',         shortName: 'USD/JPY'     },
  { proName: 'COINBASE:BTCUSD',   shortName: 'Bitcoin'     },
  { proName: 'COINBASE:ETHUSD',   shortName: 'Ethereum'    },
  { proName: 'TVC:GOLD',          shortName: 'Gold'        },
  { proName: 'TVC:USOIL',         shortName: 'Crude Oil'   },
]