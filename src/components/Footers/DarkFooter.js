/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/thanhtoan123a1/"
                target="_blank"
              >
                Toan Tran Van Thanh
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/thanhtoan123a1/"
                target="_blank"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/thanhtoan123a1/"
                target="_blank"
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          <a
            href="https://www.facebook.com/thanhtoan123a1/"
            target="_blank"
          >
            ToanTVT
          </a>
          . Coded by{" "}
          <a
            href="https://www.facebook.com/thanhtoan123a1/"
            target="_blank"
          >
            ToanTVT
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
