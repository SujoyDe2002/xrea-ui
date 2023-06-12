import { React, useEffect, useState } from "react";
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
import { GetAttribute } from "..";

function Tag(props) {
  let {
    label,
    onDelete,
    onChange,
    color,
    id,
    setSavedList,
    savedList,
    setClickedClose,
    ...other
  } = props;
  color = color ? color : "#4591F0";
  const tagStyle = {
    bgcolor: color,
    border: `1px solid ${color}`,
  };

  const handleDelete = () => {
    onDelete();
    setClickedClose(true);
  }
  return (
    <Box sx={tagStyle} {...other}>
      <span>{label}</span>
      <CloseIcon geoId={id} onClick={handleDelete} />
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
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
  id: PropTypes.string,
  savedList: PropTypes.array,
  setSavedList: PropTypes.func,
  setClickedClose: PropTypes.func
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
    savedList,
    setSavedList
  } = props;
  let {
    
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    filterSelectedOptions: true,
    onChange: (e, option, reason, details) => {
      if (reason === "selectOption") {
        let isValueExists = selectedList.find(({ id }) => {
          if (id === details.option.id) {
            return id
          }
        }, details)
        if (!isValueExists) {
          setSelectedList(option)
        }else{
          return false
        }
      } else {
        const updatedList =  selectedList.filter(({id})=> id !== details.option.id);
        setSelectedList(updatedList)
      }

    },
    options: multiSelectInputList && multiSelectInputList,
    value: selectedList || [],
    //defaultValue:selectedList||[],
    getOptionLabel: ({ name }) => name
  });

  const [clickedClose, setClickedClose] = useState(false);

  return (
    <Box sx={autoCompleteSection}>
      <div className="tag autocompleteInput" {...getRootProps()}>
        <Label {...getInputLabelProps()}>{headerName}</Label>
        <InputWrapper
          ref={setAnchorEl}
          className={focused ? "focused" : ""}

        >
          {selectedList && selectedList.length > 0 && selectedList.map(({ color, name, id }, index) => (
            <StyledTag
              color={color}
              label={name}
              id={id}
              savedList={savedList}
              setSavedList={setSavedList}
              {...getTagProps({ index })}
              setClickedClose={setClickedClose}
            />
          ))}
          <input
            onKeyUp={handleChange}
            {...getInputProps()}
          />
        </InputWrapper>
        {groupedOptions && groupedOptions.length > 0 ? (
          list ? (
            <Listbox {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>
                  <Typography sx={autoCompleList}>{option?.name}</Typography>
                </li>
              ))}
            </Listbox>
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
      </div>
    </Box>
  );
};
