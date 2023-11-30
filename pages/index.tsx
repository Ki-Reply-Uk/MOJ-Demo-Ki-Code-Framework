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
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastname] = useState("");
  const [prisonerNumber, setPrisonerNumber] = useState("");
  const [prisonName, setPrisonName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateFirstName = (value) => value ? undefined : "Please enter a first name";
  const validateLastName = (value) => value ? undefined : "Please enter a last name";
  const validateMiddleName = (value) => {
    if (value && !/^[a-zA-Z-']*$/.test(value)) {
      return "Invalid characters in middle name";
    }
    return undefined;
  };
  const validatePrisonName = (value) => value ? undefined : "Please enter a prison name";

  const validatePrisonerNumber = (value) => {
    const prisonerNumberRegex = /^[A]\d{4}[A-Z]{2}$/;
    if (value) {
      if (!prisonerNumberRegex.test(value)) {
        return "Please enter a correctly formatted prisoner number";
      }
    } else {
      return "Please enter a prisoner number";
    }
    return undefined;
  };

  const validateDateOfBirth = (value) => {
    const dobRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d{2}$/;
    const today = new Date();
    const parts = value?.split("/");
    const birthDate = parts ? new Date(+parts[2], parts[1] - 1, +parts[0]) : null;

    if (!value) {
      return "Please enter a date of birth";
    } else if (!dobRegex.test(value)) {
      return "Please enter a date of birth in the format DD/MM/YYYY";
    } else if (birthDate > today or birthDate.getFullYear() < 1900) {
      return "Please enter a plausible date of birth";
    }
    return undefined;
  };

  const validateForm = () => {
    if (
      !validateFirstName(firstName) &&
      !validateMiddleName(middleName) &&
      !validateLastName(lastName) &&
      !validatePrisonName(prisonName) &&
      !validatePrisonerNumber(prisonerNumber) &&
      !validateDateOfBirth(dateOfBirth)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [firstName, middleName, lastName, prisonerNumber, prisonName, dateOfBirth]);

  const handleSubmit = () => {
    console.log("Button clicked");
    if (isFormValid) {
      console.log("Form is valid.");
      // Assume saveContactDetails is a function that saves the contact details
      // saveContactDetails({ firstName, middleName, lastName, prisonerNumber, prisonName, dateOfBirth });
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
                <LabelText>Prisoner middle name (optional)</LabelText>
                <Input
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  maxLength="50"
                />
                {middleName && validateMiddleName(middleName) && (
                  <HintText>{validateMiddleName(middleName)}</HintText>
                )}
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
              <Label>
                <LabelText>Date of Birth</LabelText>
                <HintText>For example, 31/12/1990</HintText>
                <Input
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  placeholder="DD/MM/YYYY"
                />
                {dateOfBirth && validateDateOfBirth(dateOfBirth) && (
                  <HintText>{validateDateOfBirth(dateOfBirth)}</HintText>
                )}
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
                {/* ... all the options as they were ... */}
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