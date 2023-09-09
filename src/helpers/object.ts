export function removeNanAndUndefined(
  param: Record<string, string | number | undefined | boolean>
) {
  return Object.fromEntries(
    Object.entries(param).filter(
      ([_, value]) =>
        value !== undefined && value !== "undefined" && !Number.isNaN(value)
    )
  );
}
