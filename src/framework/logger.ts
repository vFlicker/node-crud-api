const enum Colors {
  Info = 37,
  Warning = 33,
  Error = 31,
}

export class Logger {
  private paintOverText = (text: string, color: Colors) => {
    return `\x1B[${color}m${text}\x1B[0m`;
  };

  log(text: any) {
    console.info(this.paintOverText(text, Colors.Info));
  }

  warn(text: any) {
    console.warn(this.paintOverText(text, Colors.Warning));
  }

  error(text: any) {
    console.error(this.paintOverText(text, Colors.Error));
  }
}
