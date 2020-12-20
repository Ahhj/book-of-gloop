import React from "react";

import {
  ServesHeader,
  ServesBody,
  PanelContainer,
  DurationHeader,
  DurationBody,
  DurationKey,
  DurationValue,
  DurationField,
} from "./style";

import PropTypes from "prop-types";

export default function SummaryPanel({ serves, duration }) {
  return (
    <React.Fragment>
      {serves ? (
        <PanelContainer>
          <ServesHeader>{`🍴 Serves:`}</ServesHeader>{" "}
          <ServesBody>{serves}</ServesBody>
        </PanelContainer>
      ) : null}
      {duration ? (
        <PanelContainer>
          <PanelContainer>
            {Object.keys(duration).length ? (
              <DurationHeader>{`⏲`}</DurationHeader>
            ) : null}
          </PanelContainer>
          <PanelContainer>
            <DurationBody>
              {duration.prep ? (
                <DurationField>
                  <DurationKey>{`🔪 Prep:`}</DurationKey>
                  <DurationValue>{duration.prep}</DurationValue>
                </DurationField>
              ) : null}
              {duration.cook ? (
                <DurationField>
                  <DurationKey>{`🍳 Cook:`}</DurationKey>
                  <DurationValue>{duration.cook}</DurationValue>
                </DurationField>
              ) : null}
              {duration.rest ? (
                <DurationField>
                  <DurationKey>{`😴 Rest:`}</DurationKey>
                  <DurationValue>{duration.rest}</DurationValue>
                </DurationField>
              ) : null}
            </DurationBody>
          </PanelContainer>
        </PanelContainer>
      ) : null}
    </React.Fragment>
  );
}

SummaryPanel.propTypes = {
  serves: PropTypes.number,
  duration: PropTypes.shape({
    prep: PropTypes.string,
    cook: PropTypes.string,
  }),
};
