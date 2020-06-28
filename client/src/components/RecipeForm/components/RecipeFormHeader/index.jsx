import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { TitleInput, IntroInput, RemarksInput, TagsInput } from "./style";

/**
 * Component for the recipe form header.
 * @param {*} props
 */
export default function RecipeFormHeader(props) {
  const handleChange = useCallback(
    (e) => props.onChange({ key: e.target.name, value: e.target.value }),
    []
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

  return (
    <div>
      <div>
        <TitleInput {...getTextInputProps("title")}></TitleInput>
      </div>
      <div>
        <IntroInput {...getTextInputProps("intro")}></IntroInput>
      </div>
      <div>
        <RemarksInput {...getTextInputProps("remarks")}></RemarksInput>
      </div>
      <div>
        <TagsInput
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
  onChange: PropTypes.func,
};
