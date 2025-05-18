import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraintInterface,
  ValidationArguments,
  isEmail,
  isEmpty,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'customEmail', async: false })
@Injectable() // Make it injectable if you plan to register it in a module
export class CustomEmailValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const { isRequired = true } = args.constraints[0] || {};
    // Check 1: IsNotEmpty equivalent
    // isEmpty considers null, undefined, and empty string ""
    if (isEmpty(value) && isRequired) {
      return false; // Fails "isNotEmpty"
    }

    if (isEmpty(value) && !isRequired) {
      return true;
    }

    // Check 2: IsEmail equivalent
    // Ensure it's a string before checking email format, as isEmail expects a string
    if (typeof value !== 'string' || !isEmail(value)) {
      return false; // Fails "isEmail"
    }

    return true; // All checks passed
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value;
    const property = args.property;
    const { isRequired = true } = args.constraints[0] || {};

    if (isEmpty(value) && isRequired) {
      return `${args.property} is required.`;
    }

    if (typeof value !== 'string' || !isEmail(value)) {
      return `${args.property} is not a valid email.`;
    }

    // This fallback should ideally not be reached if validate() logic is correct
    return `${args.property} is invalid.`;
  }
}
