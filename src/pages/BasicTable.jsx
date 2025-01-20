import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';

function BasicTable({data}) {
  const navigate = useNavigate();
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>물건번호</th>
          <th>물건종류</th>
          <th>감정평가액</th>
          <th>최저매각가격</th>
          <th>주소</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item,index)=>{
          console.log(data[index].property_number)
          return(
            <tr key={index} onClick={()=>{navigate('/detail/' +data[index].basic_info.property_number)}}>
              <th>{item.basic_info.property_number}</th>
              <th>{item.basic_info.property_type}</th>
              <th>{item.basic_info.appraisal_value}</th>
              <th>{item.basic_info.minimum_sale_price}</th>
              <th>{item.basic_info.locations[0]}</th>
          </tr>
          )
        })}
      </tbody>
    </Table>
  );
}

export default BasicTable;