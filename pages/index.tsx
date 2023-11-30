import {
  Page,
  TopNav,
  H1,
  Fieldset,
  GridRow,
  GridCol,
  FormGroup,
  Heading,
  Label,
  LabelText,
  HintText,
  Input,
  Select,
  Button,
} from "govuk-react";
import React, { useState, useEffect } from "react";

export default function FirstPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [prisonerNumber, setPrisonerNumber] = useState("");
  const [prisonName, setPrisonName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateFirstName: (value?: string) => string | undefined = (value) =>
    value ? undefined : "Please enter a first name";
  const validateLastName: (value?: string) => string | undefined = (value) =>
    value ? undefined : "Please enter a last name";
  const validatePrisonName: (value?: string) => string | undefined = (value) =>
    value ? undefined : "Please enter a prison name";
  const validateDateOfBirth: (date?: string) => string | undefined = (date) => {
    if (!date) return "Please enter a date of birth";
    const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/((19|20)\d\d)$/;
    if (!dateFormat.test(date)) return "Please enter date of birth in DD/MM/YYYY format";
    const dateParts = date.split("/");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    const dob = new Date(year, month, day);
    const now = new Date();
    if (dob > now || year < 1900) return "Enter a valid date of birth";
    return undefined;
  };
  // prison number is a capital A followed by 4 numbers and 2 letters
  const validatePrisonNumber: (value?: string) => string | undefined = (
    value
  ) => {
    const prisonerNumberRegex = /([A])\d{4}[A-Z]{2}/;
    let result: string | undefined;
    if (value) {
      result = prisonerNumberRegex.test(value)
        ? undefined
        : "Please enter a correctly formatted prisoner number";
    } else {
      return "Please enter a prisoner number";
    }
    return result;
  };

  const validateForm = () => {
    if (
      !validateFirstName(firstName) &&
      !validateLastName(lastName) &&
      !validatePrisonName(prisonName) &&
      !validateDateOfBirth(dateOfBirth) &&
      !validatePrisonNumber(prisonerNumber)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, prisonerNumber, prisonName, dateOfBirth]);

  const handleSubmit = () => {
    console.log("Button clicked");
    if (isFormValid) {
      console.log("Form is valid.");
    } else {
      console.log(
        "The form is invalid, please ensure all fields are existing and formatted."
      );
    }
  };

  return (
    <Page header={<TopNav />}>
      <H1>Visit Someone in Prison</H1>

      <GridRow>
        <GridCol setWidth="two thirds">
          <FormGroup>
            <Heading size="MEDIUM">Prisoner details</Heading>
          </FormGroup>
          <Fieldset>
            <FormGroup>
              <Label>
                <LabelText>Prisoner first name</LabelText>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <LabelText>Prisoner last name</LabelText>
                <Input
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="dateOfBirth">
                <LabelText>Date of birth</LabelText>
                <Input
                  type="text"
                  id="dateOfBirth"
                  pattern="\d{2}/\d{2}/\d{4}"
                  placeholder="DD/MM/YYYY"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <LabelText>Prisoner number</LabelText>
                <HintText>For example, A1234BC</HintText>
                <Input
                  value={prisonerNumber}
                  onChange={(e) => setPrisonerNumber(e.target.value)}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Select
                label="Prison name"
                hint="For example, Cardiff"
                input={{
                  value: prisonName,
                  onChange: (e) => setPrisonName(e.target.value),
                }}
              >
                <option value="">select a prison</option>
                {/* ... list of prisons */}
              </Select>
            </FormGroup>
            <FormGroup>
              <Button onClick={handleSubmit}>Continue</Button>
            </FormGroup>
          </Fieldset>
        </GridCol>
      </GridRow>
    </Page>
  );
}