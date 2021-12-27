// Copyright 2018-2021 the oak authors. All rights reserved. MIT license.

// This file contains the external dependencies that oak depends upon

// `std` dependencies

export {
  concat,
  copy as copyBytes,
  equals,
} from "https://deno.land/std@0.119.0/bytes/mod.ts";
export { createHash } from "https://deno.land/std@0.119.0/hash/mod.ts";
export { HmacSha256 } from "https://deno.land/std@0.119.0/hash/sha256.ts";
export { serve, serveTLS } from "../server/server.ts";
export {
  Status,
  STATUS_TEXT,
} from "https://deno.land/std@0.119.0/http/http_status.ts";
export { Buffer } from "https://deno.land/std@0.119.0/io/buffer.ts";
export {
  BufReader,
  BufWriter,
} from "https://deno.land/std@0.119.0/io/buffer.ts";
export { LimitedReader } from "https://deno.land/std@0.119.0/io/readers.ts";
export { readerFromStreamReader } from "https://deno.land/std@0.119.0/io/streams.ts";
export { readAll, writeAll } from "https://deno.land/std@0.119.0/io/util.ts";
export {
  basename,
  extname,
  isAbsolute,
  join,
  normalize,
  parse,
  sep,
} from "https://deno.land/std@0.119.0/path/mod.ts";
export { assert } from "https://deno.land/std@0.119.0/testing/asserts.ts";

export {
  acceptable,
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  isWebSocketPongEvent,
} from "../ws/mod.ts";
export type { WebSocket as WebSocketStd } from "../ws/mod.ts";

// 3rd party dependencies

export {
  contentType,
  extension,
  lookup,
} from "https://deno.land/x/media_types@v2.9.3/mod.ts";
export {
  compile,
  match as pathMatch,
  parse as pathParse,
  pathToRegexp,
} from "https://deno.land/x/path_to_regexp@v6.2.0/index.ts";
export type {
  Key,
  ParseOptions,
  TokensToRegexpOptions,
} from "https://deno.land/x/path_to_regexp@v6.2.0/index.ts";
