import styled from "styled-components";
import DataTableProfile from "../components/DataTable/DataTableProfile";
import ViewProfile from "../components/ViewProfile/ViewProfile";

import { Card, LineCard } from "../components/UI/Card";
import { balihai } from "../utils/color";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { httpGetRequest } from "../utils/fetch";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);

  const { user } = useSelector((state) => state);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  const theaders = [
    "วันที่",
    "รายละเอียด",
    "จำนวนการจองซื้อหุ้นเพิ่มทุน",
    "สิทธิเพิ่มเติม",
    "มูลค่าการจองซื้อ",
    "สถานะรายการ",
  ];

  async function fetchDataTable() {
    setIsFetching(true);
    let endpoint = `orders?customerId=${user.customerId}`;

    const [res, status] = await httpGetRequest(endpoint);
    const { totalPages } = res["_metadata"];

    setTotalPages(totalPages);
    setData(res["data"]);
    setIsFetching(false);
  }

  async function fetchDataProfile() {
    let endpoint = `masterCustomers/${user.customerId}`;

    const [res, status] = await httpGetRequest(endpoint);
    setProfile(res["data"]);
  }

  useEffect(() => {
    fetchDataTable();
    fetchDataProfile();
    //fetchDataNews();
  }, []);

  return (
    <Card>
      <Container>
        <OverviewSection>
          <LineCard>
            <ViewProfile header="ข้อมูลทั่วไปของท่าน" profile={profile} />
          </LineCard>
        </OverviewSection>

        <TableSection>
          <LineCard>
            <div className="table-detail">
              <DataTableProfile
                header="รายการจองซื้อของท่าน"
                theaders={theaders}
                data={data}
                refreshData={fetchDataTable}
                isFetching={isFetching}
              />
            </div>
          </LineCard>
        </TableSection>
      </Container>
    </Card>
  );
};
export default Dashboard;

const Container = styled.div`
  padding: 20px 20px;
  height: 90vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;

  section {
    margin: 10px 0;
  }

  /* For Mobile */
  @media screen and (max-width: 540px) {
    width: 90vw;
  }

  /* For Tablets */
  @media screen and (min-width: 541px) and (max-width: 880px) {
    width: 90vw;
  }
`;

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > :first-child {
    flex-grow: 2;
    margin-left: 10px;
  }
  h3 {
    font-weight: 400;
  }
  .search {
    display: flex;
    > :last-child {
      margin-left: 10px;
    }
  }
  .date {
    color: ${balihai};
  }
`;

const OverviewSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  > :not(:first-child) {
    margin-left: 10px;
  }
  div {
    display: flex;
  }
`;

const TableSection = styled.section`
  /* background-color: lightblue; */
  height: 100%;
  display: flex;
`;
