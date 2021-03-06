export function isInteractive(stream: { rid: number }): boolean {
  return (
    Deno.isatty(stream.rid) &&
    Deno.env.get("TERM") !== "dumb" &&
    !Deno.env.get("CI")
  );
}
