import useSWR, { mutate } from "swr";
import { Form, Formik } from "formik";
import { date, object, ref, string } from "yup";

import { deleteAsync, postJsonAsync } from "../services/api";
import {
  HeaderRow,
  Wrapper,
  Row,
  Container,
  SubmitButton,
  Table,
} from "../styles-components/components/Claims";
import InputField from "../common/InputField";
import { ToDateOnly as toDateOnly } from "../utils/utils";
import { COVERS, COVER_TYPES } from "../constants/constants";
import { SelectInputField } from "../common/Select";

export interface Cover {
  id: string;
  startDate: string;
  endDate: string;
  type?: { name: string; value: string };
  premium: number;
}

const CoversSchema = object().shape({
  startDate: date()
    .required("Start Date is required")
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      "Start Date cannot be in the past"
    )
    .test(
      "one-year-difference",
      "Date range cannot exceed one year",
      function (value) {
        const startDate = new Date(value);
        const endDate = new Date(this.parent.endDate);

        const oneYearFromStartDate = new Date(startDate);
        oneYearFromStartDate.setFullYear(startDate.getFullYear() + 1);

        return endDate <= oneYearFromStartDate;
      }
    ),
  endDate: string().required("End date is required."),
  type: object().required("Type is required."),
  premium: string().required("Premium is required."),
});

export const Covers = () => {
  const { data } = useSWR(COVERS);
  const { data: coverTypesResponse } = useSWR(COVER_TYPES);

  const covers = data?.covers;
  const coverTypes: string[] = coverTypesResponse || [];

  if (!covers) return <span>Loading...</span>;

  const hasCovers = covers.length > 0;

  return (
    <Wrapper>
      <Formik
        initialValues={{
          id: "",
          startDate: "",
          endDate: "",
          type: undefined,
          premium: 0,
        }}
        onSubmit={async (values: Cover) => {
          const payload = {
            ...values,
            type: values?.type?.value,
            startDate: toDateOnly(new Date(values.startDate)),
            endDate: toDateOnly(new Date(values.endDate)),
          };
          await postJsonAsync(COVERS, payload);
          mutate(COVERS);
        }}
        validationSchema={CoversSchema}
        validateOnMount={true}
      >
        <Form>
          <Container>
            <InputField
              id="startDate"
              label="Start Date"
              name="startDate"
              type="date"
            />
            <InputField
              id="endDate"
              label="End Date"
              name="endDate"
              type="date"
            />
            <SelectInputField
              label="Type"
              id="type"
              name="type"
              options={coverTypes?.map((c) => ({ value: c, label: c }))}
            />
            <InputField
              id="premium"
              label="Premium"
              name="premium"
              type="number"
            />
            <SubmitButton type="submit">Submit new Cover</SubmitButton>
          </Container>
        </Form>
      </Formik>
      {!hasCovers && <div>No Covers Found</div>}
      {hasCovers && (
        <Table>
          <HeaderRow>
            <div>ID</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Type</div>
            <div>Premium</div>
            <div>Delete</div>
          </HeaderRow>

          {covers.map((cover: any) => (
            <Row key={cover.id}>
              <div>{cover.id}</div>
              <div>{new Date(cover.startDate).toLocaleDateString()}</div>
              <div>{new Date(cover.endDate).toLocaleDateString()}</div>
              <div>{cover.type}</div>
              <div>{cover.premium}</div>
              <div>
                <button
                  type="button"
                  onClick={async () => await deleteAsync(`Covers/${cover.id}`)}
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
