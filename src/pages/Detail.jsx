// src/pages/Detail.jsx

import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { formatDate, formatPrice } from "../functions/functions";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

function Detail() {
  const { id } = useParams();
  const url = useSelector((state) => state.url);

  // 디버깅: 넘어온 id와 API endpoint 확인
  console.log("Detail 페이지 id:", id);
  console.log("API endpoint:", url + "detail/" + id);

  const { data: item, isLoading, error } = useQuery({
    queryKey: ["detail", id, url],
    queryFn: async () => {
      // useParams()가 문자열을 반환하므로, 숫자로 변환하여 API에 요청합니다.
      const numericId = Number(id);
      const response = await axios.get(url + "detail/" + numericId);
      return response.data;
    },
    enabled: !!url,                  // url이 유효할 때만 쿼리 실행
    refetchOnWindowFocus: false,       // 브라우저 포커스 시 자동 재요청 비활성화
    refetchOnReconnect: false,         // 네트워크 재연결 시 자동 재요청 비활성화
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  // API 응답 데이터를 구조 분해 할당
  const {
    jwn_lst,
    case_num,
    property_num,
    property_type,
    appraisal_val,
    minimum_sale_prc,
    bidding_method,
    sale_date,
    prprty_notes,
    location,
    responsible_total,
    case_filing_date,
    auction_strt_date,
    dmnd_date,
    claim_amt,
    due_dates,
    case_details,
  } = item;

  return (
    <div style={{ margin: "2rem" }}>
      {/* 기본정보 */}
      <div>
        <h4>기본정보</h4>
        <hr />
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
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
              <td>{appraisal_val ? formatPrice(appraisal_val) : ""}</td>
            </tr>
            <tr>
              <th>최저매각가격</th>
              <td>{minimum_sale_prc ? formatPrice(minimum_sale_prc) : ""}</td>
            </tr>
            <tr>
              <th>매각방법</th>
              <td>{bidding_method}</td>
            </tr>
            <tr>
              <th>매각기일</th>
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
              <td>{claim_amt ? formatPrice(claim_amt) : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 경매정보 */}
      <div style={{ marginTop: "2rem" }}>
        <h4>경매정보</h4>
        <hr />
        {due_dates && due_dates.length > 0 && (
          <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
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
                  <td>{due.due_date_loc}</td>
                  <td>{due.due_date_min_prc}</td>
                  <td>{due.due_date_rst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 세부정보 */}
      <div style={{ marginTop: "2rem" }}>
        <h4>세부정보</h4>
        <hr />
        {case_details && case_details.length > 0 && (
          <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
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
          </table>
        )}
      </div>
    </div>
  );
}

export default Detail;
