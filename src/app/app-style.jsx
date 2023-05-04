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
    }

  },
  typography: {
    fontFamily: [
      'IBM Plex Sans'   
    ],
    secondaryFont: 'IBM Plex Mono',
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

// horizontal and vertical centering
export const centerAbsoluteItem = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute"
}
// horizontal and vertical centering
export const cardsContainer = {
  position: "absolute",
  top: "5%",
  width: {xs: "90%", md:"83.34%"},
  height: "93%",
  left: "50%",
  transform: "translate(-50%, 0)"
};
// header start
export const pageHeader = {
  background: "linear-gradient(90deg, rgba(49, 116, 208, 1) 0%, rgba(17, 46, 86, 1) 100%)",
  height:{xs:"27.25vw", md: "10.25vw"}
}
export const headerItemsContainer = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "10px"
}
export const headerRightContiner = {
  flexDirection: "row",
  alignItems: "center"
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
  fontSize: {xs:"2vw", md: "1.2vw"}
};

export const smallFont = {
  ...headerFont,
  fontSize: {xs: "1.5vw", md:".9vw"},
  lineHeight: " 107.50000476837158%"
};

// tablecell

// home page start

export const homeCardHeading1 = {
  fontWeight: 400,
  lineHeight: {xs:"1.34rem", md:"2.375rem"},
  fontSize: {xs:"1.25rem", lg: "2.25rem"},
  fontStyle: "italic",
  marginBottom: "0.5em"
}
export const homeCardDes = {
  fontSize: {xs:"0.6875rem", lg:"1.25rem"},
  fontWeight: "300",
  marginBottom: "8px"
}
export const InfoSearch = {
    fontSize: { xs: "0.6875rem", lg: "1.125rem" },
    fontWeight: "300",
    marginBottom: "12px"
}
export const cardImageContainer = {
  justifyContent: "center",
  height:"100%"
}
export const imageBox = {
  height: {xs:"35.5vw", md:"14.5vw"}
}
export const savedSeacrhCriteria = {

    color: "rgba(168, 168, 168, 1)",
    height: "auto",
    fontSize: { xs: "0.6875rem", lg: "1.125rem" },
    alignSelf: "auto",
    fontStyle: "Bold",
    textAlign: "center",
    fontFamily: "IBM Plex Sans",
    fontWeight: "700",
    /* line-height: 107.50000476837158%; */
    fontStretch: "normal",
    marginRight: " 0",
    marginBottom: "0",
    textDecoration: "none",
    backgroundColor: "rgba(249, 249, 249, 1)",
    margin: "0 8px 8px 0",
    padding: "10px 15px 10px 15px",
    borderRadius: "4px",
}

export const smallTextStyle = {
    fontSize: ".5rem",
    color: "#fff",
    textAlign: "center"
}
export const iconContainer = {
    position: "absolute",
    top: "-1.195rem",
    transform: "translateX(50%)",
    right: "50%"
}
// home page end 

// Auto complete start
const autoCompleteFontSize = "1.125rem"
export const ListTypographyStyle = {
  whiteSpace: "nowrap",
  fontWeight: 800,
  textAlign: "center",
  p: "8px 10px",
  mx: "5px",
  mt: "5px",
  fontSize: autoCompleteFontSize,
  borderRadius: "5px",
  disPlay: "inline-block",
  cursor: "pointer",
  width: "fit-content"
}
export const autoCompleList = {
  fontSize: autoCompleteFontSize,
  fontWeight: 400
}
export const UseCaseHeading = {
  fontWeight: 600,
  fontSize: ".9rem",
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
    font-size: 1rem;
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
    width: 41%;
    margin: 2px 0 0;
    padding: 5px;
    position: absolute;
    list-style: none;
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    border: 1px solid #D9D9D9;
    box-shadow: 0px -1px 7px 2px rgba(0, 0, 0, 0.05), inset 0px 0px 5px rgba(0, 0, 0, 0.05);
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
  marginBottom: "10px",

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

export const searchResultSection = {
  lineHeight: "2.68rem",
  fontSize: "2.5rem"
}

export const maxIndexValue = {
  borderRadius: "15px", 
  height: "4.9vw", 
  minWidth: "100px", 
  width: "56%", 
  opacity: "0.1"
}
// Search reasult section end


// Search  section start

export let searchContainter = {
  width: "100%",
  boxShadow: "none"
}
export const searchButtonContainer = {
  alignItems: "center",
  justifyContent: "end",
  width: "100%",
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
  position: "absolute",
  top: "27px",
  width: "100%",
  height:"55px"
 
}

export const searchSectionButton = {
  color: "#fff",
  width: "100%",
  justifyContent: "space-between",
  textTransform: "capitalize",
  height:"100%",
  fontWeight: 700,
  bgcolor: AppStyle.palette.primary.main,
  "&:hover": {
    bgcolor: AppStyle.palette.primary.main

  }
}


// Search reasult section end

// Card Style start
export const cardstyle = {
  // padding: "1.25rem 1.8rem",
  padding: {xs: "8.6%", md: "2.8%"},
  bordeRadius: "10px",
  boxShadow: "0px -4px 17px -3px rgba(0, 0, 0, 0.15)"

}

// Card Style end

// Table style start

const cellSize = {
  width: "306px"
}
const headerCellSize = {
  width : "320px"
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
  fontSize: "1.25rem",
  textAlign: "right",
  fontFamily: AppStyle.typography.fontFamily[0]
}

const trBorder = "1px solid #E6E6E6"
export const tableRow = {
  flexDirection: "row",
  borderTop: trBorder,
  height: "127px"

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
  // boxShadow: "0px -3px 17px -3px rgba(0, 0, 0, 0.1)",
  boxShadow: "0px -3px 17px -3px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px 10px 0px 0px",
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
  fontFamily: AppStyle.typography.secondaryFont,
  lineHeight: "107.5%",
  fontWeight: "700",
  fontSize: "2rem",
  textAlign: "right"
}
export const itemTableDataCellStyleBold = {
  fontSize: "40px",
  lineHeight: "107.5%",
  fontWeight: "800"
}

export const buttonStyle = {
  bgcolor: "#00447b",
  width: {xs: "100%", md: "fit-content" },
  "&:hover":{
    bgcolor: "#00284a"
  }
}
export  const tableCellValue = {
  ...centerAbsoluteItem,
  zIndex: 3,

}
// Table style end

// Info card start

export const infoCardImageGrid = {
  display: {xs:"none", md: "block"}

}

// Info card end

// xrea section start

export const xreaBgStyle = {
    ...cardstyle,
    bgcolor: "#E8F3FD"
}
export const xreaTitleStyle = {
  color: "#000",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {xs:"2.25rem"}
}
export const xreaButtonContainer ={
  flexDirection:"row",
  mt:1,
  justifyContent:{xs:"center", md: "left"},
}
export const xreDes = {
  fontSize: {xs: "1.25rem"}
}

export const barImgContainer = {
    width: "80%",
    position: "relative"
}

// xrea section end

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
    fontSize: "26px"

}
export const marketsegmenttypography = {
    fontfamily: "IBM Plex Sans",
    fontsize: "20px",
    fontweight: "400",
    lineheight: "22px",
    letterspacing: "0px",
    textalign: "left"

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

 
// market segmnent end 