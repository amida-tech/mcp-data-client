export interface FileReport {
  [key: string]: Array<ErrorReport>;
}

export interface ErrorReport {
  columnName: string;
  index: number;
  excel: string;
  json: string;
}
