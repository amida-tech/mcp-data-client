/**
 *
 */
export type FileReport = {
  [key: string]: Array<ErrorReport> | null;
};

export interface IncorrectValueInRow {
  error_type: "incorrect_value_in_row";
  column_name: string;
  message: string;
  excel: string;
  index: number;
  json: string;
}

export interface ParenError {
  error_type: "paren_error";
  character_index: number;
  message: string;
  object_id: string;
}

export interface IncorrectlyFormattedDbqId {
  error_type: "incorrectly_formatted_dbq_id";
  formatted_dbq_id: string;
  message: string;
  object_id: string;
}

export interface NoDbqLogicalCombo {
  error_type: "no_dbq_logical_combo";
  message: string;
  object_id: string;
}

export interface DbqLogicalComboError {
  error_type: "dbq_logical_combo_error";
  message: string;
  index: number;
  object_id: string;
}

export interface WrongDocType {
  error_type: "wrong_doc_type";
  message: string;
}

export interface UnmatchedParens {
  error_type: "unmatched_parens";
  object_id: string;
  list_of_positions: Array<number>;
  message: string;
}

export type ErrorReport =
  | IncorrectValueInRow
  | ParenError
  | IncorrectlyFormattedDbqId
  | NoDbqLogicalCombo
  | DbqLogicalComboError
  | WrongDocType
  | UnmatchedParens;

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
