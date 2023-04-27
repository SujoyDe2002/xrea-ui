import  {React, useEffect} from 'react';
import PropTypes from 'prop-types';
import useAutocomplete from '@mui/base/useAutocomplete';
import CloseIcon from '@mui/icons-material/Close';
import 'app/icon.css';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputWrapper, Label, ListTypographyStyle , Listbox, UseCaseHeading, autoCompleteSection } from 'app';

function Tag(props) {

  const { label, onDelete, ...other } = props;
  return (
    <div  {...other}>
     
      <span>{label}</span>
      <CloseIcon  onClick={onDelete} />
    </div>
  );
}
// Customizing tag style
const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#1565c0'
      };
    
  border: 1px solid #1565c0;
  border-radius: 4px;
  color: #fff;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
)


Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export const AutoCompleteSelect = ({ props })=> {
  let {headerName, multiSelectInputList, handleChange, setSelectedList,selectedValue, tableActive, selectedList, list } =  props;
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
    id: 'customized-hook-demo',
    multiple: true,
    handleValue:{handleChange},
    options: multiSelectInputList && multiSelectInputList,
    getOptionLabel: (option) => option?.name,
  });

 console.log("multiSelectInputList", multiSelectInputList);

useEffect(() => {

  setSelectedList(value);

}, [value])

const handleClick = ()=>{
  console.log("test");
  return false
}

const handleCityInputClick = ()=>{
  console.log("selectedList", selectedList);
  if (selectedList.length >= 5) {
    groupedOptions  = []
  }
}

  return (
    <Box sx={autoCompleteSection}>
      <div   className="tag" {...getRootProps()}>
        <Label   {...getInputLabelProps()}>{headerName}</Label>
        <InputWrapper onClick={handleClick}  ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {selectedList.map((option, index) => (
            <StyledTag label={option?.name} {...getTagProps({ index })} />
          ))}

          <input onClick={handleCityInputClick} onKeyUp={handleChange}  {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0  ? (
        list  ?
        (selectedList.length <= 4?
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option?.name}</span>
              
            </li>
          ))}
        </Listbox>:null):
        <Listbox  {...getListboxProps()}>
          <Stack>

          {groupedOptions?.slice(0 ,1)?.map((option, index)=>{
  
    return (
      <>
  
         <Typography {...getOptionProps({ option, index })} component={"span"} sx={ListTypographyStyle }>{option?.name}</Typography>
      </>
       )
          })}
            <Typography sx={UseCaseHeading}>MULTI-FAMILY</Typography>
          <Stack flexDirection={"row"} >
          <Typography sx={{lineHeight: 1.6}}>

                {groupedOptions.slice(1, ).map((option, index) => {
                 
                 console.log();
                 index = index +1;
                return (
               <>
                  {index === 5? <br /> : null}
                  <Typography {...getOptionProps({ option, index })} component={"span"} sx={ListTypographyStyle }>{option?.name}</Typography>
               </>
                )
                })}
          </Typography>
            </Stack>
          </Stack>      
      </Listbox>
      ) : null}
    </Box>
  );
}
