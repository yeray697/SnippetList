declare export module '@material-ui/core/styles/createTheme' {
        interface Theme {
          breakpointColumnsObj: {};
          chip: {maxWidth: number, margin: number, borderWidth:number, textPaddingSides:number};
        }
        interface ThemeOptions {
          breakpointColumnsObj?: {};
          chip?: {maxWidth?: number, margin?: number, borderWidth?:number, textPaddingSides?:number};
        }
      }
    