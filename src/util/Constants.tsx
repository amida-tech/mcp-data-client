export enum Outcome {
  SUCCESS = "success", // A general purpose 200+ with default values returned.
  REJECT = "reject", // A general purpose 400+.
  FAILURE = "failure", // Failure to make any connection at all.
  UNIQUE = "unique" // A success, but the returned values will differ.
}
