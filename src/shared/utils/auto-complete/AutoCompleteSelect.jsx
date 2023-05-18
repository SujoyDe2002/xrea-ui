import { React, useEffect } from "react";
import PropTypes from "prop-types";
import useAutocomplete from "@mui/base/useAutocomplete";
import CloseIcon from "@mui/icons-material/Close";
import "app/icon.css";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AppStyle,
  InputWrapper,
  Label,
  ListTypographyStyle,
  Listbox,
  UseCaseHeading,
  autoCompleList,
  autoCompleteSection,
} from "app";

function Tag(props) {
  let { label, onDelete, color, ...other } = props;
  color = color ? color : "#4591F0";
  const tagStyle = {
    bgcolor: color,
    border: `1px solid ${color}`,
  };
  return (
    <Box sx={tagStyle} {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </Box>
  );
}
// Customizing tag style
// background-color: ${theme.palette.mode} === 'dark' ? 'rgba(255,255,255,0.08)' : '#1565c0';
const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  border-radius: 4px;
  color: #fff;
  box-sizing: content-box;
  padding: 6px 10px 6px 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 2.25rem;
    cursor: pointer;
    padding: 4px;
  }
`
);

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  color: PropTypes.string,
};

const AutoCompleteTabList = ({
  getOptionProps,
  groupedOptions,
  fromIndex,
  toIndex,
  selectedList,
}) => {
  return (
    <Stack sx={{ lineHeight: 1.6, flexDirection: "row" }}>
      {groupedOptions.slice(fromIndex, toIndex).map((option, index) => {
        index = index + fromIndex;
        let bgcolor = AppStyle.palette.primary.light;
        let fontColor = AppStyle.palette.common.black;
        selectedList.map(({ color, code }) => {
          if (code === option.code) {
            bgcolor = color;
            fontColor = AppStyle.palette.common.white;
          }
        });
        return (
          <>
            <Typography
              {...getOptionProps({ option, index })}
              sx={{ ...ListTypographyStyle, bgcolor, color: fontColor }}
            >
              {option?.name}
            </Typography>
          </>
        );
      })}
    </Stack>
  );
};
export const AutoCompleteSelect = ({ props }) => {
  let {
    headerName,
    multiSelectInputList,
    handleChange,
    setSelectedList,
    selectedList,
    list,
    disabled,
  } = props;
  let {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    handleValue: { handleChange },
    options: multiSelectInputList && multiSelectInputList,
    getOptionLabel: (option) => option?.name,
  });

  // console.log("multiSelectInputList", multiSelectInputList);

  useEffect(() => {
    setSelectedList(value);
    console.log("value", value);
  }, [value]);

  const handleClick = () => {
    //console.log("test");
    return false;
  };

  const handleCityInputClick = () => {
    //console.log("selectedList", selectedList);
    if (selectedList.length >= 5) {
      groupedOptions = [];
    }
  };
  //console.log("selectedList", selectedList);

  return (
    <Box sx={autoCompleteSection}>
      <div className="tag autocompleteInput" {...getRootProps()}>
        <Label {...getInputLabelProps()}>{headerName}</Label>
        <InputWrapper
          onClick={handleClick}
          ref={setAnchorEl}
          className={focused ? "focused" : ""}
        >
          {selectedList.map((option, index) => (
            <StyledTag
              color={option?.color}
              label={option?.name}
              {...getTagProps({ index })}
            />
          ))}

          <input
            onClick={handleCityInputClick}
            onKeyUp={handleChange}
            {...getInputProps()}
            readOnly={disabled}
          />
        </InputWrapper>
      </div>
      {groupedOptions.length && !disabled > 0 ? (
        list ? (
          selectedList.length <= 4 ? (
            <Listbox {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>
                  <Typography sx={autoCompleList}>{option?.name}</Typography>
                </li>
              ))}
            </Listbox>
          ) : null
        ) : (
          <Listbox {...getListboxProps()}>
            <Stack>
              <AutoCompleteTabList
                selectedList={selectedList}
                getOptionProps={getOptionProps}
                groupedOptions={groupedOptions}
                fromIndex={0}
                toIndex={1}
              />

              <Typography sx={UseCaseHeading}>MULTI-FAMILY</Typography>
              <Stack>
                <AutoCompleteTabList
                  selectedList={selectedList}
                  getOptionProps={getOptionProps}
                  groupedOptions={groupedOptions}
                  fromIndex={1}
                  toIndex={4}
                />
                <AutoCompleteTabList
                  selectedList={selectedList}
                  getOptionProps={getOptionProps}
                  groupedOptions={groupedOptions}
                  fromIndex={4}
                  toIndex={7}
                />
              </Stack>
            </Stack>
          </Listbox>
        )
      ) : null}
    </Box>
  );
};
