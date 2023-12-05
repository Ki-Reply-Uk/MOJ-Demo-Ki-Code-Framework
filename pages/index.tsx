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
    pageTitle: "Visiter quelqu'un en prison",
    prisonerDetailsHeading: "Détails du détenu",
    firstNameLabel: "Prénom du détenu",
    lastNameLabel: "Nom de famille du détenu",
    prisonerNumberLabel: "Numéro de détenu",
    prisonerNumberHint: "Par exemple, A1234BC",
    prisonNameLabel: "Nom de la prison",
    prisonNameHint: "Par exemple, Cardiff",
    selectPrisonPlaceholder: "Sélectionnez une prison",
    // List of prisons can also be translated
    bullingdonConvicted: "Bullingdon (condamné seulement)",
    bullingdonRemand: "Bullingdon (garde à vue seulement)",
    continueButton: "Continuer",
    // Validation messages
    enterFirstName: "Veuillez entrer un prénom",
    enterLastName: "Veuillez entrer un nom de famille",
    enterPrisonName: "Veuillez entrer un nom de prison",
    enterValidPrisonerNumber: "Veuillez entrer un numéro de détenu correctement formaté",
    enterPrisonerNumber: "Veuillez entrer un numéro de détenu",
    // Date of Birth field if added
    dobLabel: "Date de naissance du détenu",
    enterValidDob: "Veuillez entrer une date de naissance valide (aaaa-mm-jj)"
  };

  const imageURL = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-aGEVVU5tg2M2AsgFnKKY8QJR/user-fcv2C4iR96qYVhGJaLfvBrFl/img-cOVewsGUmdlgsGOvgEOOjwUz.png?st=2023-12-05T12%3A59%3A40Z&se=2023-12-05T14%3A59%3A40Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-05T06%3A23%3A40Z&ske=2023-12-06T06%3A23%3A40Z&sks=b&skv=2021-08-06&sig=5sfvMj5m10yYR3%2BZlky/ChsnDQdXrohBiZnnr3oIYqg%3D"

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
    <div>
    <img src={imageURL} alt="DALL-E Generated Image" style={{ width: '100%', display: 'block' }} />
    <Page header={<TopNav />}>
      <H1>{translations.pageTitle}</H1>

      <GridRow>
        <GridCol setWidth="two-thirds">
          <FormGroup>
            <Heading size="MEDIUM">{translations.prisonerDetailsHeading}</Heading>
          </FormGroup>
          <Fieldset>
            <form onSubmit={onSubmit} method="POST">
              <FormGroup error={buttonClicked && validateFirstName(firstName)}>
                <Label>
                  <LabelText>{translations.firstNameLabel}</LabelText>
                  <Input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validateLastName(lastName)}>
                <Label>
                  <LabelText>{translations.lastNameLabel}</LabelText>
                  <Input
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validatePrisonerDob(prisonerDob)}>
                <Label>
                  <LabelText>{translations.dobLabel}</LabelText>
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
                  <LabelText>{translations.prisonerNumberLabel}</LabelText>
                  <HintText>{translations.prisonerNumberHint}</HintText>
                  <Input
                    name="prisonNumber"
                    value={prisonerNumber}
                    onChange={(e) => setPrisonerNumber(e.target.value)}
                  />
                </Label>
              </FormGroup>
              <FormGroup error={buttonClicked && validatePrisonName(prisonName)}>
                <Select
                  label={translations.prisonNameLabel}
                  hint={translations.prisonNameHint}
                  
                  input={{
                    name:"prisonName",
                    value: prisonName,
                    onChange: (e) => setPrisonName(e.target.value),
                  }}
                >
                  <option value="">{translations.selectPrisonPlaceholder}</option>
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
                      {translations.bullingdonConvicted}
                    </option>
                    <option value="Bullingdon (Remand Only)">
                      {translations.bullingdonRemand}
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
                <Button type="submit" disabled={state.submitting}>{translations.continueButton}</Button>
              </FormGroup>
            </form>
          </Fieldset>
        </GridCol>
      </GridRow>
    </Page>
    </div>
  );
}
