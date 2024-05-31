export interface IAiFile {
    Name: string;
    FullPath: string;
    Content?: string;
    Tokens?: number;
    CostInDollars?: number;
    Selected: boolean;
    Processed: boolean;
    Done: boolean;
}
