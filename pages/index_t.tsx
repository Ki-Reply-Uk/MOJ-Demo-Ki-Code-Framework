import { Page, TopNav, H1, Fieldset, GridRow, GridCol, FormGroup, Heading, Label, LabelText, HintText, Input, Select, Button } from "govuk-react";
import React, { useState, useEffect } from 'react'; 

export default function FirstPage() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [prisonerNumber, setPrisonerNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [prisonName, setPrisonName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateFirstName: (value?: string) => string | undefined = (value) =>
  value ? undefined : 'Please enter a first name';
  const validateLastName: (value?: string) => string | undefined = (value) =>
  value ? undefined : 'Please enter a last name';
  const validatePrisonName: (value?: string) => string | undefined = (value) =>
    value ? undefined : 'Please enter a prison name';
  const validateSelectedDate: (value?: string) => string | undefined = (value) => {
    if (!value) {
      return 'Please select a date';
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(value) ? undefined : 'Please enter a valid date';
  };
  // prison number is a capital A followed by 4 numbers and 2 letters
  const validatePrisonNumber: (value?: string) => string | undefined = (value) =>{
      const prisonerNumberRegex = /([A])\d{4}[A-Z]{2}/
      let result: string | undefined;
      if (value) {
          result = prisonerNumberRegex.test(value) ? undefined : "Please enter a correctly formatted prisoner number";
      } else {
          return "Please enter a prisoner number";
      }
      return result;
  };

  const validateForm = () => {
    if (!validateFirstName(firstName) && !validateLastName(lastName) && !validatePrisonName(prisonName) && !validatePrisonNumber(prisonerNumber) && !validateSelectedDate(selectedDate)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, prisonerNumber, prisonName, selectedDate]);

  const handleSubmit = () => {
    console.log("Button clicked");
    if (isFormValid) {
      console.log("Selected date:", selectedDate);
      console.log("Form is valid.");
    } else {
      console.log("The form is invalid, please ensure all fields are existing and formatted.");
    }
  }

  return (
    <Page
      header={<TopNav />}
    >
      <H1>
        Visit Someone in Prison
      </H1>


      <GridRow>
        <GridCol setWidth="two thirds">
          <FormGroup>
            <Heading size="MEDIUM">Prisoner details</Heading>
          </FormGroup>
          <Fieldset>
            <FormGroup>
              <Label>
                <LabelText>Prisoner first name</LabelText>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <LabelText>Prisoner last name</LabelText>
                <Input value={lastName} onChange={(e) => setLastname(e.target.value)} />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <LabelText>Visitation Date</LabelText>
                <HintText>Select the date you plan to visit</HintText>
                <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </Label>
            </FormGroup>
	    <FormGroup>
              <Label>
                <LabelText>Prisoner number</LabelText>
                <HintText>For example, A1234BC</HintText>
                <Input value={prisonerNumber} onChange={(e) => setPrisonerNumber(e.target.value)} />
              </Label>
            </FormGroup>
            <FormGroup>
                <Select
                  label="Prison name"
                  hint="For example, Cardiff"
                  input={{
                    value: prisonName,
                    onChange: (e) => setPrisonName(e.target.value)
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
                  <option value="8ac45e51-d07a-4fea-a21f-945275cb7aed">
                    Deerbolt
                  </option>
                  <option value="6fb6bdb0-8f88-4e04-900e-30bf0f6fe091">
                    Doncaster
                  </option>
                  <option value="f3c29be8-1d1d-47b8-bd4d-3310e891808b">
                    Dovegate
                  </option>
                  <option value="a2b7ccc6-a5b4-498c-8b91-7432f28ec87f">
                    Downview
                  </option>
                  <option value="4b806557-96fb-493b-90b4-b6257db84820">
                    Drake Hall
                  </option>
                  <option value="a534c5dc-4268-4eff-b128-f4913a67c190">
                    Durham
                  </option>
                  <option value="c6ddc317-f44e-4bec-9001-dd79f5a5fe25">
                    East Sutton Park
                  </option>
                  <option value="e69eec52-2861-49a1-aa6d-a06c1d838eab">
                    Eastwood Park
                  </option>
                  <option value="6816c616-98c1-445e-8efd-28475268845e">
                    Elmley
                  </option>
                  <option value="0e034353-5939-467e-b618-5e5b81a4a2a2">
                    Erlestoke
                  </option>
                  <option value="5131fed0-d864-4118-a4b4-820f82be87c4">
                    Everthorpe
                  </option>
                  <option value="3e887c54-aa3f-4bb6-ab52-aa15d74f846c">
                    Exeter
                  </option>
                  <option value="1d00db07-80c4-4312-85d7-b3aba49ecca6">
                    Featherstone
                  </option>
                  <option value="fd135d8f-fd86-432a-a186-acc884ea07d9">
                    Feltham (Young Adults 18-21 only)
                  </option>
                  <option value="6478a2c8-fcdd-4cd4-8356-44386b4f026e">
                    Feltham (Young People 15-18 only)
                  </option>
                  <option value="994d7962-667c-476a-916e-cfd0b1b07bb9">
                    Ford
                  </option>
                  <option value="023800e5-d8ec-4a69-8009-7f00f887ac56">
                    Forest Bank
                  </option>
                  <option value="95942bd0-f52d-4bb2-859a-22a9f1902170">
                    Foston Hall
                  </option>
                  <option value="bba2e2ab-2bf3-4d07-ab2c-180c1810ac2a">
                    Frankland
                  </option>
                  <option value="5416648c-f847-4ed5-b946-164137b83c16">
                    Full Sutton
                  </option>
                  <option value="c63b86f0-164a-46b5-a60b-838fdcd8e654">
                    Garth
                  </option>
                  <option value="e82d733f-1b30-4443-ae00-3a8faa59d972">
                    Gartree
                  </option>
                  <option value="645137e2-c759-43e7-9658-e5721cafd19b">
                    Glen Parva
                  </option>
                  <option value="a34dab65-8122-4d1a-9202-8ec6b6253972">
                    Grendon
                  </option>
                  <option value="e9026566-9534-410a-b95c-10afab815eff">
                    Guys Marsh
                  </option>
                  <option value="ee6155b8-15e0-4a72-bb1c-15ae8a9adfba">
                    Hatfield Lakes
                  </option>
                  <option value="a7b45262-1d3c-40ed-9268-2943b793d820">
                    Hatfield Open
                  </option>
                  <option value="972248dc-5bf6-4850-958b-671afbe47c96">
                    Haverigg
                  </option>
                  <option value="5d5f59b5-f098-440d-b077-0e39959f9520">
                    Hewell
                  </option>
                  <option value="a7846b24-8d42-426d-a3be-00201f3a9310">
                    High Down
                  </option>
                  <option value="9d2cd08e-40ab-47fb-acde-ac29d8b5acca">
                    Highpoint North
                  </option>
                  <option value="e6475923-20e7-46ab-a712-683c763b4111">
                    Highpoint South
                  </option>
                  <option value="188d6893-1d99-47b5-97c8-7cc8b8f5f5bc">
                    Hindley
                  </option>
                  <option value="1656433d-202c-4813-8b37-51b2cee5e23e">
                    Hollesley Bay Open
                  </option>
                  <option value="0da0a4ef-3c27-4757-af96-ead3a0279cb9">
                    Holloway
                  </option>
                  <option value="d7639ae5-2958-4014-bcaf-1da203aeb181">
                    Holme House
                  </option>
                  <option value="dfd59c84-bd5c-42af-bfb6-981d3666b34d">
                    Hull
                  </option>
                  <option value="80a9b440-3389-4bb9-b79c-16af28749007">
                    Humber
                  </option>
                  <option value="439deefb-ebd3-4bb2-bcb2-e8001cf5230b">
                    Huntercombe
                  </option>
                  <option value="2de4b50f-ca75-42dc-ae41-8dadf7ad1bcc">
                    Isis
                  </option>
                  <option value="354d4e57-e96e-4681-9a49-78c113fc7aea">
                    Isle of Wight
                  </option>
                  <option value="a5f40452-3987-4e69-8a5c-f93ba17d5749">
                    Kennet
                  </option>
                  <option value="e30cc924-c633-4c70-9571-b15976fe3f9e">
                    Kirkham
                  </option>
                  <option value="caf238ef-36b0-4e6b-837d-b16308b47ab4">
                    Kirklevington Grange
                  </option>
                  <option value="fa93becf-5d7c-4710-9b4e-57f13ee3d035">
                    Lancaster Farms
                  </option>
                  <option value="8076d43d-429d-4e19-aac1-178ff9d112d3">
                    Leeds
                  </option>
                  <option value="bf29bf0f-a046-43d1-911b-59ac58730eff">
                    Leicester
                  </option>
                  <option value="531fdc8a-2b45-4aab-8a00-a62e07fcfbd6">
                    Lewes
                  </option>
                  <option value="612a8189-e802-4c1e-b56f-d2e5618337c2">
                    Leyhill
                  </option>
                  <option value="b9c79240-df23-4487-8497-6ffbb638fa0f">
                    Lincoln
                  </option>
                  <option value="29419c4e-f1bc-465f-b5ed-e657879ba492">
                    Lindholme
                  </option>
                  <option value="23080b5e-8db0-4bf0-8d59-a6f1b8025cc7">
                    Littlehey
                  </option>
                  <option value="978c6a01-7fee-4495-8457-0364278de827">
                    Liverpool (Closed only)
                  </option>
                  <option value="c11cc98d-6234-4f16-8f8c-2dea50686fc2">
                    Liverpool Social Visits
                  </option>
                  <option value="480e61ef-069a-445e-ac9b-38d208e90dba">
                    Long Lartin
                  </option>
                  <option value="979a524f-6719-419d-9bf4-c9ed2514b345">
                    Lowdham Grange
                  </option>
                  <option value="4ea7b4bd-b088-4b9b-a1aa-4791cc1ceed5">
                    Low Newton
                  </option>
                  <option value="2e49e71e-6f1c-4b75-8d98-4e9719ef25b5">
                    Maidstone
                  </option>
                  <option value="b73b5c8a-879b-43d3-ae2e-7aa19b745832">
                    Manchester
                  </option>
                  <option value="4096d43d-f9b5-4597-afee-5f89b4e65892">
                    Medway Secure Training Centre
                  </option>
                  <option value="51826eb7-2430-4c0d-8c99-98a767c001d8">
                    Moorland Closed
                  </option>
                  <option value="332fc3de-2744-469e-b97b-b2100a68eaa1">
                    Morton Hall
                  </option>
                  <option value="3d523cf8-4391-4190-b8cc-26b794af4502">
                    New Hall
                  </option>
                  <option value="e118f115-ba46-4901-a7d0-9dd5dca3a25e">
                    North Sea Camp
                  </option>
                  <option value="ed268add-b610-44e4-91b4-4e303eb63ab7">
                    Northumberland
                  </option>
                  <option value="0c4a9a66-e892-479b-9881-9e85229f21ca">
                    Norwich (A, B, C, E, M only)
                  </option>
                  <option value="c861eb28-60ca-4686-97fb-578792cc3365">
                    Norwich (Britannia House)
                  </option>
                  <option value="ca2af3e4-574d-4b5c-ae33-f780851e1641">
                    Norwich (F, G, H, L only)
                  </option>
                  <option value="cdf64ca2-fb20-427e-bd34-0226d858d92c">
                    Nottingham
                  </option>
                  <option value="6b8a2731-9729-4bc6-a4d5-66cbe27b124f">
                    Oakwood
                  </option>
                  <option value="bf02ceac-2957-408c-83d8-0ced05e2da5b">
                    Onley
                  </option>
                  <option value="c4c676e7-91b2-4c43-897f-017d3eff18e6">
                    Parc
                  </option>
                  <option value="5f4f2131-32d6-44be-b715-76bcb561f985">
                    Pentonville
                  </option>
                  <option value="a247b47c-04a8-421b-af25-b7c90d115050">
                    Peterborough
                  </option>
                  <option value="8564f563-41d6-43bf-9073-826d10ff6229">
                    Portland
                  </option>
                  <option value="8fcf570c-3562-4b01-9a0b-26b1c461c50d">
                    Prescoed
                  </option>
                  <option value="dc4b9a8e-a599-442e-9797-3f73ab3a1205">
                    Preston
                  </option>
                  <option value="004cfe9e-2da2-4db2-8d6e-9a2853f957f1">
                    Ranby
                  </option>
                  <option value="104411ba-3b6b-496e-b28d-902029b90bee">
                    Risley
                  </option>
                  <option value="f977ed70-3ad8-4a2f-99f9-9ce13fb5755f">
                    Rochester
                  </option>
                  <option value="54c87209-d7fd-4824-b724-2bda32e43c66">
                    Rye Hill
                  </option>
                  <option value="be40f125-e57f-45e9-a09e-56d4198a9279">
                    Send
                  </option>
                  <option value="e1811066-0ec3-4cf8-bb4c-6e516505eb39">
                    Spring Hill
                  </option>
                  <option value="07d7656b-3508-4487-81e3-2e0473d7530b">
                    Stafford
                  </option>
                  <option value="cfb09d82-c423-4423-93cf-48566ed4fcc3">
                    Standford Hill
                  </option>
                  <option value="d518d142-a77a-4a43-bffa-67bfa153b43a">
                    Stocken
                  </option>
                  <option value="e267e824-23e1-418c-9840-25292cac3684">
                    Stoke Heath
                  </option>
                  <option value="09bb3094-0e0f-4b40-9ba9-bcc132d54d1d">
                    Styal
                  </option>
                  <option value="f18ca4d5-8cdc-4aa0-97e6-83d04e1e983c">
                    Sudbury
                  </option>
                  <option value="d7a1e575-ef4e-4bb1-90d5-24690e7abb26">
                    Swaleside
                  </option>
                  <option value="7f71f041-11d0-4df2-958c-819940504fd3">
                    Swansea
                  </option>
                  <option value="8043fea1-5d62-4089-8e5f-3d82810e4cca">
                    Swinfen Hall
                  </option>
                  <option value="8ac2641a-77dd-4c82-99ac-4201b2c85711">
                    Thameside
                  </option>
                  <option value="b02c92f4-e182-44d5-80cd-fe51c87ac6fb">
                    The Mount
                  </option>
                  <option value="753cde18-d683-4fb2-ab2f-db7c4df3fd7b">
                    The Verne
                  </option>
                  <option value="89f59683-9046-41f0-822e-ae6bc7af1e43">
                    Thorn Cross
                  </option>
                  <option value="664ca96b-b4c9-4602-8fbe-cef5218c455e">
                    Usk
                  </option>
                  <option value="c4911d6d-13cd-4aa8-9d2d-b58e1b7c4ddc">
                    Wakefield
                  </option>
                  <option value="94b5d77f-9ea6-449f-a24c-afa09433fe3b">
                    Wandsworth
                  </option>
                  <option value="7e9bf425-888c-433f-a2e3-3609b624b59b">
                    Warren Hill
                  </option>
                  <option value="402e24d0-4b5e-4e85-ae8f-2b926264011d">
                    Wayland
                  </option>
                  <option value="4a84169b-2281-4746-aa63-56dc18e12f56">
                    Wealstun
                  </option>
                  <option value="f7c5df56-0670-474e-9ec4-42e8a9d9804c">
                    Werrington
                  </option>
                  <option value="0350d16f-76fd-425d-887b-7bdb5bb4ced5">
                    Wetherby
                  </option>
                  <option value="a7236b97-f89c-4f6b-9aea-1703bc0e60f0">
                    Whatton
                  </option>
                  <option value="c4add3de-f28a-41b4-b847-a69f1f3dc1a9">
                    Whitemoor
                  </option>
                  <option value="ea94276d-b563-4e15-8140-9676a48ca528">
                    Winchester (Convicted only)
                  </option>
                  <option value="a37cdb69-690c-482e-9a21-9379f7ccc35d">
                    Winchester (Remand only)
                  </option>
                  <option value="a85c970a-c3fd-4974-9b2d-e1c0a2afd586">
                    Wolds
                  </option>
                  <option value="4855bb0f-b053-42a7-9564-c89fc8a2ddf0">
                    Woodhill
                  </option>
                  <option value="945accc1-c6aa-49ca-9df3-b48693cd937e">
                    Wormwood Scrubs
                  </option>
                  <option value="8484479f-f7f5-4002-a748-38d68b1bf43d">
                    Wymott
                  </option>
                </Select>
            </FormGroup>
            <FormGroup>
              <Button
                onClick={handleSubmit}
              >Continue</Button>
            </FormGroup>
          </Fieldset>
        </GridCol>
      </GridRow>

    </Page>
      
  );
}
