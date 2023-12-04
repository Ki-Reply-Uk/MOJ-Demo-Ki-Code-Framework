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
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState(undefined);
  const [prisonerNumber, setPrisonerNumber] = useState("");
  const [prisonName, setPrisonName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [state, handleSubmit] = useForm("mnqkkwpq");
  const [buttonClicked, setButtonClicked] = useState(false);

  if (state.succeeded) {
      console.log("form sent");
  }
  if (state.errors) {
    console.log(state.errors)
  }

  const validateFirstName = (value) =>
    value ? undefined : "Please enter a first name";
  const validateLastName = (value) =>
    value ? undefined : "Please enter a last name";
  const validateDateOfBirth = (dob) => {
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    const currentDate = new Date();
    const currentDay = ('0' + currentDate.getDate()).slice(-2);
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const currentYear = currentDate.getFullYear();
    const currentDateFormatted = currentYear + '/' + currentMonth + '/' + currentDay;

    if (!dob) {
      return "Please enter a date of birth";
    } else if (!dobRegex.test(dob)) {
      return "Please enter a date of birth in the format DD/MM/YYYY";
    } else {
      const convertedDOB = dob.split('/').reverse().join('/');
      if (new Date(convertedDOB) > new Date(currentDateFormatted)) {
        return "Date of birth cannot be in the future";
      }
    }
    const born = new Date(convertedDOB);
    let age = currentDate.getFullYear() - born.getFullYear();
    const m = currentDate.getMonth() - born.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < born.getDate())) {
      age = age - 1;
    }
    setAge(age);
    return undefined;
  };
  const validatePrisonName = (value) =>
    value ? undefined : "Please enter a prison name";
  const validatePrisonNumber = (value) => {
    const prisonerNumberRegex = /([A])\d{4}[A-Z]{2}/;
    let result;
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
      !validateDateOfBirth(dateOfBirth) &&
      !validatePrisonName(prisonName) &&
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

  async function onSubmit(event) {
    event.preventDefault()
    setButtonClicked(true);
    console.log("Button clicked");
    if (isFormValid) {
      console.log("Form is valid.");
      handleSubmit(event);
      alert("Form submitted!");
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
                  <HintText>Enter the first name as shown on official documents.</HintText>
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
              <FormGroup error={buttonClicked && validateDateOfBirth(dateOfBirth)}>
                <Label>
                  <LabelText>Date of Birth</LabelText>
                  <HintText>For example, 31/12/1990</HintText>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    min="1900-01-01"
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDateOfBirth(e.target.value.split("-").reverse().join("/"))}
                  />
                  {age !== undefined && (<HintText>Age: {age}</HintText>)}
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
                  hint="Select from the list below"
                  input={{
                    name:"prisonName",
                    value: prisonName,
                    onChange: (e) => setPrisonName(e.target.value),
                  }}
                >
                  <option value="">Select a prison</option>
                    <option value="Acklington">Acklington</option>
                    <option value="Altcourse">Altcourse</option>
                    <option value="Ashfield">Ashfield</option>
                    <option value="Askham Grange">Askham Grange</option>
                    <option value="Aylesbury">Aylesbury</option>
                    <option value="Bedford">Bedford</option>
                    <option value="Belmarsh">Belmarsh</option>
                    <option value="Berwyn">Berwyn</option>
                    <option value="Birmingham">Birmingham</option>
                    <option value="Blantyre House">Blantyre House</option>
                    <option value="Brinsford">Brinsford</option>
                    <option value="Bristol">Bristol</option>
                    <option value="Brixton">Brixton</option>
                    <option value="Bronzefield">Bronzefield</option>
                    <option value="Buckley Hall">Buckley Hall</option>
                    <option value="Bullingdon (Convicted Only)">Bullingdon (Convicted Only)</option>
                    <option value="Bullingdon (Remand Only)">Bullingdon (Remand Only)</option>
                    <option value="Bure">Bure</option>
                    <option value="Cardiff">Cardiff</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Button type="submit" disabled={state.submitting || !isFormValid}>Continue</Button>
              </FormGroup>
            </form>
          </Fieldset>
        </GridCol>
      </GridRow>
    </Page>
  );
}