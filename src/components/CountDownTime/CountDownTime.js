import React from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";
import Col from "reactstrap/lib/Col";

const datePublish = new Date('June 01, 2021 00:00:00');

// Random component
const Completionist = () => <span>Bingo!</span>;

const timeElement = (time, timeText) => <Col md="3" className="time-element" >
  <div className="time-element__wrapper">
    <span className="time-number">{time}</span>
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
    <Countdown date={datePublish} renderer={renderer} />
  );
}

export default CountDownTime;
