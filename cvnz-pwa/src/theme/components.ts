import { Components, Theme } from "@mui/material";
import MuiButton from "./overrides/MuiButton";
import MuiCardActions from './overrides/MuiCardActions';
import MuiCardContent from './overrides/MuiCardContent';
import MuiCardHeader from './overrides/MuiCardHeader';
import MuiChip from './overrides/MuiChip';
import MuiIconButton from './overrides/MuiIconButton';
import MuiInputBase from './overrides/MuiInputBase';
import MuiLinearProgress from './overrides/MuiLinearProgress';
import MuiListItem from './overrides/MuiListItem';
import MuiListItemIcon from './overrides/MuiListItemIcon';
import MuiOutlinedInput from './overrides/MuiOutlinedInput';
import MuiPaper from './overrides/MuiPaper';
import MuiTableCell from './overrides/MuiTableCell';
import MuiTableHead from './overrides/MuiTableHead';
import MuiTableRow from './overrides/MuiTableRow';
import MuiToggleButton from './overrides/MuiToggleButton';
import MuiTypography from './overrides/MuiTypography';

// 
/**
 * Component Styles
 * 
 * FTW. This works.  You can provide provide default component themes in [Mui***].styleOverrides
 *   - Each component has "variants".  eg. <Button variant='outlined'>.  these can be styled as
 *   - a variant can be styled.  Eg: MuiButton.styleOverrides.outlined = { backgroundColor: colors.red[500] }
 * 
 * Eg: {
 *   MuiButton {
 *     styleOverrides: {
 *       // over variants: https://mui.com/material-ui/api/button/
 *       outlined: { 
 *         backgroundColor: colors.red[500],
 *       }
 *     }
 *   }
 * }
 * 
 */
export var options: Components<Omit<Theme, 'components'>> = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        // backgroundColor: 'green'
      },
    },
  },
  MuiButton: {
    styleOverrides: MuiButton,
    defaultProps: {
    }
  },
  MuiCardActions: { styleOverrides: MuiCardActions },
  MuiCardContent: { styleOverrides: MuiCardContent },
  MuiCardHeader: { styleOverrides: MuiCardHeader },
  MuiChip: { styleOverrides: MuiChip },
  MuiIconButton: { styleOverrides: MuiIconButton },
  MuiInputBase: { styleOverrides: MuiInputBase },
  MuiLinearProgress: { styleOverrides: MuiLinearProgress },
  MuiListItem: { styleOverrides: MuiListItem },
  MuiListItemIcon: { styleOverrides: MuiListItemIcon },
  MuiOutlinedInput: { styleOverrides: MuiOutlinedInput },
  MuiPaper: { styleOverrides: MuiPaper },
  MuiTableCell: { styleOverrides: MuiTableCell },
  MuiTableHead: { styleOverrides: MuiTableHead },
  MuiTableRow: { styleOverrides: MuiTableRow },
  MuiToggleButton: { styleOverrides: MuiToggleButton },
  MuiTypography: { styleOverrides: MuiTypography },
};
export default options;