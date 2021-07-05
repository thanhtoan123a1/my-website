import React from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";
import Col from "reactstrap/lib/Col";
import FlipNumbers from "react-flip-numbers";

const publishDate = new Date('August 01, 2021 00:00:00');

// Random component
const Completionist = () => <span>Bingo!</span>;

const timeElement = (time, timeText) => <Col className="time-element col-6 col-md-3" >
  <div className="time-element__wrapper">
    <FlipNumbers play
      width={50}
      numberStyle={{
        color: '#00b9f7',
        textShadow: '0px 0px 5px #00b9f7',
      }}
      height={50}
      numbers={`${time}`}
      />
    <span className="time-text">{timeText}</span>
  </div>
</Col>


function CountDownTime() {
  const { t } = useTranslation();
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <div className="down-time-wrapper">
          <Row className="down-time-wrapper__row">
            {timeElement(days, t('days'))}
            {timeElement(hours, t('hours'))}
            {timeElement(minutes, t('minutes'))}
            {timeElement(seconds, t('seconds'))}
          </Row>
        </div>
      );
    }
  };
  return (
    <Countdown date={publishDate} renderer={renderer} />
  );
}

export default CountDownTime;
