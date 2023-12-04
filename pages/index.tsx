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

  const validateDateOfBirth: (value?: string) => string | undefined = (value) => {
    if (!value) {
      return "Please enter the date of birth";
    }
    const dateFormatRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
    if (!dateFormatRegex.test(value)) {
      return "Please enter the date of birth in MM/DD/YYYY format";
    }
    const today = new Date();
    const dob = new Date(value);
    if (dob >= today) {
      return "Date of birth cannot be in the future";
    }

    const ageOfMajority = 18; // Replace 18 with the age of majority in the jurisdiction
    const minDob = new Date(today.getFullYear() - ageOfMajority, today.getMonth(), today.getDate());
    if (dob > minDob) {
      return `The person must be at least ${ageOfMajority} years old`;
    }
    return undefined;
  };

  const validateForm = () => {
    if (
      !validateFirstName(firstName) &&
      !validateLastName(lastName) &&
      !validatePrisonName(prisonName) &&
      !validatePrisonNumber(prisonerNumber) &&
      !validateDateOfBirth(dateOfBirth) // Update the validateForm function
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, prisonerNumber, prisonName, dateOfBirth]); // update useEffect dependency array


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setButtonClicked(true);
    console.log("Button clicked");
    if (isFormValid) {
      console.log("Form is valid.");
      handleSubmit(event);
      alert("Email sent!");
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
        <GridCol setWidth="two-thirds">
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
                  <option value="">Select a prison</option>
                  //... (include all options as they were in the original code before modifications)
                </Select>
              </FormGroup>
              <FormGroup error={buttonClicked && validateDateOfBirth(dateOfBirth)}>
                <Label>
                  <LabelText>Date of Birth</LabelText>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    pattern="\d{2}/\d{2}/\d{4}"
                  />
                  <HintText>For example, 12/31/1990</HintText>
                </Label>
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
