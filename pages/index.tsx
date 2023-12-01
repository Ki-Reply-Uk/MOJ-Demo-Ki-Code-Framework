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
import React, { useState, useEffect, FormEvent } from "react";
import { useForm } from '@formspree/react';

export default function FirstPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [prisonerNumber, setPrisonerNumber] = useState("");
  const [prisonName, setPrisonName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [state, handleSubmit] = useForm("mnqkkwpq");
  const [buttonClicked, setButtonClicked] = useState(false);

  if (state.succeeded) {
      console.log("form sent");
  }
  if (state.errors) {
    console.log(state.errors)
  }

  const validateFirstName: (value?: string) => string | undefined = (value) =>
    value ? undefined : "Please enter a first name";
  const validateLastName: (value?: string) => string | undefined = (value) =>
    value ? undefined : "Please enter a last name";
  const validatePrisonName: (value?: string) => string | undefined = (value) =>
    value ? undefined : "Please enter a prison name";
  
  const validateDateOfBirth: (value?: string) => string | undefined = (value) => {
    if (!value) {
      return "Please enter the date of birth";
    }
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/((19|20)\d\d)$/;
    if (!dateRegex.test(value)) {
      return "Please enter a date in DD/MM/YYYY format";
    }
    const currentDate = new Date();
    const [day, month, year] = value.split('/').map(Number);
    const dateOfBirthDate = new Date(year, month - 1, day);
    if (dateOfBirthDate > currentDate) {
      return "Date of birth cannot be a future date";
    }
    if (day === 29 && month === 2) {
      if (!(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))) {
        return "Invalid leap year date";
      }
    }
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
      !validatePrisonNumber(prisonerNumber) &&
      !validateDateOfBirth(dateOfBirth)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, prisonerNumber, prisonName, dateOfBirth]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setButtonClicked(true);
    console.log("Button clicked");
    if (isFormValid) {
      console.log("Form is valid.");
      handleSubmit(event);
    } else {
      console.log(
        "The form is invalid, please ensure all fields are existing and formatted."
      );
    }
  }

  return (
    <Page header={<TopNav />}>
      <H1>Visit Someone in Prison</H1>

      <GridRow>
        <GridCol setWidth="two thirds">
          <FormGroup>
            <Heading size="MEDIUM">Prisoner details</Heading>
          </FormGroup>
          <Fieldset>
            <form onSubmit={onSubmit} method="POST">
              <FormGroup error={buttonClicked && validateFirstName(firstName)}>
                <Label>
                  <LabelText>Prisoner first name</LabelText>
                  <Input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validateLastName(lastName)}>
                <Label>
                  <LabelText>Prisoner last name</LabelText>
                  <Input
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validatePrisonNumber(prisonerNumber)}>
                <Label>
                  <LabelText>Prisoner number</LabelText>
                  <HintText>For example, A1234BC</HintText>
                  <Input
                    name="prisonNumber"
                    value={prisonerNumber}
                    onChange={(e) => setPrisonerNumber(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validateDateOfBirth(dateOfBirth)}>
                <Label>
                  <LabelText>Date of Birth</LabelText>
                  <HintText>For example, 31/12/1990</HintText>
                  <Input
                    type="text"
                    name="dateOfBirth"
                    pattern="\d{1,2}/\d{1,2}/\d{4}"
                    placeholder="DD/MM/YYYY"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validatePrisonName(prisonName)}>
                <Select
                  label="Prison name"
                  hint="For example, Cardiff"
                  input={{
                    name:"prisonName",
                    value: prisonName,
                    onChange: (e) => setPrisonName(e.target.value),
                  }}
                >
                  <option value="">select a prison</option>
                    <option value="Acklington">
                      Acklington
                    </option>
                    <option value="Altcourse">
                      Altcourse
                    </option>
                    <option value="Ashfield">
                      Ashfield
                    </option>
                    <option value="Askham Grange">
                      Askham Grange
                    </option>
                    <option value="Aylesbury">
                      Aylesbury
                    </option>
                    <option value="Bedford">
                      Bedford
                    </option>
                    <option value="Belmarsh">
                      Belmarsh
                    </option>
                    <option value="Berwyn">
                      Berwyn
                    </option>
                    <option value="Birmingham">
                      Birmingham
                    </option>
                    <option value="Blantyre House">
                      Blantyre House
                    </option>
                    <option value="Brinsford">
                      Brinsford
                    </option>
                    <option value="Bristol">
                      Bristol
                    </option>
                    <option value="Brixton">
                      Brixton
                    </option>
                    <option value="Bronzefield">
                      Bronzefield
                    </option>
                    <option value="Buckley Hall">
                      Buckley Hall
                    </option>
                    <option value="Bullingdon (Convicted Only)">
                      Bullingdon (Convicted Only)
                    </option>
                    <option value="Bullingdon (Remand Only)">
                      Bullingdon (Remand Only)
                    </option>
                    <option value="Bure">
                      Bure
                    </option>
                    <option value="Cardiff">
                      Cardiff
                    </option>
                  </Select>
              </FormGroup>
              <FormGroup>
                <Button type="submit" disabled={state.submitting}>Continue</Button>
              </FormGroup>
            </form>
          </Fieldset>
        </GridCol>
      </GridRow>
    </Page>
  );
}