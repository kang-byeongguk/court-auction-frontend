// src/pages/Detail.jsx

import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { formatDate, formatPrice } from "../functions/functions";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import "./Detail.css";

function Detail() {
  const { id } = useParams();
  const url = useSelector((state) => state.url);

  // useQuery로 API 호출 (id는 숫자로 변환)
  const { data: item, isLoading, error } = useQuery({
    queryKey: ["detail", id, url],
    queryFn: async () => {
      const numericId = Number(id);
      const response = await axios.get(url + "detail/" + numericId);
      return response.data;
    },
    enabled: !!url,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  const {
    jwn_lst,            // 법원정보
    case_num,           // 사건번호
    property_num,       // 물건번호
    property_type,      // 물건종류
    appraisal_val,      // 감정가
    minimum_sale_prc,   // 최저매각가격
    bidding_method,     // 매각방법
    sale_date,          // 매각기일
    prprty_notes,       // 비고

    case_filing_date,   // 소송 접수일
    auction_strt_date,  // 경매 시작일
    dmnd_date,          // 배당요구종기일
    claim_amt,          // 청구금액

    // 그 외
    location,           // 건물위치
    responsible_total,  // 경매계
    due_dates,          // 매각기일 정보 리스트
    case_details,       // 세부 정보 리스트
  } = item;

  return (
    <main className="detail-container">
      {/* 기본정보 섹션 */}
      <section>
        <h4 className="section-title">기본정보</h4>
        <hr />
        {/* 3×3 표 (법원정보 ~ 비고) */}
        <table className="detail-table">
          <tbody>
            <tr>
              <th>법원정보</th>
              <td>{jwn_lst}</td>
              <th>사건번호</th>
              <td>{case_num}</td>
              <th>물건번호</th>
              <td>{property_num}</td>
            </tr>
            <tr>
              <th>물건종류</th>
              <td>{property_type}</td>
              <th>감정가</th>
              <td>{appraisal_val ? formatPrice(appraisal_val) : ""}</td>
              <th>최저매각가격</th>
              <td>{minimum_sale_prc ? formatPrice(minimum_sale_prc) : ""}</td>
            </tr>
            <tr>
              <th>매각방법</th>
              <td>{bidding_method}</td>
              <th>매각기일</th>
              <td>{sale_date ? formatDate(sale_date) : ""}</td>
              <th>비고</th>
              <td>{prprty_notes}</td>
            </tr>
          </tbody>
        </table>

        {/* 2×2 표 (소송접수일 ~ 청구금액) */}
        <table className="detail-table">
          <tbody>
            <tr>
              <th>소송 접수일</th>
              <td>{case_filing_date ? formatDate(case_filing_date) : ""}</td>
              <th>경매 시작일</th>
              <td>{auction_strt_date ? formatDate(auction_strt_date) : ""}</td>
            </tr>
            <tr>
              <th>배당요구종기일</th>
              <td>{dmnd_date ? formatDate(dmnd_date) : ""}</td>
              <th>청구금액</th>
              <td>{claim_amt ? formatPrice(claim_amt) : ""}</td>
            </tr>
          </tbody>
        </table>
        <table className="detail-table">
          <tbody>
            <tr>
              <th>건물위치</th>
              <td>{location}</td>
            </tr>
            <tr>
              <th style={{width:'100px'}}>경매계</th>
              <td>{responsible_total}</td>
            </tr>
          </tbody>
        </table>

      </section>

      {/* 경매정보 섹션 */}
      <section className="section">
        <h4 className="section-title">경매정보</h4>
        <hr />
        {due_dates && due_dates.length > 0 && (
          <table className="detail-table">
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
      </section>

      {/* 세부정보 섹션 */}
      <section className="section">
        <h4 className="section-title">세부정보</h4>
        <hr />
        {case_details && case_details.length > 0 && (
          <table className="detail-table case-details-table">
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
      </section>
    </main>
  );
}

export default Detail;
