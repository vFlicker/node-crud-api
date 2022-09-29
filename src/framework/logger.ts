const enum Colors {
  Info = 37,
  Warning = 33,
  Error = 31,
}

const paintOverText = (text: string, color: Colors) => {
  return `\x1B[${color}m${text}\x1B[0m`;
};

export class Logger {
  info(text: any) {
    console.info(paintOverText(text, Colors.Info));
  }

  warn(text: any) {
    console.warn(paintOverText(text, Colors.Warning));
  }

  error(text: any) {
    console.error(paintOverText(text, Colors.Error));
  }
}
