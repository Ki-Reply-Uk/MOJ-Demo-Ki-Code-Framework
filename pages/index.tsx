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
  // Define a translations object
  const translations = {
    pageTitle: "Visit Someone in Prison",
    prisonerDetailsHeading: "Prisoner Details",
    firstNameLabel: "Prisoner First Name",
    lastNameLabel: "Prisoner Last Name",
    prisonerNumberLabel: "Prisoner Number",
    prisonerNumberHint: "For example, A1234BC",
    prisonNameLabel: "Prison Name",
    prisonNameHint: "For example, Cardiff",
    selectPrisonPlaceholder: "Select a Prison",
    // List of prisons can also be translated
    bullingdonConvicted: "Bullingdon (Convicted Only)",
    bullingdonRemand: "Bullingdon (Remand Only)",
    continueButton: "Continue",
    // Validation messages
    enterFirstName: "Please enter a first name",
    enterLastName: "Please enter a last name",
    enterPrisonName: "Please enter a prison name",
    enterValidPrisonerNumber: "Please enter a correctly formatted prisoner number",
    enterPrisonerNumber: "Please enter a prisoner number",
    // Date of Birth field if added
    dobLabel: "Prisoner's Date of Birth",
    enterValidDob: "Please enter a valid date of birth (yyyy-mm-dd)"
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [prisonerNumber, setPrisonerNumber] = useState("");
  const [prisonName, setPrisonName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [state, handleSubmit] = useForm("mnqkkwpq");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [prisonerDob, setPrisonerDob] = useState("");

  if (state.succeeded) {
      console.log("form sent");
  }
  if (state.errors) {
    console.log(state.errors)
  }

  const validateFirstName: (value?: string) => string | undefined = (value) =>
    value ? undefined : translations.enterFirstName;
  const validateLastName: (value?: string) => string | undefined = (value) =>
    value ? undefined : translations.enterLastName;

  // Validation for prisoner's date of birth
  const validatePrisonerDob: (value?: string) => string | undefined = (value) => {
    // Simple validation: check if the date of birth is in a valid date format (yyyy-mm-dd)
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (value && dobRegex.test(value)) {
      return undefined;
    } else {
      return translations.enterValidDob;
    }
  };
  const validatePrisonName: (value?: string) => string | undefined = (value) =>
  value ? undefined : translations.enterPrisonName;

  // prison number is a capital A followed by 4 numbers and 2 letters
  const validatePrisonNumber: (value?: string) => string | undefined = (
    value
  ) => {
    const prisonerNumberRegex = /([A])\d{4}[A-Z]{2}/;
    let result: string | undefined;
    if (value) {
      result = prisonerNumberRegex.test(value)
        ? undefined
        : translations.enterValidPrisonerNumber;
    } else {
      return translations.enterPrisonerNumber;
    }
    return result;
  };

  const validateForm = () => {
    if (
      !validateFirstName(firstName) &&
      !validateLastName(lastName) &&
      !validatePrisonName(prisonName) &&
      !validatePrisonNumber(prisonerNumber)&&
      !validatePrisonerDob(prisonerDob)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, prisonerNumber, prisonName]);


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
      <H1>translations.pageTitle</H1>

      <GridRow>
        <GridCol setWidth="two-thirds">
          <FormGroup>
            <Heading size="MEDIUM">translations.prisonerDetailsHeading</Heading>
          </FormGroup>
          <Fieldset>
            <form onSubmit={onSubmit} method="POST">
              <FormGroup error={buttonClicked && validateFirstName(firstName)}>
                <Label>
                  <LabelText>translations.firstNameLabel</LabelText>
                  <Input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validateLastName(lastName)}>
                <Label>
                  <LabelText>translations.lastNameLabel</LabelText>
                  <Input
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validatePrisonerDob(prisonerDob)}>
                <Label>
                  <LabelText>translations.dobLabel</LabelText>
                  <Input
                    type="date"
                    name="prisonerDob"
                    value={prisonerDob}
                    onChange={(e) => setPrisonerDob(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validatePrisonNumber(prisonerNumber)}>
                <Label>
                  <LabelText>translations.prisonerNumberLabel</LabelText>
                  <HintText>translations.prisonerNumberHint</HintText>
                  <Input
                    name="prisonNumber"
                    value={prisonerNumber}
                    onChange={(e) => setPrisonerNumber(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validatePrisonName(prisonName)}>
                <Select
                  label=translations.prisonNameLabel
                  hint=translations.prisonNameHint
                  
                  input={{
                    name:"prisonName",
                    value: prisonName,
                    onChange: (e) => setPrisonName(e.target.value),
                  }}
                >
                  <option value="">translations.selectPrisonPlaceholder</option>
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
                      translations.bullingdonConvicted
                    </option>
                    <option value="Bullingdon (Remand Only)">
                      translations.bullingdonRemand
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
                <Button type="submit" disabled={state.submitting}>translations.continueButton</Button>
              </FormGroup>
            </form>
          </Fieldset>
        </GridCol>
      </GridRow>
    </Page>
  );
}
