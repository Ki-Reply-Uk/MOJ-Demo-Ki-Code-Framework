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
  const [dob, setDob] = useState("");
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

  const validateDob: (value?: string) => string | undefined = (value) => {
    const dobRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d{2}$/;
    if (!value) {
      return "Please enter Date of Birth in the format DD/MM/YYYY";
    } else if (!dobRegex.test(value)) {
      return "Invalid format. Please use the format DD/MM/YYYY";
    } else {
      const [day, month, year] = value.split('/').map(Number);
      const dateOfBirth = new Date(year, month - 1, day);
      const today = new Date();
      if (dateOfBirth > today) {
        return "Date of Birth cannot be in the future";
      }
      try {
        if (dateOfBirth.getDate() !== day || dateOfBirth.getMonth() + 1 !== month) {
          return "Invalid date. Please enter a valid date";
        }
      } catch (e) {
        return "Invalid date. Please use a real date";
      }
      return undefined;
    }
  };

  const validateForm = () => {
    if (
      !validateFirstName(firstName) &&
      !validateLastName(lastName) &&
      !validatePrisonName(prisonName) &&
      !validatePrisonNumber(prisonerNumber) &&
      !validateDob(dob)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, prisonerNumber, prisonName, dob]);


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
              <FormGroup error={buttonClicked && validatePrisonName(prisonName)}>
                <Select
                  label="Prison name"
                  hint="For example, Cardiff"
                  input={{
                    name: "prisonName",
                    value: prisonName,
                    onChange: (e) => setPrisonName(e.target.value),
                  }}
                >
                  <option value="">select a prison</option>
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
              <FormGroup error={buttonClicked && validateDob(dob)}>
                <Label>
                  <LabelText>Date of Birth (DD/MM/YYYY)</LabelText>
                  <HintText>For example, 31/12/1990</HintText>
                  <Input
                    name="dob"
                    value={dob}
                    pattern="\d{2}/\d{2}/\d{4}"
                    onChange={(e) => setDob(e.target.value)}
                    maxLength={10}
                    onKeyDown={(e) => {
                      // Enforce the format: Allow only numbers and '/'
                      if (!/[0-9/]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                        e.preventDefault();
                      }
                    }}
                  />
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
