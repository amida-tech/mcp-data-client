/**
 *
 */
export type FileReport = {
  [key: string]: Array<ErrorReport>;
};

/**
 * Detailed error result.
 */
export interface ErrorReport {
  character_index?: number;
  index?: number;
  object_id?: string;
  formatted_dbq_id?: string;
  column_name?: string;
  excel?: string;
  json?: string;
  message?: string;
}

/**
 * Returns an array of keys. Required because of TypeScript cannot
 * type-check keys if you run Object.keys() against the object directly.
 * @param ErrorReportKeys
 */
export function GetErrorReportKeys<ErrorReportCopy extends ErrorReport>(
  ErrorReportKeys: ErrorReportCopy
): Array<keyof ErrorReportCopy> {
  return Object.keys(ErrorReportKeys) as Array<keyof ErrorReportCopy>;
}
