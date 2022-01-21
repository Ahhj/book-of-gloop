import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { TitleInput, SubTitleInput, DurationFieldInput } from "./style";
import SummaryPanel from "../../../Recipe/components/SummaryPanel";
import { SummaryPanelContainer } from "../../../Recipe/style";

/**
 * Component for the recipe form header.
 * @param {*} props
 */
export default function RecipeFormHeader(props) {
  if (!props.serves && props.serves !== 0) {
    props.onChange({ key: "serves", value: 0 });
  }

  if (!props.duration) {
    props.onChange({
      key: "duration",
      value: { cook: "", prep: "", rest: "" },
    });
  }

  const handleChange = useCallback(
    (e) => props.onChange({ key: e.target.name, value: e.target.value }),
    [props]
  );

  // Get props for input field with text type
  const getTextInputProps = useCallback(
    (field) => {
      return {
        type: "text",
        name: field,
        placeholder: field,
        defaultValue: props[field],
        onChange: handleChange,
      };
    },
    [props, handleChange]
  );

  const getDurationFieldInputProps = useCallback(
    (field) => {
      return {
        type: "text",
        name: field,
        placeholder: "0 hours 0 minutes",
        defaultValue: props["duration"] ? props["duration"][field] : "",
        onChange: (e) => {
          const newValue = e.target.value;
          props.onChange({
            key: "duration",
            value: {
              cook: field === "cook" ? newValue : props.duration.cook,
              prep: field === "prep" ? newValue : props.duration.prep,
              rest: field === "rest" ? newValue : props.duration.rest,
            },
          });
        },
      };
    },
    [props]
  );

  return (
    <div>
      <div>
        <TitleInput {...getTextInputProps("title")} />
      </div>
      <SummaryPanelContainer>
        <SummaryPanel
          serves={
            <React.Fragment>
              <button
                type="button"
                onClick={() =>
                  props.onChange({
                    key: "serves",
                    value: props.serves > 0 ? props.serves - 1 : 0,
                  })
                }
              >
                {"-"}
              </button>
              {` ${props.serves} `}
              <button
                type="button"
                onClick={() =>
                  props.onChange({ key: "serves", value: props.serves + 1 })
                }
              >
                {"+"}
              </button>
            </React.Fragment>
          }
          duration={{
            cook: (
              <DurationFieldInput {...getDurationFieldInputProps("cook")} />
            ),
            prep: (
              <DurationFieldInput {...getDurationFieldInputProps("prep")} />
            ),
            rest: (
              <DurationFieldInput {...getDurationFieldInputProps("rest")} />
            ),
          }}
        />
      </SummaryPanelContainer>
      <br />
      <br />
      <div>
        <SubTitleInput {...getTextInputProps("intro")} />
      </div>
      <div>
        <SubTitleInput {...getTextInputProps("remarks")} />
      </div>
      <div>
        <SubTitleInput
          placeholder="tags"
          defaultValue={props.tags}
          onChange={(e) => {
            props.onChange({ key: "tags", value: e.target.value.split(",") });
          }}
        />
      </div>
    </div>
  );
}

RecipeFormHeader.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  remarks: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  serves: PropTypes.number,
  duration: PropTypes.shape({
    prep: PropTypes.string,
    cook: PropTypes.string,
  }),
  onChange: PropTypes.func,
};
