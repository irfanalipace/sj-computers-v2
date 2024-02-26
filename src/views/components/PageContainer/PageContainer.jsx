import { useMediaQuery, useTheme } from '@mui/material';
import useProductData from '../../pages/Product/useProductData';
import LoaderComponent from '@common/LoaderComponent/LoaderComponent';

const PageContainer = ({ children }) => {
  const theme = useTheme();

  const isUpSmall = useMediaQuery(theme.breakpoints.up('md'));
  const { isLoading } = useProductData();
  return isLoading ? (
    <LoaderComponent />
  ) : (
    <>
      {isUpSmall ? (
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
      )}
    </>
  );
};

export default PageContainer;
