import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function EmailValidator(confirmEmailInput: string): ValidatorFn {
  let confirmEmailControl: AbstractControl;
  let emailControl: AbstractControl;

  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null;
    }

    if (!confirmEmailControl) {
      confirmEmailControl = control;
      emailControl = control.parent.get(confirmEmailInput) as FormControl;
      emailControl.valueChanges.subscribe(() => {
        confirmEmailControl.updateValueAndValidity();
      });
    }

    if (emailControl.value.toLocaleLowerCase() !==
      confirmEmailControl.value.toLocaleLowerCase()
    ) {
      return {notMatch: true};
    } else {
      confirmEmailControl.setErrors(null);
    }

    return null;
  };
}
