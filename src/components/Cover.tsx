import { useNavigate, useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";

import { deleteAsync } from "../services/api";
import {
  HeaderRow,
  Wrapper,
  Row,
  Table,
} from "../styles-components/components/Claims";
import { Cover } from "../interfaces/models";

export const CoverPage = () => {
  const { coverId } = useParams();
  const navigate = useNavigate();
  const { data: cover } = useSWR<Cover>(`Covers/${coverId}`);

  if (!cover) return <span>Loading...</span>;

  const hasCover = !!cover;

  return (
    <Wrapper>
      {!hasCover && <div>No Cover Found</div>}
      {hasCover && (
        <Table>
          <HeaderRow>
            <div>ID</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Type</div>
            <div>Premium</div>
            <div>Delete</div>
          </HeaderRow>

          <Row key={cover.id}>
            <div>{cover.id}</div>
            <div>{new Date(cover.startDate).toLocaleDateString()}</div>
            <div>{new Date(cover.endDate).toLocaleDateString()}</div>
            <div>{cover.type}</div>
            <div>{cover.premium}</div>
            <div>
              <button
                type="button"
                onClick={async () => {
                  await deleteAsync(`Covers/${cover.id}`);
                  navigate("/covers");
                }}
              >
                Delete
              </button>
            </div>
          </Row>
        </Table>
      )}
    </Wrapper>
  );
};
