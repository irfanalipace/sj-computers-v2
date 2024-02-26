import { useMediaQuery, useTheme } from '@mui/material';

const PageContainer = ({ children }) => {
  const theme = useTheme();

  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));
  return isUpSmall ? (
    <div
      style={{
        backgroundColor: '#d9d9d9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <div
        style={{
          maxWidth: '1450px',
        }}>
        {children}
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default PageContainer;
