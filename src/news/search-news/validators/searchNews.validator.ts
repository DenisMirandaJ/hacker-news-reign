import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validateBrackets } from '../../../utils/utils';

@ValidatorConstraint({ name: 'ValidateBrackets', async: false })
export class ValidateBrackets implements ValidatorConstraintInterface {
  validate(text: string) {
    if (!text) {
      return true;
    }
    return validateBrackets(text);
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Text ($value) has mismatched brackets';
  }
}
