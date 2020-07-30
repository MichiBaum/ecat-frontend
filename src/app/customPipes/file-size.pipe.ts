import { Pipe, PipeTransform } from '@angular/core';

type unit = 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';
type unitPrecisionMap = {
  [u in unit]: number;
};
@Pipe({
  name: 'fileSizePipe'
})
export class FileSizePipe implements PipeTransform {

  private readonly units: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  private defaultPrecisionMap: unitPrecisionMap = {
    bytes: 0,
    KB: 0,
    MB: 1,
    GB: 1,
    TB: 2,
    PB: 2
  };

  transform(bytes: number = 0, precision: number | unitPrecisionMap = this.defaultPrecisionMap): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';

    let unitIndex = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unitIndex++;
    }

    const unit = this.units[unitIndex];

    if (typeof precision === 'number') {
      return `${bytes.toFixed(+precision)} ${unit}`;
    }
    return `${bytes.toFixed(precision[unit])} ${unit}`;

  }

}
