export interface stock{
    SYMBOL: string;
    SERIES: string;
    OPEN: number;
    HIGH: number;
    LOW: number;
    CLOSE: number;
    LAST: number;
    PREVCLOSE: number;
    TOTTRDQTY: number;
    TOTTRDVAL: number;
    TIMESTAMP: string;
    TOTALTRADES: number;
    ISIN: string;
    DATE: string;
}

export interface dates {
    start_date: string;
    end_date: string;
}