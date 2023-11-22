export const validateFirstName: (value?: string) => string | undefined = (value) =>
  value ? undefined : 'Please enter a first name';
export const validateLastName: (value?: string) => string | undefined = (value) =>
value ? undefined : 'Please enter a last name';
export const validatePrisonName: (value?: string) => string | undefined = (value) =>
  value ? undefined : 'Please enter a prison name';
export const validateDateOfBirth: (value?: {
  year?: number | string;
  month?: number | string;
  day?: number | string;
}) => string | undefined = (value) => {
  if (value && value.year && value.month && value.day) {
    const year = Number(value.year);
    const month = Number(value.month) - 1;
    const day = Number(value.day);
    const testDate = new Date(year, month, day);
    if (
      // Check date is in the past
      testDate < new Date() &&
      // Is after 1900
      testDate.getFullYear() > 1900 &&
      // and a real date resolves to the inputted date (e.g. month is not 13, not 29th February on a non leap year)
      testDate.getFullYear() === year &&
      testDate.getMonth() === month &&
      testDate.getDate() === day
    ) {
      return undefined;
    }
  }
  return 'Please enter a date of birth';
};
// prison number is a capital A followed by 4 numbers and 2 letters
export const validatePrisonNumber: (value?: string) => string | undefined = (value) =>{
    const prisonerNumberRegex = /([A])\d{4}[A-Z]{2}/
    let result: string | undefined;
    if (value) {
        result = prisonerNumberRegex.test(value) ? undefined : "Please enter a correctly formatted prisoner number";
    } else {
        return "Please enter a prisoner number";
    }
    return result;
};