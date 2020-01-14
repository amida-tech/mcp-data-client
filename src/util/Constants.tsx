export enum Outcome {
  SUCCESS = "success", // A general purpose 200+ with default values returned.
  REJECT = "reject", // A general purpose 400+.
  FAILURE = "failure", // Failure to make any connection at all.
  UNIQUE = "unique" // A success, but the returned values will differ.
}

export enum ErrorLabels {
  character_index = "Char. Index",
  column_name = "Column",
  object_id = "Object Id",
  list_of_positions = "Positions",
  message = "Message",
  index = "Index",
  json = "JSON",
  excel = "Excel",
  formatted_dbq_id = "DBQ Id",
  error_type = "Error Type" // Not used.
}
