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

  const imageURL = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-aGEVVU5tg2M2AsgFnKKY8QJR/user-fcv2C4iR96qYVhGJaLfvBrFl/img-NU5xcJIOtukL4RMhCr5cNkL9.png?st=2023-12-05T14%3A23%3A14Z&se=2023-12-05T16%3A23%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-05T13%3A34%3A06Z&ske=2023-12-06T13%3A34%3A06Z&sks=b&skv=2021-08-06&sig=NWXuzd28QPLZyXKuLt5T1PSG52tj8XOf7TLDZgyxY6M%3D"
  const snowGIFUrl = "https://i.gifer.com/embedded/download/4bX2.gif"

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [prisonerNumber, setPrisonerNumber] = useState("");
  const [prisonName, setPrisonName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [state, handleSubmit] = useForm("mnqkkwpq");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [prisonerDob, setPrisonerDob] = useState("");

  const [timeUntilChristmas, setTimeUntilChristmas] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const christmas = new Date(now.getFullYear(), 11, 25); // 11 is December in JavaScript Date
      if (now.getMonth() === 11 && now.getDate() > 25) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }
      const diff = christmas.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeUntilChristmas(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <img src={imageURL} alt="DALL-E Generated Image" style={{ width: '50%', height: 'auto' }} />
    <div style={{ width: '45%' }}>
    <Page header={<TopNav />}>
    <div style={{
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#FF0000', // Christmas red background
        color: '#FFFFFF', // White text
        fontWeight: 'bold',
        border: '5px dashed gold', // Gold border
        borderRadius: '10px',
        margin: '10px 0',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // subtle shadow
      }}>
        🎄 Only {timeUntilChristmas} until Christmas! 🎅
      </div>
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
    </div>
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${snowGIFUrl})`, // Using the online GIF URL
        backgroundSize: 'cover',
        pointerEvents: 'none',
        zIndex: 1000 // Ensure this is above other content but below interactive elements
      }} />
    </div>
  );
}
