import NavigationItem from "./NavigationItem/NavigationItem";
import styled from "styled-components";

import traffic from "../../../assets/icon_traffic.png";
import account from "../../../assets/icon_account.png";

import { Logo } from "../../Logo/Logo";
import { balihai, ivory } from "../../../utils/color";
import logo from "../../../assets/logo_awsc.jpg";

import { useSelector } from 'react-redux'

const Items = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  margin-top: 20px;
`;

const Footer = styled.div`
  /* width: 100%; */
  width: 90%;
  color: ${balihai};
  margin-bottom: 3rem;

  .img {
    display: flex;
    align-items: flex-end;

    img {
      width: 131px;
      height: 56px;
    }
  }
  .year {
    margin-bottom: 5px;
    font-family: "Arial";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #1234b0;
  }

  .text {
    font-family: "Segoe UI";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    margin-left: 10px;
  }
`;

const Nav = styled.nav`
  padding-top: 2rem;
  position: relative;
  width: 85%;
`;

// const NavigationItems = () => (
//   <Items>
//     <NavigationItem link="/" exact="true" img={traffic}>
//       dashboard
//     </NavigationItem>
//     <NavigationItem link="/import" img={account}>
//       import data
//     </NavigationItem>
//   </Items>
// );

const NavigationItems = () => {
  const { user } = useSelector(state => state)
  return (
    <>
      <Nav>
        <Logo small />

        <Items>
          {
            (() => {
              if (user.role === "admin") {
                return (
                  <>
                    <NavigationItem link="/" exact="true" img={traffic}>
                      Dashboard
                    </NavigationItem>
                    <NavigationItem link="/import" img={account}>
                      import data
                    </NavigationItem>
                  </>
                )
              }

              else if (user.role === "client") {
                return (
                  <>
                    <NavigationItem link="/" exact="true" img={traffic}>
                      News / ข่าวสาร
                    </NavigationItem>
                    <NavigationItem link="/buy" img={traffic}>
                      Buy / สั่งซื้อ
                    </NavigationItem>
                    <NavigationItem link="/import" img={account}>
                      Profile / ข้อมูลของฉัน
                    </NavigationItem>
                  </>
                )
              }
            })()
          }
        </Items>
      </Nav>
      <Footer>
        <div className="img">
          <img src={logo} />
          <p className="year">© 2022 </p>
        </div>
        <p className="text">
          สงวนสิทธิ์ในการใช้งาน <br />
          เป็นไปตามเงื่อนไขที่บริษัทกำหนด
        </p>
      </Footer>
    </>
  )
}

export default NavigationItems;
