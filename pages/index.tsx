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
  const [dateOfBirthError, setDateOfBirthError] = useState<string | undefined>(undefined);
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
    const dateOfBirthRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
    return value && dateOfBirthRegex.test(value) ? undefined : "Please enter a valid date of birth (MM/DD/YYYY)";
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
              <FormGroup error={buttonClicked && validateDateOfBirth(dateOfBirth)}>
                <Label>
                  <LabelText>Prisoner date of birth</LabelText>
                  <Input
                    name="dateOfBirth"
                    type="text"
                    value={dateOfBirth}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                      setDateOfBirthError(validateDateOfBirth(e.target.value));
                    }}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && dateOfBirthError}>
                <HintText>{dateOfBirthError}</HintText>
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
