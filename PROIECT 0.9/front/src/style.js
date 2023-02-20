import styled from 'styled-components';

export const HeaderBody = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 120px;
  background: #555555;
  text-align: center;
`
export const Buttonh = styled.button`
  text-align: center;
  padding: 0.6%;
  color: #ffffff;
  background: #222222;
  border: none;
  border-radius: 36px;
  width: 82px;
  margin: 36px 0.4%;
  transition: transform 1s;
  &:hover{
      cursor: pointer;
      background: #ffffff;
      color: #000000;
      transform: scale(1.2); 
  }
  &:active{
      color: #00FF00;
  }
  a{
    background: transparent;
    color: white;
    text-decoration: none;
    &:hover{
      color: black;
    }
   }
`
export const ProfilContainer = styled.div`
text-align: left;
margin: 36px;
h1,h2,h5{
  margin: 8px;
}
table{
  text-align: center;
  width: 100%;
  border-collapse: collapse;
  td,th{
    border: 1px solid #ddd;
  }
  tr:hover{
    background-color: #f2f2f2;
  }
  button{
    style: none;
    width: 100%;
    border-radius: 0;
  }
  a{
    background: transparent;
    color: white;
    text-decoration: none;
  }
}
input{
  margin: 12px;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background: #333333;
}
select{
  style: none;
  color: #ffffff;
  border: none;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  background: #333333;
  option{
    margin: 12px;
    color: #ffffff;
    border: none;
    padding: 12px;
    border-radius: 6px;
    background: #333333;
  }
}
button{
  padding: 12px;
  border: none;
  border-radius: 12px;
  color: #ffffff;
  background: #333333;
  transition: transform 1s;
}
button:hover{
  cursor: pointer;
  transform: scale(1.1);
  background: #555555;
}
`
export const StuffContainer = styled.div`
text-align: center;
margin: 36px;
table{

  width: 100%;
  border-collapse: collapse;
  td,th{
    border: 1px solid #ddd;
  }
  tr:hover{
    background-color: #f2f2f2;
  }
  button{
    style: none;
    width: 100%;
    border-radius: 0;
  }
  a{
    background: transparent;
    color: white;
    text-decoration: none;
  }
}
input{
  margin: 12px;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background: #333333;
}
select{
  style: none;
  margin: 12px;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background: #333333;
  option{
    margin: 12px;
    color: #ffffff;
    border: none;
    padding: 12px;
    border-radius: 6px;
    background: #333333;
  }
}
button{
  padding: 12px;
  border: none;
  border-radius: 12px;
  color: #ffffff;
  background: #333333;
  transition: transform 1s;
}
button:hover{
  cursor: pointer;
  transform: scale(1.1);
  background: #555555;
}
`
export const HomeButton = styled.button`
  padding: 1.5%;
  color: #ffffff;
  background: #111111;
  border: none;
  border-radius: 36px;
  margin: 1% 0.5%;
  transition: transform 1s;
  &:hover{
      cursor: pointer;
      background: #aaaaaa;
      color: #111111;
      transform: scale(1.2); 
  }
  &:active{
      color: #00FF00;
  }
`
export const Container = styled.div`
text-align: center;
margin: 36px;
ul{
  text-align: center;
}
input{
  margin: 12px;
  color: #ffffff;
  padding: 12px;
  border-radius: 12px;
  background: #333333;
}
button{
  padding: 12px;
  border-radius: 12px;
  color: #ffffff;
  background: #333333;
  transition: transform 1s;
}
button:hover{
  cursor: pointer;
  transform: scale(1.1);
  background: #555555;
}
`
export const PostsCont = styled.div`
text-align: center;
margin: 3%;
ul{
  text-align: center;
  list-style: none;
}
li{
  border-radius: 12px;
  padding: 8px;
  background: #aaaaaa;
  margin: 1rem 3rem 1rem 3rem;
  .contentContainer{
    text-align: left;
    padding: 6px;
    border-radius: 4px;
  }
}
input{
  margin: 12px;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 12px;
  background: #333333;
}
button{
  margin: 6px;
  border: none;
  padding: 6px;
  border-radius: 6px;
  color: #ffffff;
  background: #333333;
  transition: transform 1s;
}
button:hover{
  cursor: pointer;
  transform: scale(1.1);
  background: #555555;
} 
`
export const SearchContainer = styled.div`
text-align: center;
margin: 36px;
table{

  width: 100%;
  border-collapse: collapse;
  td,th{
    border: 1px solid #ddd;
  }
  tr:hover{
    background-color: #f2f2f2;
  }
  button{
    style: none;
    width: 100%;
    border-radius: 0;
  }
  a{
    background: transparent;
    color: white;
    text-decoration: none;
  }
}
input{
  margin: 12px;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background: #333333;
}
select{
  style: none;
  margin: 12px;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background: #333333;
  option{
    margin: 12px;
    color: #ffffff;
    border: none;
    padding: 12px;
    border-radius: 6px;
    background: #333333;
  }
}
button{
  padding: 12px;
  border: none;
  border-radius: 12px;
  color: #ffffff;
  background: #333333;
  transition: transform 1s;
}
button:hover{
  cursor: pointer;
  transform: scale(1.1);
  background: #555555;
}
`
export const StuffDetailContainer = styled.div`
text-align: left;
margin: 36px;
section{
  background: #cccccc;
  margin: 12px 22px 12px 22px;
  border-radius: 6px;
  padding: 8px;
  h1,h4,p{
    background: #cccccc;
    margin: 8px;
  }
}
img{
  margin: 12px;
  width: 120px;
  height: 120px:
}
ul{
  text-align: center;
}
input{
  margin: 12px;
  color: #ffffff;
  padding: 12px;
  border-radius: 12px;
  background: #333333;
}
button{
  padding: 12px;
  border-radius: 12px;
  color: #ffffff;
  background: #333333;
  transition: transform 1s;
}
button:hover{
  cursor: pointer;
  transform: scale(1.1);
  background: #555555;
}
a{
  background: transparent;
  color: white;
  text-decoration: none;
`
export const UserDetailContainer = styled.div`
text-align: left;
margin: 36px;
a{
  background: transparent;
  color: white;
  text-decoration: none;
}
h1,h2,h5{
  margin: 8px;
}
table{
  text-align: center;
  width: 100%;
  border-collapse: collapse;
  td,th{
    border: 1px solid #ddd;
  }
  tr:hover{
    background-color: #f2f2f2;
  }
  button{
    style: none;
    width: 100%;
    border-radius: 0;
  }
  a{
    background: transparent;
    color: white;
    text-decoration: none;
  }
}
input{
  margin: 12px;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background: #333333;
}
select{
  style: none;
  color: #ffffff;
  border: none;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  background: #333333;
  option{
    margin: 12px;
    color: #ffffff;
    border: none;
    padding: 12px;
    border-radius: 6px;
    background: #333333;
  }
}
button{
  padding: 12px;
  border: none;
  border-radius: 12px;
  color: #ffffff;
  background: #333333;
  transition: transform 1s;
}
button:hover{
  cursor: pointer;
  transform: scale(1.1);
  background: #555555;
}
`
export const OthersProfileContainer = styled.div`
text-align: center;
margin: 36px;
ul{
  text-align: center;
}
input{
  margin: 12px;
  color: #ffffff;
  padding: 12px;
  border-radius: 12px;
  background: #333333;
}
button{
  padding: 12px;
  border-radius: 12px;
  color: #ffffff;
  background: #333333;
  transition: transform 1s;
}
button:hover{
  cursor: pointer;
  transform: scale(1.1);
  background: #555555;
}
`