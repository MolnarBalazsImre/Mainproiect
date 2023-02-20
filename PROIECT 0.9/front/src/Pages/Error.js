import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
    margin: 36px;
`
const Title = styled.div`
  text-align: center;
  margin: 36px;
  padding: 16px;
  background: #000066;
  color: #777700;
`
function Error() {
  return (
    <>
    <Title>ERROR PAGE</Title>
    <Container><Link to='/'>Back</Link></Container> 
    </>
  )
}

export default Error