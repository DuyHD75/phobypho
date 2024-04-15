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
                    main: "#C48F56",
                    contrastText: "#fff",
               },
               secondary: {
                    main: "#C48F56",
                    colorText: '#000',
                    bgColor: '#000',
                    secondaryText: '#717171',
                    contrastText: "#fff"
               },
               background: {
                    default: "#ffff",
                    paper: "#fff", 
                    secondaryPaper: "#333"
               }
          } : {
               primary: {
                    main: "#ff0000",
                    contrastText: "#fff"
               },
               secondary: {
                    main: "#000"
               },
               background: {
                    default: colors.grey["100"]
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


