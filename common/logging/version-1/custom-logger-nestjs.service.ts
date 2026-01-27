import { Injectable, Scope } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { join } from 'path';
import fs from 'fs';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerNestjsService implements LoggerService {
  private readonly logsFolder = join(process.cwd(), 'logs');
  private readonly projectLogsFolder: string;

  constructor(private projectName: string) {
    this.projectName = projectName;
    this.projectLogsFolder = join(this.logsFolder, this.projectName);

    if (!fs.existsSync(this.projectLogsFolder)) {
      fs.mkdirSync(this.projectLogsFolder, { recursive: true });
    }
  }

  log(message: any, ...optionalParams: any[]): void {
    /* No need to log to file, we use the console.log */
    console.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    fs.appendFileSync(
      join(this.projectLogsFolder, 'error.log'),
      `${new Date().toISOString()} - ${message}\n`,
    );
    console.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    fs.appendFileSync(
      join(this.projectLogsFolder, 'warn.log'),
      `${new Date().toISOString()} - ${message}\n`,
    );
    console.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    fs.appendFileSync(
      join(this.projectLogsFolder, 'debug.log'),
      `${new Date().toISOString()} - ${message}\n`,
    );
    console.debug(message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): void {
    fs.appendFileSync(
      join(this.projectLogsFolder, 'verbose.log'),
      `${new Date().toISOString()} - ${message}\n`,
    );
    console.log(message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]): void {
    fs.appendFileSync(
      join(this.projectLogsFolder, 'fatal.log'),
      `${new Date().toISOString()} - ${message}\n`,
    );
    console.log(message, ...optionalParams);
  }
}
