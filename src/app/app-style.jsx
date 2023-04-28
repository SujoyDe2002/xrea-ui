import { createTheme, styled, useTheme } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';



export const AppStyle = createTheme({
  palette: {
    primary: {
      main: "#13355F",
      light: "#E8F3FD"
    },
    secondary: {
      main: "#3478D6",
    },
    tableHeader: {
      main: "#7BBFBA",
    },

  },
  typography: {
    fontFamily: [
      'IBM Plex Sans',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h2: {
      fontWeight: 700
    },
    button: { // Here is where you can customise the button

      fontWeight: 700
    },
    th: {
      fontWeight: 700
    },
    TableCell: {
      th: {
        fontWeight: 700
      }
    }
  },

});

export const cardsContainer = {
  position: "absolute",
  top: "5%",
  width: "80%",
  height: "93%",
  transform: "translateX(10%)"
};
// header start
export const pageHeader = {
  background: "linear-gradient(90deg, rgba(49, 116, 208, 1) 0%, rgba(17, 46, 86, 1) 100%)",
  height: "19vh"
}
export const headerItemsContainer = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "10px"
}
// header end
// container start
export const boxContainer = {
  p: ".5rem 1rem",
  width: "100%"
}
// container end
export const layoutContainer = {
  // bgcolor: "rgb(49,116,208)",
  // background: "radial-gradient(circle, rgba(49,116,208,1) 0%, rgba(21,59,111,1) 100%)", 
  height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
};

export const headerFont = {
  fontWeight: 700,
  color: "#fff"
};

export const loginFont = {
  ...headerFont,
  fontSize: "1rem",
};

export const smallFont = {
  ...headerFont,
  fontSize: "10px",
  lineHeight: " 107.50000476837158%"
};

// tablecell

// home view 

export const xreaMethodologyStyle = {
  fontStyle: "normal",
  fontWeight: 700,
  fontSize:"40px"
}
export const xreaBgStyle = {
  padding: "1.25rem 1.8rem",
  boxShadow: "0px -4px 17px -3px rgba(0, 0, 0, 0.15)",
  bgcolor: "#E8F3FD"
}
export const iconContainer = {
  position: "absolute",
  top: "-1.195rem",
  transform: "translateX(50%)",
  right: "50%"
}
export const smallTextStyle = {
  fontSize:".6rem",
  color: "#fff",
  textAlign: "center"
}
export const barImgContainer = {
  width: "80%",
  position: "relative"
}

//home view end

// Auto complete start
export const ListTypographyStyle = {
  whiteSpace: "nowrap",
  fontSize: 11,
  fontWeight: 800,
  textAlign: "center",
  p: .5,
  ml: .5,
  mt: 1,
  disPlay: "inline-block",
  cursor: "pointer",
  bgcolor: AppStyle.palette.primary.light,
  width: "fit-content"
}
export const UseCaseHeading = {
  fontWeight: 600,
  fontSize: ".7rem",
  lineHeight: "107.5%",
  m: .5,
  color: "#BFBFBF"

}

export const Root = styled('div')(
  ({ AppStyle }) => `
    color: ${AppStyle.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    font-size: 14px;
  `,
);

export const Label = styled('label')`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
  `;

export const InputWrapper = styled('div')(
  ({ theme }) => `
    width: 100%;
    border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
  
    &:hover {
      border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    }
  
    &.focused {
      border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  
    & input {
      background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
      color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : '#000'
    };
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `
)

export const Listbox = styled('ul')(
  ({ theme }) => `
    width: 40%;
    margin: 2px 0 0;
    padding: 5px;
    
    position: absolute;
    list-style: none;
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  
    & li {
      padding: 5px 12px;
      display: flex;
  
      & span {
        flex-grow: 1;
      }
  
      & svg {
        color: transparent;
      }
    }
  
    & li[aria-selected='true'] {
      background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
      font-weight: 600;
  
      & svg {
        color: #1890ff;
      }
    }
  
    & li.${autocompleteClasses.focused} {
      background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
      cursor: pointer;
  
      & svg {
        color: currentColor;
      }
    }
  `
)
export const autoCompleteSection = {
  color: "rgba(0,0,0,.85)",
  fontSize: "14px"
}
// Auto complete end

// Search view start
export const searchViewcontainer = {
  position: "absolute",
  width: "100%",
  left: "50%",
  height: "93%",
  transform: "translateX(-50%)",
  marginBottom: "10px"
}
// Search view start


// Search reasult section start

export const tablesContainter = {
  width: "100%",
}
export const cityContainer = {
  padding: ".8rem 1.6rem",
  width: "100%",
  textAlign: "center",
  background: "#FFFFFF",
  boxShadow: " 0px -3px 17px -3px rgba(0, 0, 0, 0.1)",
  fontWeight: "bold"

}
// export const secondarybtn = {
//   textTransform: "none",
//   bgcolor: theme.palette.secondary.main,
//   fontWeight: 700,
//   fontSize: "1.125rem",
//   lineHeight: "107.5%"
//   /* or 19px */
// }
export const searchResultSection = {
  lineHeight: "2.68rem",
  fontSize: "2.5rem"
}
export const boxStyle = {
  width: "61px",
  height: "61px",
  background: "#D9D9D9",
  margin: "auto",
  cursor: "pointer"
}
export const marketSegmentHeading = {
  fontStyle: "italic",
  fontWeight: 700,
  fontSize: "20px",
  lineHeight: "107.5%",
  mt: 1
}
// Search reasult section end


// Search  section start

export let searchContainter = {
  width: "100%",
  padding: 2,
  boxShadow: "none"
}
export const searchButtonContainer = {
  alignItems: "center",
  justifyContent: "end",
  height: "100%",
  position: "relative"

}

export const clearLinkStyle = {
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "107.5%",
  textAlign: "center",
  mt: 1,
  cursor: "pointer",
  textDecorationLine: "underline",

  color: "#000000"
}
export const searchButtonStyle = {
  padding: 0,
  top: "27px",
  mt: "22px"
}
export const searchSectionButton = {
  color: "#fff",
  textTransform: "capitalize",
  fontWeight: 700,
  bgcolor: AppStyle.palette.primary.main,
  "&:hover": {
    bgcolor: AppStyle.palette.primary.main

  }
}

// Search reasult section end

// Card Style start
export const cardstyle = {
  padding: "1.25rem 1.8rem",
  boxShadow: "0px -4px 17px -3px rgba(0, 0, 0, 0.15)"

}
// Card Style end

// Table style start

const cellSize = {
  width: "306px"
}
const headerCellSize = {
  width : "355px"
}
export const blankTableCell = {
  ...headerCellSize,
  p: 2
}
const tablecellCommon = {
  ...blankTableCell,
  fontWeight: 700,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

export const tableHeader = {
  ...tablecellCommon,
  ...headerCellSize,
  p: 2,
  justifyContent: "end",
  fontSize: "24px",
  textAlign: "right",
}
const trBorder = "1px solid #E6E6E6"
export const tableRow = {
  flexDirection: "row",
  borderTop: trBorder,
  borderBottom: trBorder,

}
export const tableCell = {
  ...tablecellCommon,
  textAlign: "right",
  position: "relative"

}
export const blankTab = {
  ...cellSize,
  p: 3
}
export const tabRight = {
  ...headerCellSize,
  p: 3
}
export const tabStyle = {
  ...blankTab,
  boxShadow: "-1px -3px 10px -4px rgba(0, 0, 0, 0.15)",
  fontWeight: 700,
  fontSize: "25px",
  lineHeight: "107.5%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}
export const lastTab = {
  ...tabStyle,
  color: "#D9D9D9",
  fontStyle: "italic"
}
export const itemTableDataCellStyle = {
  fontFamily: 'IBM Plex Sans',
  lineHeight: "107.5%",
  fontWeight: "700",
  fontSize: "40px",
  textAlign: "right"
}
export const itemTableDataCellStyleBold = {
  fontSize: "40px",
  lineHeight: "107.5%",
  fontWeight: "800"
}

export const buttonStyle = {
  bgcolor: "#00447b",
  "&:hover":{
    bgcolor: "#00284a"
  }
}
// Table style end

// market segmnent start
export const headerstyle = {
  fontfamily: "IBM Plex Sans",
  fontstyle: "normal",
  fontweight: "700",
  lineheight: "107.5%",
  padding: "0px 10px 0px 10px"
}
export const iconboxstyle = {
  position: "relative",
  width: "fit-content",
  mx: "auto"
}
export const iconValue = {
  position: "absolute",
  color: "#fff",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize:"26px"

}
export const marketsegmenttypography = {
  fontfamily: "IBM Plex Sans",
  fontsize: "20px",
  fontweight: "400",
  lineheight: "22px",
  letterspacing: "0px",
  textalign: "left"

}
// market segmnent end 