import cli from "cli-color";
import config from "@conf";
import timestamp from "@src/utils/timestamp";

let enable_logging = config.LOGS;
export function rm() {
  console.clear();
}
export function yay(...args: any[]) {
  if (!enable_logging) return;

  console.log(cli.greenBright(`[${timestamp()}][Backcord][+] - `), ...args);
}
export function log(...args: any[]) {
  if (!enable_logging) return;
  console.log(cli.white(`[${timestamp()}][Backcord][o] - `), ...args);
}
export function err(...args: any[]) {
  if (!enable_logging) return;
  console.log(cli.redBright(`[${timestamp()}][Backcord][?] - `), ...args);
}
