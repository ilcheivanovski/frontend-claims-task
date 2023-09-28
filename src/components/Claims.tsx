import useSWR, { mutate } from "swr";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";

import { deleteAsync, postJsonAsync } from "../services/api";
import {
  HeaderRow,
  NewClaimContainer,
  Row,
  SubmitButton,
  Table,
  Wrapper,
} from "../styles-components/components/Claims";
import InputField from "../common/InputField";
import { Cover } from "./Covers";
import { SelectInputField } from "../common/Select";
import { CLAIMS, CLAIM_TYPES, COVERS } from "../constants/constants";

interface Claim {
  id: string;
  name: string;
  type: { name: string; value: string };
  coverId: { name: string; value: string };
  created: string;
  damageCost: number;
}

const ClaimsSchema = object().shape({
  name: string().required("Name is required.").max(25),
  type: object().required("Type is required."),
  coverId: object().required("coverId is required."),
  damageCost: number()
    .typeError("Damage Cost must be a number")
    .max(100000, "Damage Cost cannot exceed 100.000")
    .required("Damage Cost is required"),
});

export const Claims = () => {
  const { data } = useSWR(CLAIMS);
  const { data: coverData } = useSWR(COVERS);

  const covers: Cover[] = coverData?.covers;
  const claims = data?.claims;

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
          type: { name: "", value: "" },
          coverId: { name: "", value: "" },
          created: "",
          damageCost: 0,
        }}
        validationSchema={ClaimsSchema}
        validateOnMount={true}
        onSubmit={async (values: Claim) => {
          console.log({ values });
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
          <NewClaimContainer>
            <InputField label="Name" id="name" name="name" />
            <SelectInputField
              label="Type"
              id="type"
              name="type"
              options={CLAIM_TYPES?.map((c) => ({ value: c, label: c }))}
            />
            <InputField
              label="Cost"
              id="cost"
              name="damageCost"
              type="number"
            />
            <SelectInputField
              label="CoverId"
              id="coverId"
              name="coverId"
              options={covers?.map((c) => ({ value: c.id, label: c.id }))}
            />
            <SubmitButton type="submit">Submit new Claim</SubmitButton>
          </NewClaimContainer>
        </Form>
      </Formik>
      {!hasClaims && <div>No Claims Found</div>}
      {hasClaims && (
        <Table>
          <HeaderRow>
            <div>Name</div>
            <div>Type</div>
            <div>Cost</div>
            <div>CoverId</div>
            <div>Created</div>
            <div>Delete</div>
          </HeaderRow>
          {claims.map((claim: any) => (
            <Row key={claim.id}>
              <div>{claim.name}</div>
              <div>{claim.type}</div>
              <div>{claim.damageCost}</div>
              <div>{claim.coverId}</div>
              <div>{claim.created}</div>
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
        </Table>
      )}
    </Wrapper>
  );
};
