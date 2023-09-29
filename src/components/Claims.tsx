import useSWR, { mutate } from "swr";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import { useNavigate } from "react-router-dom";

import { deleteAsync, postJsonAsync } from "../services/api";
import {
  HeaderRow,
  Container,
  Row,
  SubmitButton,
  Wrapper,
  ClaimTable,
} from "../styles-components/components/Claims";
import InputField from "../common/InputField";
import { SelectInputField } from "../common/Select";
import { CLAIMS, CLAIM_TYPES, COVERS } from "../constants/constants";
import { Claim, ClaimModel, Cover } from "../interfaces/models";

export const ClaimsSchema = object().shape({
  name: string().required("Name is required.").max(25),
  type: object().test(
    "type-required",
    "Type is required",
    function (value: any) {
      if (!value?.label || !value?.value) {
        return false;
      } else {
        return true;
      }
    }
  ),
  coverId: object().test(
    "coverId-required",
    "CoverId is required",
    function (value: any) {
      if (!value?.label || !value?.value) {
        return false;
      } else {
        return true;
      }
    }
  ),
  damageCost: number()
    .typeError("Damage Cost must be a number")
    .min(1, "Must bigger that 0")
    .max(100000, "Damage Cost cannot exceed 100.000")
    .required("Damage Cost is required"),
});

export const ClaimsPage = () => {
  const navigate = useNavigate();
  const { data } = useSWR(CLAIMS);
  const { data: coverData } = useSWR(COVERS);
  const { data: claimTypesResponse } = useSWR(CLAIM_TYPES);

  const covers: Cover[] = coverData?.covers;
  const claims: Claim[] = data?.claims;
  const claimTypes: string[] = claimTypesResponse || [];

  if (!claims) {
    return <span>Loading...</span>;
  }

  const hasClaims = claims.length > 0;

  return (
    <Wrapper>
      <Formik
        initialValues={{
          id: "",
          name: "",
          type: { label: "", value: "" },
          coverId: { label: "", value: "" },
          created: "",
          damageCost: 1,
        }}
        validationSchema={ClaimsSchema}
        validateOnMount={true}
        onSubmit={async (values: ClaimModel) => {
          const payload = {
            ...values,
            coverId: values.coverId.value,
            type: values.type.value,
            created: new Date().toISOString(),
          };

          await postJsonAsync("Claims", payload);
          mutate(CLAIMS);
        }}
      >
        <Form>
          <Container>
            <InputField label="Name" id="name" name="name" data-testid="name" />
            <SelectInputField
              label="Type"
              id="type"
              name="type"
              options={claimTypes?.map((c) => ({ value: c, label: c }))}
            />
            <InputField
              data-testid="cost"
              label="Cost"
              id="cost"
              name="damageCost"
              type="number"
            />
            <SelectInputField
              data-testid="coverId"
              label="CoverId"
              id="coverId"
              name="coverId"
              options={covers?.map((c) => ({ value: c.id, label: c.id }))}
            />
            <SubmitButton type="submit">Submit new Claim</SubmitButton>
          </Container>
        </Form>
      </Formik>
      {!hasClaims && <div>No Claims Found</div>}
      {hasClaims && (
        <ClaimTable>
          <HeaderRow>
            <div>Name</div>
            <div>Type</div>
            <div>Cost</div>
            <div>CoverId</div>
            <div>Created</div>
            <div>Cover</div>
            <div>Delete</div>
          </HeaderRow>
          {claims.map((claim: any) => (
            <Row key={claim.id}>
              <div>{claim.name}</div>
              <div>{claim.type}</div>
              <div>{claim.damageCost}</div>
              <div>{claim.coverId}</div>
              <div>{new Date(claim.created).toLocaleDateString()}</div>
              <div>
                <button
                  type="button"
                  onClick={async () => {
                    navigate(`/covers/${claim.coverId}`);
                  }}
                >
                  Cover
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={async () => {
                    await deleteAsync(`Claims/${claim.id}`);
                    mutate(CLAIMS);
                  }}
                >
                  Delete
                </button>
              </div>
            </Row>
          ))}
        </ClaimTable>
      )}
    </Wrapper>
  );
};
