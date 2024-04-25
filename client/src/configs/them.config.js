import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material'

export const themeModes = {
     dark: "dark",
     light: "light"
}

const themeConfigs = {
     custom: ({ mode }) => {
          const customPalette = mode === themeModes.dark ? {
               primary: {
                    main: "#2D89E5",
                    headerColor: '#ffdc48',
                    contrastText: "#fff",
               },
               secondary: {
                    main: "#2D89E5",
                    colorText: '#000',
                    bgColor: '#000',
                    secondaryText: '#717171',
                    contrastText: "#fff",
                    subText: '#95c7f9'
               },
               background: {
                    default: "#ffff",
                    paper: "#fff",
                    secondaryPaper: "#333"
               }
          } : {
               primary: {
                    main: "#2D89E5",
                    headerColor: '#ffdc48',
                    contrastText: "#fff",
               },
               secondary: {
                    main: "#2D89E5",
                    colorText: '#000',
                    bgColor: '#000',
                    secondaryText: '#717171',
                    contrastText: "#fff",
                    subText: '#5a626e'
               },
               background: {
                    default: "#ffff",
                    paper: "#fff",
                    secondaryPaper: "#333"
               }
          }

          return createTheme({
               palette: {
                    mode,
                    ...customPalette
               },
               components: {
                    MuiButton: {
                         defaultProps: { disableElevation: true }
                    }
               }
          })
     }
};

export default themeConfigs;


