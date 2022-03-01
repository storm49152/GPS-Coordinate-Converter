function ConvertToDD(coord='', direction='', format='', debug=false) {
  // Convert validator: https://www.pgc.umn.edu/apps/convert/
  // DDM: Degrees Decimal Minutes: /^[0-9]{1,2}°[0-9]{1,2}\.[0-9]{1,}$/
  // DMS: Degrees Minutes Seconds: /^[0-9]{1,2}°[0-9]{1,2}'[0-9]{1,}\"$/
  // DD:  Decimal Degrees:         /^[0-9]{1,2}\.[0-9]{1,5}$/

  // Input checking.
  if (! coord) { alert('Coordinate missing'); return false; }
  if (! direction) { alert('Direction missing ("N", "S", "E", "W")'); return false; }
  direction = direction.toUpperCase();
  if (! ['N', 'S', 'E', 'W'].includes(direction)) { alert('Direction has wrong value ("N", "S", "E", "W")'); return false; }
  if (! format) { alert('Format missing ("DDM", "DMS")'); return false; }
  format = format.toUpperCase();
  if (! ['DDM', 'DMS'].includes(format)) { alert('Format has wrong value ("DDM", "DMS")'); return false; }
  if (debug !== true && debug !== false) { alert('Debug has wrong value (true, false)'); return false; }

  if (debug === true) {
    document.write('[coord] ' + coord + '<br>\n');
    document.write('[direction] ' + direction + '<br>\n');
    document.write('[format] ' + format + '<br>\n');
  }

  if (format == 'DDM') {
    var degrees = parseInt(coord.split('°')[0].trim(), 10);
    var minutes = coord.split('°')[1].trim();
    var decimal = Math.round((minutes / 60) * 100000) / 100000;  // Keep 5 decimal digits.
    var dd = degrees + decimal;

    if (debug === true) {
      document.write('[degrees] ' + degrees + '<br>\n');
      document.write('[minutes] ' + minutes + '<br>\n');
      document.write('[decimal] ' + decimal + '<br>\n');
      document.write('[dd] ' + dd + '<br>\n');
    }
  } else if (format == 'DMS') {
    // 20220301 RST: Untested section.
    var degrees = parseInt(coord.split('°')[0].trim(), 10);
    var minutes = trim(coord.split('°')[1].split('\'')[0]);
    var seconds = trim(coord.split('\'')[1].replace('\"', ''));
    var _minutes = minutes / 60;
    var _seconds = seconds / 3600;
    var decimal = Math.round((_minutes + _seconds) * 100000) / 100000;  // // Keep 5 decimal digits.
    var dd = degrees + decimal;

    if (debug === true) {
      document.write('[degrees] ' + degrees + '<br>\n');
      document.write('[minutes] ' + minutes + '<br>\n');
      document.write('[seconds] ' + seconds + '<br>\n');
      document.write('[_minutes] ' + _minutes + '<br>\n');
      document.write('[_seconds] ' + _seconds + '<br>\n');
      document.write('[decimal] ' + decimal + '<br>\n');
      document.write('[dd] ' + dd + '<br>\n');
    }
  }

  // Don't do anything for N or E.
  if (direction == "S" || direction == "W") { dd = dd * -1; }

  return dd;
}
