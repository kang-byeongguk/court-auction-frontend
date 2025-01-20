import React from "react";
import { useParams } from "react-router";
import { Table, Container, Row, Col } from "react-bootstrap";

function Detail({ data }) {
  const { id } = useParams();
  const item = data.find((el) => el.basic_info.property_number === id);

  // 혹시 item이 없을 경우
  if (!item) {
    return <div>해당 물건을 찾을 수 없습니다.</div>;
  }

  const { basic_info, due_dates, details } = item;

  return (
    <Container style={{ marginTop: "2rem" }}>
      {/* 기본정보 */}
      <Row>
        <Col>
          <h4>기본정보</h4>
          <hr />
          <Table bordered hover>
            <tbody>
              <tr>
                <th style={{ width: "30%" }}>법원정보</th>
                <td>{basic_info.court_name}</td>
              </tr>
              <tr>
                <th>사건번호</th>
                <td>{basic_info.case_number}</td>
              </tr>
              <tr>
                <th>물건번호</th>
                <td>{basic_info.property_number}</td>
              </tr>
              <tr>
                <th>물건종류</th>
                <td>{basic_info.property_type}</td>
              </tr>
              <tr>
                <th>감정가</th>
                <td>{basic_info.appraisal_value?.toLocaleString()} 원</td>
              </tr>
              <tr>
                <th>최저매각가격</th>
                <td>{basic_info.minimum_sale_price?.toLocaleString()} 원</td>
              </tr>
              <tr>
                <th>매각방법</th>
                <td>{basic_info.bidding_method}</td>
              </tr>
              <tr>
                <th>매각기일</th>
                <td>{basic_info.sale_date}</td>
              </tr>
              <tr>
                <th>비고</th>
                <td>{basic_info.property_notes}</td>
              </tr>
              <tr>
                <th>건물위치</th>
                <td>
                  {/* locations 배열이 있을 경우 join 등을 이용해 표시 */}
                  {basic_info.locations && basic_info.locations.join(", ")}
                </td>
              </tr>
              <tr>
                <th>경매계</th>
                <td>{basic_info.responsible}</td>
              </tr>
              <tr>
                <th>소송 접수일</th>
                <td>{basic_info.case_filing_date}</td>
              </tr>
              <tr>
                <th>경매 시작일</th>
                <td>{basic_info.auction_start_date}</td>
              </tr>
              <tr>
                <th>배당요구종기일</th>
                <td>{basic_info.dividend_demand_deadline}</td>
              </tr>
              <tr>
                <th>청구금액</th>
                <td>{basic_info.claim_amount?.toLocaleString()} 원</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* 경매정보 */}
      <Row style={{ marginTop: "2rem" }}>
        <Col>
          <h4>경매정보</h4>
          <hr />
          {/* due_dates는 배열이므로 여러 매각기일 정보를 보여줄 수 있습니다. */}
          {due_dates && due_dates.length > 0 && (
            <Table bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>매각기일</th>
                  <th style={{ width: "15%" }}>구분</th>
                  <th style={{ width: "30%" }}>매각장소</th>
                  <th style={{ width: "15%" }}>최저가격</th>
                  <th style={{ width: "20%" }}>결과</th>
                </tr>
              </thead>
              <tbody>
                {due_dates.map((due, idx) => (
                  <tr key={idx}>
                    <td>{due.due_date}</td>
                    <td>{due.due_date_type}</td>
                    <td>{due.due_date_location}</td>
                    <td>{due.minimum_price.toLocaleString()} 원</td>
                    <td>{due.result}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      {/* 세부정보 */}
      <Row style={{ marginTop: "2rem" }}>
        <Col>
          <h4>세부정보</h4>
          <hr />
          {/* details도 배열이므로 여러 건물/토지 표시 정보를 보여줄 수 있습니다. */}
          {details && details.length > 0 && (
            <Table bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>리스트번호</th>
                  <th style={{ width: "20%" }}>종류</th>
                  <th style={{ width: "70%" }}>세부 내용</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail, idx) => (
                  <tr key={idx}>
                    <td>{detail.list_number}</td>
                    <td>{detail.list_category}</td>
                    <td>{detail.list_details}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
