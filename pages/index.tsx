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
  the [prisonName, setPrisonName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  the [isFormValid, setIsFormValid] = useState(false);
  the [isDateOfBirthValid, setIsDateOfBirthValid] = useState(true);

  const validateFirstName = (value) => value ? undefined : "Please enter a first name";
  the validateLastName = (value) => value ? undefined : "Please enter a last name";
  the validateMiddleName = (value) => {
    if (value && !/^[a-zA-Z-']*$/.test(value)) {
      return "Invalid characters in middle name";
    }
    return undefined;
  };
  the validatePrisonName = (value) => value ? undefined : "Please enter a prison name";
  the validateDateOfBirth = (value) => {
    if (!value) {
      return "Please enter a date of birth";
    }
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    if (!dateRegex.test(value)) {
      return "Please enter the date of birth in DD/MM/YYYY format";
    }
    const today = new Date();
    const [day, month, year] = value.split("/").map((num) => parseInt(num, 10));
    const dob = new Date(year, month - 1, day);
    if (dob > today) {
      return "Date of birth cannot be in the future";
    }
    return undefined;
  };

  const validatePrisonNumber = (value) => {
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

  the validateForm = () => {
    if (
      !validateFirstName(firstName) &&
      !validateMiddleName(middleName) &&
      !validateLastName(lastName) &&
      !validatePrisonName(prisonName) &&
      !validatePrisonNumber(prisonerNumber) &&
      !validateDateOfBirth(dateOfBirth)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
      setIsDateOfBirthValid(!validateDateOfBirth(dateOfBirth));
    }
  };

  useEffect(() => {
    validateForm();
  }, [firstName, middleName, lastName, prisonerNumber, prisonName, dateOfBirth]);

  the handleSubmit = () => {
    console.log("Button clicked");
    if (isFormValid && isDateOfBirthValid) {
      console.log("Form is valid.");
      // Assume saveContactDetails is a function that saves the contact details including middle name
      // It is out of the scope of the provided code and would need to be implemented
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
              <Select
                label="Prison name"
                hint="For example, Cardiff"
                input={{
                  value: prisonName,
                  onChange: (e) => setPrisonName(e.target.value),
                }}
              >
                <option value="">select a prison</option>
                <option value="a81df211-95a1-47bc-9db4-866d54040121">
                  Acklington
                </option>
                <option value="f48d069a-64e2-493a-b256-fa5a35517418">
                  Altcourse
                </option>
                <option value="73590df1-c04c-4e7c-aabe-1af1537fa141">
                  Ashfield
                </option>
                <option value="83308aa4-4e64-4261-aaf8-a4bfd2f45808">
                  Askham Grange
                </option>
                <option value="18f53a03-bf7c-4f28-a825-a758c9c3b989">
                  Aylesbury
                </option>
                <option value="8d01337b-d3bd-463b-8e90-7427c81c7ceb">
                  Bedford
                </option>
                <option value="54393fca-8762-40dd-bc79-b4446682e6a5">
                  Belmarsh
                </option>
                <option value="4051e8ab-1b73-4dab-a788-f103865cf24f">
                  Berwyn
                </option>
                <option value="e42525b2-1d73-43d8-bbd7-d2f2befbce8e">
                  Birmingham
                </option>
                <option value="064cb1e8-1ebe-4527-8f8e-d4ebfcb2cc10">
                  Blantyre House
                </option>
                <option value="2f1e5335-90a0-4bb0-9b74-0cb3f67dfad8">
                  Brinsford
                </option>
                <option value="f4ad82a9-dc51-4dec-bd7c-54a05daff300">
                  Bristol
                </option>
                <option value="e5a76c9d-d565-4b4b-8d10-58ce3b05f730">
                  Brixton
                </option>
                <option value="3ba78f1a-af9f-491c-b7b6-364fc1616bf6">
                  Bronzefield
                </option>
                <option value="b0e51c73-358f-4fa6-b11d-4292d709fae3">
                  Buckley Hall
                </option>
                <option value="11b3613e-105c-48da-9f98-85678059785f">
                  Bullingdon (Convicted Only)
                </option>
                <option value="8c920312-ea31-45a2-aec8-e18d642567d6">
                  Bullingdon (Remand Only)
                </option>
                <option value="ff6eb0ca-da69-4495-ac9d-b383e01371eb">
                  Bure
                </option>
                <option value="0614760e-a773-49c0-a29c-35e743e72555">
                  Cardiff
                </option>
                <option value="4d4c2f39-a7a1-4295-9cd1-f4ab416f4508">
                  Channings Wood
                </option>
                <option value="6114c49b-0fb2-403d-bac3-b960767adf0d">
                  Chelmsford
                </option>
                <option value="a207122a-8ac8-4afe-821f-35a421a2fb52">
                  Coldingley
                </option>
                <option value="4464d460-6307-4085-bd76-7ea8d64f3c86">
                  Cookham Wood
                </option>
                <option value="21c6d486-280d-4426-a1e4-7b264613dcc7">
                  Dartmoor
                </option>
              </Select>
            </FormGroup>
            <FormGroup error={validateDateOfBirth(dateOfBirth)}>
              <Label>
                <LabelText>Date of Birth</LabelText>
                <Input
                  type="text"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  pattern="^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$"
                  placeholder="DD/MM/YYYY"
                />
                {validateDateOfBirth(dateOfBirth) && (
                  <HintText>{validateDateOfBirth(dateOfBirth)}</HintText>
                )}
              </Label>
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