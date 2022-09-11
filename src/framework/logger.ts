const enum Colors {
  Info = 37,
  Warning = 33,
  Error = 31,
}

export class Logger {
  private static paintOverText = (text: string, color: Colors) => {
    return `\x1B[${color}m${text}\x1B[0m`;
  };

  info(text: any) {
    console.info(Logger.paintOverText(text, Colors.Info));
  }

  warn(text: any) {
    console.warn(Logger.paintOverText(text, Colors.Warning));
  }

  error(text: any) {
    console.error(Logger.paintOverText(text, Colors.Error));
  }
}
