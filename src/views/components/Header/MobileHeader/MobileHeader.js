import React, { useState } from 'react';
import styled from 'styled-components';

const MobileHeader = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
      />
      {/* <Button>Search</Button> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: #0077c2;
  color: #fff;
  font-size: 16px;
`;

export default MobileHeader;
