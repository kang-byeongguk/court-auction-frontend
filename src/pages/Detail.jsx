import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Table, Container, Row, Col } from "react-bootstrap";
import { formatDate, formatPrice } from "../functions/functions";

function Detail() {
  const { id } = useParams(); 
  // 아직은 id를 사용하지 않고, 임시로 1로 고정할 수도 있습니다.
  // 실제로는 `http://127.0.0.1:8000/detail/${id}` 같은 식으로 동적 처리할 예정이겠죠.

  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // detail/1 주소로 GET 요청
    // (id 값이 있을 경우는 detail/${id} 로 변경)
    axios
      .get("http://127.0.0.1:8000/detail/1")
      .then((response) => {
        setItem(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

  // 로딩 중 또는 에러 시 간단 처리
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  if (!item) return <div>로딩 중...</div>;

  // item이 정상적으로 존재하면 구조분해 할당
  const {
    jwn_lst,               // 법원정보
    case_num,              // 사건번호
    property_num,          // 물건번호
    property_type,         // 물건종류
    appraisal_val,         // 감정가
    minimum_sale_prc,      // 최저매각가격
    bidding_method,        // 매각방법
    sale_date,             // 매각기일
    prprty_notes,          // 비고
    location,              // 건물위치
    responsible_total,     // 경매계/담당법원 정보
    case_filing_date,      // 소송 접수일
    auction_strt_date,     // 경매 시작일
    dmnd_date,             // 배당요구종기일
    claim_amt,             // 청구금액
    due_dates,             // 경매정보 (배열)
    case_details           // 세부정보 (배열)
  } = item;


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
                <td>{jwn_lst}</td>
              </tr>
              <tr>
                <th>사건번호</th>
                <td>{case_num}</td>
              </tr>
              <tr>
                <th>물건번호</th>
                <td>{property_num}</td>
              </tr>
              <tr>
                <th>물건종류</th>
                <td>{property_type}</td>
              </tr>
              <tr>
                <th>감정가</th>
                <td>
                  {appraisal_val
                    ? formatPrice(appraisal_val)
                    : ""}
                </td>
              </tr>
              <tr>
                <th>최저매각가격</th>
                <td>
                  {minimum_sale_prc
                    ? formatPrice(minimum_sale_prc)
                    : ""}
                </td>
              </tr>
              <tr>
                <th>매각방법</th>
                <td>{bidding_method}</td>
              </tr>
              <tr>
                <th>매각기일</th>
                {/* 예: 2025-01-15T10:00:00Z => slice(0, 10) => 2025-01-15 */}
                <td>{sale_date ? formatDate(sale_date) : ""}</td>
              </tr>
              <tr>
                <th>비고</th>
                <td>{prprty_notes}</td>
              </tr>
              <tr>
                <th>건물위치</th>
                <td>{location}</td>
              </tr>
              <tr>
                <th>경매계</th>
                <td>{responsible_total}</td>
              </tr>
              <tr>
                <th>소송 접수일</th>
                <td>{case_filing_date ? formatDate(case_filing_date) : ""}</td>
              </tr>
              <tr>
                <th>경매 시작일</th>
                <td>{auction_strt_date ? formatDate(auction_strt_date) : ""}</td>
              </tr>
              <tr>
                <th>배당요구종기일</th>
                <td>{dmnd_date ? formatDate(dmnd_date) : ""}</td>
              </tr>
              <tr>
                <th>청구금액</th>
                <td>
                  {claim_amt
                    ? formatPrice(claim_amt)
                    : ""}
                </td>
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
                    {/* 문자열 형태 "2023.04.26 (10:00)" 이므로 추가 가공 없이 그대로 */}
                    <td>{due.due_date}</td>
                    <td>{due.due_date_type}</td>
                    <td>{due.due_date_loc}</td>
                    <td>{due.due_date_min_prc}</td>
                    <td>{due.due_date_rst}</td>
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
          {/* case_details 배열 */}
          {case_details && case_details.length > 0 && (
            <Table bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>리스트번호</th>
                  <th style={{ width: "20%" }}>종류</th>
                  <th style={{ width: "70%" }}>세부 내용</th>
                </tr>
              </thead>
              <tbody>
                {case_details.map((detail, idx) => (
                  <tr key={idx}>
                    <td>{detail.lst_num}</td>
                    <td>{detail.lst_ctgry}</td>
                    <td>{detail.lst_dtls}</td>
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
