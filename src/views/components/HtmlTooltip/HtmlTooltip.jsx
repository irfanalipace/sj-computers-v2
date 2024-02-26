import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material';

export const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',

    '& .MuiTooltip-arrow': {
      color: 'lightgray',
    },
  },
}));
