// Add finite duration metadata to WebM files produced by Chromium MediaRecorder.
// Recorder output has an unknown Segment size and no indexed offsets to update.
export function withWebmDuration(input, milliseconds) {
  const bytes = Buffer.from(input);
  function vint(offset, keepMarker = false) {
    if (!bytes[offset]) throw Error('Invalid EBML element');
    let length = 1;
    while (!(bytes[offset] & (1 << (8 - length)))) length++;
    let value = 0;
    for (let i = 0; i < length; i++) value = value * 256 + bytes[offset + i];
    if (!keepMarker) value -= 2 ** (7 * length);
    return { value, length };
  }
  let offset = 0;
  while (offset < Math.min(bytes.length, 4096)) {
    const id = vint(offset, true);
    const size = vint(offset + id.length);
    const start = offset + id.length + size.length;
    if (id.value === 0x18538067) { offset = start; continue; }
    if (id.value === 0x1549a966) {
      let cursor = start;
      while (cursor < start + size.value) {
        const child = vint(cursor, true), childSize = vint(cursor + child.length);
        if (child.value === 0x4489 && childSize.value === 8) {
          bytes.writeDoubleBE(milliseconds, cursor + child.length + childSize.length);
          return bytes;
        }
        cursor += child.length + childSize.length + childSize.value;
      }
      const duration = Buffer.alloc(11);
      duration.set([0x44, 0x89, 0x88]); duration.writeDoubleBE(milliseconds, 3);
      const newSize = size.value + duration.length;
      if (size.length !== 1 || newSize >= 127) throw Error('Unexpected Recorder Info size');
      bytes[offset + id.length] = 0x80 | newSize;
      return Buffer.concat([bytes.subarray(0, start + size.value), duration, bytes.subarray(start + size.value)]);
    }
    offset = start + size.value;
  }
  throw Error('WebM Info element not found');
}
