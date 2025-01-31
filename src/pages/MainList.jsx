// src/pages/MainList.jsx
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import { formatDate, formatPrice, getSaleStatus, truncateAddress } from '../functions/functions';

function MainList() {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);

  // 초기 로드 시 전체 데이터
  useEffect(() => {
    fetchFilteredData({});
  }, []);

  // 필터에 맞춰 서버 데이터 재요청
  const fetchFilteredData = async (filterParams) => {
    try {
      const { jwn_lst, property_type, only_not_expired } = filterParams;
      const nowTime = new Date().toISOString();

      const params = {
        jwn_lst: jwn_lst || undefined,
        property_type: property_type || undefined,
        only_not_expired: only_not_expired || undefined,
        now_time: only_not_expired ? nowTime : undefined,
      };

      const response = await axios.get('http://127.0.0.1:8000/list/', { params });
      // 주의: 서버 응답 구조에 맞춰 results나 data를 사용
      setListData(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FilterBar onFilter={fetchFilteredData} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>사건번호</th>
            <th>물건종류</th>
            <th>주소</th>
            <th>최저매각가격</th>
            <th>감정평가액</th>
            <th>매각기일</th>
            <th>담당법원</th>
          </tr>
        </thead>
        <tbody>
          {listData && listData.length > 0 ? (
            listData.map((item, idx) => {
              const saleDateForDisplay = formatDate(item.sale_date);
              const saleStatus = getSaleStatus(item.sale_date);
              return (
                <tr key={idx} onClick={() => navigate(`/detail/${item.id}`)}>
                  <td>{item.case_num}</td>
                  <td>{item.property_type}</td>
                  <td>{truncateAddress(item.location)}</td>
                  <td>{formatPrice(item.minimum_sale_prc)}</td>
                  <td>{formatPrice(item.appraisal_val)}</td>
                  <td>
                    {saleDateForDisplay}
                    {saleStatus === '마감후' && <span style={{ color: 'blue', marginLeft: 8 }}>마감후</span>}
                    {saleStatus === '마감전' && <span style={{ color: 'red', marginLeft: 8 }}>마감전</span>}
                  </td>
                  <td>{item.jwn_lst}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default MainList;
