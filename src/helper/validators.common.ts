import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorsCommon {
  public isNullOrUndefined(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
