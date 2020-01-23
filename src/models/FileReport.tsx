/**
 * File Reports contain nothing or arrays of Error Reports.
 */
export type FileReport = {
  [key: string]: Array<ErrorReport> | null;
};

/**
 * The seven kinds of Error Reports. Each only has
 * error_type and message in common. The rest are
 * unique to that type.
 */
export interface IncorrectValueInRow {
  error_type: "incorrect_value_in_row";
  column_name: string;
  index: number;
  excel: string;
  json: string;
  message: string;
}

export interface ParenError {
  error_type: "paren_error";
  character_index: number;
  object_id: string;
  message: string;
}

export interface IncorrectlyFormattedDbqId {
  error_type: "incorrectly_formatted_dbq_id";
  formatted_dbq_id: string;
  object_id: string;
  message: string;
}

export interface NoDbqLogicalCombo {
  error_type: "no_dbq_logical_combo";
  object_id: string;
  message: string;
}

export interface DbqLogicalComboError {
  error_type: "dbq_logical_combo_error";
  index: number;
  object_id: string;
  message: string;
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
 * Human-readable labels for the individual fields. Put here instead of
 * a Constants file because of side-by-side use on the UI.
 */
export enum ErrorFieldLabels {
  error_type = "Type",
  character_index = "Char. Index",
  column_name = "Column",
  object_id = "Object Id",
  list_of_positions = "Positions",
  index = "Index",
  json = "JSON",
  excel = "Excel",
  formatted_dbq_id = "DBQ Id",
  message = "Message"
}
export enum ErrorTypeLabels {
  incorrect_value_in_row = "Incorrect Value in Row",
  paren_error = "Parentheses Error",
  incorrectly_formatted_dbq_id = "Incorrectly Formatted DBQ Id",
  no_dbq_logical_combo = "No DBQ Logical Combo",
  dbq_logical_combo_error = "DBQ Logical Combo Error",
  wrong_doc_type = "Wrong Document Type",
  unmatched_parens = "Unmatched Parentheses"
}

/**
 * Consider this ear marked to move into a "basic" model.
 */
interface KeyedNumbersObject {
  [key: string]: number;
}

const ErrorKeyOrderPreference: KeyedNumbersObject = {
  error_type: 0,
  index: 1,
  character_index: 2,
  column_name: 3,
  object_id: 4,
  formatted_dbq_id: 5,
  json: 6,
  excel: 7,
  list_of_positions: 8,
  message: 9
};

/**
 * Returns an array of keys. Required because of TypeScript cannot
 * type-check keys if you run Object.keys() against the object directly.
 * @param ErrorReportKeys
 */
export function GetErrorReportKeys<ErrorReportCopy extends ErrorReport>(
  ErrorReportKeys: ErrorReportCopy
): Array<keyof ErrorReportCopy> {
  return Object.keys(ErrorReportKeys).sort((keyA: string, keyB: string) => {
    return ErrorKeyOrderPreference[keyA] - ErrorKeyOrderPreference[keyB];
  }) as Array<keyof ErrorReportCopy>;
}

/**
 * This is a mock example for use in tests.
 */
export const MockUploadFileReport: FileReport = {
  exampleFileNameA: [
    {
      error_type: "incorrect_value_in_row",
      column_name: "Column B",
      index: 10,
      excel: "IncorrectValueInRow.xlsx",
      json: "IncorrectValueInRow.json",
      message: "There's a snake in my boot."
    },
    {
      error_type: "paren_error",
      character_index: 5,
      object_id: "ParenErrorObjectId",
      message: "To infinity, and beyond!"
    },
    {
      error_type: "incorrectly_formatted_dbq_id",
      formatted_dbq_id: "Formatted DBQ",
      object_id: "IncorrectlyFormattedDBQId",
      message: "There aren't anymore monkeys! That's the whole barrel!"
    },
    {
      error_type: "no_dbq_logical_combo",
      object_id: "NoDBQLogicalErrorCombo",
      message: "This is falling with style!"
    }
  ],
  exampleFileNameB: [
    {
      error_type: "dbq_logical_combo_error",
      index: 15,
      object_id: "DBQLogicalComboError",
      message: "You are a child's plaything!"
    },
    {
      error_type: "wrong_doc_type",
      message: "You are a sad, strange man, and you have my pity."
    },
    {
      error_type: "unmatched_parens",
      object_id: "UnmatchedParens",
      list_of_positions: [1, 2, 3],
      message:
        "He ain’t the sharpest knife in the place where they keep the knives."
    }
  ]
};
