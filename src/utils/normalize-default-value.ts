const normalizeDefaultValue = <T>(val: T | null | undefined): T | undefined =>
  val === null ? undefined : val;
export default normalizeDefaultValue;
