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
    const [submissionDate, setSubmissionDate] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
  
    const validateFirstName: (value?: string) => string | undefined = (value) =>
      value ? undefined : "Please enter a first name";
    const validateLastName: (value?: string) => string | undefined = (value) =>
      value ? undefined : "Please enter a last name";
    const validatePrisonName: (value?: string) => string | undefined = (value) =>
      value ? undefined : "Please enter a prison name";
    const validateSubmissionDate: (value?: string) => string | undefined = (value) => {
      if (!value) {
        return "Please enter a submission date";
      }
      const dateRegex = /^\d{4}[-/]\d{2}[-/]\d{2}$/; // Adapted for 'YYYY-MM-DD' format, can be changed according to locale
      if (!dateRegex.test(value)) {
        return "Please enter the date in the correct format (YYYY-MM-DD)";
      }
      const date = new Date(value);
      if (date.toString() === "Invalid Date") {
        return "Invalid Date. Please enter a valid date";
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
        !validateSubmissionDate(submissionDate)
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };
  
    useEffect(() => {
      validateForm();
    }, [firstName, lastName, prisonerNumber, prisonName, submissionDate]);
  
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
                  <LabelText>Submission Date</LabelText>
                  <HintText>For example, 2023-01-25</HintText>
                   <Input
                        type="date" // or the appropriate input type for your locale
                        value={submissionDate}
                        onChange={(e) => setSubmissionDate(e.target.value)}
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
                  {/* ...options... */}
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