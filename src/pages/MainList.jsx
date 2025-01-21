import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import { formatDate, formatPrice, getSaleStatus, truncateAddress } from '../functions/functions';



function MainList({data}) {
  const navigate = useNavigate();
  return (
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
        {data.map((item, index) => {
          // 날짜, 주소, 상태 관련 변환/포맷 처리
          const saleDate = formatDate(item.sale_date);
          const shortLocation = truncateAddress(item.location);
          const saleStatus = getSaleStatus(item.sale_date); // 7일 미만 시 마감임박

          return (
            <tr key={index} onClick={() => navigate('/detail/' + '1')}>
              <td>{item.case_num}</td>
              <td>{item.property_type}</td>
              <td>{shortLocation}</td>
              
              {/* 가격은 3자리 콤마 + '원' */}
              <td>{formatPrice(item.minimum_sale_prc)}</td>
              <td>{formatPrice(item.appraisal_val)}</td>
              
              <td>
                {saleDate}
                {/* 상태 표시 (매각완료 또는 마감임박) */}
                {saleStatus === '매각기일지남' && (
                  <span style={{ color: 'blue', marginLeft: 8 }}>매각기일지남</span>
                )}
                {saleStatus === '마감임박' && (
                  <span style={{ color: 'red', marginLeft: 8 }}>마감임박</span>
                )}
              </td>

              <td>{item.jwn_lst}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default MainList;
